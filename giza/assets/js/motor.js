// Motor gráfico WebGL2: cielo, chunks de bloques, paisaje lejano y el marco del bloque apuntado.
// Se dibuja con la cámara en el origen (posiciones relativas) para no perder precisión.

import { construirTexturas } from "./texturas.js";
import { PIRAMIDES, alturaLejana, sueloLejano } from "./mundo.js";

const CH = 16;

const VS_BLOQUES = `#version 300 es
layout(location=0) in ivec4 aPos;
layout(location=1) in uvec4 aDat;
uniform mat4 uVP;
uniform vec3 uOrigen;
out vec3 vUV;
out float vLuz;
out vec3 vRel;
out float vExp;
out float vEmi;
out float vSombra;
const float CARA[7] = float[7](0.80, 0.70, 1.0, 0.52, 0.90, 0.62, 0.92);
const float AO[4] = float[4](0.48, 0.66, 0.84, 1.0);
void main() {
  vec3 rel = uOrigen + vec3(aPos.xyz) / 16.0;
  vRel = rel;
  gl_Position = uVP * vec4(rel, 1.0);
  vUV = vec3(float(aDat.x) / 16.0, float(aDat.y) / 16.0, float(aPos.w));
  uint f = aDat.z;
  vSombra = CARA[min(aDat.w, 6u)] * AO[f & 3u];
  vExp = (f & 4u) != 0u ? 1.0 : 0.0;
  vEmi = (f & 8u) != 0u ? 1.0 : 0.0;
}`;

const FS_BLOQUES = `#version 300 es
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uTex;
uniform vec3 uNiebla;
uniform float uDensidad;
uniform float uLinterna;
uniform float uDia;
uniform int uPase;
in vec3 vUV;
in vec3 vRel;
in float vExp;
in float vEmi;
in float vSombra;
out vec4 color;
void main() {
  vec4 t = texture(uTex, vUV);
  if (uPase == 0 && t.a < 0.5) discard;
  float d = length(vRel);
  float cielo = mix(0.22, 1.0, vExp) * uDia;
  float lamp = uLinterna * clamp(1.0 - d / 18.0, 0.0, 1.0);
  float luz = max(cielo, lamp * 0.95) * vSombra;
  luz = mix(luz, 1.15, vEmi);
  vec3 c = t.rgb * luz;
  float f = 1.0 - exp(-d * d * uDensidad);
  color = vec4(mix(c, uNiebla, clamp(f, 0.0, 1.0)), uPase == 0 ? 1.0 : t.a);
}`;

const VS_LEJOS = `#version 300 es
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aCol;
uniform mat4 uVP;
uniform vec3 uCam;
out vec3 vCol;
out vec3 vRel;
out vec2 vMundo;
void main() {
  vRel = aPos - uCam;
  vMundo = aPos.xz;
  vCol = aCol;
  gl_Position = uVP * vec4(vRel, 1.0);
}`;
const FS_LEJOS = `#version 300 es
precision highp float;
uniform vec3 uNiebla;
uniform float uDensidad;
uniform float uDia;
uniform sampler2D uMascara;
in vec3 vCol;
in vec3 vRel;
in vec2 vMundo;
out vec4 color;
void main() {
  vec2 m = (floor(vMundo / 16.0) + 128.0 + 0.5) / 256.0;
  if (m.x > 0.0 && m.x < 1.0 && m.y > 0.0 && m.y < 1.0 && texture(uMascara, m).r > 0.5) discard;
  float d = length(vRel);
  float f = 1.0 - exp(-d * d * uDensidad);
  color = vec4(mix(vCol * uDia, uNiebla, clamp(f, 0.0, 1.0)), 1.0);
}`;

