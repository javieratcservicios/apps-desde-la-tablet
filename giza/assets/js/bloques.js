// Catálogo de bloques de Minecraft (Java Edition 1.21) con sus características.
// Cada bloque: id de Minecraft, nombre en español, categoría, dureza, resistencia a
// explosiones, herramienta adecuada, nivel mínimo para soltar el bloque, luz que emite,
// si arde, si cae por gravedad, si es transparente, cuántos se apilan, forma y textura.
// Las texturas se dibujan por código (texturas.js) a partir de un patrón y colores.

export const CATEGORIAS = [
  "Naturales", "Piedra", "Minerales", "Madera", "Colores", "Cobre", "Nether", "End",
  "Océano", "Plantas", "Luz", "Redstone", "Utilidad", "Especiales",
];

export const BLOQUES = [];
const porId = new Map();

const BASE = {
  cat: "Naturales", dureza: 1, resistencia: 1, herramienta: "ninguna", nivel: null, luz: 0,
  inflamable: false, gravedad: false, transparente: false, apilable: 64, renovable: true,
  forma: "cubo", version: "", nota: "", colocable: true,
};

function B(id, nombre, props) {
  if (porId.has(id)) return porId.get(id);
  const b = { ...BASE, ...props, id, nombre, num: BLOQUES.length };
  if (!b.tex) b.tex = { todo: ["liso", "#888888"] };
  if (Array.isArray(b.tex)) b.tex = { todo: b.tex };
  BLOQUES.push(b);
  porId.set(id, b);
  return b;
}
export const bloque = (id) => porId.get(id);
export const num = (id) => {
  const b = porId.get(id);
  if (!b) throw new Error("bloque desconocido " + id);
  return b.num;
};

// 0 = aire
B("air", "Aire", { cat: "Especiales", dureza: 0, resistencia: 0, transparente: true, forma: "nada", colocable: false,
  nota: "El vacío. No se ve ni se puede tocar." });

// ---------- colores ----------
const COLORES = [
  ["white", "blanco", "blanca", "#e9ecec"], ["orange", "naranja", "naranja", "#f07613"],
  ["magenta", "magenta", "magenta", "#bd44b3"], ["light_blue", "azul claro", "azul claro", "#3aafd9"],
  ["yellow", "amarillo", "amarilla", "#f8c627"], ["lime", "verde lima", "verde lima", "#70b919"],
  ["pink", "rosa", "rosa", "#ed8dac"], ["gray", "gris", "gris", "#3e4447"],
  ["light_gray", "gris claro", "gris claro", "#8e8e86"], ["cyan", "cian", "cian", "#158991"],
  ["purple", "morado", "morada", "#792aac"], ["blue", "azul", "azul", "#35399d"],
  ["brown", "marrón", "marrón", "#724728"], ["green", "verde", "verde", "#546d1b"],
  ["red", "rojo", "roja", "#a12722"], ["black", "negro", "negra", "#141519"],
];
const TERRACOTA = {
  white: "#d1b2a1", orange: "#a15325", magenta: "#95576c", light_blue: "#706c8a", yellow: "#ba8523",
  lime: "#677534", pink: "#a14e4e", gray: "#392a23", light_gray: "#876b62", cyan: "#575b5b",
  purple: "#764656", blue: "#4a3b5b", brown: "#4d3323", green: "#4c532a", red: "#8f3d2e", black: "#251610",
};
const HORMIGON = {
  white: "#cfd5d6", orange: "#e06100", magenta: "#a9309f", light_blue: "#2389c6", yellow: "#f0af15",
  lime: "#5ea818", pink: "#d5658e", gray: "#36393d", light_gray: "#7d7d73", cyan: "#157788",
  purple: "#641f9c", blue: "#2c2e8f", brown: "#603b1f", green: "#495b24", red: "#8e2020", black: "#080a0f",
};

// ---------- naturales ----------
B("grass_block", "Bloque de hierba", { dureza: 0.6, resistencia: 0.6, herramienta: "pala",
  tex: { arriba: ["hierba", "#7cbd4b"], lado: ["hierba_lado", "#866043", "#7cbd4b"], abajo: ["tierra", "#866043"] },
  nota: "Se extiende sola a la tierra cercana si hay luz." });
B("dirt", "Tierra", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", tex: ["tierra", "#866043"] });
B("coarse_dirt", "Tierra estéril", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", tex: ["tierra", "#77553b", "#5b3f2b"],
  nota: "No le crece hierba." });
