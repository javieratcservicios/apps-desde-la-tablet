// Generador del mapa de Giza a escala 1:1 (1 bloque = 1 metro).
// Ejes: x crece al este, z crece al sur, y hacia arriba. La Gran Pirámide está en (0, 0).
// Todo es una función determinista de (x, z): cada columna se genera sola, sin guardar el
// mundo entero; lo que el jugador cambia se guarda aparte como «cambios».
//
// Medidas y posiciones a partir de los datos publicados de la meseta (bases, alturas,
// pasadizos y cámaras), redondeadas a bloques. Altitudes relativas: la base de Keops en
// y=60, Kefrén 10 m más alta, la Esfinge y el valle a nivel 16–17, el Nilo a 15.

import { num } from "./bloques.js";

export const ALTO = 256;

const A = {
  aire: num("air"), arena: num("sand"), arenisca: num("sandstone"), areniscaLisa: num("smooth_sandstone"),
  areniscaCortada: num("cut_sandstone"), areniscaCincelada: num("chiseled_sandstone"),
  caliza: num("giza_limestone"), calizaGastada: num("giza_limestone_dark"), tura: num("giza_casing"),
  granito: num("giza_granite"), granitoPulido: num("polished_granite"), basalto: num("polished_basalt"),
  agua: num("water"), hierba: num("grass_block"), tierra: num("dirt"), cultivo: num("farmland"), trigo: num("wheat"),
  tronco: num("jungle_log"), hojas: num("jungle_leaves"), pasto: num("short_grass"), arbusto: num("dead_bush"),
  cana: num("sugar_cane"), adobe: num("mud_bricks"), barro: num("packed_mud"), lecho: num("bedrock"),
  grava: num("gravel"), camino: num("dirt_path"), terracota: num("brown_terracotta"), piedra: num("stone"),
  arenaRoja: num("red_sand"), farol: num("lantern"), antorcha: num("torch"),
};
export const MATERIALES = A;

// ---------------------------------------------------------------- ruido
function h2(x, z, s = 0) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263) ^ Math.imul(s, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function h3(x, y, z) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 2246822519) ^ Math.imul(z | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function ruido(x, z, s) {
  const x0 = Math.floor(x), z0 = Math.floor(z), tx = x - x0, tz = z - z0;
  const sx = tx * tx * (3 - 2 * tx), sz = tz * tz * (3 - 2 * tz);
  const a = h2(x0, z0, s), b = h2(x0 + 1, z0, s), c = h2(x0, z0 + 1, s), d = h2(x0 + 1, z0 + 1, s);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}
function fbm(x, z, s, oct = 4) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += ruido(x * f, z * f, s + i * 17) * a; a *= 0.5; f *= 2; }
  return v / (1 - Math.pow(0.5, oct));
}
const suave = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const mezclar = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------- monumentos
// Pirámides: centro, media base, altura original, altura actual, cota de la base.
export const PIRAMIDES = [
  { id: "keops", nombre: "Gran Pirámide de Keops", cx: 0, cz: 0, media: 115, alto: 146, actual: 139, base: 60, erosion: 1.2 },
  { id: "kefren", nombre: "Pirámide de Kefrén", cx: -328, cz: 344, media: 107, alto: 143, actual: 136, base: 70, erosion: 1, tura: 104 },
  { id: "micerinos", nombre: "Pirámide de Micerinos", cx: -589, cz: 743, media: 52, alto: 65, actual: 61, base: 65, erosion: 1.3, granito: 16 },
  { id: "g1a", nombre: "Pirámide de la reina Hetepheres (G1-a)", cx: 180, cz: -60, media: 24, alto: 30, actual: 22, base: 60, erosion: 2.5 },
  { id: "g1b", nombre: "Pirámide de la reina Meritites (G1-b)", cx: 180, cz: -5, media: 24, alto: 30, actual: 21, base: 60, erosion: 2.5 },
  { id: "g1c", nombre: "Pirámide de la reina Henutsen (G1-c)", cx: 180, cz: 48, media: 23, alto: 29, actual: 25, base: 60, erosion: 2 },
  { id: "g3a", nombre: "Pirámide de reina G3-a", cx: -530, cz: 832, media: 22, alto: 28, actual: 24, base: 65, erosion: 1.6 },
  { id: "g3b", nombre: "Pirámide de reina G3-b", cx: -589, cz: 832, media: 16, alto: 20, actual: 18, base: 65, erosion: 1.5, escalones: 4 },
  { id: "g3c", nombre: "Pirámide de reina G3-c", cx: -648, cz: 832, media: 16, alto: 20, actual: 18, base: 65, erosion: 1.5, escalones: 4 },
];
export const ESFINGE = { cx: 310, cz: 420, suelo: 17 };

