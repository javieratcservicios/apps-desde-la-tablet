// El modo creativo: cámara, movimiento, choques, poner y quitar bloques, y lo que se guarda.

import { BLOQUES, bloque } from "./bloques.js";
import { ALTO, bloqueEn, lugarCercano, LUGARES } from "./mundo.js";

const OJOS = 1.62, ANCHO = 0.3, ALTURA = 1.8;
const SIN_CHOQUE = new Set(["cruz", "nada", "liquido", "alfombra", "placa", "boton"]);

export class Juego {
  constructor(motor, ui) {
    this.m = motor;
    this.ui = ui;
    this.pos = { x: 640, y: 150, z: 760 };   // los pies
    this.vel = { x: 0, y: 0, z: 0 };
    this.yaw = 0; this.pitch = 0;
    this.volar = true; this.atravesar = false; this.turbo = false;
    this.mov = { x: 0, z: 0, y: 0 };          // entrada: adelante/derecha/arriba (-1..1)
    this.cambios = new Map();                  // "x,y,z" → id
    this.barra = ["giza_limestone", "giza_casing", "giza_granite", "sandstone", "chiseled_sandstone", "stone_bricks", "oak_planks", "glass", "lantern"].map((id) => bloque(id).num);
    this.ranura = 0;
    this.objetivo = null;
    this.enSuelo = false;
    this.sucio = false;
    this.ir(LUGARES[0]);
  }

  // ---------- mundo con cambios ----------
  bloque(x, y, z) {
    const k = x + "," + y + "," + z;
    const c = this.cambios.get(k);
    return c !== undefined ? c : bloqueEn(x, y, z);
  }
  poner(x, y, z, id) {
    if (y < 1 || y >= ALTO) return;
    this.cambios.set(x + "," + y + "," + z, id);
    this.m.enviarCambios([[x, y, z, id]]);
    this.m.rehacer(x, z);
    this.sucio = true;
  }
  cargarCambios(lista) {
    this.cambios = new Map(lista.map(([k, id]) => [k, id]));
    this.m.enviarCambios(lista.map(([k, id]) => [...k.split(",").map(Number), id]));
  }
  listaCambios() { return [...this.cambios.entries()]; }

  solido(x, y, z) {
    const id = this.bloque(x, y, z);
    if (!id) return false;
    return !SIN_CHOQUE.has(BLOQUES[id].forma);
  }

  // ---------- lugares ----------
  ir(l) {
    this.pos = { x: l.x, y: l.y, z: l.z };
    this.vel = { x: 0, y: 0, z: 0 };
    const [mx, my, mz] = l.mira;
    const dx = mx - l.x, dy = my - (l.y + OJOS), dz = mz - l.z;
    this.yaw = Math.atan2(dx, -dz);
    this.pitch = Math.atan2(dy, Math.hypot(dx, dz));
    this.volar = true;
    // en los huecos de las cámaras de descarga no cabe una persona: hay que atravesar paredes
    if (l.id === "descarga") this.atravesar = true;
    this.ui.estado?.();
  }

  // ---------- física ----------
  paso(dt) {
    dt = Math.min(dt, 0.05);
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    const adelante = [sy, -cy], derecha = [cy, sy];
    const vel = this.volar ? (this.turbo ? 60 : 12) * (this.rapido ? 2.5 : 1) : this.rapido ? 5.6 : 4.3;
    const wx = (adelante[0] * this.mov.z + derecha[0] * this.mov.x) * vel;
    const wz = (adelante[1] * this.mov.z + derecha[1] * this.mov.x) * vel;
    if (this.volar) {
      const k = 1 - Math.exp(-dt * 10);
      this.vel.x += (wx - this.vel.x) * k;
      this.vel.z += (wz - this.vel.z) * k;
      this.vel.y += (this.mov.y * vel * 0.8 - this.vel.y) * k;
    } else {
      const k = 1 - Math.exp(-dt * (this.enSuelo ? 14 : 3));
      this.vel.x += (wx - this.vel.x) * k;
      this.vel.z += (wz - this.vel.z) * k;
      this.vel.y -= 28 * dt;
      if (this.mov.y > 0 && this.enSuelo) this.vel.y = 8.6;
      if (this.vel.y < -60) this.vel.y = -60;
    }
    if (this.atravesar) {
      this.pos.x += this.vel.x * dt; this.pos.y += this.vel.y * dt; this.pos.z += this.vel.z * dt;
      this.enSuelo = false;
    } else {
      this.mover("y", this.vel.y * dt);
      this.mover("x", this.vel.x * dt);
      this.mover("z", this.vel.z * dt);
    }
    this.pos.y = Math.max(1, Math.min(ALTO + 400, this.pos.y));
    const m = this.m.cam;
    m.x = this.pos.x; m.y = this.pos.y + OJOS; m.z = this.pos.z; m.yaw = this.yaw; m.pitch = this.pitch;
    // linterna automática: se enciende cuando hay roca encima (dentro de la pirámide o bajo tierra)
    const bx = Math.floor(m.x), by = Math.floor(m.y), bz = Math.floor(m.z);
    let techo = false;
    for (let y = by + 1; y < Math.min(ALTO, by + 40); y++) if (this.solido(bx, y, bz)) { techo = true; break; }
    const meta = techo ? 1 : 0;
    this.m.linterna += (meta - this.m.linterna) * Math.min(1, dt * 4);
    this.apuntar();
  }