B("rooted_dirt", "Tierra enraizada", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", tex: ["tierra", "#90674c", "#c9a37a"], version: "1.17" });
B("podzol", "Podzol", { dureza: 0.5, resistencia: 0.5, herramienta: "pala",
  tex: { arriba: ["tierra", "#5c3e1b", "#7a5426"], lado: ["hierba_lado", "#866043", "#6a4a24"], abajo: ["tierra", "#866043"] } });
B("mycelium", "Micelio", { dureza: 0.6, resistencia: 0.6, herramienta: "pala",
  tex: { arriba: ["tierra", "#6f6265", "#8a7a83"], lado: ["hierba_lado", "#866043", "#7a6c70"], abajo: ["tierra", "#866043"] } });
B("dirt_path", "Camino de tierra", { dureza: 0.65, resistencia: 0.65, herramienta: "pala", forma: "camino",
  tex: { arriba: ["tierra", "#94794a", "#a88d58"], lado: ["tierra", "#866043"], abajo: ["tierra", "#866043"] } });
B("farmland", "Tierra de cultivo", { dureza: 0.6, resistencia: 0.6, herramienta: "pala", forma: "camino",
  tex: { arriba: ["surcos", "#4e3018"], lado: ["tierra", "#866043"], abajo: ["tierra", "#866043"] } });
B("mud", "Barro", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", tex: ["tierra", "#3c393d", "#4a464b"], version: "1.19" });
B("packed_mud", "Barro compacto", { cat: "Piedra", dureza: 1, resistencia: 3, herramienta: "pico", tex: ["tierra", "#8e6b50", "#a07c5d"], version: "1.19" });
B("mud_bricks", "Ladrillos de barro", { cat: "Piedra", dureza: 1.5, resistencia: 3, herramienta: "pico", tex: ["ladrillo", "#89674f", "#6d5240"], version: "1.19" });
B("clay", "Arcilla", { dureza: 0.6, resistencia: 0.6, herramienta: "pala", tex: ["liso", "#a0a6b3"] });
B("sand", "Arena", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", gravedad: true, tex: ["arena", "#dbcfa3"],
  nota: "Cae si no tiene nada debajo." });
B("red_sand", "Arena roja", { dureza: 0.5, resistencia: 0.5, herramienta: "pala", gravedad: true, tex: ["arena", "#be6621"] });
B("suspicious_sand", "Arena sospechosa", { dureza: 0.25, resistencia: 0.25, herramienta: "pincel", gravedad: true, renovable: false,
  tex: ["arena", "#d7c79a", "#a8946a"], version: "1.20", nota: "Se cepilla con un pincel para encontrar objetos arqueológicos." });
B("gravel", "Grava", { dureza: 0.6, resistencia: 0.6, herramienta: "pala", gravedad: true, tex: ["roca", "#837f7e", "#5f5b5a"] });
B("suspicious_gravel", "Grava sospechosa", { dureza: 0.25, resistencia: 0.25, herramienta: "pincel", gravedad: true, renovable: false,
  tex: ["roca", "#7d7877", "#5a5250"], version: "1.20" });
B("snow_block", "Bloque de nieve", { dureza: 0.2, resistencia: 0.2, herramienta: "pala", tex: ["liso", "#f4fbfb"] });
B("snow", "Capa de nieve", { dureza: 0.1, resistencia: 0.1, herramienta: "pala", forma: "capa", transparente: true, tex: ["liso", "#f4fbfb"] });
B("powder_snow", "Nieve en polvo", { dureza: 0.25, resistencia: 0.25, transparente: true, tex: ["liso", "#f8fdfd"], version: "1.17",
  nota: "Te hundes en ella y te congela si no llevas botas de cuero." });
B("ice", "Hielo", { dureza: 0.5, resistencia: 0.5, herramienta: "pico", transparente: true, tex: ["hielo", "#91b7fd"], nota: "Resbaladizo. Al romperlo sin toque de seda deja agua." });
B("packed_ice", "Hielo compacto", { dureza: 0.5, resistencia: 0.5, herramienta: "pico", tex: ["hielo", "#8db4fa"] });
B("blue_ice", "Hielo azul", { dureza: 2.8, resistencia: 2.8, herramienta: "pico", tex: ["hielo", "#74a8fd"], nota: "El más resbaladizo de todos." });
B("moss_block", "Bloque de musgo", { dureza: 0.1, resistencia: 0.1, herramienta: "azada", tex: ["hojas_lleno", "#596d2d"], version: "1.17" });
B("pale_moss_block", "Bloque de musgo pálido", { dureza: 0.1, resistencia: 0.1, herramienta: "azada", tex: ["hojas_lleno", "#9ba395"], version: "1.21.4" });
B("bedrock", "Lecho de roca", { cat: "Especiales", dureza: -1, resistencia: 3600000, renovable: false, tex: ["roca", "#555555", "#2e2e2e"],
  nota: "Indestructible en supervivencia. Forma el fondo del mundo." });

// ---------- piedra ----------
const familiaPiedra = (base, nombre, genero, color, d, r, extra = {}) => {
  const f = genero === "f";
  B(base, nombre, { cat: "Piedra", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", tex: extra.tex || ["piedra", color], ...extra.base });
  if (extra.sinFormas) return;
  B(base + "_slab", `Losa de ${nombre.toLowerCase()}`, { cat: "Piedra", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", forma: "losa", tex: extra.tex || ["piedra", color] });
  B(base + "_stairs", `Escaleras de ${nombre.toLowerCase()}`, { cat: "Piedra", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", forma: "escalera", tex: extra.tex || ["piedra", color] });
  if (!extra.sinMuro) B(base + "_wall", `Muro de ${nombre.toLowerCase()}`, { cat: "Piedra", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", forma: "muro", tex: extra.tex || ["piedra", color] });
};
familiaPiedra("stone", "Piedra", "f", "#7d7d7d", 1.5, 6, { sinMuro: true, base: { nota: "Al picarla sin toque de seda suelta roca." } });
B("cobblestone", "Roca", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["roca", "#7a7a7a", "#565656"] });
B("cobblestone_slab", "Losa de roca", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["roca", "#7a7a7a", "#565656"] });
B("cobblestone_stairs", "Escaleras de roca", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: ["roca", "#7a7a7a", "#565656"] });
B("cobblestone_wall", "Muro de roca", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "muro", tex: ["roca", "#7a7a7a", "#565656"] });
B("mossy_cobblestone", "Roca musgosa", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["roca", "#6f7a62", "#4f6b35"] });
B("smooth_stone", "Piedra lisa", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["liso", "#9e9e9e"] });
B("smooth_stone_slab", "Losa de piedra lisa", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["liso", "#9e9e9e"] });
for (const [id, n, c, pat] of [
  ["stone_bricks", "Ladrillos de piedra", "#7a7a7a", "ladrillo_piedra"],
  ["mossy_stone_bricks", "Ladrillos de piedra musgosos", "#727c66", "ladrillo_piedra"],
  ["cracked_stone_bricks", "Ladrillos de piedra agrietados", "#767676", "ladrillo_piedra"],
  ["chiseled_stone_bricks", "Ladrillos de piedra cincelados", "#777777", "cincelado"],
]) {
  B(id, n, { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: [pat, c] });
  if (!id.startsWith("cracked") && !id.startsWith("chiseled")) {
    const s = id.replace("bricks", "brick");
    B(s + "_slab", "Losa de " + n.toLowerCase(), { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: [pat, c] });
    B(s + "_stairs", "Escaleras de " + n.toLowerCase(), { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: [pat, c] });
    B(s + "_wall", "Muro de " + n.toLowerCase(), { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "muro", tex: [pat, c] });
  }
}
for (const [id, n, c, pulida] of [["granite", "Granito", "#9a6a59", "Granito pulido"], ["diorite", "Diorita", "#bdbdbf", "Diorita pulida"], ["andesite", "Andesita", "#888889", "Andesita pulida"]]) {
  familiaPiedra(id, n, "m", c, 1.5, 6, { tex: ["piedra_moteada", c] });
  familiaPiedra("polished_" + id, pulida, "f", c, 1.5, 6, { tex: ["pulido", c], sinMuro: true });
}
B("deepslate", "Pizarra profunda", { cat: "Piedra", dureza: 3, resistencia: 6, herramienta: "pico", nivel: "madera",
  tex: { arriba: ["piedra", "#4f4f53"], lado: ["estrato", "#505055"], abajo: ["piedra", "#4f4f53"] }, version: "1.17" });
for (const [id, n, pat] of [["cobbled_deepslate", "Pizarra profunda rocosa", "roca"], ["polished_deepslate", "Pizarra profunda pulida", "pulido"],
  ["deepslate_bricks", "Ladrillos de pizarra profunda", "ladrillo_piedra"], ["deepslate_tiles", "Baldosas de pizarra profunda", "baldosa"]]) {
  const t = [pat, "#4a4a4f", "#36363a"];
  B(id, n, { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: t, version: "1.17" });
  const s = id.replace(/bricks$/, "brick").replace(/tiles$/, "tile");
  B(s + "_slab", "Losa de " + n.toLowerCase(), { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: t, version: "1.17" });
  B(s + "_stairs", "Escaleras de " + n.toLowerCase(), { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: t, version: "1.17" });
  B(s + "_wall", "Muro de " + n.toLowerCase(), { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "muro", tex: t, version: "1.17" });
}
B("chiseled_deepslate", "Pizarra profunda cincelada", { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["cincelado", "#47474c"], version: "1.17" });
B("cracked_deepslate_bricks", "Ladrillos de pizarra profunda agrietados", { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["ladrillo_piedra", "#47474b"], version: "1.17" });
B("cracked_deepslate_tiles", "Baldosas de pizarra profunda agrietadas", { cat: "Piedra", dureza: 3.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["baldosa", "#444448"], version: "1.17" });
B("reinforced_deepslate", "Pizarra profunda reforzada", { cat: "Especiales", dureza: 55, resistencia: 1200, renovable: false, colocable: true,
  tex: { arriba: ["cincelado", "#5a5f5c"], lado: ["metal", "#4a504c"], abajo: ["cincelado", "#5a5f5c"] }, version: "1.19", nota: "Solo aparece en las ciudades antiguas. No se puede obtener." });
familiaPiedra("tuff", "Toba", "f", "#6c6d66", 1.5, 6, { tex: ["piedra_moteada", "#6c6d66"] });
B("tuff_bricks", "Ladrillos de toba", { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["ladrillo_piedra", "#64665e"], version: "1.21" });
B("polished_tuff", "Toba pulida", { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["pulido", "#64665f"], version: "1.21" });
B("chiseled_tuff", "Toba cincelada", { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["cincelado", "#5f625a"], version: "1.21" });
B("chiseled_tuff_bricks", "Ladrillos de toba cincelados", { cat: "Piedra", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["cincelado", "#676960"], version: "1.21" });
B("calcite", "Calcita", { cat: "Piedra", dureza: 0.75, resistencia: 0.75, herramienta: "pico", nivel: "madera", tex: ["piedra", "#dfe0dc"], version: "1.17" });
B("dripstone_block", "Bloque de espeleotema", { cat: "Piedra", dureza: 1.5, resistencia: 1, herramienta: "pico", nivel: "madera", tex: ["estrato", "#866b5c"], version: "1.17" });
B("pointed_dripstone", "Espeleotema puntiagudo", { cat: "Piedra", dureza: 1.5, resistencia: 3, herramienta: "pico", nivel: "madera", forma: "cruz", transparente: true, tex: ["estalactita", "#866b5c"], version: "1.17",
  nota: "Si cae encima de alguien hace daño; gotea agua o lava." });
B("bricks", "Ladrillos", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["ladrillo", "#966253", "#b8a69e"] });
B("brick_slab", "Losa de ladrillos", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["ladrillo", "#966253", "#b8a69e"] });
B("brick_stairs", "Escaleras de ladrillos", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: ["ladrillo", "#966253", "#b8a69e"] });
B("brick_wall", "Muro de ladrillos", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "muro", tex: ["ladrillo", "#966253", "#b8a69e"] });
B("mud_brick_slab", "Losa de ladrillos de barro", { cat: "Piedra", dureza: 1.5, resistencia: 3, herramienta: "pico", forma: "losa", tex: ["ladrillo", "#89674f", "#6d5240"], version: "1.19" });
B("mud_brick_stairs", "Escaleras de ladrillos de barro", { cat: "Piedra", dureza: 1.5, resistencia: 3, herramienta: "pico", forma: "escalera", tex: ["ladrillo", "#89674f", "#6d5240"], version: "1.19" });
B("mud_brick_wall", "Muro de ladrillos de barro", { cat: "Piedra", dureza: 1.5, resistencia: 3, herramienta: "pico", forma: "muro", tex: ["ladrillo", "#89674f", "#6d5240"], version: "1.19" });

