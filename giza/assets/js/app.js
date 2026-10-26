// Une las pantallas: inicio, juego y catálogo; controles táctiles, teclado y guardado.

import { BLOQUES } from "./bloques.js";
import { construirTexturas, icono } from "./texturas.js";
import { LUGARES } from "./mundo.js";
import { Motor } from "./motor.js";
import { Juego, leerGuardado, escribirGuardado } from "./juego.js";
import { crearCatalogo } from "./catalogo.js";

const $ = (s) => document.querySelector(s);
const tex = construirTexturas();
let motor = null, juego = null, corriendo = false, volverA = "inicio";

const AJ_DEF = { radio: 12, calidad: 1.3, sens: 1, fov: 72, dia: 1 };
let aj = { ...AJ_DEF };
try { aj = { ...AJ_DEF, ...JSON.parse(localStorage.getItem("giza:ajustes") || "{}") }; } catch { /* sin almacenamiento */ }
const guardarAjustes = () => { try { localStorage.setItem("giza:ajustes", JSON.stringify(aj)); } catch { /* nada */ } };

$("#cuentaBloques").textContent = BLOQUES.length - 1;

// ---------- utilidades de pantalla ----------
function aviso(texto, sub = "", ms = 2600) {
  const a = $("#aviso");
  a.innerHTML = texto + (sub ? `<small>${sub}</small>` : "");
  a.classList.add("ver");
  clearTimeout(aviso.t);
  aviso.t = setTimeout(() => a.classList.remove("ver"), ms);
}
function preguntar(titulo, texto, si = "Aceptar") {
  return new Promise((ok) => {
    $("#dTitulo").textContent = titulo; $("#dTexto").textContent = texto; $("#dSi").textContent = si;
    $("#velo").hidden = false;
    const fin = (v) => { $("#velo").hidden = true; ok(v); };
    $("#dSi").onclick = () => fin(true);
    $("#dNo").onclick = () => fin(false);
  });
}
function mostrar(id) {
  for (const s of ["inicio", "juego", "catalogo"]) $("#" + s).hidden = s !== id;
  if (id === "juego") arrancar(); else corriendo = false;
}

// ---------- catálogo ----------
const catalogo = crearCatalogo($("#catalogo"), tex, {
  alElegir(n) {
    if (!juego) { iniciarJuego(); }
    juego.barra[juego.ranura] = n;
    pintarBarra();
    mostrar("juego");
    aviso(BLOQUES[n].nombre, "Toca para ponerlo · mantén para quitar");
  },
  alCerrar() { mostrar(volverA); },
});
$("#btnCatalogo").onclick = () => { volverA = "inicio"; mostrar("catalogo"); catalogo.abrir("ver"); };
$("#btnJugar").onclick = () => { iniciarJuego(); mostrar("juego"); };
$("#btnBloques").onclick = () => { volverA = "juego"; mostrar("catalogo"); catalogo.abrir("elegir"); };
$("#btnMenu").onclick = () => mostrar("inicio");

// ---------- juego ----------
function iniciarJuego() {
  if (motor) return;
  let cargados = 0;
  motor = new Motor($("#lienzo"), () => { cargados++; }, tex);
  motor.radio = aj.radio; motor.calidad = aj.calidad; motor.fov = aj.fov; motor.dia = aj.dia;
  juego = new Juego(motor, { estado: pintarModos });
  try {
    const p = JSON.parse(localStorage.getItem("giza:pos") || "null");
    if (p) { Object.assign(juego.pos, p.pos); juego.yaw = p.yaw; juego.pitch = p.pitch; juego.volar = p.volar ?? true; }
    const b = JSON.parse(localStorage.getItem("giza:barra") || "null");
    if (b && b.length === 9) juego.barra = b.filter((n) => BLOQUES[n]).length === 9 ? b : juego.barra;
  } catch { /* primera vez */ }
  leerGuardado("cambios").then((lista) => {
    if (lista && lista.length) { juego.cargarCambios(lista); motor.recargarTodo(); aviso(`${lista.length} bloques tuyos cargados`); }
  });
  pintarBarra(); pintarModos(); pintarLugares(); prepararAjustes();
  setInterval(guardar, 3000);
  motor.progreso = () => cargados;
}

async function guardar() {
  if (!juego) return;
  try {
    localStorage.setItem("giza:pos", JSON.stringify({ pos: juego.pos, yaw: juego.yaw, pitch: juego.pitch, volar: juego.volar }));
    localStorage.setItem("giza:barra", JSON.stringify(juego.barra));
  } catch { /* nada */ }
  if (juego.sucio) { juego.sucio = false; await escribirGuardado("cambios", juego.listaCambios()); }
}
document.addEventListener("visibilitychange", () => { if (document.hidden) guardar(); });