// Lugares a los que se puede saltar: dónde pararse (los pies), a qué punto mirar y qué es.
export const LUGARES = [
  { id: "panorama", nombre: "Vista panorámica", x: 640, y: 150, z: 760, mira: [-250, 90, 300], nota: "Las tres pirámides desde el valle, al sureste." },
  { id: "esfinge", nombre: "La Gran Esfinge", x: 388, y: 32, z: 420.5, mira: [330, 30, 420.5], nota: "73 m de largo y 20 de alto, tallada en la roca de la meseta mirando al este." },
  { id: "estela", nombre: "Estela del Sueño", x: 352, y: 19, z: 420.5, mira: [335, 33, 420.5], nota: "Entre las patas de la Esfinge; la puso Tutmosis IV hacia 1400 a. C." },
  { id: "entrada", nombre: "Entrada de Keops (cara norte)", x: 7.5, y: 80, z: -120, mira: [7.5, 76, -100], nota: "La entrada original, a 17 m de altura, y debajo el túnel de Al-Mamún por donde se entra hoy." },
  { id: "galeria", nombre: "Gran Galería", x: 7.5, y: 83.7, z: -38.5, mira: [7.5, 101, -2], nota: "47 m de largo y 8.6 m de alto, con techo en saledizo." },
  { id: "rey", nombre: "Cámara del Rey", x: 5.5, y: 102, z: 11.5, mira: [-3, 102.6, 11.5], nota: "Toda de granito de Asuán, con el sarcófago vacío al oeste." },
  { id: "reina", nombre: "Cámara de la Reina", x: 7.5, y: 81, z: -0.5, mira: [2, 83, -0.5], nota: "Techo a dos aguas y un nicho en la pared este." },
  { id: "descarga", nombre: "Cámaras de descarga", x: 3, y: 109.3, z: 11.5, mira: [-3, 109.3, 11.5], nota: "Cinco huecos sobre la Cámara del Rey que reparten el peso. Activa «Atravesar paredes» para recorrerlas." },
  { id: "subterranea", nombre: "Cámara subterránea", x: 6, y: 28.5, z: 0.5, mira: [-6, 29, 0.5], nota: "Excavada en la roca 30 m bajo la base, sin terminar." },
  { id: "cima", nombre: "Cima de Keops", x: 4, y: 204, z: 4, mira: [-250, 70, 330], nota: "Hoy mide 139 m: perdió la punta y el revestimiento." },
  { id: "kefren", nombre: "Cima de Kefrén", x: -316, y: 214, z: 332, mira: [0, 70, 0], nota: "Conserva el revestimiento de Tura en la punta." },
  { id: "camara_kefren", nombre: "Cámara de Kefrén", x: -316.5, y: 70, z: 341.5, mira: [-330, 71.6, 341.5], nota: "Tallada en la roca, con techo a dos aguas y el sarcófago de granito." },
  { id: "micerinos", nombre: "Micerinos y sus reinas", x: -470, y: 112, z: 625, mira: [-589, 80, 770], nota: "La más pequeña de las tres, con la base forrada de granito rosa y la brecha de Saladino." },
  { id: "reinas", nombre: "Pirámides de las reinas de Keops", x: 275, y: 82, z: -5, mira: [180, 70, -5], nota: "Tres pirámides para las esposas del faraón, al este de la Gran Pirámide." },
  { id: "valle", nombre: "Templo del Valle de Kefrén", x: 320.5, y: 20, z: 525, mira: [320, 24, 470], nota: "De granito; aquí empezaba la calzada hacia la pirámide." },
  { id: "mastabas", nombre: "Cementerio occidental", x: -280, y: 100, z: -60, mira: [-280, 60, 10], nota: "Calles de mastabas, las tumbas de los nobles." },
  { id: "cuervo", nombre: "Muro del Cuervo y aldea obrera", x: 300, y: 52, z: 775, mira: [300, 18, 900], nota: "Donde vivían los constructores." },
  { id: "nilo", nombre: "El Nilo", x: 1060, y: 40, z: 300, mira: [1180, 16, 300], nota: "Campos, canales y palmeras en la orilla del río." },
];

// ---------------------------------------------------------------- terreno
// Borde oriental de la meseta: más al oeste conforme se va al sur.
function bordeMeseta(z) {
  if (z <= 0) return 420;
  if (z <= 500) return 420 - 0.378 * z;
  return 231 - 0.9 * (z - 500);
}

function centroNilo(z) { return 1180 + 60 * Math.sin(z / 400) + 25 * Math.sin(z / 137); }
function centroCanal(z) { return 640 + 18 * Math.sin(z / 210); }

// Altura natural del suelo (sin nivelar para los monumentos).
function sueloNatural(x, z) {
  const borde = bordeMeseta(z) + (fbm(x / 60, z / 60, 3, 3) - 0.5) * 30;
  let meseta = 58 + fbm(x / 420, z / 420, 1, 3) * 10 + fbm(x / 70, z / 70, 2, 3) * 3;
  // desierto profundo: dunas al oeste y al sur, lejos de los monumentos
  const lejos = Math.hypot(x + 260, (z - 380) * 0.9);
  const wd = suave(620, 1050, lejos);
  if (wd > 0) {
    const d = fbm(x / 90, z / 140, 9, 3);
    const cresta = 1 - Math.abs(Math.sin((x * 0.7 + z * 0.35) / 38 + d * 6));
    meseta += wd * (cresta * 9 + d * 8);
  }
  const valle = 16 + (fbm(x / 120, z / 120, 4, 2) > 0.72 ? 1 : 0);
  const t = suave(borde, borde + 60, x);
  return mezclar(meseta, valle, t);
}

