// Texturas de 16×16 dibujadas por código: un patrón y uno o dos colores por cara.
// Devuelve las capas (para un TEXTURE_2D_ARRAY de WebGL2) y, por bloque, qué capa usa
// cada cara: [arriba, lados, abajo].

import { BLOQUES } from "./bloques.js";

const T = 16;

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
const mezcla = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const luz = (c, f) => [c[0] * f, c[1] * f, c[2] * f];
const suma = (c, d) => [c[0] + d, c[1] + d, c[2] + d];

function azar(semilla) {
  let s = semilla >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
function hashTexto(t) {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// Ruido suave 16×16 que se repite en los bordes (para que las caras encajen).
function ruidoSuave(r, escala) {
  const n = T / escala, g = [];
  for (let i = 0; i < n * n; i++) g.push(r());
  const at = (x, y) => g[((y % n + n) % n) * n + ((x % n + n) % n)];
  return (x, y) => {
    const fx = x / escala, fy = y / escala, x0 = Math.floor(fx), y0 = Math.floor(fy);
    const tx = fx - x0, ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const a = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * sx;
    const b = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * sx;
    return a + (b - a) * sy;
  };
}

// Celdas de Voronoi que se repiten (roca, grava, coral...).
function celdas(r, n) {
  const p = [];
  for (let i = 0; i < n; i++) p.push([r() * T, r() * T]);
  return (x, y) => {
    let d1 = 1e9, d2 = 1e9, idx = 0;
    for (let i = 0; i < n; i++) {
      for (let ox = -T; ox <= T; ox += T) for (let oy = -T; oy <= T; oy += T) {
        const dx = x + 0.5 - (p[i][0] + ox), dy = y + 0.5 - (p[i][1] + oy), d = dx * dx + dy * dy;
        if (d < d1) { d2 = d1; d1 = d; idx = i; } else if (d < d2) d2 = d;
      }
    }
    return { borde: Math.sqrt(d2) - Math.sqrt(d1), idx };
  };
}

const PLANTAS = new Set(["pasto", "helecho", "flor", "hongo", "trigo", "cana", "ramas", "enredadera", "telarana", "brote",
  "estalactita", "vara", "antorcha", "vela", "coral_planta", "abanico", "palanca", "cristal_planta", "farol", "fogata",
  "cable", "riel", "petalos", "nenufar", "andamio", "escalera_mano", "barrera", "hojas", "raices_alfa", "rejilla", "cristal", "agua", "slime"]);

// Dibuja un patrón. Devuelve RGBA de 16×16 y si tiene huecos o transparencia.
function dibujar(pat, hex1, hex2, semilla) {
  const r = azar(semilla);
  const c1 = rgb(hex1 || "#888888");
  const c2 = hex2 ? rgb(hex2) : luz(c1, 0.7);
  const px = new Uint8ClampedArray(T * T * 4);
  let alfa = false, translucido = false;
  const pon = (x, y, c, a = 255) => {
    const i = (y * T + x) * 4;
    px[i] = clamp(c[0]); px[i + 1] = clamp(c[1]); px[i + 2] = clamp(c[2]); px[i + 3] = a;
  };
  const cada = (f) => { for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) f(x, y); };
  const grano = (c, amp) => suma(c, (r() - 0.5) * amp);
  const vacio = () => { alfa = true; cada((x, y) => pon(x, y, c1, 0)); };

  switch (pat) {
    case "liso": cada((x, y) => pon(x, y, grano(c1, 10))); break;
    case "liso_suave": cada((x, y) => pon(x, y, grano(c1, 5))); break;
    case "piedra": {
      const n = ruidoSuave(r, 4), m = ruidoSuave(r, 2);
      cada((x, y) => {
        const v = n(x, y) * 0.65 + m(x, y) * 0.35;
        pon(x, y, hex2 && v > 0.72 ? grano(c2, 12) : grano(luz(c1, 0.82 + v * 0.36), 10));
      });
      break;
    }
    case "piedra_moteada": {
      const n = ruidoSuave(r, 4);
      cada((x, y) => {
        const v = r();
        const c = v < 0.12 ? luz(c1, 1.25) : v < 0.24 ? luz(c1, 0.72) : luz(c1, 0.9 + n(x, y) * 0.2);
        pon(x, y, grano(c, 8));
      });
      break;
    }
    case "pulido":
      cada((x, y) => {
        const borde = x === 0 || y === 0 || x === 15 || y === 15;
        const brillo = (x === 1 || y === 1) && !borde;
        pon(x, y, grano(borde ? luz(c1, 0.72) : brillo ? luz(c1, 1.12) : c1, 6));
      });
      break;
    case "roca": {
      const v = celdas(r, 9);
      const tonos = Array.from({ length: 9 }, () => 0.8 + r() * 0.35);
      cada((x, y) => {
        const { borde, idx } = v(x, y);
        pon(x, y, borde < 1.1 ? grano(c2, 10) : grano(luz(c1, tonos[idx] + (borde > 2.5 ? 0.06 : 0)), 12));
      });
      break;
    }
    case "arena": case "tierra": {
      const amp = pat === "arena" ? 16 : 22;
      cada((x, y) => {
        const v = r();
        const c = hex2 && v < 0.08 ? c2 : v < 0.1 ? luz(c1, 0.8) : v > 0.93 ? luz(c1, 1.12) : c1;
        pon(x, y, grano(c, amp));
      });
      break;
    }
    case "hierba": case "hojas_lleno": {
      const n = ruidoSuave(r, 2);
      cada((x, y) => pon(x, y, grano(luz(c1, 0.78 + n(x, y) * 0.4), 18)));
      break;
    }
    case "hierba_lado": {
      const borde = Array.from({ length: T }, () => 2 + Math.floor(r() * 3));
      cada((x, y) => pon(x, y, y < borde[x] ? grano(c2, 18) : grano(c1, 20)));
      break;
    }
    case "surcos":
      cada((x, y) => pon(x, y, grano(y % 4 === 0 ? luz(c1, 0.6) : y % 4 === 1 ? luz(c1, 1.2) : c1, 14)));
      break;
    case "ladrillo": {
      const mortero = hex2 ? c2 : luz(c1, 1.4);
      cada((x, y) => {
        const fila = Math.floor(y / 4), off = fila % 2 ? 4 : 0;
        const junta = y % 4 === 3 || (x + off) % 8 === 7;
        pon(x, y, junta ? grano(mortero, 10) : grano(luz(c1, 0.92 + ((fila * 7 + Math.floor((x + off) / 8) * 3) % 5) * 0.04), 14));
      });
      break;
    }
    case "ladrillo_piedra": {
      cada((x, y) => {
        const fila = Math.floor(y / 8), off = fila % 2 ? 8 : 0;
        const junta = y % 8 === 7 || (x + off) % 16 === 15;
        const brillo = y % 8 === 0 || (x + off) % 16 === 0;
        pon(x, y, junta ? grano(luz(c1, 0.6), 8) : grano(brillo ? luz(c1, 1.1) : c1, 14));
      });
      break;
    }
    case "baldosa":
      cada((x, y) => {
        const junta = x % 8 === 7 || y % 8 === 7, brillo = x % 8 === 0 || y % 8 === 0;
        pon(x, y, grano(junta ? luz(c1, 0.65) : brillo ? luz(c1, 1.12) : c1, 10));
      });
      break;
    case "baldosa_grande":
      cada((x, y) => {
        const junta = y === 0 || y === 15 || y === 7;
        pon(x, y, grano(junta ? c2 : y < 7 ? luz(c1, 1.03) : c1, 8));
      });
      break;
    case "cincelado":
      cada((x, y) => {
        const d = Math.min(x, y, 15 - x, 15 - y);
        const c = d === 0 ? luz(c1, 0.65) : d === 1 ? luz(c1, 1.15) : d === 4 ? luz(c1, 0.7) : d === 5 ? luz(c1, 1.1) : d >= 7 ? luz(c1, 0.85) : c1;
        pon(x, y, grano(c, 8));
      });
      break;
    case "estrato": {
      const capas = Array.from({ length: T }, () => 0.82 + r() * 0.3);
      cada((x, y) => pon(x, y, grano(hex2 && capas[y] > 1.05 ? c2 : luz(c1, capas[y]), 12)));
      break;
    }
    case "metal":
      cada((x, y) => {
        const d = Math.min(x, y, 15 - x, 15 - y);
        const c = d === 0 ? (x === 0 || y === 0 ? luz(c1, 1.18) : luz(c1, 0.7)) : c1;
        pon(x, y, grano(luz(c, 0.95 + ((x + y) % 7 === 0 ? 0.08 : 0)), 6));
      });
      break;
    case "arenisca":
      cada((x, y) => {
        const c = y < 3 ? luz(c1, 1.05) : y > 12 ? c2 : y === 3 || y === 9 ? luz(c1, 0.9) : c1;
        pon(x, y, grano(c, 10));
      });
      break;
    case "jeroglifico": {
      const motivo = ["................", ".##############.", ".#............#.", ".#..##....##..#.", ".#..##....##..#.",
        ".#......##....#.", ".#....######..#.", ".#....##..##..#.", ".#....##..##..#.", ".#............#.",
        ".#..########..#.", ".#..#......#..#.", ".#..########..#.", ".#............#.", ".##############.", "................"];
      cada((x, y) => pon(x, y, grano(motivo[y][x] === "#" ? luz(c2, 0.8) : c1, 8)));
      break;
    }
    case "mena": {
      const n = ruidoSuave(r, 4);
      const vetas = new Set();
      for (let k = 0; k < 5; k++) {
        const cx = 2 + Math.floor(r() * 12), cy = 2 + Math.floor(r() * 12);
        for (let j = 0; j < 4; j++) vetas.add((cy + Math.floor(r() * 3) - 1) * T + cx + Math.floor(r() * 3) - 1);
      }
      cada((x, y) => pon(x, y, vetas.has(y * T + x) ? grano(c2, 30) : grano(luz(c1, 0.85 + n(x, y) * 0.3), 10)));
      break;
    }
    case "espiral": case "anillos": case "barril": case "disco": case "diana": {
      cada((x, y) => {
        const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
        const dc = Math.hypot(x - 7.5, y - 7.5);
        let c;
        if (pat === "anillos") c = d > 6.5 ? c2 : Math.floor(dc) % 2 ? luz(c1, 0.88) : c1;
        else if (pat === "diana") c = Math.floor(dc / 2) % 2 ? c1 : c2;
        else if (pat === "disco") c = dc < 2 ? c1 : dc < 6 ? c2 : c1;
        else if (pat === "barril") c = d > 6.5 ? c2 : d > 5.5 ? luz(c1, 0.8) : c1;
        else c = Math.floor(dc) % 3 === 0 ? luz(c1, 0.75) : c1;
        pon(x, y, grano(c, 10));
      });
      break;
    }
    case "pilar":
      cada((x, y) => pon(x, y, grano(x < 2 || x > 13 ? luz(c1, 0.82) : x === 2 || x === 13 ? luz(c1, 1.1) : c1, 8)));
      break;
    case "tablones":
      cada((x, y) => {
        const tabla = Math.floor(y / 4), off = (tabla * 5) % 16;
        const junta = y % 4 === 3 || (x + off) % 16 === 0;
        pon(x, y, grano(junta ? luz(c1, 0.68) : luz(c1, 0.93 + ((x * 3 + tabla) % 5 === 0 ? 0.1 : 0)), 10));
      });
      break;
    case "tronco": {
      const vetas = Array.from({ length: T }, () => 0.8 + r() * 0.35);
      cada((x, y) => pon(x, y, grano(luz(c1, vetas[x] * (r() < 0.06 ? 0.75 : 1)), 10)));
      break;
    }
    case "mosaico":
      cada((x, y) => {
        const bloque = (Math.floor(x / 8) + Math.floor(y / 8)) % 2;
        const linea = bloque ? x % 8 === 0 || x % 8 === 4 : y % 8 === 0 || y % 8 === 4;
        pon(x, y, grano(linea ? luz(c1, 0.7) : c1, 10));
      });
      break;
    case "libros": {
      const tonos = ["#8a2a2a", "#2a4a8a", "#2a6a3a", "#7a5a2a", "#5a2a6a", "#a08a3a"].map(rgb);
      cada((x, y) => {
        const estante = y % 8;
        if (estante === 0 || estante === 7) return pon(x, y, grano(c1, 10));
        const libro = Math.floor((x + (y >= 8 ? 3 : 0)) / 2);
        const c = (x + (y >= 8 ? 3 : 0)) % 2 === 1 && r() < 0.4 ? luz(tonos[libro % 6], 0.6) : tonos[(libro * 7 + (y >= 8 ? 2 : 0)) % 6];
        pon(x, y, grano(estante === 1 ? luz(c, 0.7) : c, 12));
      });
      break;
    }
    case "lana":
      cada((x, y) => pon(x, y, grano(luz(c1, (x + y * 2) % 4 === 0 ? 0.9 : (x * 2 + y) % 5 === 0 ? 1.06 : 1), 8)));
      break;
    case "vidriado":
      cada((x, y) => {
        const a = Math.atan2(y - 7.5, x - 7.5), d = Math.hypot(x - 7.5, y - 7.5);
        pon(x, y, grano(Math.sin(a * 2 + d * 0.9) > 0.2 ? c1 : c2, 10));
      });
      break;
    case "caja":
      cada((x, y) => pon(x, y, grano(y === 7 || y === 8 ? luz(c1, 0.6) : y < 7 ? luz(c1, 1.05) : c1, 8)));
      break;
    case "lampara":
      cada((x, y) => {
        const d = Math.min(x, y, 15 - x, 15 - y);
        pon(x, y, d < 2 ? grano(c1, 10) : grano(mezcla(c2, [255, 255, 255], r() * 0.3), 14));
      });
      break;
    case "magma": {
      const v = celdas(r, 7);
      cada((x, y) => pon(x, y, v(x, y).borde < 1 ? grano(c2, 30) : grano(c1, 14)));
      break;
    }
    case "luz": {
      const v = celdas(r, 6);
      cada((x, y) => pon(x, y, v(x, y).borde < 1.4 ? grano(c1, 12) : grano(mezcla(c2, c1, r() * 0.3), 10)));
      break;
    }
    case "flor_bloque": case "moteado": case "esponja": case "coral": case "sculk": {
      const v = celdas(r, 8);
      cada((x, y) => {
        const { borde, idx } = v(x, y);
        let c = c1;
        if (pat === "moteado") c = hex2 && idx % 3 === 0 && borde > 1.2 ? c2 : c1;
        else if (pat === "esponja") c = borde < 1 ? luz(c1, 0.6) : c1;
        else if (pat === "coral") c = borde < 1 ? luz(c1, 0.7) : luz(c1, 0.95 + (idx % 3) * 0.06);
        else if (pat === "sculk") c = borde < 0.8 && r() < 0.5 ? c2 : c1;
        else c = borde < 1 ? c2 : c1;
        pon(x, y, grano(c, 12));
      });
      break;
    }
    case "hielo":
      cada((x, y) => pon(x, y, grano(luz(c1, (x - y + 16) % 9 === 0 ? 1.15 : 1), 8)));
      break;
    case "calabaza": case "melon": case "heno": case "cactus":
      cada((x, y) => {
        let c = c1;
        if (pat === "calabaza") c = x % 4 === 0 ? luz(c1, 0.75) : c1;
        else if (pat === "melon") c = x % 4 < 2 ? c1 : c2;
        else if (pat === "heno") c = y === 4 || y === 11 ? c2 : x % 3 === 0 ? luz(c1, 0.85) : c1;
        else c = x % 5 === 0 ? luz(c1, 0.75) : (x + y) % 6 === 0 ? [230, 230, 200] : c1;
        pon(x, y, grano(c, 10));
      });
      break;
    case "cara_calabaza": {
      const cara = ["................", "................", "................", "...##......##...", "...###....###...", "....##....##....",
        "................", "................", "..############..", "..#.##.##.##.#..", "...##########...", "................",
        "................", "................", "................", "................"];
      cada((x, y) => pon(x, y, grano(cara[y][x] === "#" ? c2 : x % 4 === 0 ? luz(c1, 0.75) : c1, 10)));
      break;
    }
    case "cara": case "horno": case "piston": case "altavoz": case "herramientas": case "mesa": case "mapa": case "colmena": case "sensor": case "placa": case "cofre": case "comando": case "tnt": case "tnt_arriba": {
      cada((x, y) => {
        let c = c1;
        if (pat === "cara") c = x > 4 && x < 11 && y > 4 && y < 11 ? c2 : c1;
        else if (pat === "horno") c = x > 3 && x < 12 && y > 8 && y < 14 ? c2 : y === 7 && x > 2 && x < 13 ? luz(c1, 0.7) : c1;
        else if (pat === "piston") c = y < 4 ? c2 : c1;
        else if (pat === "altavoz") c = (x % 4 === 1 && y % 4 === 1) ? luz(c1, 0.45) : c1;
        else if (pat === "herramientas") c = y < 3 ? luz(c1, 1.1) : (x === 4 || x === 11) && y > 4 ? c2 : c1;
        else if (pat === "mesa") c = x % 5 === 0 || y % 5 === 0 ? c2 : c1;
        else if (pat === "mapa") c = Math.min(x, y, 15 - x, 15 - y) < 2 ? c2 : (x * y) % 7 === 0 ? luz(c1, 0.8) : c1;
        else if (pat === "colmena") c = y % 5 === 0 ? luz(c1, 0.75) : (y > 8 && x > 5 && x < 10 && y < 12) ? luz(c2, 0.5) : c1;
        else if (pat === "sensor") c = Math.min(x, y, 15 - x, 15 - y) < 3 ? c1 : (x + y) % 3 ? c2 : luz(c2, 0.8);
        else if (pat === "placa") c = (x === 4 || x === 11) && y > 5 && y < 10 ? c2 : c1;
        else if (pat === "cofre") c = y === 5 ? luz(c2, 1) : (x > 6 && x < 9 && y > 3 && y < 8) ? [200, 200, 200] : Math.min(x, y, 15 - x, 15 - y) === 0 ? c2 : c1;
        else if (pat === "comando") c = Math.min(x, y, 15 - x, 15 - y) < 2 ? c2 : (Math.abs(x - 7.5) + Math.abs(y - 7.5) < 4 ? c2 : c1);
        else if (pat === "tnt") c = y > 5 && y < 10 ? ((x > 1 && x < 14) ? (x % 4 === 3 ? [40, 40, 40] : c2) : c2) : c1;
        else c = Math.hypot(x - 7.5, y - 7.5) < 3 ? [60, 60, 60] : c2;
        pon(x, y, grano(c, 10));
      });
      break;
    }
    case "sillar": {
      // Bloques de caliza de las pirámides: cada bloque es una piedra con bordes gastados.
      const n = ruidoSuave(r, 4);
      const junta = Math.floor(r() * 10) + 3;
      cada((x, y) => {
        const borde = y === 15 || x === junta || (y < 2 && r() < 0.5) || (x === 0 && r() < 0.3);
        const hueco = r() < 0.05;
        const c = borde ? luz(c2, 0.8) : hueco ? luz(c1, 0.78) : luz(c1, 0.88 + n(x, y) * 0.22);
        pon(x, y, grano(c, 10));
      });
      break;
    }
    case "agua":
      translucido = true;
      cada((x, y) => pon(x, y, grano(luz(c1, 0.9 + Math.sin((x + y * 2) * 0.8) * 0.08), 8), 170));
      break;
    case "lava":
      cada((x, y) => pon(x, y, grano(Math.sin(x * 0.7 + Math.sin(y * 0.6) * 2) > 0.3 ? c2 : c1, 18)));
      break;
    case "cristal":
      alfa = true;
      translucido = hex1 !== "#dbeef2";
      cada((x, y) => {
        const d = Math.min(x, y, 15 - x, 15 - y);
        if (d === 0) pon(x, y, luz(c1, 0.85), 255);
        else if (translucido) pon(x, y, c1, 120);
        else if ((x - y === 3 || x - y === 4) && x > 3 && x < 9) pon(x, y, [255, 255, 255], 200);
        else pon(x, y, c1, 0);
      });
      break;
    case "slime":
      translucido = true;
      cada((x, y) => {
        const d = Math.min(x, y, 15 - x, 15 - y);
        pon(x, y, d === 0 || (d >= 3 && d <= 3) ? luz(c1, 0.85) : c1, d < 3 ? 190 : 230);
      });
      break;
    case "rejilla":
      alfa = true;
      cada((x, y) => pon(x, y, grano(c1, 10), x % 4 === 0 || y % 4 === 0 ? 255 : 0));
      break;
    case "hojas":
      alfa = true;
      cada((x, y) => {
        const v = r();
        pon(x, y, grano(luz(c1, 0.75 + r() * 0.45), 14), v < 0.18 ? 0 : 255);
      });
      break;
    case "raices":
      if (hex2) { cada((x, y) => pon(x, y, (x + y) % 5 === 0 || (x - y + 16) % 6 === 0 ? grano(c2, 10) : grano(c1, 12))); break; }
      alfa = true;
      cada((x, y) => pon(x, y, grano(c1, 12), (x + y) % 5 === 0 || (x - y + 16) % 6 === 0 ? 255 : 0));
      break;
    case "andamio": case "escalera_mano":
      alfa = true;
      cada((x, y) => {
        const s = pat === "andamio" ? Math.min(x, y, 15 - x, 15 - y) < 2 || Math.abs(x - y) < 1.5 : x === 2 || x === 3 || x === 12 || x === 13 || y % 4 === 1;
        pon(x, y, grano(c1, 10), s ? 255 : 0);
      });
      break;
    case "barrera":
      alfa = true;
      cada((x, y) => {
        const d = Math.hypot(x - 7.5, y - 7.5);
        pon(x, y, c1, (d > 5 && d < 7) || (Math.abs(x - y) < 1.2 && d < 6) ? 255 : 0);
      });
      break;
    default:
      if (PLANTAS.has(pat) || pat === "petalos" || pat === "nenufar") {
        vacio();
        dibujarPlanta(pat, c1, c2, r, pon);
      } else cada((x, y) => pon(x, y, grano(c1, 10)));
  }
  return { px, alfa, translucido };
}

// Sprites de plantas y objetos finos: se dibujan en dos planos cruzados.
function dibujarPlanta(pat, c1, c2, r, pon) {
  const tallo = (x, y0, y1, c) => { for (let y = y0; y <= y1; y++) pon(x, y, suma(c, (r() - 0.5) * 20)); };
  const bolita = (cx, cy, rad, c) => {
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) if (Math.hypot(x - cx, y - cy) <= rad) pon(x, y, suma(c, (r() - 0.5) * 24));
  };
  switch (pat) {
    case "pasto": case "helecho": case "enredadera": case "trigo": case "cana": case "ramas": {
      const n = pat === "cana" ? 3 : 7;
      for (let i = 0; i < n; i++) {
        const x = pat === "cana" ? 3 + i * 4 : 1 + Math.floor(r() * 14);
        const alto = pat === "enredadera" ? 16 : pat === "cana" ? 16 : 5 + Math.floor(r() * 10);
        let xx = x;
        for (let y = 15; y > 15 - alto; y--) {
          if (pat !== "cana" && r() < 0.25) xx = Math.max(0, Math.min(15, xx + (r() < 0.5 ? -1 : 1)));
          pon(xx, y, suma(pat === "ramas" ? c1 : luz(c1, 0.8 + r() * 0.4), (r() - 0.5) * 20));
          if (pat === "cana" && y % 5 === 0) pon(xx, y, luz(c1, 0.6));
        }
        if (pat === "trigo") bolita(xx, 15 - alto, 1.2, c1);
      }
      break;
    }
    case "flor": case "brote": case "hongo": case "coral_planta": case "abanico": case "cristal_planta": {
      if (pat === "hongo") { tallo(7, 9, 15, [230, 220, 200]); tallo(8, 9, 15, [220, 210, 190]); bolita(7.5, 7, 4, c1); break; }
      if (pat === "cristal_planta") { for (let i = 0; i < 4; i++) tallo(4 + i * 2, 4 + Math.floor(r() * 6), 15, luz(c1, 0.9 + r() * 0.3)); break; }
      if (pat === "abanico" || pat === "coral_planta") { for (let i = 0; i < 6; i++) { const a = -1.2 + i * 0.5; for (let k = 0; k < 9; k++) pon(Math.round(7.5 + Math.sin(a) * k), Math.round(15 - Math.cos(a) * k), luz(c1, 0.8 + r() * 0.4)); } break; }
      tallo(7, 6, 15, c2 || [80, 140, 50]);
      if (pat === "brote") { bolita(7.5, 6, 4.5, c1); break; }
      bolita(7.5, 5, 3, c1);
      pon(7, 5, [255, 230, 120]);
      pon(5, 11, c2); pon(6, 10, c2); pon(9, 12, c2); pon(10, 11, c2);
      break;
    }
    case "telarana":
      for (let i = 0; i < T; i++) { pon(i, i, c1); pon(15 - i, i, c1); pon(7, i, c1); pon(i, 7, c1); }
      for (let k = 3; k < 8; k += 2) for (let i = 7 - k; i <= 8 + k; i++) { pon(i, 7 - k, c1); pon(i, 8 + k, c1); }
      break;
    case "estalactita": for (let y = 0; y < T; y++) { const w = Math.max(0, 3 - Math.floor(y / 5)); for (let x = 7 - w; x <= 8 + w; x++) pon(x, y, luz(c1, 0.8 + r() * 0.3)); } break;
    case "vara": tallo(7, 0, 15, c1); tallo(8, 0, 15, luz(c1, 0.85)); break;
    case "antorcha": tallo(7, 6, 15, c2); tallo(8, 6, 15, luz(c2, 0.8)); bolita(7.5, 5, 1.6, c1); break;
    case "vela": for (let y = 8; y < 16; y++) for (let x = 6; x < 10; x++) pon(x, y, luz(c1, 0.9 + r() * 0.2)); tallo(7, 6, 7, [40, 40, 40]); pon(7, 5, [255, 200, 80]); break;
    case "palanca": tallo(7, 4, 13, c2); for (let x = 4; x < 12; x++) { pon(x, 14, c1); pon(x, 15, c1); } break;
    case "farol":
      for (let y = 4; y < 15; y++) for (let x = 4; x < 12; x++) {
        const marco = x === 4 || x === 11 || y === 4 || y === 14;
        pon(x, y, marco ? c1 : suma(c2, (r() - 0.5) * 30));
      }
      tallo(7, 1, 3, c1); tallo(8, 1, 3, c1);
      break;
    case "fogata": for (let x = 1; x < 15; x++) { pon(x, 14, c1); pon(x, 15, luz(c1, 0.8)); } for (let i = 0; i < 20; i++) bolita(4 + r() * 8, 6 + r() * 7, 1.2, mezcla(c2, [255, 240, 120], r())); break;
    case "cable": for (let x = 0; x < T; x++) { pon(x, 7, c1); pon(x, 8, c1); pon(7, x, c1); pon(8, x, c1); } break;
    case "riel": for (let y = 0; y < T; y++) { if (y % 4 === 1) for (let x = 1; x < 15; x++) pon(x, y, c2); pon(3, y, c1); pon(12, y, c1); } break;
    case "petalos": for (let i = 0; i < 14; i++) bolita(2 + r() * 12, 2 + r() * 12, 1.3, luz(c1, 0.85 + r() * 0.3)); break;
    case "nenufar": bolita(7.5, 7.5, 7, c1); for (let i = 0; i < 7; i++) pon(7 + i, 7 - Math.floor(i / 2), [0, 0, 0, 0]); break;
    default: bolita(7.5, 7.5, 5, c1);
  }
}

