// Catálogo de bloques: cuadrícula con búsqueda y filtros, y la ficha de cada bloque.

import { BLOQUES, CATEGORIAS } from "./bloques.js";
import { icono } from "./texturas.js";

const HERRAMIENTA = { pico: "Pico", hacha: "Hacha", pala: "Pala", azada: "Azada", tijeras: "Tijeras", espada: "Espada", pincel: "Pincel", ninguna: "Cualquiera (a mano)" };
const NIVELES = ["madera", "piedra", "hierro", "diamante"];
const FORMA = {
  cubo: "Cubo completo", losa: "Losa (medio bloque)", escalera: "Escaleras", muro: "Muro", valla: "Valla", panel: "Panel delgado",
  puerta: "Puerta (2 de alto)", trampilla: "Trampilla", placa: "Placa", boton: "Botón", cartel: "Cartel", cruz: "Planta / objeto en cruz",
  hojas: "Cubo con huecos", cristal: "Cubo transparente", liquido: "Líquido", alfombra: "Lámina", capa: "Capa", camino: "Casi un cubo (15/16)",
  cama: "Cama", cofre: "Cofre", farol: "Objeto pequeño", huevo: "Huevo", yunque: "Yunque", tolva: "Contenedor", cactus: "Cactus", nada: "Invisible",
};

// Tiempo de minado (Java): daño por tic = velocidad / dureza / (30 si se puede recoger, 100 si no).
function tiempo(b, tipo, nivel) {
  if (b.dureza < 0) return "Indestructible";
  if (b.dureza === 0) return "Instantáneo";
  const vel = { mano: 1, madera: 2, piedra: 4, hierro: 6, diamante: 8, netherita: 9, oro: 12 }[nivel];
  const adecuada = tipo === b.herramienta;
  const v = adecuada ? vel : 1;
  const nivelHerr = { mano: -1, oro: 0, madera: 0, piedra: 1, hierro: 2, diamante: 3, netherita: 4 }[nivel];
  const recoge = !b.nivel || (adecuada && nivelHerr >= NIVELES.indexOf(b.nivel));
  const tics = Math.ceil(1 / (v / b.dureza / (recoge ? 30 : 100)));
  const s = tics / 20;
  return (s < 10 ? s.toFixed(2) : s.toFixed(1)) + " s" + (recoge ? "" : " · no suelta nada");
}