const PLATAFORMAS = PIRAMIDES.map((p) => ({ cx: p.cx, cz: p.cz, media: p.media + (p.media > 60 ? 22 : 8), alto: p.base - 1, banda: p.media > 60 ? 45 : 20 }));

// Altura del suelo: la cota del último bloque sólido.
export function alturaSuelo(x, z) {
  let h = sueloNatural(x, z);
  // explanadas niveladas alrededor de cada pirámide
  for (const p of PLATAFORMAS) {
    const d = Math.max(Math.abs(x - p.cx), Math.abs(z - p.cz)) - p.media;
    if (d < p.banda) h = mezclar(p.alto, h, suave(0, p.banda, d));
  }
  // la Esfinge: un foso tallado en un afloramiento de roca
  const u = x - ESFINGE.cx, v = z - ESFINGE.cz;
  if (Math.abs(u) < 75 && Math.abs(v) < 52) {
    const fuera = Math.max(Math.abs(u + 4) - 48, Math.abs(v) - 25);
    if (fuera <= 0) h = ESFINGE.suelo - 1;
    else if (u < 46) h = Math.max(h, mezclar(29, h, suave(0, 22, fuera)));
  }
  // el Nilo y el canal
  const dn = Math.abs(x - centroNilo(z));
  if (dn < 80) h = Math.min(h, mezclar(8, 16, suave(55, 80, dn)));
  const dc = Math.abs(x - centroCanal(z));
  if (dc < 2.5) h = Math.min(h, 13);
  return Math.floor(h);
}

// ---------------------------------------------------------------- estructuras
// Cada estructura sabe si toca una columna (caja en x/z) y qué hacer con ella.
const ESTRUCTURAS = [];
const E = (x0, z0, x1, z1, aplicar) => ESTRUCTURAS.push({ x0, z0, x1, z1, aplicar });

// Material del núcleo de las pirámides: sillares de caliza variados.
function nucleo(x, y, z) {
  const r = h3(x, y, z);
  return r < 0.72 ? A.caliza : r < 0.92 ? A.calizaGastada : A.arenisca;
}

for (const p of PIRAMIDES) {
  const pend = p.alto / p.media;
  E(p.cx - p.media, p.cz - p.media, p.cx + p.media, p.cz + p.media, (x, z, col) => {
    const dx = x - p.cx, dz = z - p.cz;
    const d = Math.max(Math.abs(dx), Math.abs(dz));
    if (d > p.media) return;
    let alto;
    if (p.escalones) {
      const tramo = p.alto / p.escalones;
      alto = 0;
      for (let k = 0; k < p.escalones; k++) if (d <= p.media * (1 - k * 0.2)) alto = (k + 1) * tramo;
    } else alto = (p.media - d + 0.5) * pend;
    // erosión: aristas y bordes más gastados, escalones irregulares
    const arista = 1 - Math.min(1, Math.abs(Math.abs(dx) - Math.abs(dz)) / 6);
    alto -= (fbm(x / 7, z / 7, 11, 2) * 1.6 + arista * 2.2 * fbm(x / 3, z / 3, 12, 2)) * p.erosion;
    if (p.id === "micerinos" && dz < -30 && dx > -6 && dx < 4) alto -= 5;   // brecha de Saladino
    alto = Math.min(alto, p.actual);
    if (alto < 0) return;
    const top = p.base + Math.floor(alto);
    for (let y = p.base; y <= top && y < ALTO; y++) col[y] = nucleo(x, y, z);
    // revestimiento que queda: la punta de Kefrén y la base de granito de Micerinos
    if (p.tura && top - p.base >= p.tura) for (let y = p.base + p.tura; y <= top; y++) col[y] = A.tura;
    if (p.granito) {
      const parche = fbm(x / 9, z / 9, 21, 2) > 0.45 || dz < -40;
      if (parche) for (let y = p.base; y <= Math.min(top, p.base + p.granito); y++) if (y >= top - 1) col[y] = A.granito;
    }
  });
}

// --- pasadizos y cámaras (se tallan después de construir) ---
const TALLAS = [];
const tallaCaja = (x0, x1, y0, y1, z0, z1, extra = {}) => TALLAS.push({ tipo: "caja", x0, x1, y0, y1, z0, z1, ...extra });
// pasadizo inclinado a lo largo de z: el piso sube/baja `pendiente` por bloque
const tallaRampa = (x0, x1, za, zb, ya, pendiente, alto) => TALLAS.push({ tipo: "rampa", x0, x1, z0: Math.min(za, zb), z1: Math.max(za, zb), za, ya, pendiente, alto });