let ultimo = 0, ultimoHud = 0, ultimoChunks = 0, cargaOculta = false;
function arrancar() {
  if (corriendo) return;
  corriendo = true;
  ultimo = performance.now();
  requestAnimationFrame(cuadro);
}
function cuadro(t) {
  if (!corriendo) return;
  const dt = (t - ultimo) / 1000;
  ultimo = t;
  teclasAMovimiento();
  juego.paso(dt);
  if (t - ultimoChunks > 80) { motor.actualizarChunks(); ultimoChunks = t; }
  motor.dibujar();
  if (t - ultimoHud > 250) { hud(dt); ultimoHud = t; }
  requestAnimationFrame(cuadro);
}
function hud(dt) {
  const d = juego.donde();
  $("#hudLugar").textContent = d.lugar;
  $("#hudCoords").textContent = `x ${d.x} · y ${d.y} · z ${d.z} · ${d.rumbo}` + (dt > 0 ? ` · ${Math.round(1 / dt)} fps` : "");
  const total = Math.round(Math.PI * motor.radio * motor.radio);
  const listo = motor.chunks.size;
  const p = Math.min(1, listo / total);
  $("#cargaBarra").style.width = (p * 100).toFixed(0) + "%";
  $("#cargaTexto").textContent = p < 1 ? `Construyendo Giza… ${listo} de ${total} zonas` : "Listo";
  const debe = p > 0.92 || motor.faltantes === 0;
  if (debe !== cargaOculta) { $("#carga").classList.toggle("listo", debe); cargaOculta = debe; }
}

// ---------- barra de bloques ----------
const iconosBarra = new Map();
function pintarBarra() {
  const b = $("#barra");
  b.innerHTML = "";
  juego.barra.forEach((n, i) => {
    const el = document.createElement("button");
    el.className = "ranura" + (i === juego.ranura ? " sel" : "");
    el.dataset.i = i;
    if (!iconosBarra.has(n)) iconosBarra.set(n, icono(BLOQUES[n], tex, 44));
    const c = document.createElement("canvas");
    c.width = c.height = 44;
    c.getContext("2d").drawImage(iconosBarra.get(n), 0, 0);
    el.appendChild(c);
    el.insertAdjacentHTML("beforeend", `<small>${i + 1}</small>`);
    b.appendChild(el);
  });
}
function elegirRanura(i, avisar = true) {
  juego.ranura = (i + 9) % 9;
  pintarBarra();
  if (avisar) aviso(BLOQUES[juego.barra[juego.ranura]].nombre, "", 1200);
}
let toqueRanura = null;
$("#barra").addEventListener("pointerdown", (e) => {
  const r = e.target.closest(".ranura");
  if (!r) return;
  e.stopPropagation();
  toqueRanura = setTimeout(() => { toqueRanura = null; elegirRanura(+r.dataset.i, false); volverA = "juego"; mostrar("catalogo"); catalogo.abrir("elegir"); }, 550);
});
$("#barra").addEventListener("pointerup", (e) => {
  const r = e.target.closest(".ranura");
  if (toqueRanura) { clearTimeout(toqueRanura); toqueRanura = null; if (r) elegirRanura(+r.dataset.i); }
});

// ---------- modos ----------
function pintarModos() {
  if (!juego) return;
  $("#ctlVolar").classList.toggle("activo", juego.volar);
  $("#ctlAtravesar").classList.toggle("activo", juego.atravesar);
  $("#ctlTurbo").classList.toggle("activo", juego.turbo);
  $("#aVolar").checked = juego.volar;
  $("#aAtravesar").checked = juego.atravesar;
  $("#ctlSubir").textContent = juego.volar ? "▲" : "⤒";
  $("#ctlBajar").style.visibility = juego.volar ? "" : "hidden";
}
$("#ctlVolar").onclick = () => { juego.volar = !juego.volar; juego.vel.y = 0; pintarModos(); aviso(juego.volar ? "Volando" : "Caminando", juego.volar ? "" : "▲ salta; los escalones de un bloque se suben solos"); };
$("#ctlAtravesar").onclick = () => { juego.atravesar = !juego.atravesar; pintarModos(); aviso(juego.atravesar ? "Atravesar paredes: sí" : "Atravesar paredes: no", juego.atravesar ? "Sirve para entrar a las cámaras cerradas" : ""); };
$("#ctlTurbo").onclick = () => { juego.turbo = !juego.turbo; pintarModos(); aviso(juego.turbo ? "Velocidad alta (60 m/s)" : "Velocidad normal"); };
$("#ctlCopiar").onclick = () => { if (juego.copiar()) { pintarBarra(); aviso("Copiado: " + BLOQUES[juego.barra[juego.ranura]].nombre); } };
for (const [id, v] of [["#ctlSubir", 1], ["#ctlBajar", -1]]) {
  const b = $(id);
  b.addEventListener("pointerdown", (e) => { e.preventDefault(); b.setPointerCapture(e.pointerId); toque.subir = v; b.classList.add("pulsado"); });
  const fin = () => { toque.subir = 0; b.classList.remove("pulsado"); };
  b.addEventListener("pointerup", fin); b.addEventListener("pointercancel", fin);
}