const VS_CIELO = `#version 300 es
out vec2 vP;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2.0 - 1.0;
  vP = p;
  gl_Position = vec4(p, 0.9999, 1.0);
}`;
const FS_CIELO = `#version 300 es
precision highp float;
uniform mat4 uInv;
uniform vec3 uSol;
uniform vec3 uZenit;
uniform vec3 uHorizonte;
in vec2 vP;
out vec4 color;
void main() {
  vec4 a = uInv * vec4(vP, 1.0, 1.0);
  vec3 dir = normalize(a.xyz / a.w);
  float h = max(dir.y, 0.0);
  vec3 c = mix(uHorizonte, uZenit, pow(h, 0.55));
  if (dir.y < 0.0) c = uHorizonte * (1.0 + dir.y * 0.25);
  float s = max(dot(dir, uSol), 0.0);
  c += vec3(1.0, 0.85, 0.6) * pow(s, 400.0) * 1.6 + vec3(1.0, 0.8, 0.5) * pow(s, 12.0) * 0.18;
  color = vec4(c, 1.0);
}`;

const VS_LINEA = `#version 300 es
layout(location=0) in vec3 aPos;
uniform mat4 uVP;
uniform vec3 uOrigen;
void main() { gl_Position = uVP * vec4(aPos + uOrigen, 1.0); }`;
const FS_LINEA = `#version 300 es
precision mediump float;
out vec4 color;
void main() { color = vec4(0.05, 0.05, 0.05, 0.85); }`;

function programa(gl, vs, fs) {
  const p = gl.createProgram();
  for (const [tipo, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
    const s = gl.createShader(tipo);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    gl.attachShader(p, s);
  }
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  const u = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) { const a = gl.getActiveUniform(p, i); u[a.name] = gl.getUniformLocation(p, a.name); }
  return { p, u };
}

// ---------- matrices (columnas, como WebGL) ----------
function perspectiva(fov, asp, cerca, lejos) {
  const f = 1 / Math.tan(fov / 2), nf = 1 / (cerca - lejos);
  return new Float32Array([f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, (lejos + cerca) * nf, -1, 0, 0, 2 * lejos * cerca * nf, 0]);
}
function multiplicar(a, b) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
}
function vista(yaw, pitch) {
  // yaw 0 = norte (-z), 90 = este (+x); pitch positivo = arriba
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const f = [sy * cp, sp, -cy * cp];                  // adelante
  const r = [cy, 0, sy];                              // derecha
  const u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
  return new Float32Array([r[0], u[0], -f[0], 0, r[1], u[1], -f[1], 0, r[2], u[2], -f[2], 0, 0, 0, 0, 1]);
}
function invertir(m) {
  const inv = new Float32Array(16);
  const a = m;
  inv[0] = a[5] * a[10] * a[15] - a[5] * a[11] * a[14] - a[9] * a[6] * a[15] + a[9] * a[7] * a[14] + a[13] * a[6] * a[11] - a[13] * a[7] * a[10];
  inv[4] = -a[4] * a[10] * a[15] + a[4] * a[11] * a[14] + a[8] * a[6] * a[15] - a[8] * a[7] * a[14] - a[12] * a[6] * a[11] + a[12] * a[7] * a[10];
  inv[8] = a[4] * a[9] * a[15] - a[4] * a[11] * a[13] - a[8] * a[5] * a[15] + a[8] * a[7] * a[13] + a[12] * a[5] * a[11] - a[12] * a[7] * a[9];
  inv[12] = -a[4] * a[9] * a[14] + a[4] * a[10] * a[13] + a[8] * a[5] * a[14] - a[8] * a[6] * a[13] - a[12] * a[5] * a[10] + a[12] * a[6] * a[9];
  inv[1] = -a[1] * a[10] * a[15] + a[1] * a[11] * a[14] + a[9] * a[2] * a[15] - a[9] * a[3] * a[14] - a[13] * a[2] * a[11] + a[13] * a[3] * a[10];
  inv[5] = a[0] * a[10] * a[15] - a[0] * a[11] * a[14] - a[8] * a[2] * a[15] + a[8] * a[3] * a[14] + a[12] * a[2] * a[11] - a[12] * a[3] * a[10];
  inv[9] = -a[0] * a[9] * a[15] + a[0] * a[11] * a[13] + a[8] * a[1] * a[15] - a[8] * a[3] * a[13] - a[12] * a[1] * a[11] + a[12] * a[3] * a[9];
  inv[13] = a[0] * a[9] * a[14] - a[0] * a[10] * a[13] - a[8] * a[1] * a[14] + a[8] * a[2] * a[13] + a[12] * a[1] * a[10] - a[12] * a[2] * a[9];
  inv[2] = a[1] * a[6] * a[15] - a[1] * a[7] * a[14] - a[5] * a[2] * a[15] + a[5] * a[3] * a[14] + a[13] * a[2] * a[7] - a[13] * a[3] * a[6];
  inv[6] = -a[0] * a[6] * a[15] + a[0] * a[7] * a[14] + a[4] * a[2] * a[15] - a[4] * a[3] * a[14] - a[12] * a[2] * a[7] + a[12] * a[3] * a[6];
  inv[10] = a[0] * a[5] * a[15] - a[0] * a[7] * a[13] - a[4] * a[1] * a[15] + a[4] * a[3] * a[13] + a[12] * a[1] * a[7] - a[12] * a[3] * a[5];
  inv[14] = -a[0] * a[5] * a[14] + a[0] * a[6] * a[13] + a[4] * a[1] * a[14] - a[4] * a[2] * a[13] - a[12] * a[1] * a[6] + a[12] * a[2] * a[5];
  inv[3] = -a[1] * a[6] * a[11] + a[1] * a[7] * a[10] + a[5] * a[2] * a[11] - a[5] * a[3] * a[10] - a[9] * a[2] * a[7] + a[9] * a[3] * a[6];
  inv[7] = a[0] * a[6] * a[11] - a[0] * a[7] * a[10] - a[4] * a[2] * a[11] + a[4] * a[3] * a[10] + a[8] * a[2] * a[7] - a[8] * a[3] * a[6];
  inv[11] = -a[0] * a[5] * a[11] + a[0] * a[7] * a[9] + a[4] * a[1] * a[11] - a[4] * a[3] * a[9] - a[8] * a[1] * a[7] + a[8] * a[3] * a[5];
  inv[15] = a[0] * a[5] * a[10] - a[0] * a[6] * a[9] - a[4] * a[1] * a[10] + a[4] * a[2] * a[9] + a[8] * a[1] * a[6] - a[8] * a[2] * a[5];
  let det = a[0] * inv[0] + a[1] * inv[4] + a[2] * inv[8] + a[3] * inv[12];
  det = 1 / det;
  for (let i = 0; i < 16; i++) inv[i] *= det;
  return inv;
}