// Gran Pirámide (Keops)
tallaRampa(7, 8, -102, -8, 77, -0.5, 3);           // pasadizo descendente (26°)
tallaCaja(7, 8, 30, 31, -8, -4);                      // corredor horizontal inferior
tallaCaja(-7, 7, 28, 32, -4, 4, { suelo: "rugoso" }); // cámara subterránea (sin terminar)
tallaCaja(0, 1, 28, 29, 5, 20);                       // pasadizo ciego al sur
tallaRampa(7, 8, -77, -42, 64, 0.5, 3);              // pasadizo ascendente
tallaCaja(5, 6, 66, 68, -116, -70);                  // túnel de Al-Mamún (entrada de hoy)
tallaCaja(6, 8, 67, 68, -71, -70);
TALLAS.push({ tipo: "galeria", x0: 6, x1: 9, z0: -42, z1: -1, za: -42, ya: 81, pendiente: 0.5 }); // Gran Galería
tallaCaja(6, 9, 102, 103, -1, 0);                    // el gran escalón
tallaCaja(7, 8, 81, 82, -42, -4);                    // corredor a la Cámara de la Reina
TALLAS.push({ tipo: "dosaguas", x0: 2, x1: 8, z0: -3, z1: 2, y0: 81, paredes: 4, eje: "x" }); // Cámara de la Reina
tallaCaja(9, 9, 81, 85, -1, 0);                      // nicho de la pared este
tallaCaja(7, 8, 102, 103, 1, 3);                     // corredor bajo
tallaCaja(6, 9, 102, 106, 4, 6, { forro: A.granito }); // antecámara de los rastrillos
tallaCaja(7, 8, 102, 103, 7, 8, { forro: A.granito });
tallaCaja(-3, 7, 102, 107, 9, 13, { forro: A.granito }); // Cámara del Rey
for (const y of [109, 112, 115, 118]) tallaCaja(-3, 7, y, y, 9, 13, { forro: A.granito }); // cámaras de descarga
TALLAS.push({ tipo: "dosaguas", x0: -3, x1: 7, z0: 9, z1: 13, y0: 121, paredes: 1, eje: "x" });
TALLAS.push({ tipo: "conducto", x: 2, z0: 8, dir: -1, y0: 103, sube: 0.625, largo: 120 }); // conducto norte del Rey
TALLAS.push({ tipo: "conducto", x: 2, z0: 14, dir: 1, y0: 103, sube: 1, largo: 120 });     // conducto sur del Rey
TALLAS.push({ tipo: "conducto", x: 5, z0: -4, dir: -1, y0: 82, sube: 0.8, largo: 58 });    // conductos de la Reina (cerrados)
TALLAS.push({ tipo: "conducto", x: 5, z0: 3, dir: 1, y0: 82, sube: 0.8, largo: 58 });

// Kefrén
tallaRampa(-316, -315, 245, 268, 81, -0.5, 3);
tallaCaja(-316, -315, 70, 72, 268, 338);
TALLAS.push({ tipo: "dosaguas", x0: -330, x1: -315, z0: 339, z1: 344, y0: 70, paredes: 5, eje: "x" });

// Micerinos
tallaRampa(-589, -588, 695, 725, 69, -0.5, 3);
tallaCaja(-591, -586, 54, 57, 725, 730, { forro: A.areniscaCincelada }); // antecámara decorada
tallaCaja(-589, -588, 54, 55, 731, 740);
tallaCaja(-593, -584, 53, 57, 741, 745);
tallaCaja(-597, -594, 49, 52, 742, 744, { forro: A.granito });          // cámara de granito
tallaCaja(-594, -593, 50, 53, 743, 743);

E(-120, -120, 120, 120, tallar); E(-340, 230, -300, 350, tallar); E(-600, 685, -580, 750, tallar);

function tallar(x, z, col) {
  for (const t of TALLAS) {
    if (t.tipo === "conducto") {
      if (x !== t.x) continue;
      const k = (z - t.z0) * t.dir;
      if (k < 0 || k > t.largo) continue;
      const y = Math.floor(t.y0 + k * t.sube);
      if (y > 0 && y < ALTO && col[y] !== A.aire) col[y] = A.aire;
      continue;
    }
    if (x < t.x0 - (t.forro ? 1 : 0) || x > t.x1 + (t.forro ? 1 : 0) || z < t.z0 - (t.forro ? 1 : 0) || z > t.z1 + (t.forro ? 1 : 0)) continue;
    if (t.tipo === "caja") {
      const dentro = x >= t.x0 && x <= t.x1 && z >= t.z0 && z <= t.z1;
      if (t.forro) {
        for (let y = t.y0 - 1; y <= t.y1 + 1; y++) if (col[y] !== A.aire) col[y] = t.forro;
        if (!dentro) continue;
      }
      let y0 = t.y0;
      if (t.suelo === "rugoso" && x < 0) y0 += Math.floor(h2(x, z, 5) * 2.5);
      for (let y = y0; y <= t.y1; y++) col[y] = A.aire;
    } else if (t.tipo === "rampa") {
      const piso = Math.floor(t.ya + (z - t.za) * t.pendiente);
      for (let y = piso; y < piso + t.alto; y++) col[y] = A.aire;
    } else if (t.tipo === "galeria") {
      const piso = Math.floor(t.ya + (z - t.za) * t.pendiente);
      const lado = x === t.x0 || x === t.x1;
      for (let k = lado ? 1 : 0; k < 9; k++) {
        if (k >= 5 && lado) continue;        // los saledizos estrechan la galería hacia arriba
        col[piso + k] = A.aire;
      }
    } else if (t.tipo === "dosaguas") {
      const centro = (t.z0 + t.z1) / 2, semi = (t.z1 - t.z0) / 2;
      const techo = t.y0 + t.paredes + Math.floor(semi + 0.5 - Math.abs(z - centro));
      for (let y = t.y0; y < techo; y++) col[y] = A.aire;
    }
  }
  // sarcófagos
  if (x === -2 && z >= 10 && z <= 12) col[102] = A.granitoPulido;
  if (x >= -322 && x <= -320 && z === 341) col[70] = A.granitoPulido;
  // rastrillos de granito que tapan el pasadizo ascendente (Al-Mamún los rodeó)
  if ((x === 7 || x === 8) && z >= -76 && z <= -73) for (let y = 62; y <= 69; y++) if (col[y] === A.aire && y >= Math.floor(64 + (z + 77) * 0.5)) col[y] = A.granito;
  // rampas laterales de la Gran Galería
  if ((x === 6 || x === 9) && z > -42 && z < -1) { const piso = Math.floor(81 + (z + 42) * 0.5); col[piso] = A.calizaGastada; }
}