// ---------- tacto ----------
const toque = { joy: null, mira: null, x: 0, z: 0, subir: 0 };
const zona = $("#zonaTactil");
let ayudaVista = 0;
zona.addEventListener("pointerdown", (e) => {
  if (document.pointerLockElement === zona) return;   // con ratón capturado mandan los clics
  zona.setPointerCapture(e.pointerId);
  const izq = e.clientX < innerWidth * 0.42 && e.clientY > innerHeight * 0.2;
  if (izq && !toque.joy) {
    toque.joy = { id: e.pointerId, cx: e.clientX, cy: e.clientY };
    const j = $("#joy"); j.style.left = e.clientX + "px"; j.style.top = e.clientY + "px"; j.classList.add("ver");
    return;
  }
  if (toque.mira) return;
  const m = { id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), movio: false, rompio: false };
  m.temporizador = setTimeout(function romper() {
    if (m.movio || toque.mira !== m) return;
    if (juego.quitar()) { m.rompio = true; navigator.vibrate?.(15); }
    m.temporizador = setTimeout(romper, 260);
  }, 380);
  toque.mira = m;
});
zona.addEventListener("pointermove", (e) => {
  if (toque.joy && e.pointerId === toque.joy.id) {
    let dx = e.clientX - toque.joy.cx, dy = e.clientY - toque.joy.cy;
    const d = Math.hypot(dx, dy), max = 55;
    if (d > max) { dx *= max / d; dy *= max / d; }
    toque.x = dx / max; toque.z = -dy / max;
    $("#joy i").style.transform = `translate(${dx}px, ${dy}px)`;
    return;
  }
  const m = toque.mira;
  if (m && e.pointerId === m.id) {
    const dx = e.clientX - m.x, dy = e.clientY - m.y;
    m.x = e.clientX; m.y = e.clientY;
    if (Math.hypot(e.clientX - m.x0, e.clientY - m.y0) > 12) m.movio = true;
    const k = 0.0042 * aj.sens * (72 / aj.fov) ** -0.5;
    juego.yaw += dx * k;
    juego.pitch = Math.max(-1.55, Math.min(1.55, juego.pitch - dy * k));
  }
});
function soltar(e) {
  if (toque.joy && e.pointerId === toque.joy.id) {
    toque.joy = null; toque.x = 0; toque.z = 0;
    $("#joy").classList.remove("ver"); $("#joy i").style.transform = "";
    return;
  }
  const m = toque.mira;
  if (m && e.pointerId === m.id) {
    clearTimeout(m.temporizador);
    if (!m.movio && !m.rompio && performance.now() - m.t0 < 380 && e.type === "pointerup") {
      if (juego.colocar()) navigator.vibrate?.(8);
    }
    toque.mira = null;
    if (++ayudaVista === 6) $("#ayudaToque").classList.add("oculta");
  }
}
zona.addEventListener("pointerup", soltar);
zona.addEventListener("pointercancel", soltar);

