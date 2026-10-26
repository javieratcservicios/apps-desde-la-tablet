// Worker: genera los chunks (16×16 columnas de 256 de alto) y arma su malla.
// Cada cara visible lleva oclusión ambiental por vértice y si le da el cielo (para
// oscurecer el interior de las pirámides).

import { BLOQUES } from "./bloques.js";
import { ALTO, columna } from "./mundo.js";

const N = 16, B = N + 2;                      // chunk con un borde de 1 bloque
const vox = new Uint16Array(B * B * ALTO);
const techo = new Int16Array(B * B);          // el bloque opaco más alto de cada columna
const col = new Uint16Array(ALTO);
const idx = (x, y, z) => (y * B + z) * B + x;

// Formas: caja en dieciseisavos [x0, y0, z0, x1, y1, z1], cruz o nada.
const CAJAS = {
  cubo: [0, 0, 0, 16, 16, 16], escalera: [0, 0, 0, 16, 16, 16], cactus: [1, 0, 1, 15, 16, 15], tolva: [0, 0, 0, 16, 16, 16],
  hojas: [0, 0, 0, 16, 16, 16], cristal: [0, 0, 0, 16, 16, 16], yunque: [1, 0, 3, 15, 16, 13], liquido: [0, 0, 0, 16, 14, 16],
  losa: [0, 0, 0, 16, 8, 16], capa: [0, 0, 0, 16, 2, 16], alfombra: [0, 0, 0, 16, 1, 16], placa: [1, 0, 1, 15, 1, 15],
  boton: [5, 0, 6, 11, 2, 10], camino: [0, 0, 0, 16, 15, 16], valla: [6, 0, 6, 10, 16, 10], muro: [4, 0, 4, 12, 14, 12],
  panel: [7, 0, 0, 9, 16, 16], puerta: [0, 0, 13, 16, 16, 16], trampilla: [0, 0, 0, 16, 3, 16], cama: [0, 0, 0, 16, 9, 16],
  cofre: [1, 0, 1, 15, 14, 15], farol: [5, 0, 5, 11, 9, 11], huevo: [2, 0, 2, 14, 15, 14], cartel: [0, 6, 7, 16, 14, 9],
};
const CRUZ = new Set(["cruz"]);

let caras, capaAlfa, capaTrans;
let forma, caja, lleno, opaco, pase, emisivo;
const cambios = new Map();   // columna (x*65536+z) → Map(y → id)

function preparar(datos) {
  caras = datos.caras; capaAlfa = datos.alfa; capaTrans = datos.trans;
  const n = BLOQUES.length;
  forma = new Uint8Array(n); caja = []; lleno = new Uint8Array(n); opaco = new Uint8Array(n); pase = new Uint8Array(n); emisivo = new Uint8Array(n);
  for (const b of BLOQUES) {
    const i = b.num;
    if (b.forma === "nada" || i === 0) { forma[i] = 0; caja[i] = null; continue; }
    if (CRUZ.has(b.forma)) { forma[i] = 2; caja[i] = null; }
    else { forma[i] = 1; caja[i] = CAJAS[b.forma] || CAJAS.cubo; }
    const l = caras[i * 3 + 1];
    const trans = capaTrans[l] || capaTrans[caras[i * 3]];
    const alfa = capaAlfa[l] || capaAlfa[caras[i * 3]];
    const c = caja[i];
    lleno[i] = c && c[0] === 0 && c[1] === 0 && c[2] === 0 && c[3] === 16 && c[4] === 16 && c[5] === 16 ? 1 : 0;
    opaco[i] = lleno[i] && !trans && !alfa ? 1 : 0;
    pase[i] = trans ? 1 : 0;
    emisivo[i] = b.luz > 0 ? 1 : 0;
  }
}