// --- la Gran Esfinge ---
function esfinge(x, z, col) {
  const u = x - ESFINGE.cx, v = z - ESFINGE.cz, s = ESFINGE.suelo;
  const tramos = [];
  const av = Math.abs(v);
  const redondo = (w, h) => (av <= w ? h * Math.sqrt(1 - (av / w) ** 2) : -1);
  if (u >= -37 && u < 13) {
    let h = u < -18 ? redondo(9.5, 10) : redondo(9.5, 10 + (u + 18) * 0.06);
    if (u < -33) h *= Math.sqrt(Math.max(0, 1 - ((u + 33) / 4.5) ** 2));
    if (h > 0) tramos.push([0, Math.round(h)]);
  }
  if (u >= 13 && u <= 19) { const h = redondo(8.5, 12.5); if (h > 0) tramos.push([0, Math.round(h)]); }
  // patas
  if (u > 12 && u <= 37 && av >= 3 && av <= 8.5) tramos.push([0, u > 34 ? 3 - (u - 34) : 3]);
  // cola enroscada al costado sur
  if (u >= -30 && u <= -12 && v >= 9 && v <= 10) tramos.push([0, 0]);
  // cabeza con el nemes
  if (u >= 13 && u <= 23) {
    if (av <= 4.5 && u >= 15) {
      const corona = u < 17 || u > 21 ? 18 : 19 + (av < 2.5 ? 1 : 0);
      tramos.push([12, corona]);
    }
    if (av > 4.5 && av <= 6.5 && u >= 14 && u <= 18) tramos.push([7, 17]);   // aletas del tocado
    if (av <= 2.5 && u >= 13 && u <= 15) tramos.push([9, 13]);                // cuello
  }
  for (const [a, b] of tramos) {
    for (let k = a; k <= b; k++) {
      const y = s + k;
      let m;
      if (k < 6) m = (k + Math.floor(h2(x, z, 7) * 2)) % 3 === 0 ? A.calizaGastada : A.caliza;
      else if (k < 12) m = k % 2 ? A.arenisca : A.areniscaLisa;
      else m = av > 4.5 && k % 2 ? A.tura : A.areniscaLisa;
      if (k < 3 && u > -30 && u < 12 && av > 8) m = A.areniscaCortada;     // restauraciones de la base
      col[y] = m;
    }
  }
  // cara: ojos, nariz perdida y boca
  if (u === 23) {
    if ((v === -2 || v === 2) && true) col[s + 17] = A.terracota;
    if (v === 0) col[s + 16] = A.aire;
    if (av <= 1) col[s + 14] = A.calizaGastada;
  }
  // Estela del Sueño entre las patas
  if (u === 30 && av <= 2) for (let k = 0; k <= 4; k++) col[s + k] = A.granito;
}
E(ESFINGE.cx - 40, ESFINGE.cz - 12, ESFINGE.cx + 40, ESFINGE.cz + 12, esfinge);

// --- templos (en ruinas) ---
function templo(x0, z0, x1, z1, alto, material, opciones = {}) {
  E(x0, z0, x1, z1, (x, z, col, suelo) => {
    const base = opciones.base ?? suelo + 1;
    const borde = Math.min(x - x0, x1 - x, z - z0, z1 - z);
    const ruina = Math.floor(fbm(x / 6, z / 6, 31, 2) * alto * (opciones.ruina ?? 0.7));
    const piso = opciones.piso ?? A.calizaGastada;
    for (let y = suelo + 1; y < base; y++) col[y] = A.caliza;
    col[base - 1] = piso;
    let h = 0;
    if (borde < 3) h = alto - ruina;                                         // muros exteriores
    else if (opciones.pilares && (x - x0) % 5 === 2 && (z - z0) % 5 === 2 && borde > 5) h = alto - Math.floor(ruina / 2);
    else if (opciones.muros && ((x - x0) % 14 === 0 || (z - z0) % 14 === 0) && borde > 4) h = Math.floor((alto - ruina) * 0.6);
    // puerta hacia la calzada o el frente
    if (opciones.puerta && opciones.puerta(x, z)) h = 0;
    for (let y = base; y < base + h; y++) col[y] = typeof material === "function" ? material(x, y, z, borde) : material;
  });
}
// Templo del Valle de Kefrén: granito por fuera, caliza por dentro, sala en T con pilares de granito.
templo(298, 452, 343, 497, 12, (x, y, z, borde) => (borde === 0 ? A.granito : A.caliza), {
  base: 17, pilares: true, ruina: 0.25, piso: A.calizaGastada,
  puerta: (x, z) => (z >= 452 && z <= 455 && x >= 316 && x <= 320) || (x >= 340 && z >= 470 && z <= 474),
});
// Templo de la Esfinge
templo(352, 400, 392, 440, 7, A.caliza, { base: 17, pilares: true, ruina: 0.6, puerta: (x, z) => x <= 355 && z >= 417 && z <= 423 });
// Templo funerario de Kefrén
templo(-220, 300, -168, 388, 8, A.caliza, { pilares: true, muros: true, ruina: 0.75, base: 70, puerta: (x, z) => x >= -171 && z >= 341 && z <= 347 });
// Templo funerario de Micerinos (adobe y caliza)
templo(-536, 718, -492, 768, 5, (x, y) => (y % 3 ? A.adobe : A.caliza), { muros: true, ruina: 0.8, base: 65 });
// Templo funerario de Keops: solo queda el pavimento de basalto
E(118, -26, 152, 26, (x, z, col) => {
  col[59] = A.basalto;
  if (((x - 118) % 6 === 3) && ((z + 26) % 6 === 3) && h2(x, z, 41) < 0.6) for (let y = 60; y < 60 + 1 + Math.floor(h2(x, z, 42) * 3); y++) col[y] = A.granito;
});