export function crearCatalogo(raiz, tex, { alElegir, alCerrar }) {
  const capasCache = new Map();
  const iconos = new Map();
  let modo = "ver", categoria = "Todas", texto = "", filtroExtra = "";

  raiz.innerHTML = `
    <div class="cat-barra">
      <button class="icono-btn" data-cerrar aria-label="Cerrar">‹</button>
      <div class="cat-titulo"><b>Catálogo de bloques</b><small id="catCuenta"></small></div>
      <input id="catBuscar" type="search" placeholder="Buscar por nombre o id…" autocomplete="off">
    </div>
    <div class="cat-filtros" id="catFiltros"></div>
    <div class="cat-cuerpo">
      <div class="cat-rejilla" id="catRejilla"></div>
      <aside class="cat-ficha" id="catFicha"><div class="ficha-vacia">Toca un bloque para ver sus características.</div></aside>
    </div>`;
  const $ = (s) => raiz.querySelector(s);
  const filtros = $("#catFiltros"), rejilla = $("#catRejilla"), ficha = $("#catFicha");

  const chips = ["Todas", ...CATEGORIAS].map((c) => `<button class="chip" data-c="${c}">${c}</button>`).join("") +
    `<span class="sep"></span>` +
    [["luz", "Dan luz"], ["gravedad", "Caen"], ["inflamable", "Arden"], ["transparente", "Transparentes"], ["indestructible", "Indestructibles"]]
      .map(([k, n]) => `<button class="chip suave" data-f="${k}">${n}</button>`).join("");
  filtros.innerHTML = chips;

  const observador = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const el = e.target, n = +el.dataset.n;
      if (!el.firstChild.hasChildNodes()) el.firstChild.appendChild(iconoDe(BLOQUES[n], 44));
      observador.unobserve(el);
    }
  }, { root: rejilla, rootMargin: "200px" });

  function iconoDe(b, tam) {
    const k = b.num + ":" + tam;
    if (iconos.has(k)) return clonar(iconos.get(k));
    tex.cacheCapas = capasCache;
    const cv = icono(b, tex, tam);
    iconos.set(k, cv);
    return clonar(cv);
  }
  function clonar(cv) {
    const c = document.createElement("canvas");
    c.width = cv.width; c.height = cv.height;
    c.getContext("2d").drawImage(cv, 0, 0);
    return c;
  }

  function lista() {
    const t = texto.trim().toLowerCase();
    return BLOQUES.filter((b) => {
      if (b.num === 0) return false;
      if (modo === "elegir" && !b.colocable) return false;
      if (categoria !== "Todas" && b.cat !== categoria) return false;
      if (filtroExtra === "luz" && !b.luz) return false;
      if (filtroExtra === "gravedad" && !b.gravedad) return false;
      if (filtroExtra === "inflamable" && !b.inflamable) return false;
      if (filtroExtra === "transparente" && !b.transparente) return false;
      if (filtroExtra === "indestructible" && b.dureza >= 0) return false;
      if (t && !b.nombre.toLowerCase().includes(t) && !b.id.includes(t.replace(/ /g, "_"))) return false;
      return true;
    });
  }

  function pintar() {
    const l = lista();
    $("#catCuenta").textContent = `${l.length} de ${BLOQUES.length - 1} bloques`;
    filtros.querySelectorAll("[data-c]").forEach((c) => c.classList.toggle("activo", c.dataset.c === categoria));
    filtros.querySelectorAll("[data-f]").forEach((c) => c.classList.toggle("activo", c.dataset.f === filtroExtra));
    rejilla.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (const b of l) {
      const el = document.createElement("button");
      el.className = "tarjeta";
      el.dataset.n = b.num;
      el.innerHTML = `<span class="tarjeta-ico"></span><span class="tarjeta-nom">${b.nombre}</span><span class="tarjeta-sub">${b.cat}${b.luz ? " · ☀ " + b.luz : ""}</span>`;
      frag.appendChild(el);
      observador.observe(el);
    }
    rejilla.appendChild(frag);
    if (!l.length) rejilla.innerHTML = `<div class="vacio">Nada coincide con «${texto}».</div>`;
  }

  function mostrar(b) {
    rejilla.querySelectorAll(".tarjeta.sel").forEach((e) => e.classList.remove("sel"));
    rejilla.querySelector(`[data-n="${b.num}"]`)?.classList.add("sel");
    const si = (v) => (v ? "Sí" : "No");
    const nivel = b.nivel ? `${HERRAMIENTA[b.herramienta]} de ${b.nivel} o mejor` : b.dureza < 0 ? "—" : "No hace falta";
    const tiers = ["pico", "hacha", "pala", "azada"].includes(b.herramienta) ? ["madera", "piedra", "hierro", "diamante", "netherita", "oro"] : [];
    const tiempos = `<tr><td>A mano</td><td>${tiempo(b, "mano", "mano")}</td></tr>` +
      tiers.map((n) => `<tr><td>${HERRAMIENTA[b.herramienta]} de ${n}</td><td>${tiempo(b, b.herramienta, n)}</td></tr>`).join("");
    ficha.innerHTML = `
      <div class="ficha-cabeza"><span class="ficha-ico"></span><div><h2>${b.nombre}</h2><code>minecraft:${b.id}</code></div></div>
      ${b.nota ? `<p class="ficha-nota">${b.nota}</p>` : ""}
      <table class="props">
        <tr><td>Categoría</td><td>${b.cat}</td></tr>
        <tr><td>Dureza</td><td>${b.dureza < 0 ? "∞ (indestructible)" : b.dureza}</td></tr>
        <tr><td>Resistencia a explosiones</td><td>${b.resistencia >= 3600000 ? "3,600,000 (inmune)" : b.resistencia}</td></tr>
        <tr><td>Herramienta</td><td>${HERRAMIENTA[b.herramienta] || b.herramienta}</td></tr>
        <tr><td>Para recogerlo</td><td>${nivel}</td></tr>
        <tr><td>Luz que emite</td><td>${b.luz ? `${b.luz} de 15` : "Ninguna"}</td></tr>
        <tr><td>Arde</td><td>${si(b.inflamable)}</td></tr>
        <tr><td>Cae por gravedad</td><td>${si(b.gravedad)}</td></tr>
        <tr><td>Deja pasar la luz</td><td>${si(b.transparente)}</td></tr>
        <tr><td>Se apila hasta</td><td>${b.apilable}</td></tr>
        <tr><td>Renovable</td><td>${si(b.renovable)}</td></tr>
        <tr><td>Forma</td><td>${FORMA[b.forma] || b.forma}</td></tr>
        ${b.version ? `<tr><td>Desde la versión</td><td>${b.version}</td></tr>` : ""}
      </table>
      <h3>Tiempo para romperlo</h3>
      <table class="props tiempos">${tiempos}</table>
      ${b.colocable ? `<div class="ficha-acciones"><button class="btn primario" data-usar="${b.num}">${modo === "elegir" ? "Elegir este bloque" : "Construir con él en Giza"}</button></div>` : ""}`;
    ficha.querySelector(".ficha-ico").appendChild(iconoDe(b, 72));
    ficha.classList.add("abierta");
  }

  raiz.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.cerrar !== undefined) { if (ficha.classList.contains("abierta") && innerWidth < 900) ficha.classList.remove("abierta"); else alCerrar(); return; }
    if (t.dataset.c) { categoria = t.dataset.c; pintar(); return; }
    if (t.dataset.f) { filtroExtra = filtroExtra === t.dataset.f ? "" : t.dataset.f; pintar(); return; }
    if (t.dataset.usar) { alElegir(+t.dataset.usar); return; }
    if (t.classList.contains("tarjeta")) {
      const b = BLOQUES[+t.dataset.n];
      if (modo === "elegir" && e.detail >= 2) { alElegir(b.num); return; }
      mostrar(b);
    }
  });
  $("#catBuscar").addEventListener("input", (e) => { texto = e.target.value; pintar(); });

  return {
    abrir(m) {
      modo = m;
      raiz.classList.toggle("eligiendo", m === "elegir");
      raiz.hidden = false;
      pintar();
      ficha.classList.remove("abierta");
      ficha.innerHTML = `<div class="ficha-vacia">${m === "elegir" ? "Toca un bloque y luego «Elegir», o tócalo dos veces." : "Toca un bloque para ver sus características."}</div>`;
    },
    cerrar() { raiz.hidden = true; },
  };
}
