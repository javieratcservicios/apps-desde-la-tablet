# El mapa de Giza

Escala 1:1: un bloque mide un metro. Los ejes son:
- **x** crece al este;
- **z** crece al sur, así que el norte es −z;
- **y** es la altura (0 a 255).

La Gran Pirámide está en (0, 0). Las posiciones salen de las coordenadas reales de cada monumento, pasadas a metros respecto a Keops. Las medidas salen de las bases y alturas publicadas, redondeadas a bloques.

El mapa se genera con una función por columna en `assets/js/mundo.js`; no hay un archivo de mapa guardado. Lo que el jugador cambia se guarda aparte.

## Alturas

| Qué | y |
|---|---|
| Lecho de roca | 0 |
| Agua del Nilo y del canal | hasta 15 |
| Valle del Nilo (suelo) | 16–17 |
| Piso del foso de la Esfinge | 16 (la Esfinge empieza en 17) |
| Meseta | ~58–68, con dunas al oeste y al sur |
| Base de Keops | 60 (en la realidad, 60 m sobre el nivel del mar) |
| Base de Micerinos | 65 |
| Base de Kefrén | 70: está 10 m más alta que Keops, por eso parece la mayor |
| Cima de Keops | 199 (139 m: hoy no tiene la punta) |

El borde oriental de la meseta (la escarpa hacia el valle) está en x ≈ 420 al norte y se va corriendo al oeste hacia el sur. Por eso la Esfinge, el Muro del Cuervo y la aldea obrera quedan abajo, en el valle.

## Pirámides

| Pirámide | Centro (x, z) | Base (m) | Altura original / actual | Detalles |
|---|---|---|---|---|
| Keops (Gran Pirámide) | 0, 0 | 230 | 146 / 139 | Sin revestimiento, escalones gastados en las aristas |
| Kefrén | −328, 344 | 214 | 143 / 136 | Revestimiento de Tura en la punta (desde 104 m) |
| Micerinos | −589, 743 | 104 | 65 / 61 | Base con 16 hiladas de granito de Asuán; brecha de Saladino en la cara norte |
| G1-a (Hetepheres) | 180, −60 | 48 | 30 / 22 | Reina de Keops, muy arruinada |
| G1-b (Meritites) | 180, −5 | 48 | 30 / 21 | Reina de Keops |
| G1-c (Henutsen) | 180, 48 | 46 | 29 / 25 | Reina de Keops |
| G3-a | −530, 832 | 44 | 28 / 24 | Reina de Micerinos, pirámide lisa |
| G3-b | −589, 832 | 32 | 20 / 18 | Reina de Micerinos, escalonada (4 escalones) |
| G3-c | −648, 832 | 32 | 20 / 18 | Reina de Micerinos, escalonada (4 escalones) |

El núcleo es de **caliza de Giza** (72 %), **caliza gastada** (20 %) y **arenisca** (8 %), mezcladas bloque por bloque. Cada pirámide tiene alrededor una explanada nivelada y los restos de su muro de recinto.

## Interior de la Gran Pirámide

Medidas en bloques; se ensancharon los pasadizos para que quepa el jugador (1.8 m de alto).

| Parte | Dónde | Medida en el mapa | En la realidad |
|---|---|---|---|
| Entrada original | Cara norte, x 7–8, y 77 | 2 × 3 | A 17 m de altura y 7.3 m al este del eje |
| Pasadizo descendente | x 7–8, de z −102 a −8, de y 77 a 30 | 2 × 3, pendiente 1:2 (26.5°) | 105 m a 26°31' |
| Corredor y cámara subterránea | z −8 a 4, y 28–32 | 15 × 9 × 5, piso irregular | 8.3 × 14 m, sin terminar, 30 m bajo la base |
| Pasadizo ciego | Sur de la subterránea, x 0–1, z 5–20 | 2 × 2 | Callejón sin salida |
| Pasadizo ascendente | x 7–8, de z −77 a −42, de y 64 a 81 | 2 × 3 | 39 m |
| Tapones de granito | Base del ascendente, z −76 a −73 | Granito | Tres bloques que lo sellaron |
| Túnel de Al-Mamún | x 5–6, y 66–68, de la cara norte a z −70 | 2 × 3 | Por donde se entra hoy (siglo IX) |
| Gran Galería | x 6–9, de z −42 a −1, de y 81 a 101 | 4 de ancho abajo, 2 arriba, 9 de alto | 47 m de largo, 8.6 m de alto, en saledizo, con rampas laterales |
| Gran escalón | z −1 a 0, y 102 | — | Al final de la galería |
| Cámara de la Reina | x 2–8, z −3 a 2, piso y 81 | 7 × 6, techo a dos aguas hasta 88 | 5.75 × 5.23 m, 6.2 m de alto, a 21 m |
| Nicho | Pared este de la Reina, x 9 | 1 de fondo | Nicho en saledizo |
| Antecámara de los rastrillos | x 6–9, z 4–6, y 102–106 | Forrada de granito | — |
| Cámara del Rey | x −3 a 7, z 9–13, y 102–107 | 11 × 5 × 6, toda de granito | 10.47 × 5.23 × 5.8 m, a 43 m |
| Sarcófago | x −2, z 10–12, y 102 | Granito pulido | Granito, vacío, al oeste |
| Cámaras de descarga | Sobre la del Rey, y 109, 112, 115, 118 y techo a dos aguas en 121 | Huecos de 1 de alto entre vigas de granito | Cinco cámaras que reparten el peso |
| Conductos del Rey | Norte (rumbo 32°) y sur (45°), x 2 | 1 × 1 hasta el exterior | — |
| Conductos de la Reina | Norte y sur, x 5 | 1 × 1, cerrados por dentro | Terminan en las «puertas de Gantenbrink» |