// --- calzadas ---
function calzada(xa, za, xb, zb, ancho, muros, material) {
  const dx = xb - xa, dz = zb - za, largo2 = dx * dx + dz * dz;
  E(Math.min(xa, xb) - ancho, Math.min(za, zb) - ancho, Math.max(xa, xb) + ancho, Math.max(za, zb) + ancho, (x, z, col, suelo) => {
    const t = Math.max(0, Math.min(1, ((x - xa) * dx + (z - za) * dz) / largo2));
    const d = Math.hypot(x - (xa + dx * t), z - (za + dz * t));
    if (d > ancho / 2) return;
    col[suelo] = material;
    if (muros && d > ancho / 2 - 1.2 && h2(x, z, 51) < 0.82) {
      const h = 1 + Math.floor(fbm(x / 9, z / 9, 52, 2) * 3);
      for (let y = suelo + 1; y <= suelo + h; y++) col[y] = A.calizaGastada;
    }
  });
}
calzada(-168, 344, 298, 458, 7, true, A.caliza);         // calzada de Kefrén
calzada(152, 0, 480, 150, 9, false, A.basalto);           // restos de la calzada de Keops
calzada(-492, 743, 120, 905, 7, true, A.calizaGastada);  // calzada de Micerinos

// --- recintos de las pirámides ---
function recinto(p, margen, alto) {
  const m = p.media + margen;
  E(p.cx - m, p.cz - m, p.cx + m, p.cz + m, (x, z, col, suelo) => {
    const d = Math.max(Math.abs(x - p.cx), Math.abs(z - p.cz));
    if (d < m - 1 || d > m) return;
    if (h2(Math.floor(x / 4), Math.floor(z / 4), 61) < 0.35) return;
    const h = 1 + Math.floor(h2(x, z, 62) * alto);
    for (let y = suelo + 1; y <= suelo + h; y++) col[y] = A.calizaGastada;
  });
}
recinto(PIRAMIDES[0], 10, 3); recinto(PIRAMIDES[1], 10, 3); recinto(PIRAMIDES[2], 8, 2);

// --- fosas de las barcas de Keops ---
for (const [x0, z0, x1, z1, tapada] of [[150, -66, 154, -22, false], [150, 30, 154, 74, false], [-30, 122, 15, 125, true], [20, 122, 62, 125, true]]) {
  E(x0, z0, x1, z1, (x, z, col) => {
    const fin = Math.min(z - z0, z1 - z, x - x0, x1 - x);
    for (let y = 59 - Math.min(4, fin + 2); y <= 59; y++) col[y] = A.aire;
    if (tapada) col[59] = A.caliza;
  });
}

// --- campos de mastabas ---
function campoMastabas(x0, z0, x1, z1, semilla) {
  E(x0, z0, x1, z1, (x, z, col, suelo) => {
    const cx = Math.floor((x - x0) / 30), cz = Math.floor((z - z0) / 22);
    if (h2(cx, cz, semilla) < 0.18) return;                     // calles sin tumba
    const lx = (x - x0) % 30, lz = (z - z0) % 22;
    const largo = 12 + Math.floor(h2(cx, cz, semilla + 1) * 9), ancho = 8 + Math.floor(h2(cx, cz, semilla + 2) * 6);
    const ox = 3 + Math.floor((30 - 6 - ancho) * h2(cx, cz, semilla + 3)), oz = 2 + Math.floor((22 - 4 - largo) * h2(cx, cz, semilla + 4));
    if (lx < ox || lx >= ox + ancho || lz < oz || lz >= oz + largo) return;
    const borde = Math.min(lx - ox, ox + ancho - 1 - lx, lz - oz, oz + largo - 1 - lz);
    const alto = 3 + Math.floor(h2(cx, cz, semilla + 5) * 4);
    const ruina = h2(cx, cz, semilla + 6) < 0.3 ? Math.floor(fbm(x / 4, z / 4, semilla, 2) * 4) : 0;
    const h = Math.min(alto, 1 + borde * 2) - ruina;               // paredes en talud
    const adobe = h2(cx, cz, semilla + 7) < 0.25;
    for (let y = suelo + 1; y <= suelo + h; y++) col[y] = adobe ? A.adobe : (h3(x, y, z) < 0.8 ? A.caliza : A.calizaGastada);
    // capilla de ofrendas en la cara este
    if (lx === ox + ancho - 1 && lz === oz + Math.floor(largo / 2) && h > 1) col[suelo + 1] = A.aire;
  });
}
campoMastabas(-420, -180, -160, 120, 71);   // cementerio occidental
campoMastabas(210, -110, 340, 130, 81);     // cementerio oriental
campoMastabas(-470, 420, -380, 640, 91);    // cementerio central (junto a Kefrén)

