// Genera docs/BLOQUES.md a partir de assets/js/bloques.js: node tools/catalogo-md.js
import { BLOQUES, CATEGORIAS } from "../assets/js/bloques.js";
import { writeFileSync } from "node:fs";

const si = (v) => (v ? "Sí" : "—");
const H = { pico: "Pico", hacha: "Hacha", pala: "Pala", azada: "Azada", tijeras: "Tijeras", espada: "Espada", pincel: "Pincel", ninguna: "—" };
const lista = BLOQUES.filter((b) => b.num !== 0);
let md = `# Catálogo de bloques\n\nGenerado de \`assets/js/bloques.js\` con \`node tools/catalogo-md.js\`. ${lista.length} bloques de Minecraft Java Edition 1.21, más 4 propios del mapa de Giza.\n\n`;
md += "Columnas: dureza · resistencia a explosiones · herramienta · nivel mínimo para que suelte el bloque · luz (0–15) · arde · cae por gravedad · deja pasar la luz · se apila hasta · forma · versión en que apareció.\n\n";
md += "| Categoría | Bloques |\n|---|---|\n" + CATEGORIAS.map((c) => `| ${c} | ${lista.filter((b) => b.cat === c).length} |`).join("\n") + "\n\n";
for (const c of CATEGORIAS) {
  const bs = lista.filter((b) => b.cat === c);
  md += `## ${c} (${bs.length})\n\n| Nombre | id | Dureza | Resist. | Herramienta | Nivel | Luz | Arde | Cae | Transp. | Pila | Forma | Versión |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const b of bs) {
    md += `| ${b.nombre} | \`${b.id}\` | ${b.dureza < 0 ? "∞" : b.dureza} | ${b.resistencia >= 3600000 ? "3.6 M" : b.resistencia} | ${H[b.herramienta] || b.herramienta} | ${b.nivel || "—"} | ${b.luz || "—"} | ${si(b.inflamable)} | ${si(b.gravedad)} | ${si(b.transparente)} | ${b.apilable} | ${b.forma} | ${b.version || "—"} |\n`;
  }
  const notas = bs.filter((b) => b.nota);
  if (notas.length) md += "\n" + notas.map((b) => `- **${b.nombre}:** ${b.nota}`).join("\n") + "\n";
  md += "\n";
}
writeFileSync(new URL("../docs/BLOQUES.md", import.meta.url), md);
console.log("docs/BLOQUES.md:", lista.length, "bloques");