// ---------- salida de vértices ----------
class Malla {
  constructor() { this.pos = new Int16Array(4096 * 4); this.dat = new Uint8Array(4096 * 4); this.n = 0; }
  crecer() {
    const p = new Int16Array(this.pos.length * 2); p.set(this.pos); this.pos = p;
    const d = new Uint8Array(this.dat.length * 2); d.set(this.dat); this.dat = d;
  }
  v(x, y, z, capa, u, w, flags, normal) {
    if (this.n * 4 + 4 > this.pos.length) this.crecer();
    const o = this.n * 4;
    this.pos[o] = x; this.pos[o + 1] = y; this.pos[o + 2] = z; this.pos[o + 3] = capa;
    this.dat[o] = u; this.dat[o + 1] = w; this.dat[o + 2] = flags; this.dat[o + 3] = normal;
    this.n++;
  }
  final() { return { pos: this.pos.slice(0, this.n * 4), dat: this.dat.slice(0, this.n * 4), n: this.n }; }
}

// Ejes de cada cara: normal, eje u, eje v (con u×v = normal, para que el frente sea antihorario).
const CARAS = [
  { n: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
];
const ESQ = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

function opacoEn(x, y, z) {
  if (y < 0) return 1;
  if (y >= ALTO) return 0;
  return opaco[vox[idx(x, y, z)]];
}

// Coordenada de una esquina de la caja a lo largo de un eje (±): en dieciseisavos.
function coordTex(p, eje) {
  // p = [x, y, z] en dieciseisavos dentro del bloque; eje = vector unitario
  if (eje[0]) return eje[0] > 0 ? p[0] : 16 - p[0];
  if (eje[1]) return eje[1] > 0 ? 16 - p[1] : p[1];
  return eje[2] > 0 ? p[2] : 16 - p[2];
}

function cara(m, bx, by, bz, id, c, f, capa, aoOn, expuesto) {
  const F = CARAS[f];
  const [x0, y0, z0, x1, y1, z1] = c;
  // esquinas de la cara en dieciseisavos, en el orden u-v de ESQ
  const fijo = F.n;
  const pts = [];
  for (const [su, sv] of ESQ) {
    const p = [0, 0, 0];
    for (let k = 0; k < 3; k++) {
      if (fijo[k]) p[k] = fijo[k] > 0 ? [x1, y1, z1][k] : [x0, y0, z0][k];
      else if (F.u[k]) p[k] = (F.u[k] * su > 0) ? [x1, y1, z1][k] : [x0, y0, z0][k];
      else p[k] = (F.v[k] * sv > 0) ? [x1, y1, z1][k] : [x0, y0, z0][k];
    }
    pts.push(p);
  }
  // oclusión ambiental: vecinos del plano delante de la cara
  const ao = [3, 3, 3, 3];
  if (aoOn) {
    const fx = bx + F.n[0], fy = by + F.n[1], fz = bz + F.n[2];
    for (let k = 0; k < 4; k++) {
      const [su, sv] = ESQ[k];
      const s1 = opacoEn(fx + F.u[0] * su, fy + F.u[1] * su, fz + F.u[2] * su);
      const s2 = opacoEn(fx + F.v[0] * sv, fy + F.v[1] * sv, fz + F.v[2] * sv);
      const cc = opacoEn(fx + F.u[0] * su + F.v[0] * sv, fy + F.u[1] * su + F.v[1] * sv, fz + F.u[2] * su + F.v[2] * sv);
      ao[k] = s1 && s2 ? 0 : 3 - (s1 + s2 + cc);
    }
  }
  const flags = (expuesto ? 4 : 0) | (emisivo[id] ? 8 : 0);
  // girar la diagonal del cuadrado si así la oclusión se ve suave
  const orden = ao[0] + ao[2] < ao[1] + ao[3] ? [1, 2, 3, 0] : [0, 1, 2, 3];
  const ox = (bx - 1) * 16, oy = by * 16, oz = (bz - 1) * 16;
  for (const k of orden) {
    const p = pts[k];
    m.v(ox + p[0], oy + p[1], oz + p[2], capa, coordTex(p, F.u), coordTex(p, F.v), ao[k] | flags, f);
  }
}

function cruz(m, bx, by, bz, id, capa, expuesto) {
  const ox = (bx - 1) * 16, oy = by * 16, oz = (bz - 1) * 16;
  const flags = 3 | (expuesto ? 4 : 0) | (emisivo[id] ? 8 : 0);
  const planos = [[[1, 1], [15, 15]], [[15, 1], [1, 15]]];
  for (const [[ax, az], [bx2, bz2]] of planos) {
    const q = [[ax, 0, az, 0, 16], [bx2, 0, bz2, 16, 16], [bx2, 16, bz2, 16, 0], [ax, 16, az, 0, 0]];
    for (const lado of [q, [q[1], q[0], q[3], q[2]]]) {
      for (const [x, y, z, u, w] of lado) m.v(ox + x, oy + y, oz + z, capa, u, w, flags, 6);
    }
  }
}

function construir(cx, cz) {
  const X = cx * N - 1, Z = cz * N - 1;
  let maxY = 0;
  for (let z = 0; z < B; z++) for (let x = 0; x < B; x++) {
    columna(X + x, Z + z, col);
    const ch = cambios.get((X + x) * 65536 + (Z + z));
    if (ch) for (const [y, id] of ch) col[y] = id;
    let t = -1;
    for (let y = ALTO - 1; y >= 0; y--) {
      const id = col[y];
      vox[idx(x, y, z)] = id;
      if (t < 0 && opaco[id]) t = y;
      if (id && y > maxY && x > 0 && x <= N && z > 0 && z <= N) maxY = y;
    }
    techo[z * B + x] = t;
  }
  const solido = new Malla(), trans = new Malla();
  for (let y = 0; y <= maxY; y++) for (let z = 1; z <= N; z++) for (let x = 1; x <= N; x++) {
    const id = vox[idx(x, y, z)];
    if (!id || !forma[id]) continue;
    const m = pase[id] ? trans : solido;
    if (forma[id] === 2) {
      cruz(m, x, y, z, id, caras[id * 3 + 1], y >= techo[z * B + x]);
      continue;
    }
    let c = caja[id];
    // el agua llega hasta arriba si tiene agua encima
    if (id && c === CAJAS.liquido && y + 1 < ALTO && vox[idx(x, y + 1, z)] === id) c = CAJAS.cubo;
    for (let f = 0; f < 6; f++) {
      const F = CARAS[f].n;
      const nx = x + F[0], ny = y + F[1], nz = z + F[2];
      const enBorde = (F[0] > 0 && c[3] === 16) || (F[0] < 0 && c[0] === 0) || (F[1] > 0 && c[4] === 16) ||
        (F[1] < 0 && c[1] === 0) || (F[2] > 0 && c[5] === 16) || (F[2] < 0 && c[2] === 0);
      if (enBorde) {
        if (ny < 0) continue;
        const vec = ny >= ALTO ? 0 : vox[idx(nx, ny, nz)];
        if (opaco[vec]) continue;
        if (vec === id && (lleno[id] || pase[id])) continue;   // cristal con cristal, agua con agua, hojas con hojas
      }
      const capa = caras[id * 3 + (f === 2 ? 0 : f === 3 ? 2 : 1)];
      const expuesto = ny > techo[nz * B + nx] || ny >= ALTO;
      cara(m, x, y, z, id, c, f, capa, opaco[id] === 1, expuesto);
    }
  }
  return { solido: solido.final(), trans: trans.final(), maxY };
}

self.onmessage = (e) => {
  const d = e.data;
  if (d.tipo === "preparar") { preparar(d); return; }
  if (d.tipo === "cambios") {
    for (const [x, y, z, id] of d.lista) {
      const k = x * 65536 + z;
      let m = cambios.get(k);
      if (!m) cambios.set(k, (m = new Map()));
      m.set(y, id);
    }
    return;
  }
  if (d.tipo === "olvidar") { cambios.clear(); return; }
  if (d.tipo === "chunk") {
    const r = construir(d.cx, d.cz);
    self.postMessage({ tipo: "chunk", cx: d.cx, cz: d.cz, gen: d.gen, maxY: r.maxY, solido: r.solido, trans: r.trans },
      [r.solido.pos.buffer, r.solido.dat.buffer, r.trans.pos.buffer, r.trans.dat.buffer]);
  }
};