// Construye todas las capas. Las caras que comparten patrón y colores comparten capa.
export function construirTexturas() {
  const capas = [];   // { px, alfa, translucido }
  const clave = new Map();
  const caras = new Int16Array(BLOQUES.length * 3);
  const capa = (spec) => {
    const k = spec.join("|");
    if (clave.has(k)) return clave.get(k);
    const t = dibujar(spec[0], spec[1], spec[2], hashTexto(k));
    clave.set(k, capas.length);
    capas.push(t);
    return capas.length - 1;
  };
  for (const b of BLOQUES) {
    const t = b.tex;
    const todo = t.todo;
    const arriba = capa(t.arriba || todo || t.lado);
    const lado = capa(t.lado || todo || t.arriba);
    const abajo = capa(t.abajo || todo || t.lado);
    caras.set([arriba, lado, abajo], b.num * 3);
  }
  return { capas, caras };
}

// Icono de un bloque para el catálogo: cubo isométrico pequeño, o el sprite si es planta.
export function icono(b, tex, tam = 48) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = tam;
  const g = cv.getContext("2d");
  g.imageSmoothingEnabled = false;
  const cache = tex.cacheCapas || (tex.cacheCapas = new Map());
  const img = (n) => {
    if (cache.has(n)) return cache.get(n);
    const c = document.createElement("canvas");
    cache.set(n, c);
    c.width = c.height = T;
    c.getContext("2d").putImageData(new ImageData(tex.capas[n].px, T, T), 0, 0);
    return c;
  };
  const [a, l] = [tex.caras[b.num * 3], tex.caras[b.num * 3 + 1]];
  if (["cruz", "nada", "alfombra", "placa", "boton", "cartel", "farol"].includes(b.forma)) {
    g.drawImage(img(l), tam * 0.1, tam * 0.1, tam * 0.8, tam * 0.8);
    return cv;
  }
  const s = tam * 0.47, h = b.forma === "losa" ? 0.5 : 1;
  const ox = tam / 2 - s, oy = tam * 0.03 + (1 - h) * s * 0.5;
  const sombra = (f) => { g.save(); g.globalAlpha = f; g.fillStyle = "#000"; g.fillRect(0, 0, T, T); g.restore(); };
  // arriba
  g.setTransform(s / T, s / 2 / T, -s / T, s / 2 / T, ox + s, oy);
  g.drawImage(img(a), 0, 0);
  // izquierda
  g.setTransform(s / T, s / 2 / T, 0, (s * h) / T, ox, oy + s / 2);
  g.drawImage(img(l), 0, 0);
  sombra(0.18);
  // derecha
  g.setTransform(s / T, -s / 2 / T, 0, (s * h) / T, ox + s, oy + s);
  g.drawImage(img(l), 0, 0);
  sombra(0.36);
  g.setTransform(1, 0, 0, 1, 0, 0);
  return cv;
}