export class Motor {
  constructor(canvas, alAvance, tex) {
    const gl = canvas.getContext("webgl2", { antialias: false, powerPreference: "high-performance" });
    if (!gl) throw new Error("Este dispositivo no tiene WebGL2.");
    this.gl = gl;
    this.canvas = canvas;
    this.alAvance = alAvance || (() => {});
    this.radio = 12;
    this.cam = { x: 0, y: 100, z: 0, yaw: 0, pitch: 0 };
    this.fov = 72;
    this.linterna = 0;
    this.dia = 1;
    this.chunks = new Map();
    this.pedidos = new Map();
    this.gen = 0;
    this.seleccion = null;

    this.texturas = tex || construirTexturas();
    this.pBloques = programa(gl, VS_BLOQUES, FS_BLOQUES);
    this.pLejos = programa(gl, VS_LEJOS, FS_LEJOS);
    this.pCielo = programa(gl, VS_CIELO, FS_CIELO);
    this.pLinea = programa(gl, VS_LINEA, FS_LINEA);
    this.subirTexturas();
    this.indices(65536);
    this.mascara = new Uint8Array(256 * 256);
    this.texMascara = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texMascara);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 256, 256, 0, gl.RED, gl.UNSIGNED_BYTE, this.mascara);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    this.mascaraSucia = false;
    this.construirLejos();
    this.construirMarco();
    this.vaoVacio = gl.createVertexArray();

    // trabajadores
    const n = Math.max(2, Math.min(6, (navigator.hardwareConcurrency || 4) - 2));
    this.trabajadores = [];
    const alfa = this.texturas.capas.map((c) => (c.alfa ? 1 : 0));
    const trans = this.texturas.capas.map((c) => (c.translucido ? 1 : 0));
    for (let i = 0; i < n; i++) {
      const w = new Worker(new URL("./trabajador.js", import.meta.url), { type: "module" });
      w.carga = 0;
      w.onmessage = (e) => this.recibir(e.data, w);
      w.onerror = (e) => console.error("worker", e.message);
      w.postMessage({ tipo: "preparar", caras: this.texturas.caras, alfa, trans });
      this.trabajadores.push(w);
    }
  }

  subirTexturas() {
    const gl = this.gl, capas = this.texturas.capas;
    this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.tex);
    gl.texStorage3D(gl.TEXTURE_2D_ARRAY, 5, gl.RGBA8, 16, 16, capas.length);
    const todo = new Uint8Array(16 * 16 * 4 * capas.length);
    capas.forEach((c, i) => todo.set(c.px, i * 1024));
    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, 0, 16, 16, capas.length, gl.RGBA, gl.UNSIGNED_BYTE, todo);
    gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  indices(cuadros) {
    const gl = this.gl;
    const a = new Uint32Array(cuadros * 6);
    for (let i = 0; i < cuadros; i++) {
      const v = i * 4, o = i * 6;
      a[o] = v; a[o + 1] = v + 1; a[o + 2] = v + 2; a[o + 3] = v; a[o + 4] = v + 2; a[o + 5] = v + 3;
    }
    if (!this.ibo) this.ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, a, gl.STATIC_DRAW);
    this.maxCuadros = cuadros;
    for (const c of this.chunks.values()) for (const m of [c.solido, c.trans]) if (m) { gl.bindVertexArray(m.vao); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo); }
    gl.bindVertexArray(null);
  }

  // Paisaje lejano: malla de alturas cada 16 bloques y las pirámides como pirámides lisas.
  construirLejos() {
    const gl = this.gl, P = 16, R = 2048, n = (2 * R) / P + 1;
    const pos = [], colr = [], ind = [];
    const COL = { arena: [0.86, 0.79, 0.6], valle: [0.42, 0.6, 0.28], campo: [0.62, 0.62, 0.3], agua: [0.25, 0.42, 0.75], piramide: [0.8, 0.72, 0.54] };
    const alt = new Float32Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) alt[j * n + i] = alturaLejana(-R + i * P, -R + j * P);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const x = -R + i * P, z = -R + j * P;
      const h = alt[j * n + i];
      const hx = alt[j * n + Math.min(n - 1, i + 1)] - alt[j * n + Math.max(0, i - 1)];
      const hz = alt[Math.min(n - 1, j + 1) * n + i] - alt[Math.max(0, j - 1) * n + i];
      const nl = Math.hypot(hx, 2 * P, hz);
      const luz = 0.55 + 0.45 * Math.max(0, (-hx * -0.4 + 2 * P * 0.8 + -hz * 0.45) / nl);
      const c = COL[sueloLejano(x, z)];
      pos.push(x, h + 1, z);
      colr.push(c[0] * luz, c[1] * luz, c[2] * luz);
    }
    for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) {
      const a = j * n + i;
      ind.push(a, a + n, a + 1, a + 1, a + n, a + n + 1);
    }
    // pirámides exactas encima
    for (const p of PIRAMIDES) {
      if (p.escalones) continue;
      const base = pos.length / 3;
      const top = p.base + p.actual, m = p.media, t = m * (1 - p.actual / p.alto);
      const esquinas = [[-m, -m], [m, -m], [m, m], [-m, m]];
      const arriba = [[-t, -t], [t, -t], [t, t], [-t, t]];
      const luces = [0.62, 0.8, 0.9, 0.72];   // norte, este, sur, oeste
      for (let k = 0; k < 4; k++) {
        const a = esquinas[k], b = esquinas[(k + 1) % 4], c = arriba[(k + 1) % 4], d = arriba[k];
        const l = luces[k] * 0.95;
        const v0 = pos.length / 3;
        pos.push(p.cx + a[0], p.base, p.cz + a[1], p.cx + b[0], p.base, p.cz + b[1], p.cx + c[0], top, p.cz + c[1], p.cx + d[0], top, p.cz + d[1]);
        for (let q = 0; q < 4; q++) colr.push(0.82 * l, 0.73 * l, 0.55 * l);
        ind.push(v0, v0 + 2, v0 + 1, v0, v0 + 3, v0 + 2);
      }
      const v0 = pos.length / 3;
      pos.push(p.cx - t, top, p.cz - t, p.cx + t, top, p.cz - t, p.cx + t, top, p.cz + t, p.cx - t, top, p.cz + t);
      for (let q = 0; q < 4; q++) colr.push(0.8, 0.72, 0.55);
      ind.push(v0, v0 + 2, v0 + 1, v0, v0 + 3, v0 + 2);
      void base;
    }
    this.lejos = { vao: gl.createVertexArray(), n: ind.length };
    gl.bindVertexArray(this.lejos.vao);
    const b1 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b1); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    const b2 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b2); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colr), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    const b3 = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b3); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(ind), gl.STATIC_DRAW);
    gl.bindVertexArray(null);
  }

  construirMarco() {
    const gl = this.gl, e = 0.004, a = -e, b = 1 + e;
    const v = [];
    const p = [[a, a, a], [b, a, a], [b, a, b], [a, a, b], [a, b, a], [b, b, a], [b, b, b], [a, b, b]];
    for (const [i, j] of [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) v.push(...p[i], ...p[j]);
    this.marco = gl.createVertexArray();
    gl.bindVertexArray(this.marco);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
  }

  // ---------- chunks ----------
  recibir(d, w) {
    w.carga--;
    const k = d.cx + "," + d.cz;
    const ped = this.pedidos.get(k);
    if (ped && ped.gen === d.gen) this.pedidos.delete(k);
    const lejos = Math.hypot(d.cx + 0.5 - this.cam.x / CH, d.cz + 0.5 - this.cam.z / CH) > this.radio + 2.5;
    if (lejos) { this.alAvance(); return; }
    const viejo = this.chunks.get(k);
    if (viejo && viejo.gen > d.gen) return;
    if (viejo) this.borrarMalla(viejo);
    const c = { cx: d.cx, cz: d.cz, gen: d.gen, maxY: d.maxY, solido: this.subirMalla(d.solido), trans: this.subirMalla(d.trans) };
    this.chunks.set(k, c);
    this.marcarMascara(d.cx, d.cz, 1);
    this.alAvance();
  }

  subirMalla(m) {
    if (!m.n) return null;
    const gl = this.gl;
    if (m.n / 4 > this.maxCuadros) this.indices(Math.ceil(m.n / 4 / 65536) * 65536);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const b1 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b1); gl.bufferData(gl.ARRAY_BUFFER, m.pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribIPointer(0, 4, gl.SHORT, 0, 0);
    const b2 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b2); gl.bufferData(gl.ARRAY_BUFFER, m.dat, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1); gl.vertexAttribIPointer(1, 4, gl.UNSIGNED_BYTE, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
    gl.bindVertexArray(null);
    return { vao, b1, b2, n: (m.n / 4) * 6 };
  }
  borrarMalla(c) {
    const gl = this.gl;
    for (const m of [c.solido, c.trans]) if (m) { gl.deleteVertexArray(m.vao); gl.deleteBuffer(m.b1); gl.deleteBuffer(m.b2); }
  }
  marcarMascara(cx, cz, v) {
    const i = cx + 128, j = cz + 128;
    if (i < 0 || j < 0 || i > 255 || j > 255) return;
    this.mascara[j * 256 + i] = v ? 255 : 0;
    this.mascaraSucia = true;
  }

  pedir(cx, cz, urgente = false) {
    const k = cx + "," + cz;
    const gen = ++this.gen;
    const w = this.trabajadores.reduce((a, b) => (b.carga < a.carga ? b : a));
    w.carga++;
    this.pedidos.set(k, { gen, t: performance.now() });
    w.postMessage({ tipo: "chunk", cx, cz, gen });
    void urgente;
  }

  // Pide los chunks que faltan alrededor de la cámara, los más cercanos (y de enfrente) primero.
  actualizarChunks() {
    const ccx = Math.floor(this.cam.x / CH), ccz = Math.floor(this.cam.z / CH), R = this.radio;
    // soltar los lejanos
    for (const [k, c] of this.chunks) {
      if (Math.hypot(c.cx + 0.5 - this.cam.x / CH, c.cz + 0.5 - this.cam.z / CH) > R + 2.5) {
        this.borrarMalla(c); this.chunks.delete(k); this.marcarMascara(c.cx, c.cz, 0);
      }
    }
    const libres = this.trabajadores.reduce((s, w) => s + Math.max(0, 3 - w.carga), 0);
    if (!libres) return;
    const fx = Math.sin(this.cam.yaw), fz = -Math.cos(this.cam.yaw);
    const faltan = [];
    for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const d = Math.hypot(dx, dz);
      if (d > R) continue;
      const k = ccx + dx + "," + (ccz + dz);
      if (this.chunks.has(k) || this.pedidos.has(k)) continue;
      const frente = d < 2 ? 1 : (dx * fx + dz * fz) / d;
      faltan.push([d - frente * Math.min(4, d * 0.4), ccx + dx, ccz + dz]);
    }
    faltan.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < Math.min(libres, faltan.length); i++) this.pedir(faltan[i][1], faltan[i][2]);
    this.faltantes = faltan.length;
  }

  // Después de cambiar un bloque: rehacer su chunk (y el vecino si está en el borde).
  rehacer(x, z) {
    const cx = Math.floor(x / CH), cz = Math.floor(z / CH), lx = x - cx * CH, lz = z - cz * CH;
    const lista = [[cx, cz]];
    if (lx === 0) lista.push([cx - 1, cz]); if (lx === 15) lista.push([cx + 1, cz]);
    if (lz === 0) lista.push([cx, cz - 1]); if (lz === 15) lista.push([cx, cz + 1]);
    for (const [a, b] of lista) if (this.chunks.has(a + "," + b)) this.pedir(a, b, true);
  }

  enviarCambios(lista) { for (const w of this.trabajadores) w.postMessage({ tipo: "cambios", lista }); }
  olvidarCambios() {
    for (const w of this.trabajadores) w.postMessage({ tipo: "olvidar" });
    for (const c of this.chunks.values()) this.borrarMalla(c);
    this.chunks.clear(); this.pedidos.clear();
    this.mascara.fill(0); this.mascaraSucia = true;
  }
  recargarTodo() {
    for (const c of this.chunks.values()) this.borrarMalla(c);
    this.chunks.clear(); this.pedidos.clear();
    for (const w of this.trabajadores) w.carga = 0;
    this.mascara.fill(0); this.mascaraSucia = true;
  }

  // ---------- dibujo ----------
  dibujar() {
    const gl = this.gl, cv = this.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, this.calidad || 1.5);
    const w = Math.floor(cv.clientWidth * dpr), h = Math.floor(cv.clientHeight * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h);
    const c = this.cam;
    const proj = perspectiva((this.fov * Math.PI) / 180, w / h, 0.08, 6000);
    const vp = multiplicar(proj, vista(c.yaw, c.pitch));
    const dia = this.dia;
    const horizonte = [0.86 * dia + 0.05, 0.84 * dia + 0.05, 0.78 * dia + 0.08];
    const zenit = [0.32 * dia + 0.02, 0.55 * dia + 0.03, 0.9 * dia + 0.08];
    const niebla = horizonte;
    const radioB = this.radio * CH;
    // los chunks se desvanecen en la niebla y lo lejano sigue nítido hasta ~3 km
    const densidad = 1 / Math.pow(Math.max(radioB * 6, 2600), 2);

    gl.clearColor(...niebla, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // cielo
    gl.disable(gl.CULL_FACE);
    gl.depthMask(false);
    gl.useProgram(this.pCielo.p);
    gl.uniformMatrix4fv(this.pCielo.u.uInv, false, invertir(vp));
    const sol = [-0.45, 0.62, 0.64], ls = Math.hypot(...sol);
    gl.uniform3f(this.pCielo.u.uSol, sol[0] / ls, sol[1] / ls, sol[2] / ls);
    gl.uniform3fv(this.pCielo.u.uZenit, zenit);
    gl.uniform3fv(this.pCielo.u.uHorizonte, horizonte);
    gl.bindVertexArray(this.vaoVacio);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.depthMask(true);

    // chunks
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.useProgram(this.pBloques.p);
    const u = this.pBloques.u;
    gl.uniformMatrix4fv(u.uVP, false, vp);
    gl.uniform3fv(u.uNiebla, niebla);
    gl.uniform1f(u.uDensidad, densidad);
    gl.uniform1f(u.uLinterna, this.linterna);
    gl.uniform1f(u.uDia, dia);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.tex);
    gl.uniform1i(u.uTex, 0);
    gl.uniform1i(u.uPase, 0);
    const visibles = [];
    const planos = this.planos(vp);
    let caras = 0;
    for (const ch of this.chunks.values()) {
      const x0 = ch.cx * CH - c.x, z0 = ch.cz * CH - c.z;
      if (!this.enVista(planos, x0, -c.y, z0, x0 + CH, ch.maxY + 1 - c.y, z0 + CH)) continue;
      visibles.push(ch);
      if (!ch.solido) continue;
      gl.uniform3f(u.uOrigen, x0, -c.y, z0);
      gl.bindVertexArray(ch.solido.vao);
      gl.drawElements(gl.TRIANGLES, ch.solido.n, gl.UNSIGNED_INT, 0);
      caras += ch.solido.n / 6;
    }
    this.carasVisibles = caras;

    // paisaje lejano (donde todavía no hay chunk)
    if (this.mascaraSucia) {
      gl.bindTexture(gl.TEXTURE_2D, this.texMascara);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 256, 256, gl.RED, gl.UNSIGNED_BYTE, this.mascara);
      this.mascaraSucia = false;
    }
    gl.useProgram(this.pLejos.p);
    gl.uniformMatrix4fv(this.pLejos.u.uVP, false, vp);
    gl.uniform3f(this.pLejos.u.uCam, c.x, c.y, c.z);
    gl.uniform3fv(this.pLejos.u.uNiebla, niebla);
    gl.uniform1f(this.pLejos.u.uDensidad, densidad);
    gl.uniform1f(this.pLejos.u.uDia, dia);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.texMascara);
    gl.uniform1i(this.pLejos.u.uMascara, 1);
    gl.bindVertexArray(this.lejos.vao);
    gl.drawElements(gl.TRIANGLES, this.lejos.n, gl.UNSIGNED_INT, 0);
    gl.activeTexture(gl.TEXTURE0);

    // marco del bloque apuntado
    if (this.seleccion) {
      gl.useProgram(this.pLinea.p);
      gl.uniformMatrix4fv(this.pLinea.u.uVP, false, vp);
      const s = this.seleccion;
      gl.uniform3f(this.pLinea.u.uOrigen, s[0] - c.x, s[1] - c.y, s[2] - c.z);
      gl.bindVertexArray(this.marco);
      gl.drawArrays(gl.LINES, 0, 24);
    }

    // transparentes: agua y cristal tintado, de lejos a cerca
    gl.useProgram(this.pBloques.p);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
    gl.disable(gl.CULL_FACE);
    gl.uniform1i(u.uPase, 1);
    visibles.sort((a, b) => Math.hypot(b.cx * CH + 8 - c.x, b.cz * CH + 8 - c.z) - Math.hypot(a.cx * CH + 8 - c.x, a.cz * CH + 8 - c.z));
    for (const ch of visibles) {
      if (!ch.trans) continue;
      gl.uniform3f(u.uOrigen, ch.cx * CH - c.x, -c.y, ch.cz * CH - c.z);
      gl.bindVertexArray(ch.trans.vao);
      gl.drawElements(gl.TRIANGLES, ch.trans.n, gl.UNSIGNED_INT, 0);
    }
    gl.depthMask(true);
    gl.disable(gl.BLEND);
    gl.bindVertexArray(null);
  }

  planos(m) {
    const p = [];
    const fila = (r) => [m[r], m[4 + r], m[8 + r], m[12 + r]];
    const r0 = fila(0), r1 = fila(1), r2 = fila(2), r3 = fila(3);
    for (const [a, s] of [[r0, 1], [r0, -1], [r1, 1], [r1, -1], [r2, 1]]) p.push([r3[0] + s * a[0], r3[1] + s * a[1], r3[2] + s * a[2], r3[3] + s * a[3]]);
    return p;
  }
  enVista(planos, x0, y0, z0, x1, y1, z1) {
    for (const [a, b, c, d] of planos) {
      const x = a > 0 ? x1 : x0, y = b > 0 ? y1 : y0, z = c > 0 ? z1 : z0;
      if (a * x + b * y + c * z + d < 0) return false;
    }
    return true;
  }
}