// Tumba de Khentkawes: base de roca y cuerpo de sillares
E(20, 590, 66, 636, (x, z, col, suelo) => {
  const borde = Math.min(x - 20, 66 - x, z - 590, 636 - z);
  const top = suelo + (borde < 7 ? 9 : 16);
  for (let y = suelo + 1; y <= top; y++) col[y] = y > suelo + 9 ? A.caliza : A.calizaGastada;
});

// Muro del Cuervo y aldea de los constructores (Heit el-Ghurab)
E(180, 820, 380, 830, (x, z, col) => {
  const puerta = x >= 270 && x <= 274;
  for (let y = 17; y <= 26; y++) if (!(puerta && y <= 22)) col[y] = h3(x, y, z) < 0.85 ? A.calizaGastada : A.caliza;
});
E(200, 842, 420, 992, (x, z, col) => {
  const bx = (x - 200) % 44, bz = (z - 842) % 50;
  if (bx > 38 || bz > 40) return;                    // calles
  const g = bx % 6;
  const muro = g === 0 || bz === 0 || bz === 40;
  const ruina = h2(x, z, 101) < 0.15;
  if (muro && !ruina) for (let y = 17; y <= 17 + (h2(Math.floor(x / 3), z, 102) < 0.5 ? 1 : 2); y++) col[y] = A.adobe;
  else if (!muro) col[16] = A.barro;
});

// ---------------------------------------------------------------- columnas
function zona(x, z, h) {
  const valle = x > bordeMeseta(z) + 40 && h <= 17;
  return valle ? "valle" : "desierto";
}

// Palmeras: en una rejilla de 7×7, solo en el valle; el tronco y la copa ocupan columnas vecinas.
const PALMA = 7;
const palmas = new Map();
function palmeraEn(cx, cz) {
  const k = cx * 100003 + cz;
  if (palmas.has(k)) return palmas.get(k);
  if (palmas.size > 20000) palmas.clear();
  const p = calcularPalmera(cx, cz);
  palmas.set(k, p);
  return p;
}
function calcularPalmera(cx, cz) {
  const px = cx * PALMA + 1 + Math.floor(h2(cx, cz, 201) * 5), pz = cz * PALMA + 1 + Math.floor(h2(cx, cz, 202) * 5);
  const hs = alturaSuelo(px, pz);
  if (hs < 16 || hs > 17) return null;
  if (px < bordeMeseta(pz) + 60) return null;
  const dn = Math.abs(px - centroNilo(pz)), dc = Math.abs(px - centroCanal(pz));
  const densidad = dn < 110 ? 0.55 : dc < 30 ? 0.5 : fbm(px / 150, pz / 150, 203, 2) > 0.62 ? 0.35 : 0.04;
  if (dn < 80 || dc < 4) return null;
  if (h2(cx, cz, 204) > densidad) return null;
  if (enCampo(px, pz)) return null;
  // nada de palmeras dentro de los monumentos (templos, foso de la Esfinge, aldea obrera...)
  for (const e of ESTRUCTURAS) if (px >= e.x0 - 4 && px <= e.x1 + 4 && pz >= e.z0 - 4 && pz <= e.z1 + 4) return null;
  if (Math.abs(px - ESFINGE.cx) < 80 && Math.abs(pz - ESFINGE.cz) < 56) return null;
  return { x: px, z: pz, suelo: hs, alto: 6 + Math.floor(h2(cx, cz, 205) * 4) };
}
function enCampo(x, z) {
  if (x < 720 || x > 1080) return false;
  const fx = Math.floor((x - 720) / 38), fz = Math.floor((z + 2000) / 30);
  return h2(fx, fz, 301) < 0.62 && (x - 720) % 38 > 1 && (z + 2000) % 30 > 1;
}

function vegetacion(x, z, col) {
  const cx0 = Math.floor(x / PALMA), cz0 = Math.floor(z / PALMA);
  for (let cx = cx0 - 1; cx <= cx0 + 1; cx++) for (let cz = cz0 - 1; cz <= cz0 + 1; cz++) {
    const p = palmeraEn(cx, cz);
    if (!p) continue;
    const dx = x - p.x, dz = z - p.z, top = p.suelo + p.alto;
    if (dx === 0 && dz === 0) { for (let y = p.suelo + 1; y <= top; y++) col[y] = A.tronco; col[top + 1] = A.hojas; continue; }
    const adx = Math.abs(dx), adz = Math.abs(dz);
    if ((adx === 0 || adz === 0 || adx === adz) && Math.max(adx, adz) <= 3) {
      const r = Math.max(adx, adz);
      col[top + (r === 3 ? -1 : r === 2 ? 0 : 1)] = A.hojas;
      if (r === 3) col[top - 2] = h2(x, z, 206) < 0.5 ? A.hojas : col[top - 2];
    }
  }
}