// ---------- teclado y ratón ----------
const teclas = new Set();
addEventListener("keydown", (e) => {
  if ($("#juego").hidden || e.target.tagName === "INPUT") return;
  teclas.add(e.code);
  if (e.code.startsWith("Digit")) { const n = +e.code.slice(5); if (n >= 1 && n <= 9) elegirRanura(n - 1); }
  if (e.code === "KeyF") $("#ctlVolar").click();
  if (e.code === "KeyN") $("#ctlAtravesar").click();
  if (e.code === "KeyE") $("#btnBloques").click();
  if (e.code === "KeyM") $("#btnLugares").click();
});
addEventListener("keyup", (e) => teclas.delete(e.code));
function teclasAMovimiento() {
  let x = toque.x, z = toque.z, y = toque.subir;
  if (teclas.has("KeyW") || teclas.has("ArrowUp")) z = 1;
  if (teclas.has("KeyS") || teclas.has("ArrowDown")) z = -1;
  if (teclas.has("KeyA") || teclas.has("ArrowLeft")) x = -1;
  if (teclas.has("KeyD") || teclas.has("ArrowRight")) x = 1;
  if (teclas.has("Space")) y = 1;
  if (teclas.has("ShiftLeft") || teclas.has("ShiftRight")) y = -1;
  juego.mov.x = x; juego.mov.z = z; juego.mov.y = y;
  juego.rapido = teclas.has("ControlLeft");
}
zona.addEventListener("mousedown", (e) => {
  if (document.pointerLockElement !== zona) { if (e.pointerType !== "touch") zona.requestPointerLock?.(); return; }
  if (e.button === 0) juego.quitar(); else if (e.button === 2) juego.colocar(); else if (e.button === 1) { juego.copiar(); pintarBarra(); }
});
zona.addEventListener("contextmenu", (e) => e.preventDefault());
addEventListener("mousemove", (e) => {
  if (document.pointerLockElement !== zona) return;
  const k = 0.0025 * aj.sens;
  juego.yaw += e.movementX * k;
  juego.pitch = Math.max(-1.55, Math.min(1.55, juego.pitch - e.movementY * k));
});
addEventListener("wheel", (e) => { if (!$("#juego").hidden && juego) elegirRanura(juego.ranura + Math.sign(e.deltaY), false); });

// ---------- paneles ----------
function abrirPanel(id) {
  for (const p of ["#panelLugares", "#panelAjustes"]) $(p).hidden = p !== id || !$(p).hidden;
}
$("#btnLugares").onclick = () => abrirPanel("#panelLugares");
$("#btnAjustes").onclick = () => abrirPanel("#panelAjustes");
document.querySelectorAll("[data-cerrar]").forEach((b) => b.addEventListener("click", () => { b.closest(".panel") && (b.closest(".panel").hidden = true); }));

function pintarLugares() {
  $("#listaLugares").innerHTML = LUGARES.map((l, i) => `<button class="lugar" data-i="${i}"><b>${l.nombre}</b><small>${l.nota}</small></button>`).join("");
}
$("#listaLugares").addEventListener("click", (e) => {
  const b = e.target.closest(".lugar");
  if (!b) return;
  const l = LUGARES[+b.dataset.i];
  juego.ir(l);
  pintarModos();
  $("#panelLugares").hidden = true;
  aviso(l.nombre, l.nota, 4500);
});

function prepararAjustes() {
  const enlazar = (id, clave, fmt, aplicar) => {
    const el = $("#a" + id), out = $("#v" + id);
    el.value = aj[clave];
    out.textContent = fmt(aj[clave]);
    el.oninput = () => { aj[clave] = +el.value; out.textContent = fmt(aj[clave]); aplicar(aj[clave]); guardarAjustes(); };
  };
  enlazar("Radio", "radio", (v) => `${v * 16} m`, (v) => { motor.radio = v; });
  enlazar("Calidad", "calidad", (v) => `${Math.round(v * 100)} %`, (v) => { motor.calidad = v; });
  enlazar("Sens", "sens", (v) => `${v.toFixed(1)}×`, () => {});
  enlazar("Fov", "fov", (v) => `${v}°`, (v) => { motor.fov = v; });
  enlazar("Dia", "dia", (v) => (v > 0.85 ? "Mediodía" : v > 0.6 ? "Tarde" : "Anochecer"), (v) => { motor.dia = v; });
  $("#aVolar").onchange = (e) => { juego.volar = e.target.checked; pintarModos(); };
  $("#aAtravesar").onchange = (e) => { juego.atravesar = e.target.checked; pintarModos(); };
  $("#btnBorrar").onclick = async () => {
    const n = juego.cambios.size;
    if (!n) { aviso("No has construido nada todavía"); return; }
    if (!(await preguntar("Borrar mis construcciones", `Se quitan los ${n} bloques que pusiste o quitaste y Giza vuelve a como era.`, "Borrar"))) return;
    juego.cambios.clear();
    motor.olvidarCambios();
    await escribirGuardado("cambios", []);
    aviso("Giza volvió a su estado original");
  };
  $("#pieInfo").textContent = `${BLOQUES.length - 1} bloques · ${tex.capas.length} texturas · ${motor.trabajadores.length} hilos de construcción. Escala 1:1: un bloque es un metro.`;
}

// ---------- botón Atrás de Android ----------
window.atras = () => {
  if (!$("#velo").hidden) { $("#dNo").click(); return true; }
  if (!$("#catalogo").hidden) { $("#catalogo [data-cerrar]").click(); return true; }
  if (!$("#juego").hidden) {
    for (const p of ["#panelLugares", "#panelAjustes"]) if (!$(p).hidden) { $(p).hidden = true; return true; }
    guardar(); mostrar("inicio"); return true;
  }
  return false;
};