## Interior de Kefrén y Micerinos

- **Kefrén:**
  - descendente desde la cara norte (x −316 a −315, desde y 81);
  - corredor horizontal en y 70–72 hasta la cámara;
  - cámara de x −330 a −315, z 339–344, con techo a dos aguas y sarcófago de granito pulido.
- **Micerinos:**
  - descendente desde la cara norte (x −589 a −588, desde y 69);
  - antecámara decorada con arenisca cincelada (z 725–730);
  - cámara principal (x −593 a −584, z 741–745, y 53–57);
  - cámara de granito más abajo (y 49–52).

## La Gran Esfinge

- **Posición:** centro del cuerpo en (310, 420), mirando al este; el piso del foso está en y 16.
- **Cuerpo:** 73 m de largo (de x 273 a 347), unos 19 de ancho y 20 de alto. Es un perfil redondeado, con pecho, patas, la cola enroscada al costado sur, el tocado *nemes* con rayas, ojos, la nariz perdida y la boca.
- **Estratos:** caliza abajo, arenisca en medio, arenisca lisa en la cabeza y restauraciones de arenisca cortada en la base.
- **Estela del Sueño:** de granito, entre las patas (x 340).
- **Foso:** tallado en un afloramiento de roca, que sube a y 29 alrededor y queda abierto al este.

## Templos, calzadas y tumbas

| Qué | Dónde (x, z) | Cómo |
|---|---|---|
| Templo del Valle de Kefrén | 298–343, 452–497 | Muros de 12 m, granito por fuera y caliza por dentro, con pilares de granito |
| Templo de la Esfinge | 352–392, 400–440 | Frente a la Esfinge, con pilares, en ruinas |
| Templo funerario de Kefrén | −220 a −168, 300–388 | Junto a la cara este de Kefrén |
| Templo funerario de Micerinos | −536 a −492, 718–768 | Adobe y caliza |
| Templo funerario de Keops | 118–152, −26 a 26 | Solo el pavimento de basalto y restos de pilares |
| Calzada de Kefrén | Del templo funerario al del Valle | 7 de ancho, con restos de muros |
| Calzada de Keops | De (152, 0) a (480, 150) | Restos de basalto |
| Calzada de Micerinos | De (−492, 743) a (120, 905) | 7 de ancho |
| Fosas de las barcas de Keops | Este (x 150–154) y sur (z 122–125) | Las del sur tapadas con losas |
| Cementerio occidental | −420 a −160, −180 a 120 | Calles de mastabas en talud |
| Cementerio oriental | 210–340, −110 a 130 | Mastabas |
| Cementerio central | −470 a −380, 420–640 | Mastabas junto a Kefrén |
| Tumba de Khentkawes | 20–66, 590–636 | Base de roca y cuerpo de sillares |
| Muro del Cuervo | 180–380, z 820–830 | 10 m de alto y 10 de grueso, con su puerta |
| Aldea de los constructores (Heit el-Ghurab) | 200–420, 842–992 | Galerías de adobe |

## El valle y el Nilo

- **Suelo:** a partir de la escarpa el suelo es hierba, con campos de trigo y surcos de riego (de x 720 a 1080).
- **Canal:** en x ≈ 640.
- **El Nilo:** en x ≈ 1180, con meandros y unos 160 m de ancho; arena y caña (papiro) en las orillas.
- **Palmeras:** más densas junto al río y al canal. No sale ninguna dentro de los monumentos.
- **Lejos de los monumentos:** el mapa sigue de forma natural, con desierto de dunas al oeste y al sur, y el valle al este.

## Bloques propios del mapa

No existen en Minecraft; están al final del catálogo, en «Especiales».

| Bloque | id | Para qué |
|---|---|---|
| Caliza de Giza | `giza_limestone` | Sillares del núcleo de las pirámides y templos |
| Caliza de Giza gastada | `giza_limestone_dark` | Bloques erosionados, mastabas y muros |
| Revestimiento de Tura | `giza_casing` | La caliza blanca pulida: punta de Kefrén y rayas del *nemes* de la Esfinge |
| Granito de Asuán | `giza_granite` | Cámara del Rey, base de Micerinos, Templo del Valle y la Estela |