// Llena una columna: col es un Uint16Array(ALTO) con ids de bloque.
export function columna(x, z, col) {
  col.fill(A.aire);
  const h = alturaSuelo(x, z);
  const zn = zona(x, z, h);
  col[0] = A.lecho;
  const roca = zn === "valle" ? h - 5 : h - 3 - Math.floor(ruido(x / 9, z / 9, 13) * 3);
  for (let y = 1; y <= h; y++) col[y] = y <= roca ? (y < 8 ? A.piedra : (h3(x, y, z) < 0.6 ? A.calizaGastada : A.arenisca)) : zn === "valle" ? A.tierra : A.arena;

  // superficie
  const dn = Math.abs(x - centroNilo(z)), dc = Math.abs(x - centroCanal(z));
  if (dn < 80 && h < 15) {
    for (let y = h + 1; y <= 15; y++) col[y] = A.agua;
    col[h] = A.arena;
  } else if (dc < 2.5) {
    col[14] = A.agua; col[15] = A.agua; col[13] = A.barro;
  } else if (zn === "valle") {
    if (dn < 84) { col[h] = A.arena; if (h2(x, z, 401) < 0.3) for (let k = 1; k <= 1 + Math.floor(h2(x, z, 402) * 3); k++) col[h + k] = A.cana; }
    else if (enCampo(x, z)) {
      const fila = (z + 2000) % 30;
      if (fila === 15) { col[h] = A.agua; }
      else { col[h] = A.cultivo; if (fila % 2) col[h + 1] = A.trigo; }
    } else {
      col[h] = A.hierba;
      const r = h2(x, z, 403);
      if (r < 0.08) col[h + 1] = A.pasto;
    }
  } else {
    // desierto y meseta: arena con roca que aflora
    const aflora = fbm(x / 25, z / 25, 404, 2);
    if (h > 40 && aflora > 0.66) { col[h] = aflora > 0.74 ? A.calizaGastada : A.arenisca; }
    else if (h2(x, z, 405) < 0.0025) col[h + 1] = A.arbusto;
    else if (h2(x, z, 406) < 0.01) col[h] = A.grava;
  }

  for (const e of ESTRUCTURAS) if (x >= e.x0 && x <= e.x1 && z >= e.z0 && z <= e.z1) e.aplicar(x, z, col, h);
  if (zn === "valle") vegetacion(x, z, col);
  return col;
}

// Bloque suelto (para apuntar y chocar): con una caché pequeña de columnas.
const cache = new Map();
const tmp = new Uint16Array(ALTO);
export function bloqueEn(x, y, z) {
  if (y < 0 || y >= ALTO) return 0;
  const k = x * 65536 + z;
  let c = cache.get(k);
  if (!c) {
    if (cache.size > 4096) cache.clear();
    c = new Uint16Array(columna(x, z, tmp));
    cache.set(k, c);
  }
  return c[y];
}

// Nombre del lugar más cercano (para el letrero de la pantalla).
export function lugarCercano(x, z) {
  for (const p of PIRAMIDES) {
    if (Math.max(Math.abs(x - p.cx), Math.abs(z - p.cz)) <= p.media + 5) return p.nombre;
  }
  if (Math.abs(x - ESFINGE.cx) < 50 && Math.abs(z - ESFINGE.cz) < 26) return "La Gran Esfinge";
  if (x >= 298 && x <= 343 && z >= 452 && z <= 497) return "Templo del Valle de Kefrén";
  if (x >= 352 && x <= 392 && z >= 400 && z <= 440) return "Templo de la Esfinge";
  if (x >= -420 && x <= -160 && z >= -180 && z <= 120) return "Cementerio occidental";
  if (x >= 210 && x <= 340 && z >= -110 && z <= 130) return "Cementerio oriental";
  if (x >= 180 && x <= 420 && z >= 815 && z <= 995) return "Muro del Cuervo · aldea obrera";
  if (Math.abs(x - centroNilo(z)) < 80) return "El Nilo";
  if (x > bordeMeseta(z) + 40) return "Valle del Nilo";
  return "Meseta de Giza";
}

// Malla gruesa para ver lo lejano (más allá de los chunks cargados): alturas cada `paso`.
export function alturaLejana(x, z) {
  let h = alturaSuelo(x, z);
  for (const p of PIRAMIDES) {
    const d = Math.max(Math.abs(x - p.cx), Math.abs(z - p.cz));
    if (d <= p.media) h = Math.max(h, p.base + Math.min(p.actual, (p.media - d) * p.alto / p.media));
  }
  return h;
}
export function sueloLejano(x, z) {
  const h = alturaSuelo(x, z);
  if (Math.abs(x - centroNilo(z)) < 75 && h < 15) return "agua";
  for (const p of PIRAMIDES) if (Math.max(Math.abs(x - p.cx), Math.abs(z - p.cz)) <= p.media) return "piramide";
  if (x > bordeMeseta(z) + 40 && h <= 17) return enCampo(x, z) ? "campo" : "valle";
  return "arena";
}