  mover(eje, d) {
    if (!d) return;
    const p = this.pos;
    const pasos = Math.ceil(Math.abs(d) / 0.45);
    const dd = d / pasos;
    for (let i = 0; i < pasos; i++) {
      p[eje] += dd;
      if (this.choca()) {
        p[eje] -= dd;
        if (eje === "y") { if (dd < 0) this.enSuelo = true; this.vel.y = 0; }
        else if (!this.volar && this.enSuelo && !this.subirEscalon(eje, dd)) this.vel[eje] = 0;
        else if (this.volar) this.vel[eje] = 0;
        return;
      }
      if (eje === "y" && dd < 0) this.enSuelo = false;
    }
  }
  // al caminar, subir solo escalones de un bloque (como los de las pirámides)
  subirEscalon(eje, dd) {
    const p = this.pos;
    p.y += 1.01; p[eje] += dd;
    if (!this.choca()) { this.vel.y = Math.max(this.vel.y, 0); return true; }
    p.y -= 1.01; p[eje] -= dd;
    return false;
  }
  choca() {
    const p = this.pos;
    const x0 = Math.floor(p.x - ANCHO), x1 = Math.floor(p.x + ANCHO);
    const y0 = Math.floor(p.y), y1 = Math.floor(p.y + ALTURA - 0.01);
    const z0 = Math.floor(p.z - ANCHO), z1 = Math.floor(p.z + ANCHO);
    for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) if (this.solido(x, y, z)) return true;
    return false;
  }

  // ---------- apuntar, poner y quitar ----------
  rayo(max = 14) {
    const c = this.m.cam;
    const dir = [Math.sin(c.yaw) * Math.cos(c.pitch), Math.sin(c.pitch), -Math.cos(c.yaw) * Math.cos(c.pitch)];
    let x = Math.floor(c.x), y = Math.floor(c.y), z = Math.floor(c.z);
    const paso = dir.map((d) => (d > 0 ? 1 : -1));
    const tD = dir.map((d) => Math.abs(1 / (d || 1e-9)));
    const o = [c.x, c.y, c.z];
    const tM = dir.map((d, i) => { const b = Math.floor(o[i]); return d > 0 ? (b + 1 - o[i]) * tD[i] : (o[i] - b) * tD[i]; });
    let normal = [0, 0, 0], t = 0;
    while (t <= max) {
      const id = this.bloque(x, y, z);
      if (id && BLOQUES[id].forma !== "liquido") return { x, y, z, id, normal };
      const i = tM[0] < tM[1] ? (tM[0] < tM[2] ? 0 : 2) : (tM[1] < tM[2] ? 1 : 2);
      t = tM[i];
      tM[i] += tD[i];
      if (i === 0) x += paso[0]; else if (i === 1) y += paso[1]; else z += paso[2];
      normal = [0, 0, 0]; normal[i] = -paso[i];
    }
    return null;
  }
  apuntar() {
    this.objetivo = this.rayo();
    this.m.seleccion = this.objetivo ? [this.objetivo.x, this.objetivo.y, this.objetivo.z] : null;
  }
  quitar() {
    const o = this.objetivo;
    if (!o) return false;
    this.poner(o.x, o.y, o.z, 0);
    return true;
  }
  colocar() {
    const o = this.objetivo;
    if (!o) return false;
    const x = o.x + o.normal[0], y = o.y + o.normal[1], z = o.z + o.normal[2];
    const id = this.barra[this.ranura];
    // no encerrarse dentro de un bloque
    if (!this.atravesar && !SIN_CHOQUE.has(BLOQUES[id].forma)) {
      const p = this.pos;
      if (x + 1 > p.x - ANCHO && x < p.x + ANCHO && z + 1 > p.z - ANCHO && z < p.z + ANCHO && y + 1 > p.y && y < p.y + ALTURA) return false;
    }
    this.poner(x, y, z, id);
    return true;
  }
  copiar() {
    const o = this.objetivo;
    if (!o) return false;
    const i = this.barra.indexOf(o.id);
    if (i >= 0) this.ranura = i; else this.barra[this.ranura] = o.id;
    return true;
  }

  donde() {
    const p = this.pos;
    return { x: Math.floor(p.x), y: Math.floor(p.y), z: Math.floor(p.z), lugar: lugarCercano(p.x, p.z), rumbo: rumbo(this.yaw) };
  }
}

function rumbo(yaw) {
  const g = (((yaw * 180) / Math.PI) % 360 + 360) % 360;
  return ["N", "NE", "E", "SE", "S", "SO", "O", "NO"][Math.round(g / 45) % 8];
}

// ---------- guardado (IndexedDB) ----------
function abrir() {
  return new Promise((ok, mal) => {
    const r = indexedDB.open("giza", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("datos");
    r.onsuccess = () => ok(r.result);
    r.onerror = () => mal(r.error);
  });
}
export async function leerGuardado(clave) {
  try {
    const db = await abrir();
    return await new Promise((ok) => {
      const r = db.transaction("datos").objectStore("datos").get(clave);
      r.onsuccess = () => ok(r.result);
      r.onerror = () => ok(undefined);
    });
  } catch { return undefined; }
}
export async function escribirGuardado(clave, valor) {
  try {
    const db = await abrir();
    await new Promise((ok) => {
      const t = db.transaction("datos", "readwrite");
      t.objectStore("datos").put(valor, clave);
      t.oncomplete = ok; t.onerror = ok;
    });
  } catch { /* sin almacenamiento: los cambios duran hasta cerrar la app */ }
}