// Arenisca: la piedra de las pirámides en este mapa.
for (const [p, n, c, c2] of [["", "Arenisca", "#d8cb9b", "#c9b98a"], ["red_", "Arenisca roja", "#b5621f", "#a3561b"]]) {
  const r = (x) => p + x;
  B(r("sandstone"), n, { cat: "Piedra", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera",
    tex: { arriba: ["liso", c], lado: ["arenisca", c, c2], abajo: ["arena", c2] } });
  B(r("cut_sandstone"), n + " cortada", { cat: "Piedra", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera",
    tex: { arriba: ["liso", c], lado: ["baldosa_grande", c, c2], abajo: ["liso", c] } });
  B(r("chiseled_sandstone"), n + " cincelada", { cat: "Piedra", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera",
    tex: { arriba: ["liso", c], lado: ["jeroglifico", c, c2], abajo: ["liso", c] }, nota: "Lleva grabado un símbolo de creeper o de wither." });
  B(r("smooth_sandstone"), n + " lisa", { cat: "Piedra", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["liso", c] });
  for (const [base, nn, dd, rr, t] of [
    ["sandstone", n, 0.8, 0.8, ["arenisca", c, c2]], ["smooth_sandstone", n + " lisa", 2, 6, ["liso", c]],
    ["cut_sandstone", n + " cortada", 2, 6, ["baldosa_grande", c, c2]]]) {
    B(r(base) + "_slab", "Losa de " + nn.toLowerCase(), { cat: "Piedra", dureza: dd, resistencia: rr, herramienta: "pico", nivel: "madera", forma: "losa", tex: t });
    if (base !== "cut_sandstone") B(r(base) + "_stairs", "Escaleras de " + nn.toLowerCase(), { cat: "Piedra", dureza: dd, resistencia: rr, herramienta: "pico", nivel: "madera", forma: "escalera", tex: t });
  }
  B(r("sandstone_wall"), "Muro de " + n.toLowerCase(), { cat: "Piedra", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera", forma: "muro", tex: ["arenisca", c, c2] });
}

// ---------- minerales ----------
const MENAS = [
  ["coal", "carbón", "#2e2e2e", "madera", 0], ["iron", "hierro", "#d8af93", "piedra", 0], ["copper", "cobre", "#e0734d", "piedra", 0],
  ["gold", "oro", "#fcee4b", "hierro", 0], ["redstone", "redstone", "#ff0000", "hierro", 0], ["emerald", "esmeralda", "#17dd62", "hierro", 0],
  ["lapis", "lapislázuli", "#1d47b0", "piedra", 0], ["diamond", "diamante", "#5decf5", "hierro", 0],
];
for (const [m, n, c, nivel] of MENAS) {
  B(`${m}_ore`, `Mena de ${n}`, { cat: "Minerales", dureza: 3, resistencia: 3, herramienta: "pico", nivel, renovable: false,
    tex: ["mena", "#7d7d7d", c], luz: 0, nota: m === "redstone" ? "Brilla (luz 9) unos segundos al tocarla." : "" });
  B(`deepslate_${m}_ore`, `Mena de ${n} de pizarra profunda`, { cat: "Minerales", dureza: 4.5, resistencia: 3, herramienta: "pico", nivel, renovable: false,
    tex: ["mena", "#4d4d52", c], version: "1.17" });
}
B("nether_gold_ore", "Mena de oro del Nether", { cat: "Minerales", dureza: 3, resistencia: 3, herramienta: "pico", nivel: "madera", renovable: false, tex: ["mena", "#6f3535", "#fcee4b"], version: "1.16" });
B("nether_quartz_ore", "Mena de cuarzo del Nether", { cat: "Minerales", dureza: 3, resistencia: 3, herramienta: "pico", nivel: "madera", renovable: false, tex: ["mena", "#6f3535", "#ece6dc"] });
B("ancient_debris", "Escombros ancestrales", { cat: "Minerales", dureza: 30, resistencia: 1200, herramienta: "pico", nivel: "diamante", renovable: false,
  tex: { arriba: ["espiral", "#5e4038"], lado: ["estrato", "#614139", "#4a2f29"], abajo: ["espiral", "#5e4038"] }, version: "1.16", nota: "De aquí sale la netherita. No arde en lava." });
for (const [id, n, c, d, r, nivel, extra] of [
  ["coal_block", "Bloque de carbón", "#1a1a1a", 5, 6, "madera", { inflamable: true, nota: "Combustible: funde 80 objetos en un horno." }],
  ["iron_block", "Bloque de hierro", "#dcdcdc", 5, 6, "piedra", {}],
  ["gold_block", "Bloque de oro", "#f8d43a", 3, 6, "hierro", { nota: "Los piglins lo adoran." }],
  ["diamond_block", "Bloque de diamante", "#62ede4", 5, 6, "hierro", {}],
  ["emerald_block", "Bloque de esmeralda", "#2acb57", 5, 6, "hierro", {}],
  ["lapis_block", "Bloque de lapislázuli", "#1f43a5", 3, 3, "piedra", {}],
  ["redstone_block", "Bloque de redstone", "#ae1a06", 5, 6, "madera", { cat: "Redstone", nota: "Fuente de energía de redstone permanente." }],
  ["netherite_block", "Bloque de netherita", "#443e40", 50, 1200, "diamante", { renovable: false, nota: "No arde en lava." }],
  ["raw_iron_block", "Bloque de hierro en bruto", "#a68a6d", 5, 6, "piedra", { renovable: false }],
  ["raw_copper_block", "Bloque de cobre en bruto", "#9a6a4e", 5, 6, "piedra", { renovable: false }],
  ["raw_gold_block", "Bloque de oro en bruto", "#dda92e", 5, 6, "hierro", { renovable: false }],
  ["amethyst_block", "Bloque de amatista", "#8562bf", 1.5, 1.5, "madera", { version: "1.17", nota: "Suena como campanillas al pisarlo." }],
  ["budding_amethyst", "Amatista con brotes", "#8460bb", 1.5, 1.5, "madera", { version: "1.17", renovable: false, nota: "Le crecen cristales de amatista. No se puede recoger." }],
  ["quartz_block", "Bloque de cuarzo", "#ece6dc", 0.8, 0.8, "madera", {}],
]) B(id, n, { cat: "Minerales", dureza: d, resistencia: r, herramienta: "pico", nivel, tex: ["metal", c], ...extra });
B("smooth_quartz", "Cuarzo liso", { cat: "Minerales", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["liso", "#ece6dc"] });
B("quartz_bricks", "Ladrillos de cuarzo", { cat: "Minerales", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera", tex: ["ladrillo_piedra", "#eae4d9"] });
B("quartz_pillar", "Pilar de cuarzo", { cat: "Minerales", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera", tex: { arriba: ["cincelado", "#ece6dc"], lado: ["pilar", "#ece6dc"], abajo: ["cincelado", "#ece6dc"] } });
B("chiseled_quartz_block", "Bloque de cuarzo cincelado", { cat: "Minerales", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera", tex: ["cincelado", "#e7e0d5"] });
B("quartz_slab", "Losa de cuarzo", { cat: "Minerales", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["liso", "#ece6dc"] });
B("quartz_stairs", "Escaleras de cuarzo", { cat: "Minerales", dureza: 0.8, resistencia: 0.8, herramienta: "pico", nivel: "madera", forma: "escalera", tex: ["liso", "#ece6dc"] });
B("amethyst_cluster", "Racimo de amatista", { cat: "Minerales", dureza: 1.5, resistencia: 1.5, herramienta: "pico", forma: "cruz", transparente: true, luz: 5, tex: ["cristal_planta", "#a682e0"], version: "1.17" });

// ---------- madera ----------
const MADERAS = [
  ["oak", "roble", "#a2834f", "#6b5434", "#4b8a2a", true], ["spruce", "abeto", "#735531", "#3b2a17", "#3f6a3f", true],
  ["birch", "abedul", "#c0af79", "#d8d7d2", "#6a9a3f", true], ["jungle", "jungla", "#a07351", "#56441b", "#3c9a1a", true],
  ["acacia", "acacia", "#a85a32", "#676157", "#5b8a20", true], ["dark_oak", "roble oscuro", "#42291a", "#3c2e1a", "#3a6a1a", true],
  ["mangrove", "mangle", "#763331", "#5b4630", "#4f8a2a", true], ["cherry", "cerezo", "#e2b2a8", "#371c25", "#f0b2d0", true],
  ["pale_oak", "roble pálido", "#e4dad8", "#5a504d", "#7d8a82", true], ["bamboo", "bambú", "#c3ac56", "#7c8a2e", null, true],
  ["crimson", "carmesí", "#653046", "#5c1a1e", null, false], ["warped", "distorsionado", "#2b6963", "#3a3a4d", null, false],
];
for (const [w, n, tabla, corteza, hoja, arde] of MADERAS) {
  const neth = w === "crimson" || w === "warped";
  const tronco = neth ? "Tallo" : w === "bamboo" ? "Bloque de bambú" : "Tronco";
  const cat = neth ? "Nether" : "Madera";
  const t = ["tablones", tabla];
  const ver = { cherry: "1.20", bamboo: "1.20", mangrove: "1.19", pale_oak: "1.21.4", crimson: "1.16", warped: "1.16" }[w] || "";
  const comun = { cat, herramienta: "hacha", inflamable: arde, version: ver };
  B(`${w}_planks`, `Tablones de ${n}`, { ...comun, dureza: 2, resistencia: 3, tex: t });
  if (w === "bamboo") {
    B("bamboo_block", "Bloque de bambú", { ...comun, dureza: 2, resistencia: 2, tex: { arriba: ["anillos", "#a3ad3b", corteza], lado: ["tronco", "#7c8a2e"], abajo: ["anillos", "#a3ad3b", corteza] } });
    B("stripped_bamboo_block", "Bloque de bambú descortezado", { ...comun, dureza: 2, resistencia: 2, tex: { arriba: ["anillos", tabla], lado: ["tronco", tabla], abajo: ["anillos", tabla] } });
    B("bamboo_mosaic", "Mosaico de bambú", { ...comun, dureza: 2, resistencia: 3, tex: ["mosaico", tabla] });
  } else {
    const sufijo = neth ? "stem" : "log";
    const madera = neth ? "hyphae" : "wood";
    B(`${w}_${sufijo}`, `${tronco} de ${n}`, { ...comun, dureza: 2, resistencia: 2, tex: { arriba: ["anillos", tabla, corteza], lado: ["tronco", corteza], abajo: ["anillos", tabla, corteza] } });
    B(`stripped_${w}_${sufijo}`, `${tronco} de ${n} descortezado`, { ...comun, dureza: 2, resistencia: 2, tex: { arriba: ["anillos", tabla], lado: ["tronco", tabla], abajo: ["anillos", tabla] } });
    B(`${w}_${madera}`, neth ? `Hifas de ${n}` : `Madera de ${n}`, { ...comun, dureza: 2, resistencia: 2, tex: ["tronco", corteza] });
    B(`stripped_${w}_${madera}`, neth ? `Hifas de ${n} descortezadas` : `Madera de ${n} descortezada`, { ...comun, dureza: 2, resistencia: 2, tex: ["tronco", tabla] });
  }
  if (hoja) {
    B(`${w}_leaves`, `Hojas de ${n}`, { cat: "Plantas", dureza: 0.2, resistencia: 0.2, herramienta: "azada", inflamable: true, transparente: true, forma: "hojas", tex: ["hojas", hoja], version: ver,
      nota: "Se deshacen solas si no están cerca de un tronco." });
    B(`${w}_sapling`, w === "mangrove" ? "Propágulo de mangle" : `Brote de ${n}`, { cat: "Plantas", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, inflamable: true, tex: ["brote", hoja, corteza], version: ver });
  }
  for (const [s, nn, d, r, f] of [["slab", "Losa", 2, 3, "losa"], ["stairs", "Escaleras", 2, 3, "escalera"], ["fence", "Valla", 2, 3, "valla"],
    ["fence_gate", "Puerta de valla", 2, 3, "valla"], ["door", "Puerta", 3, 3, "puerta"], ["trapdoor", "Trampilla", 3, 3, "trampilla"],
    ["pressure_plate", "Placa de presión", 0.5, 0.5, "placa"], ["button", "Botón", 0.5, 0.5, "boton"], ["sign", "Cartel", 1, 1, "cartel"],
    ["hanging_sign", "Cartel colgante", 1, 1, "cartel"]]) {
    B(`${w}_${s}`, `${nn} de ${n}`, { ...comun, dureza: d, resistencia: r, forma: f, transparente: f !== "losa" && f !== "escalera",
      apilable: f === "puerta" ? 64 : f === "cartel" ? 16 : 64, tex: t, cat: s === "pressure_plate" || s === "button" || s === "door" || s === "trapdoor" || s === "fence_gate" ? "Redstone" : cat });
  }
}
B("bamboo_mosaic_slab", "Losa de mosaico de bambú", { cat: "Madera", dureza: 2, resistencia: 3, herramienta: "hacha", inflamable: true, forma: "losa", tex: ["mosaico", "#c3ac56"], version: "1.20" });
B("bamboo_mosaic_stairs", "Escaleras de mosaico de bambú", { cat: "Madera", dureza: 2, resistencia: 3, herramienta: "hacha", inflamable: true, forma: "escalera", tex: ["mosaico", "#c3ac56"], version: "1.20" });
B("mangrove_roots", "Raíces de mangle", { cat: "Madera", dureza: 0.7, resistencia: 0.7, herramienta: "hacha", inflamable: true, transparente: true, forma: "hojas", tex: ["raices", "#4c3c24"], version: "1.19" });
B("muddy_mangrove_roots", "Raíces de mangle embarradas", { cat: "Madera", dureza: 0.7, resistencia: 0.7, herramienta: "pala", tex: ["raices", "#3e3a35", "#4c3c24"], version: "1.19" });
B("bookshelf", "Librería", { cat: "Madera", dureza: 1.5, resistencia: 1.5, herramienta: "hacha", inflamable: true,
  tex: { arriba: ["tablones", "#a2834f"], lado: ["libros", "#a2834f"], abajo: ["tablones", "#a2834f"] }, nota: "Sube el nivel de la mesa de encantamientos." });
B("chiseled_bookshelf", "Librería cincelada", { cat: "Madera", dureza: 1.5, resistencia: 1.5, herramienta: "hacha", inflamable: true,
  tex: { arriba: ["tablones", "#a2834f"], lado: ["libros", "#8a6d3f"], abajo: ["tablones", "#a2834f"] }, version: "1.20" });

// ---------- bloques de colores ----------
for (const [c, m, f, hex] of COLORES) {
  B(`${c}_wool`, `Lana ${f}`, { cat: "Colores", dureza: 0.8, resistencia: 0.8, herramienta: "tijeras", inflamable: true, tex: ["lana", hex] });
  B(`${c}_carpet`, `Alfombra ${f}`, { cat: "Colores", dureza: 0.1, resistencia: 0.1, inflamable: true, forma: "alfombra", transparente: true, tex: ["lana", hex] });
  B(`${c}_concrete`, `Hormigón ${m}`, { cat: "Colores", dureza: 1.8, resistencia: 1.8, herramienta: "pico", nivel: "madera", tex: ["liso", HORMIGON[c]] });
  B(`${c}_concrete_powder`, `Cemento ${m}`, { cat: "Colores", dureza: 0.5, resistencia: 0.5, herramienta: "pala", gravedad: true, tex: ["arena", HORMIGON[c]],
    nota: "Se vuelve hormigón al tocar agua." });
  B(`${c}_terracotta`, `Terracota ${f}`, { cat: "Colores", dureza: 1.25, resistencia: 4.2, herramienta: "pico", nivel: "madera", tex: ["liso_suave", TERRACOTA[c]] });
  B(`${c}_glazed_terracotta`, `Terracota esmaltada ${f}`, { cat: "Colores", dureza: 1.4, resistencia: 1.4, herramienta: "pico", nivel: "madera", tex: ["vidriado", hex, TERRACOTA[c]],
    nota: "No se pega a los bloques de slime ni de miel." });
  B(`${c}_stained_glass`, `Cristal tintado ${m}`, { cat: "Colores", dureza: 0.3, resistencia: 0.3, transparente: true, forma: "cristal", tex: ["cristal", hex],
    nota: "Sin toque de seda se rompe sin soltar nada." });
  B(`${c}_stained_glass_pane`, `Panel de cristal tintado ${m}`, { cat: "Colores", dureza: 0.3, resistencia: 0.3, transparente: true, forma: "panel", tex: ["cristal", hex] });
  B(`${c}_bed`, `Cama ${f}`, { cat: "Utilidad", dureza: 0.2, resistencia: 0.2, transparente: true, forma: "cama", apilable: 1, inflamable: true, tex: ["lana", hex],
    nota: "En el Nether y el End explota." });
  B(`${c}_candle`, `Vela ${f}`, { cat: "Luz", dureza: 0.1, resistencia: 0.1, transparente: true, forma: "cruz", luz: 3, tex: ["vela", hex], version: "1.17",
    nota: "Luz 3 por vela encendida; hasta 4 en un bloque (luz 12)." });
  B(`${c}_shulker_box`, `Caja de shulker ${f}`, { cat: "Utilidad", dureza: 2, resistencia: 2, herramienta: "pico", apilable: 1, tex: ["caja", hex],
    nota: "Guarda sus objetos al romperla." });
  B(`${c}_banner`, `Estandarte ${m}`, { cat: "Colores", dureza: 1, resistencia: 1, herramienta: "hacha", transparente: true, forma: "cartel", apilable: 16, inflamable: true, tex: ["lana", hex] });
}
B("terracotta", "Terracota", { cat: "Colores", dureza: 1.25, resistencia: 4.2, herramienta: "pico", nivel: "madera", tex: ["liso_suave", "#985e43"] });
B("glass", "Cristal", { cat: "Colores", dureza: 0.3, resistencia: 0.3, transparente: true, forma: "cristal", tex: ["cristal", "#dbeef2"] });
B("glass_pane", "Panel de cristal", { cat: "Colores", dureza: 0.3, resistencia: 0.3, transparente: true, forma: "panel", tex: ["cristal", "#dbeef2"] });
B("tinted_glass", "Cristal opaco", { cat: "Colores", dureza: 0.3, resistencia: 0.3, transparente: true, forma: "cristal", tex: ["cristal", "#2c2730"], version: "1.17",
  nota: "Deja pasar la vista pero no la luz." });
B("candle", "Vela", { cat: "Luz", dureza: 0.1, resistencia: 0.1, transparente: true, forma: "cruz", luz: 3, tex: ["vela", "#e6c99b"], version: "1.17" });
B("shulker_box", "Caja de shulker", { cat: "Utilidad", dureza: 2, resistencia: 2, herramienta: "pico", apilable: 1, tex: ["caja", "#8b5f8b"] });

// ---------- cobre ----------
const OXIDO = [["", "", "#c06c50"], ["exposed_", " expuesto", "#a17e68"], ["weathered_", " erosionado", "#6c9f6a"], ["oxidized_", " oxidado", "#52a284"]];
for (const [p, adj, c] of OXIDO) {
  for (const cera of [false, true]) {
    const w = cera ? "waxed_" : "";
    const en = cera ? " encerado" : "";
    const nota = cera ? "La cera evita que se oxide." : "Se oxida con el tiempo: normal → expuesto → erosionado → oxidado.";
    const k = (s) => w + p + s;
    const comun = { cat: "Cobre", herramienta: "pico", nivel: "piedra", version: "1.17", nota };
    B(w + p + (p ? "copper" : "copper_block"), `Bloque de cobre${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, tex: ["metal", c] });
    B(k("cut_copper"), `Cobre cortado${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, tex: ["baldosa", c] });
    B(k("cut_copper_slab"), `Losa de cobre cortado${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, forma: "losa", tex: ["baldosa", c] });
    B(k("cut_copper_stairs"), `Escaleras de cobre cortado${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, forma: "escalera", tex: ["baldosa", c] });
    B(k("chiseled_copper"), `Cobre cincelado${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, tex: ["cincelado", c], version: "1.21" });
    B(k("copper_grate"), `Rejilla de cobre${adj}${en}`, { ...comun, dureza: 3, resistencia: 6, transparente: true, forma: "cristal", tex: ["rejilla", c], version: "1.21" });
    B(k("copper_door"), `Puerta de cobre${adj}${en}`, { ...comun, cat: "Redstone", dureza: 3, resistencia: 6, forma: "puerta", transparente: true, tex: ["rejilla", c], version: "1.21" });
    B(k("copper_trapdoor"), `Trampilla de cobre${adj}${en}`, { ...comun, cat: "Redstone", dureza: 3, resistencia: 6, forma: "trampilla", transparente: true, tex: ["rejilla", c], version: "1.21" });
    B(k("copper_bulb"), `Bombilla de cobre${adj}${en}`, { ...comun, cat: "Luz", dureza: 3, resistencia: 6, luz: [15, 12, 8, 4][OXIDO.findIndex((o) => o[0] === p)], tex: ["lampara", c, "#ffd27a"], version: "1.21",
      nota: "Se enciende y apaga con cada pulso de redstone. " + nota });
  }
}

// ---------- Nether ----------
for (const [id, n, d, r, t, extra] of [
  ["netherrack", "Netherrack", 0.4, 0.4, ["piedra", "#6f3535", "#5a2828"], { nota: "Arde para siempre si se le prende fuego." }],
  ["nether_bricks", "Ladrillos del Nether", 2, 6, ["ladrillo", "#2c1519", "#1c0d10"], {}],
  ["cracked_nether_bricks", "Ladrillos del Nether agrietados", 2, 6, ["ladrillo", "#2a1418", "#160a0c"], { version: "1.16" }],
  ["chiseled_nether_bricks", "Ladrillos del Nether cincelados", 2, 6, ["cincelado", "#2e171b"], { version: "1.16" }],
  ["red_nether_bricks", "Ladrillos rojos del Nether", 2, 6, ["ladrillo", "#450709", "#2b0405"], {}],
  ["basalt", "Basalto", 1.25, 4.2, { arriba: ["anillos", "#58585c", "#3f3f44"], lado: ["estrato", "#4f4f54"], abajo: ["anillos", "#58585c", "#3f3f44"] }, { version: "1.16" }],
  ["polished_basalt", "Basalto pulido", 1.25, 4.2, { arriba: ["pulido", "#5d5d61"], lado: ["pilar", "#5a5a5e"], abajo: ["pulido", "#5d5d61"] }, { version: "1.16" }],
  ["smooth_basalt", "Basalto liso", 1.25, 4.2, ["liso_suave", "#48484e"], { version: "1.17" }],
  ["blackstone", "Piedra negra", 1.5, 6, ["piedra", "#2a2328", "#1c171b"], { version: "1.16" }],
  ["gilded_blackstone", "Piedra negra dorada", 1.5, 6, ["mena", "#2a2328", "#e8b932"], { version: "1.16", renovable: false }],
  ["polished_blackstone", "Piedra negra pulida", 2, 6, ["pulido", "#35303a"], { version: "1.16" }],
  ["polished_blackstone_bricks", "Ladrillos de piedra negra pulida", 1.5, 6, ["ladrillo_piedra", "#302a32"], { version: "1.16" }],
  ["cracked_polished_blackstone_bricks", "Ladrillos de piedra negra pulida agrietados", 1.5, 6, ["ladrillo_piedra", "#2c272e"], { version: "1.16" }],
  ["chiseled_polished_blackstone", "Piedra negra pulida cincelada", 1.5, 6, ["cincelado", "#35303a"], { version: "1.16" }],
  ["soul_sand", "Arena de almas", 0.5, 0.5, ["arena", "#513e32", "#3c2c22"], { herramienta: "pala", nota: "Te hace ir más lento. Bajo el agua crea burbujas que suben." }],
  ["soul_soil", "Tierra de almas", 0.5, 0.5, ["tierra", "#4b3a2f"], { herramienta: "pala", version: "1.16" }],
  ["magma_block", "Bloque de magma", 0.5, 0.5, ["magma", "#8e3f1b", "#ff8a1e"], { luz: 3, nota: "Quema al pisarlo sin andar agachado." }],
  ["nether_wart_block", "Bloque de verruga del Nether", 1, 1, ["hojas_lleno", "#740a0a"], { herramienta: "azada" }],
  ["warped_wart_block", "Bloque de verruga distorsionada", 1, 1, ["hojas_lleno", "#167a7b"], { herramienta: "azada", version: "1.16" }],
  ["crimson_nylium", "Necelio carmesí", 0.4, 0.4, { arriba: ["hojas_lleno", "#871a1a"], lado: ["hierba_lado", "#6f3535", "#871a1a"], abajo: ["piedra", "#6f3535"] }, { version: "1.16" }],
  ["warped_nylium", "Necelio distorsionado", 0.4, 0.4, { arriba: ["hojas_lleno", "#2b7265"], lado: ["hierba_lado", "#6f3535", "#2b7265"], abajo: ["piedra", "#6f3535"] }, { version: "1.16" }],
  ["shroomlight", "Brillongo", 1, 1, ["luz", "#f09a49", "#ffd27a"], { luz: 15, herramienta: "azada", version: "1.16" }],
  ["glowstone", "Piedra luminosa", 0.3, 0.3, ["luz", "#ab8654", "#ffdfa0"], { luz: 15, nota: "Suelta polvo de piedra luminosa al romperla." }],
  ["crying_obsidian", "Obsidiana llorosa", 50, 1200, ["piedra", "#200a3a", "#6b23c9"], { luz: 10, nivel: "diamante", version: "1.16", renovable: false }],
  ["respawn_anchor", "Nexo de reaparición", 50, 1200, { arriba: ["luz", "#3b2063", "#a64dff"], lado: ["cincelado", "#2d1b44"], abajo: ["piedra", "#200a3a"] }, { nivel: "diamante", luz: 15, cat: "Utilidad", version: "1.16",
    nota: "Fija tu reaparición en el Nether. Cargado con piedra luminosa da luz 3–15. En el mundo normal explota." }],
  ["lodestone", "Magnetita", 3.5, 3.5, ["cincelado", "#8c8d92"], { cat: "Utilidad", version: "1.16", nota: "Hace que una brújula apunte hacia ella." }],
]) B(id, n, { cat: "Nether", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", tex: t, ...extra });
B("obsidian", "Obsidiana", { cat: "Piedra", dureza: 50, resistencia: 1200, herramienta: "pico", nivel: "diamante", tex: ["piedra", "#14121e", "#3b2a4f"],
  nota: "Necesita pico de diamante. Con ella se construye el portal al Nether." });
B("crimson_fungus", "Hongo carmesí", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["hongo", "#a12a2a"], version: "1.16" });
B("warped_fungus", "Hongo distorsionado", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["hongo", "#14b485"], version: "1.16" });
B("crimson_roots", "Raíces carmesíes", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["pasto", "#a0263a"], version: "1.16" });
B("warped_roots", "Raíces distorsionadas", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["pasto", "#14a08a"], version: "1.16" });
B("nether_sprouts", "Brotes del Nether", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["pasto", "#1aa088"], version: "1.16" });
B("weeping_vines", "Enredaderas lloronas", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["enredadera", "#8a1a1a"], version: "1.16" });
B("twisting_vines", "Enredaderas retorcidas", { cat: "Nether", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["enredadera", "#14a08a"], version: "1.16" });

// ---------- End ----------
B("end_stone", "Piedra del End", { cat: "End", dureza: 3, resistencia: 9, herramienta: "pico", nivel: "madera", tex: ["piedra", "#dbde9e", "#c4c789"] });
B("end_stone_bricks", "Ladrillos de piedra del End", { cat: "End", dureza: 3, resistencia: 9, herramienta: "pico", nivel: "madera", tex: ["ladrillo_piedra", "#dae0a2"] });
B("end_stone_brick_slab", "Losa de ladrillos de piedra del End", { cat: "End", dureza: 3, resistencia: 9, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["ladrillo_piedra", "#dae0a2"] });
B("end_stone_brick_stairs", "Escaleras de ladrillos de piedra del End", { cat: "End", dureza: 3, resistencia: 9, herramienta: "pico", nivel: "madera", forma: "escalera", tex: ["ladrillo_piedra", "#dae0a2"] });
B("end_stone_brick_wall", "Muro de ladrillos de piedra del End", { cat: "End", dureza: 3, resistencia: 9, herramienta: "pico", nivel: "madera", forma: "muro", tex: ["ladrillo_piedra", "#dae0a2"] });
B("purpur_block", "Bloque de púrpura", { cat: "End", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["baldosa", "#a97ba9"] });
B("purpur_pillar", "Pilar de púrpura", { cat: "End", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: { arriba: ["cincelado", "#ab81ab"], lado: ["pilar", "#ab81ab"], abajo: ["cincelado", "#ab81ab"] } });
B("purpur_slab", "Losa de púrpura", { cat: "End", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: ["baldosa", "#a97ba9"] });
B("purpur_stairs", "Escaleras de púrpura", { cat: "End", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: ["baldosa", "#a97ba9"] });
B("end_rod", "Vara del End", { cat: "Luz", dureza: 0, resistencia: 0, luz: 14, forma: "cruz", transparente: true, tex: ["vara", "#f2ece2"] });
B("chorus_plant", "Planta de coro", { cat: "End", dureza: 0.4, resistencia: 0.4, herramienta: "hacha", transparente: true, forma: "hojas", tex: ["hojas_lleno", "#5c3a5c"], renovable: true });
B("chorus_flower", "Flor de coro", { cat: "End", dureza: 0.4, resistencia: 0.4, herramienta: "hacha", tex: ["flor_bloque", "#9a7a9a", "#d8c8d8"] });
B("dragon_egg", "Huevo de dragón", { cat: "End", dureza: 3, resistencia: 9, gravedad: true, luz: 1, renovable: false, forma: "huevo", transparente: true, tex: ["piedra", "#0c0910", "#3a1a4a"],
  nota: "Solo hay uno por mundo. Se teletransporta si lo golpeas." });
B("end_portal_frame", "Marco del portal del End", { cat: "End", dureza: -1, resistencia: 3600000, luz: 1, renovable: false, forma: "camino",
  tex: { arriba: ["cincelado", "#3b6b5a"], lado: ["piedra", "#dbde9e"], abajo: ["piedra", "#dbde9e"] } });
B("ender_chest", "Cofre de ender", { cat: "Utilidad", dureza: 22.5, resistencia: 600, herramienta: "pico", nivel: "madera", luz: 7, tex: ["caja", "#1c2b2b"],
  nota: "Comparte el mismo inventario en cualquier lugar del mundo." });

// ---------- océano ----------
for (const [id, n, d, r, t, extra] of [
  ["prismarine", "Prismarina", 1.5, 6, ["piedra", "#63a397", "#4f8a80"], {}],
  ["prismarine_bricks", "Ladrillos de prismarina", 1.5, 6, ["ladrillo_piedra", "#63ab9e"], {}],
  ["dark_prismarine", "Prismarina oscura", 1.5, 6, ["baldosa", "#335b4b"], {}],
  ["sea_lantern", "Linterna de mar", 0.3, 0.3, ["luz", "#acc8be", "#eaf6f0"], { luz: 15, herramienta: "ninguna", cat: "Luz" }],
  ["sponge", "Esponja", 0.6, 0.6, ["esponja", "#c4c04b"], { herramienta: "azada", renovable: false, nota: "Absorbe el agua alrededor." }],
  ["wet_sponge", "Esponja mojada", 0.6, 0.6, ["esponja", "#ab9f3a"], { herramienta: "azada", renovable: false, nota: "Se seca en un horno o en el Nether." }],
  ["dried_kelp_block", "Bloque de algas secas", 0.5, 2.5, ["tronco", "#323b26"], { herramienta: "azada", inflamable: true }],
]) B(id, n, { cat: "Océano", dureza: d, resistencia: r, herramienta: "pico", nivel: "madera", tex: t, ...extra });
for (const [id, n] of [["prismarine", "prismarina"], ["prismarine_brick", "ladrillos de prismarina"], ["dark_prismarine", "prismarina oscura"]]) {
  const t = bloque(id === "prismarine_brick" ? "prismarine_bricks" : id).tex;
  B(id + "_slab", "Losa de " + n, { cat: "Océano", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "losa", tex: t });
  B(id + "_stairs", "Escaleras de " + n, { cat: "Océano", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "escalera", tex: t });
}
B("prismarine_wall", "Muro de prismarina", { cat: "Océano", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", forma: "muro", tex: ["piedra", "#63a397", "#4f8a80"] });
for (const [c, n, hex] of [["tube", "tubo", "#3157d1"], ["brain", "cerebro", "#cf5b9e"], ["bubble", "burbuja", "#a419a3"], ["fire", "fuego", "#c42b2b"], ["horn", "cuerno", "#d6c43d"]]) {
  B(`${c}_coral_block`, `Bloque de coral de ${n}`, { cat: "Océano", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["coral", hex], nota: "Muere y se vuelve gris fuera del agua." });
  B(`dead_${c}_coral_block`, `Bloque de coral de ${n} muerto`, { cat: "Océano", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera", tex: ["coral", "#7f7a75"] });
  B(`${c}_coral`, `Coral de ${n}`, { cat: "Océano", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["coral_planta", hex] });
  B(`${c}_coral_fan`, `Abanico de coral de ${n}`, { cat: "Océano", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["abanico", hex] });
}
B("sea_pickle", "Pepinillo de mar", { cat: "Océano", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, luz: 6, tex: ["vela", "#6a7a2a"], nota: "Bajo el agua da luz 6, 9, 12 o 15 según cuántos haya." });
B("kelp", "Alga", { cat: "Océano", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["enredadera", "#5a8a2a"] });
B("seagrass", "Pasto marino", { cat: "Océano", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: ["pasto", "#3a7a1a"] });
B("water", "Agua", { cat: "Especiales", dureza: 100, resistencia: 100, transparente: true, forma: "liquido", tex: ["agua", "#3f76e4"], nota: "Fluye hasta 7 bloques en horizontal. Una fuente infinita se forma con dos fuentes." });
B("lava", "Lava", { cat: "Especiales", dureza: 100, resistencia: 100, luz: 15, forma: "liquido", transparente: true, tex: ["lava", "#d4560f", "#ffb02e"], nota: "Prende fuego a lo inflamable. En el Nether fluye más rápido y más lejos." });

// ---------- plantas ----------
for (const [id, n, t, extra] of [
  ["short_grass", "Hierba", ["pasto", "#7cbd4b"], {}], ["tall_grass", "Hierba alta", ["pasto", "#6aab3b"], {}],
  ["fern", "Helecho", ["helecho", "#6aa13a"], {}], ["dead_bush", "Arbusto muerto", ["ramas", "#946428"], { nota: "Típico del desierto; sale de la arena." }],
  ["dandelion", "Diente de león", ["flor", "#ffec4f", "#5a8a2a"], {}], ["poppy", "Amapola", ["flor", "#e32626", "#5a8a2a"], {}],
  ["blue_orchid", "Orquídea azul", ["flor", "#2ab4ff", "#5a8a2a"], {}], ["allium", "Allium", ["flor", "#c182f2", "#5a8a2a"], {}],
  ["azure_bluet", "Rubiácea", ["flor", "#e4ecf2", "#5a8a2a"], {}], ["red_tulip", "Tulipán rojo", ["flor", "#e02626", "#5a8a2a"], {}],
  ["orange_tulip", "Tulipán naranja", ["flor", "#ff8a1e", "#5a8a2a"], {}], ["white_tulip", "Tulipán blanco", ["flor", "#f2f2f2", "#5a8a2a"], {}],
  ["pink_tulip", "Tulipán rosa", ["flor", "#f2a6d6", "#5a8a2a"], {}], ["oxeye_daisy", "Margarita", ["flor", "#f2f2e0", "#5a8a2a"], {}],
  ["cornflower", "Aciano", ["flor", "#4a6ad8", "#5a8a2a"], {}], ["lily_of_the_valley", "Lirio de los valles", ["flor", "#ffffff", "#5a8a2a"], {}],
  ["wither_rose", "Rosa del wither", ["flor", "#2a2a2a", "#3a4a2a"], { nota: "Envenena con efecto wither a quien la toque." }],
  ["sunflower", "Girasol", ["flor", "#ffd21e", "#5a8a2a"], {}], ["lilac", "Lila", ["flor", "#d7a4d8", "#5a8a2a"], {}],
  ["rose_bush", "Rosal", ["flor", "#c41a1a", "#3a6a2a"], {}], ["peony", "Peonía", ["flor", "#e8b4dc", "#5a8a2a"], {}],
  ["torchflower", "Flor antorcha", ["flor", "#ff8a1e", "#3a6a2a"], { version: "1.20" }], ["pitcher_plant", "Planta jarra", ["flor", "#5ab4d8", "#3a6a2a"], { version: "1.20" }],
  ["pink_petals", "Pétalos rosas", ["petalos", "#f0a6c8"], { version: "1.20", forma: "alfombra" }],
  ["brown_mushroom", "Champiñón marrón", ["hongo", "#9a7556"], { luz: 1 }], ["red_mushroom", "Champiñón rojo", ["hongo", "#e21a1a"], {}],
  ["sugar_cane", "Caña de azúcar", ["cana", "#94c065"], { nota: "Crece junto al agua hasta 3 bloques." }],
  ["cactus", "Cactus", ["cactus", "#5a8a2a"], { forma: "cactus", transparente: false, dureza: 0.4, resistencia: 0.4, nota: "Pincha. Solo crece sobre arena." }],
  ["bamboo", "Bambú", ["cana", "#5d9a1a"], { dureza: 1, resistencia: 1, herramienta: "hacha", version: "1.14" }],
  ["vine", "Enredadera", ["enredadera", "#4a8a1a"], { herramienta: "tijeras" }], ["glow_lichen", "Liquen luminoso", ["enredadera", "#7a9a7a"], { luz: 7, version: "1.17" }],
  ["lily_pad", "Nenúfar", ["nenufar", "#208030"], { forma: "alfombra" }], ["sweet_berry_bush", "Arbusto de bayas dulces", ["helecho", "#3a6a2a"], {}],
  ["wheat", "Trigo", ["trigo", "#d6b84a"], { nota: "Cultivo: tarda unos minutos en madurar." }], ["carrots", "Zanahorias", ["trigo", "#3a8a2a"], {}],
  ["potatoes", "Papas", ["trigo", "#4a8a2a"], {}], ["beetroots", "Remolachas", ["trigo", "#6a8a2a"], {}],
  ["azalea", "Azalea", ["helecho", "#6a8a3a"], { version: "1.17" }], ["flowering_azalea", "Azalea florida", ["flor", "#c98ad8", "#5a8a2a"], { version: "1.17" }],
  ["spore_blossom", "Flor de esporas", ["flor", "#d84aa8", "#3a6a2a"], { version: "1.17" }], ["hanging_roots", "Raíces colgantes", ["enredadera", "#a0785a"], { version: "1.17" }],
  ["big_dripleaf", "Plantaforma grande", ["helecho", "#6aa13a"], { version: "1.17" }], ["small_dripleaf", "Plantaforma pequeña", ["helecho", "#5a913a"], { version: "1.17" }],
  ["cave_vines", "Enredaderas de cueva", ["enredadera", "#5a7a2a"], { luz: 14, version: "1.17", nota: "Con bayas luminosas da luz 14." }],
  ["cobweb", "Telaraña", ["telarana", "#e6e6e6"], { dureza: 4, resistencia: 4, herramienta: "espada", nota: "Frena mucho. Se rompe rápido con espada o tijeras." }],
  ["open_eyeblossom", "Ojo florido abierto", ["flor", "#f0a040", "#5a5a5a"], { version: "1.21.4", luz: 0 }],
]) B(id, n, { cat: "Plantas", dureza: 0, resistencia: 0, forma: "cruz", transparente: true, tex: t, ...extra });
B("pumpkin", "Calabaza", { cat: "Plantas", dureza: 1, resistencia: 1, herramienta: "hacha", tex: { arriba: ["anillos", "#c27a14", "#8a5a10"], lado: ["calabaza", "#e08a1a"], abajo: ["anillos", "#c27a14", "#8a5a10"] } });
B("carved_pumpkin", "Calabaza tallada", { cat: "Plantas", dureza: 1, resistencia: 1, herramienta: "hacha", tex: { arriba: ["anillos", "#c27a14", "#8a5a10"], lado: ["cara_calabaza", "#e08a1a", "#2a1a08"], abajo: ["anillos", "#c27a14", "#8a5a10"] } });
B("melon", "Sandía", { cat: "Plantas", dureza: 1, resistencia: 1, herramienta: "hacha", tex: { arriba: ["anillos", "#a2a82a", "#6a7a1a"], lado: ["melon", "#7da72a", "#c6c23a"], abajo: ["anillos", "#a2a82a", "#6a7a1a"] } });
B("hay_block", "Fardo de heno", { cat: "Plantas", dureza: 0.5, resistencia: 0.5, herramienta: "azada", inflamable: true, tex: { arriba: ["anillos", "#a68a1a", "#7a6a1a"], lado: ["heno", "#c8a42a", "#9a1a1a"], abajo: ["anillos", "#a68a1a", "#7a6a1a"] },
  nota: "Amortigua las caídas un 80 %." });
B("brown_mushroom_block", "Bloque de champiñón marrón", { cat: "Plantas", dureza: 0.2, resistencia: 0.2, herramienta: "hacha", inflamable: false, tex: ["moteado", "#957054"] });
B("red_mushroom_block", "Bloque de champiñón rojo", { cat: "Plantas", dureza: 0.2, resistencia: 0.2, herramienta: "hacha", tex: ["moteado", "#c32a2a", "#f0e0d0"] });
B("mushroom_stem", "Tallo de champiñón", { cat: "Plantas", dureza: 0.2, resistencia: 0.2, herramienta: "hacha", tex: ["tronco", "#cfc8b8"] });
B("sculk", "Sculk", { cat: "Especiales", dureza: 0.2, resistencia: 0.2, herramienta: "azada", tex: ["sculk", "#0d1e24", "#1aa0a8"], version: "1.19", nota: "Se extiende cuando muere algo cerca de un catalizador." });
B("sculk_catalyst", "Catalizador de sculk", { cat: "Especiales", dureza: 3, resistencia: 3, herramienta: "azada", luz: 6, tex: ["sculk", "#0f2328", "#4adcd8"], version: "1.19" });
B("sculk_sensor", "Sensor de sculk", { cat: "Redstone", dureza: 1.5, resistencia: 1.5, herramienta: "azada", luz: 1, forma: "losa", tex: ["sculk", "#0f2a33", "#1aa0a8"], version: "1.19",
  nota: "Detecta vibraciones a 8 bloques y emite señal de redstone." });
B("calibrated_sculk_sensor", "Sensor de sculk calibrado", { cat: "Redstone", dureza: 1.5, resistencia: 1.5, herramienta: "azada", luz: 1, forma: "losa", tex: ["sculk", "#0f2a33", "#b05ae8"], version: "1.20" });
B("sculk_shrieker", "Chillador de sculk", { cat: "Especiales", dureza: 3, resistencia: 3, herramienta: "azada", forma: "losa", tex: ["sculk", "#1a2a2a", "#d8d0a8"], version: "1.19",
  nota: "En las ciudades antiguas, si chilla tres veces invoca al Warden." });
B("creaking_heart", "Corazón de crujidor", { cat: "Especiales", dureza: 10, resistencia: 10, herramienta: "hacha", tex: { arriba: ["anillos", "#4d4440", "#2e2826"], lado: ["lampara", "#4d4440", "#ff8a1e"], abajo: ["anillos", "#4d4440", "#2e2826"] }, version: "1.21.4" });

// ---------- luz ----------
for (const [id, n, luz, t, extra] of [
  ["torch", "Antorcha", 14, ["antorcha", "#ffd27a", "#6b5434"], { forma: "cruz", transparente: true, dureza: 0 }],
  ["soul_torch", "Antorcha de almas", 10, ["antorcha", "#7ae8ff", "#6b5434"], { forma: "cruz", transparente: true, dureza: 0, version: "1.16" }],
  ["redstone_torch", "Antorcha de redstone", 7, ["antorcha", "#ff2a1a", "#6b5434"], { forma: "cruz", transparente: true, dureza: 0, cat: "Redstone" }],
  ["lantern", "Farol", 15, ["farol", "#3a3a3a", "#ffc65a"], { forma: "farol", transparente: true, dureza: 3.5, resistencia: 3.5, herramienta: "pico", version: "1.14" }],
  ["soul_lantern", "Farol de almas", 10, ["farol", "#3a3a3a", "#7ae8ff"], { forma: "farol", transparente: true, dureza: 3.5, resistencia: 3.5, herramienta: "pico", version: "1.16" }],
  ["jack_o_lantern", "Calabaza iluminada", 15, { arriba: ["anillos", "#c27a14", "#8a5a10"], lado: ["cara_calabaza", "#e08a1a", "#ffe07a"], abajo: ["anillos", "#c27a14", "#8a5a10"] }, { dureza: 1, resistencia: 1, herramienta: "hacha" }],
  ["redstone_lamp", "Lámpara de redstone", 15, ["lampara", "#6a4428", "#ffb64a"], { dureza: 0.3, resistencia: 0.3, cat: "Redstone", nota: "Da luz 15 solo cuando recibe señal de redstone." }],
  ["ochre_froglight", "Luz de rana ocre", 15, ["luz", "#f5e8a8", "#fbf5d0"], { dureza: 0.3, resistencia: 0.3, version: "1.19" }],
  ["verdant_froglight", "Luz de rana verde", 15, ["luz", "#d5eed0", "#eefaea"], { dureza: 0.3, resistencia: 0.3, version: "1.19" }],
  ["pearlescent_froglight", "Luz de rana perlada", 15, ["luz", "#f0dcec", "#fbf0f8"], { dureza: 0.3, resistencia: 0.3, version: "1.19" }],
  ["campfire", "Fogata", 15, ["fogata", "#6b5434", "#ff9a2a"], { forma: "losa", transparente: true, dureza: 2, resistencia: 2, herramienta: "hacha", inflamable: false, version: "1.14", nota: "Cocina alimentos y su humo sirve de señal." }],
  ["soul_campfire", "Fogata de almas", 10, ["fogata", "#6b5434", "#5ae8ff"], { forma: "losa", transparente: true, dureza: 2, resistencia: 2, herramienta: "hacha", version: "1.16" }],
  ["beacon", "Faro", 15, ["faro", "#9ae6e6", "#3a2a4a"], { dureza: 3, resistencia: 3, cat: "Utilidad", transparente: true, forma: "cristal", nota: "Sobre una pirámide de minerales da efectos de estado y un rayo de luz al cielo." }],
  ["conduit", "Canalizador", 15, ["luz", "#a08860", "#e0d0a0"], { dureza: 3, resistencia: 3, herramienta: "pico", forma: "farol", transparente: true, cat: "Océano" }],
  ["light", "Luz", 15, ["liso", "#fff7c0"], { cat: "Especiales", dureza: -1, resistencia: 3600000.8, transparente: true, forma: "nada", renovable: false, colocable: false, nota: "Bloque invisible solo para comandos y creativo; da la luz que elijas (0–15)." }],
]) B(id, n, { cat: "Luz", luz, tex: t, ...extra });

// ---------- redstone ----------
for (const [id, n, t, extra] of [
  ["redstone_wire", "Polvo de redstone", ["cable", "#b01a0a"], { forma: "alfombra", transparente: true, dureza: 0, nota: "Lleva la señal hasta 15 bloques." }],
  ["repeater", "Repetidor de redstone", ["placa", "#a0a0a0", "#c01a0a"], { forma: "placa", transparente: true, dureza: 0 }],
  ["comparator", "Comparador de redstone", ["placa", "#a8a8a8", "#e02a1a"], { forma: "placa", transparente: true, dureza: 0 }],
  ["piston", "Pistón", { arriba: ["tablones", "#a2834f"], lado: ["piston", "#7d7d7d", "#a2834f"], abajo: ["roca", "#7a7a7a", "#565656"] }, { dureza: 1.5, resistencia: 1.5, herramienta: "pico", nota: "Empuja hasta 12 bloques." }],
  ["sticky_piston", "Pistón pegajoso", { arriba: ["hojas_lleno", "#7ac063"], lado: ["piston", "#7d7d7d", "#7ac063"], abajo: ["roca", "#7a7a7a", "#565656"] }, { dureza: 1.5, resistencia: 1.5, herramienta: "pico", nota: "También jala el bloque de vuelta." }],
  ["observer", "Observador", { arriba: ["baldosa", "#646464"], lado: ["cara", "#5a5a5a", "#202020"], abajo: ["baldosa", "#646464"] }, { dureza: 3, resistencia: 3, herramienta: "pico", nivel: "madera", nota: "Manda un pulso cuando cambia el bloque que mira." }],
  ["dispenser", "Dispensador", { arriba: ["roca", "#7a7a7a", "#565656"], lado: ["cara", "#7a7a7a", "#202020"], abajo: ["roca", "#7a7a7a", "#565656"] }, { dureza: 3.5, resistencia: 3.5, herramienta: "pico", nivel: "madera", cat: "Redstone" }],
  ["dropper", "Soltador", { arriba: ["roca", "#7a7a7a", "#565656"], lado: ["cara", "#7a7a7a", "#303030"], abajo: ["roca", "#7a7a7a", "#565656"] }, { dureza: 3.5, resistencia: 3.5, herramienta: "pico", nivel: "madera" }],
  ["hopper", "Tolva", ["metal", "#4a4a4a"], { dureza: 3, resistencia: 4.8, herramienta: "pico", nivel: "madera", forma: "tolva", transparente: true, nota: "Pasa objetos de un contenedor a otro." }],
  ["lever", "Palanca", ["palanca", "#7d7d7d", "#6b5434"], { forma: "cruz", transparente: true, dureza: 0.5, resistencia: 0.5 }],
  ["stone_button", "Botón de piedra", ["piedra", "#7d7d7d"], { forma: "boton", transparente: true, dureza: 0.5, resistencia: 0.5, herramienta: "pico" }],
  ["stone_pressure_plate", "Placa de presión de piedra", ["piedra", "#7d7d7d"], { forma: "placa", transparente: true, dureza: 0.5, resistencia: 0.5, herramienta: "pico", nivel: "madera" }],
  ["light_weighted_pressure_plate", "Placa de presión ligera", ["metal", "#f8d43a"], { forma: "placa", transparente: true, dureza: 0.5, resistencia: 0.5, herramienta: "pico", nivel: "madera" }],
  ["heavy_weighted_pressure_plate", "Placa de presión pesada", ["metal", "#dcdcdc"], { forma: "placa", transparente: true, dureza: 0.5, resistencia: 0.5, herramienta: "pico", nivel: "madera" }],
  ["tripwire_hook", "Gancho de cuerda", ["palanca", "#7d7d7d", "#a2834f"], { forma: "cruz", transparente: true, dureza: 0 }],
  ["daylight_detector", "Sensor de luz solar", ["sensor", "#a2834f", "#d8d0b0"], { forma: "losa", transparente: true, dureza: 0.2, resistencia: 0.2, herramienta: "hacha", inflamable: true }],
  ["target", "Diana", { arriba: ["diana", "#e8d0c0", "#c42a2a"], lado: ["diana", "#e8d0c0", "#c42a2a"], abajo: ["diana", "#e8d0c0", "#c42a2a"] }, { dureza: 0.5, resistencia: 0.5, herramienta: "azada", version: "1.16" }],
  ["note_block", "Bloque musical", ["altavoz", "#6b4a32"], { dureza: 0.8, resistencia: 0.8, herramienta: "hacha", inflamable: true, nota: "Toca una nota; el instrumento depende del bloque de abajo." }],
  ["tnt", "Dinamita", { arriba: ["tnt_arriba", "#db2f1d", "#e8e0c0"], lado: ["tnt", "#db2f1d", "#e8e0c0"], abajo: ["tnt_arriba", "#db2f1d", "#e8e0c0"] }, { dureza: 0, resistencia: 0, inflamable: true, nota: "Explota 4 segundos después de encenderla." }],
  ["slime_block", "Bloque de slime", ["slime", "#6fc05a"], { dureza: 0, resistencia: 0, transparente: true, forma: "cristal", nota: "Rebota y no hace daño al caer. Arrastra bloques al empujarlo con un pistón." }],
  ["honey_block", "Bloque de miel", ["slime", "#f0a828"], { dureza: 0, resistencia: 0, transparente: true, forma: "cristal", version: "1.15", nota: "Pegajoso: frena y deja escalar sus lados." }],
  ["rail", "Raíl", ["riel", "#8a8a8a", "#6b5434"], { forma: "alfombra", transparente: true, dureza: 0.7, resistencia: 0.7, herramienta: "pico" }],
  ["powered_rail", "Raíl propulsor", ["riel", "#e8b432", "#6b5434"], { forma: "alfombra", transparente: true, dureza: 0.7, resistencia: 0.7, herramienta: "pico" }],
  ["detector_rail", "Raíl detector", ["riel", "#8a8a8a", "#a01a0a"], { forma: "alfombra", transparente: true, dureza: 0.7, resistencia: 0.7, herramienta: "pico" }],
  ["activator_rail", "Raíl activador", ["riel", "#8a8a8a", "#c03a2a"], { forma: "alfombra", transparente: true, dureza: 0.7, resistencia: 0.7, herramienta: "pico" }],
  ["crafter", "Fabricador", { arriba: ["rejilla", "#6a6a6a"], lado: ["cara", "#6a6a6a", "#c03a2a"], abajo: ["roca", "#7a7a7a", "#565656"] }, { dureza: 1.5, resistencia: 3.5, herramienta: "pico", version: "1.21", nota: "Fabrica automáticamente con un pulso de redstone." }],
  ["iron_door", "Puerta de hierro", ["metal", "#c8c8c8"], { forma: "puerta", transparente: true, dureza: 5, resistencia: 5, herramienta: "pico", nota: "Solo se abre con redstone." }],
  ["iron_trapdoor", "Trampilla de hierro", ["metal", "#c8c8c8"], { forma: "trampilla", transparente: true, dureza: 5, resistencia: 5, herramienta: "pico" }],
  ["lightning_rod", "Pararrayos", ["vara", "#c06c50"], { forma: "cruz", transparente: true, dureza: 3, resistencia: 6, herramienta: "pico", nivel: "piedra", version: "1.17" }],
]) B(id, n, { cat: "Redstone", tex: t, ...extra });

// ---------- utilidad ----------
for (const [id, n, d, r, h, t, extra] of [
  ["crafting_table", "Mesa de crafteo", 2.5, 2.5, "hacha", { arriba: ["mesa", "#a2834f", "#6b5434"], lado: ["herramientas", "#a2834f", "#6b5434"], abajo: ["tablones", "#a2834f"] }, { inflamable: true, nota: "Cuadrícula de 3×3 para fabricar." }],
  ["furnace", "Horno", 3.5, 3.5, "pico", { arriba: ["liso", "#6e6e6e"], lado: ["horno", "#7a7a7a", "#202020"], abajo: ["liso", "#6e6e6e"] }, { nivel: "madera" }],
  ["blast_furnace", "Alto horno", 3.5, 3.5, "pico", { arriba: ["liso", "#5a5a5a"], lado: ["horno", "#5e5e60", "#202020"], abajo: ["liso", "#5a5a5a"] }, { nivel: "madera", version: "1.14", nota: "Funde minerales al doble de velocidad." }],
  ["smoker", "Ahumador", 3.5, 3.5, "pico", { arriba: ["tronco", "#4a3a2a"], lado: ["horno", "#5a4a3a", "#202020"], abajo: ["tronco", "#4a3a2a"] }, { nivel: "madera", version: "1.14", nota: "Cocina comida al doble de velocidad." }],
  ["chest", "Cofre", 2.5, 2.5, "hacha", ["cofre", "#a2742a", "#3a2a1a"], { forma: "cofre", transparente: true, inflamable: true, nota: "27 espacios; dos juntos forman un cofre doble." }],
  ["trapped_chest", "Cofre trampa", 2.5, 2.5, "hacha", ["cofre", "#a2742a", "#a01a0a"], { forma: "cofre", transparente: true, cat: "Redstone" }],
  ["barrel", "Barril", 2.5, 2.5, "hacha", { arriba: ["barril", "#7a5a32", "#3a2a1a"], lado: ["tablones", "#7a5a32"], abajo: ["barril", "#7a5a32", "#3a2a1a"] }, { inflamable: true, version: "1.14" }],
  ["enchanting_table", "Mesa de encantamientos", 5, 1200, "pico", { arriba: ["cincelado", "#c42a2a"], lado: ["piedra", "#1a1520", "#3b2a4f"], abajo: ["piedra", "#14121e"] }, { nivel: "madera", luz: 7, forma: "losa", transparente: true }],
  ["anvil", "Yunque", 5, 1200, "pico", ["metal", "#444444"], { nivel: "madera", gravedad: true, forma: "yunque", transparente: true, nota: "Repara y renombra. Se va dañando con el uso." }],
  ["grindstone", "Afiladora", 2, 6, "pico", ["liso", "#8a8a8a"], { nivel: "madera", version: "1.14" }],
  ["stonecutter", "Cortapiedras", 3.5, 3.5, "pico", ["metal", "#7a7a7a"], { nivel: "madera", forma: "losa", transparente: true, version: "1.14" }],
  ["loom", "Telar", 2.5, 2.5, "hacha", { arriba: ["tablones", "#cfae7a"], lado: ["lana", "#b8946a"], abajo: ["tablones", "#a2834f"] }, { inflamable: true, version: "1.14" }],
  ["cartography_table", "Mesa de cartografía", 2.5, 2.5, "hacha", { arriba: ["mapa", "#d8c8a0", "#6b5434"], lado: ["tablones", "#5a4a3a"], abajo: ["tablones", "#5a4a3a"] }, { inflamable: true, version: "1.14" }],
  ["fletching_table", "Mesa de flechas", 2.5, 2.5, "hacha", { arriba: ["tablones", "#c8b47a"], lado: ["tablones", "#a2834f"], abajo: ["tablones", "#a2834f"] }, { inflamable: true, version: "1.14" }],
  ["smithing_table", "Mesa de herrería", 2.5, 2.5, "hacha", { arriba: ["metal", "#3a3a40"], lado: ["tablones", "#3a2a2a"], abajo: ["tablones", "#3a2a2a"] }, { version: "1.14", nota: "Mejora el equipo de diamante a netherita." }],
  ["composter", "Compostador", 0.6, 0.6, "hacha", ["tablones", "#7a5a32"], { inflamable: true, forma: "tolva", transparente: true, version: "1.14" }],
  ["cauldron", "Caldero", 2, 2, "pico", ["metal", "#3a3a3a"], { nivel: "madera", forma: "tolva", transparente: true }],
  ["brewing_stand", "Soporte para pociones", 0.5, 0.5, "pico", ["vara", "#7a7a7a"], { nivel: "madera", forma: "cruz", transparente: true, luz: 1 }],
  ["jukebox", "Tocadiscos", 2, 6, "hacha", { arriba: ["disco", "#6b4a32", "#202020"], lado: ["altavoz", "#6b4a32"], abajo: ["tablones", "#6b4a32"] }, { inflamable: true }],
  ["lectern", "Atril", 2.5, 2.5, "hacha", ["tablones", "#a2834f"], { forma: "losa", transparente: true, inflamable: true, version: "1.14" }],
  ["bell", "Campana", 5, 5, "pico", ["metal", "#f8d43a"], { forma: "farol", transparente: true, version: "1.14" }],
  ["scaffolding", "Andamio", 0, 0, "ninguna", ["andamio", "#c8a85a"], { transparente: true, forma: "hojas", inflamable: true, version: "1.14", nota: "Se sube y baja por dentro; se rompe todo de un golpe desde abajo." }],
  ["ladder", "Escalera de mano", 0.4, 0.4, "hacha", ["escalera_mano", "#a2834f"], { forma: "panel", transparente: true }],
  ["flower_pot", "Maceta", 0, 0, "ninguna", ["liso_suave", "#7a4030"], { forma: "farol", transparente: true }],
  ["decorated_pot", "Vasija decorada", 0, 0, "ninguna", ["jeroglifico", "#9a5a3a", "#5a2a1a"], { forma: "farol", transparente: true, version: "1.20", nota: "Se arma con fragmentos de cerámica arqueológica." }],
  ["beehive", "Colmena", 0.6, 0.6, "hacha", { arriba: ["tablones", "#c8a050"], lado: ["colmena", "#b8904a", "#f0c040"], abajo: ["tablones", "#c8a050"] }, { inflamable: true, version: "1.15" }],
  ["bee_nest", "Nido de abejas", 0.3, 0.3, "hacha", { arriba: ["colmena", "#c8a050", "#f0c040"], lado: ["colmena", "#d8b050", "#f0c040"], abajo: ["colmena", "#c8a050", "#f0c040"] }, { inflamable: true, version: "1.15" }],
  ["bone_block", "Bloque de hueso", 2, 2, "pico", { arriba: ["anillos", "#e2dcc8", "#c8c0a8"], lado: ["pilar", "#e2dcc8"], abajo: ["anillos", "#e2dcc8", "#c8c0a8"] }, { nivel: "madera" }],
  ["spawner", "Generador de criaturas", 5, 5, "pico", ["rejilla", "#1a2a3a"], { cat: "Especiales", nivel: "madera", transparente: true, forma: "cristal", renovable: false, nota: "Aparece en mazmorras; genera criaturas si estás cerca." }],
  ["trial_spawner", "Generador de desafíos", 50, 50, "pico", ["rejilla", "#3a2a1a"], { cat: "Especiales", transparente: true, forma: "cristal", renovable: false, version: "1.21" }],
  ["vault", "Bóveda", 50, 50, "pico", ["rejilla", "#3a3a3a"], { cat: "Especiales", transparente: true, forma: "cristal", renovable: false, luz: 6, version: "1.21", nota: "Se abre con una llave de desafío y da un botín por jugador." }],
  ["heavy_core", "Núcleo pesado", 10, 1200, "pico", ["metal", "#4a4f55"], { cat: "Especiales", forma: "farol", transparente: true, renovable: false, version: "1.21", nota: "Con una vara de brisa se fabrica la maza." }],
]) B(id, n, { cat: "Utilidad", dureza: d, resistencia: r, herramienta: h, tex: t, ...extra });

// ---------- especiales ----------
for (const [id, n, t, extra] of [
  ["command_block", "Bloque de comandos", ["comando", "#c08a5a", "#3a2a1a"], { nota: "Ejecuta comandos con redstone. Solo en creativo con trucos." }],
  ["chain_command_block", "Bloque de comandos en cadena", ["comando", "#6aa88a", "#1a3a2a"], {}],
  ["repeating_command_block", "Bloque de comandos de repetición", ["comando", "#7a5ac0", "#2a1a3a"], {}],
  ["structure_block", "Bloque de estructuras", ["comando", "#5a4a5a", "#2a2a2a"], { nota: "Guarda y carga estructuras." }],
  ["jigsaw", "Bloque rompecabezas", ["comando", "#6a5a7a", "#2a2a3a"], {}],
  ["barrier", "Barrera", ["barrera", "#e02a2a"], { transparente: true, forma: "cristal", nota: "Bloque invisible e indestructible para delimitar zonas." }],
]) B(id, n, { cat: "Especiales", dureza: -1, resistencia: 3600000, renovable: false, tex: t, ...extra });

// Bloques propios del mapa de Giza (no existen en Minecraft): materiales de las pirámides.
B("giza_limestone", "Caliza de Giza", { cat: "Especiales", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera",
  tex: ["sillar", "#cdb88a", "#b39d70"], version: "Mapa de Giza", nota: "Piedra de los bloques del núcleo de las pirámides. No existe en Minecraft: es de este mapa." });
B("giza_limestone_dark", "Caliza de Giza gastada", { cat: "Especiales", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera",
  tex: ["sillar", "#b9a274", "#9a855a"], version: "Mapa de Giza", nota: "Caliza erosionada por 4,500 años de viento y arena." });
B("giza_casing", "Revestimiento de Tura", { cat: "Especiales", dureza: 2, resistencia: 6, herramienta: "pico", nivel: "madera",
  tex: ["liso_suave", "#e6dcc2"], version: "Mapa de Giza", nota: "Caliza blanca y pulida de Tura que cubría las pirámides. En Kefrén aún queda en la cima." });
B("giza_granite", "Granito de Asuán", { cat: "Especiales", dureza: 1.5, resistencia: 6, herramienta: "pico", nivel: "madera",
  tex: ["piedra_moteada", "#9b4f45"], version: "Mapa de Giza", nota: "Granito rosa traído de Asuán, a 900 km. Forra la Cámara del Rey y la base de Micerinos." });

export const COLOCABLES = BLOQUES.filter((b) => b.colocable && b.forma !== "nada");
