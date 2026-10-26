# Documentación técnica

## Arquitectura

Toda la app es una página web (HTML, CSS y módulos de JavaScript) que corre dentro de un WebView con **WebGL2**. La parte Android es una sola Activity, sin librerías.

```
giza-app/
├── AndroidManifest.xml        paquete com.javier.giza, horizontal, pantalla completa, OpenGL ES 3
├── build.sh                   compila y firma build/GizaCreativo.apk (aapt2 · javac · d8 · apksigner)
├── java/com/javier/giza/MainActivity.java
├── res/                       icono adaptativo (pirámide de bloques sobre cielo) y nombre
├── assets/                    la app
│   ├── index.html             pantallas: inicio, juego (lienzo + controles), catálogo, diálogo
│   ├── estilo.css
│   └── js/
│       ├── bloques.js         catálogo: 873 entradas (0 = aire) con sus características
│       ├── texturas.js        texturas 16×16 por código e iconos isométricos
│       ├── mundo.js           generador del mapa de Giza y lista de lugares
│       ├── trabajador.js      worker: genera cada chunk y arma su malla
│       ├── motor.js           WebGL2: cielo, chunks, paisaje lejano, marco del bloque apuntado
│       ├── juego.js           cámara, movimiento, choques, poner/quitar, guardado
│       ├── catalogo.js        pantalla del catálogo y ficha de cada bloque
│       └── app.js             une todo: pantallas, controles táctiles, teclado, paneles
├── tools/catalogo-md.js       genera docs/BLOQUES.md
└── docs/
```

### MainActivity

- **Servidor interno:** sirve `assets/` en `https://giza.local/…` mediante `shouldInterceptRequest`. Con un origen https de verdad funcionan los módulos ES, los workers de tipo módulo e IndexedDB; desde `file://` no funcionan.
- **Pantalla:** completa e inmersiva (se esconden las barras), siempre encendida y horizontal.
- **Atrás:** llama a `window.atras()` en la página. Si la página no tiene nada que cerrar (paneles, catálogo, juego → inicio), sale de la app.
- **Al pausar:** dispara `visibilitychange` para que la página guarde.

## Bloques (`bloques.js`)

`B(id, nombre, props)` agrega un bloque. `num` es su índice, y es el número que se guarda en el mundo (Uint16). Propiedades:

| Propiedad | Qué es |
|---|---|
| `cat` | Una de `CATEGORIAS` (14) |
| `dureza`, `resistencia` | Como en Minecraft Java; −1 = indestructible |
| `herramienta`, `nivel` | Herramienta adecuada y nivel mínimo para que suelte el bloque (`madera`…`diamante`, o `null`) |
| `luz` | 0–15 |
| `inflamable`, `gravedad`, `transparente`, `renovable` | Booleanos |
| `apilable` | 64, 16 o 1 |
| `forma` | `cubo`, `losa`, `escalera`, `cruz` (plantas), `hojas`, `cristal`, `liquido`, `alfombra`, `valla`, `muro`, `panel`, `puerta`… |
| `tex` | `{todo}` o `{arriba, lado, abajo}`; cada uno es `[patrón, color1, color2?]` |
| `version`, `nota` | Para la ficha |
| `colocable` | false para el aire y la luz invisible |

**Agregar un bloque:** una línea `B(...)` en su categoría. Si usa un patrón que no existe, se dibuja liso. Después hay que regenerar `docs/BLOQUES.md`. Ojo: **agregar o quitar bloques en medio cambia los `num`**. Las construcciones guardadas usan esos números, así que conviene agregar siempre al final.

## Texturas (`texturas.js`)

- **`construirTexturas()`:** dibuja cada combinación distinta de patrón y colores una sola vez (unas 588 capas) y devuelve:
  - `capas`: píxeles RGBA de 16×16 y si la capa tiene huecos (`alfa`, para recorte) o es translúcida (`translucido`: agua, cristal tintado, slime y miel);
  - `caras`: tres capas por bloque (arriba, lados, abajo).
- **Patrones:** son unos 90, como piedra, roca, ladrillo, tablones, tronco, anillos, hojas, mena, lana, vidriado, cristal, sillar o los sprites de plantas. Usan ruido que se repite en los bordes, para que las caras encajen.
- **`icono(b, tex, tam)`:** cubo isométrico de 3 caras para el catálogo y la barra; las plantas salen como sprite.

## Mundo (`mundo.js`)

- **`columna(x, z, col)`:** llena un `Uint16Array(256)` con los bloques de esa columna. Es determinista: no hay mapa guardado.
  1. **Suelo:** `alturaSuelo(x, z)` suma la meseta (ruido fbm), la escarpa (`bordeMeseta(z)`), el valle, las dunas lejanas, las explanadas niveladas de cada pirámide, el foso de la Esfinge, el Nilo y el canal.
  2. **Capas:** lecho de roca en y 0, piedra, caliza o arenisca y arriba arena; en el valle, tierra y hierba.
  3. **Superficie:** agua, campos, caña, hierba, afloramientos de roca o arbustos secos.
  4. **Estructuras:** cada una es `{x0, z0, x1, z1, aplicar(x, z, col, suelo)}`. Son las pirámides, las tallas de los interiores, la Esfinge, los templos, las calzadas, los recintos, las fosas de las barcas, las mastabas, Khentkawes, el Muro del Cuervo y la aldea.
  5. **Palmeras:** en una rejilla de 7×7, solo en el valle y fuera de los monumentos, con caché.
- **Interiores (`TALLAS`):** se tallan después de construir la pirámide:
  - `caja`: con `forro` (recubre de granito) y `suelo: "rugoso"`;
  - `rampa`: pasadizo inclinado a lo largo de z;
  - `galeria`: Gran Galería en saledizo;
  - `dosaguas`: techo a dos aguas;
  - `conducto`: conducto de 1×1 inclinado.
- **`bloqueEn(x, y, z)`:** un bloque suelto, con caché de 4096 columnas. Lo usan el hilo principal para apuntar y la física para los choques.
- **`LUGARES`:** cada lugar tiene dónde pararse (los pies), un punto `mira` hacia el que voltea la cámara y una nota.
- **`alturaLejana` y `sueloLejano`:** alimentan la malla del paisaje lejano.

**Revisar un interior sin la tablet:** con Node se puede imprimir un corte; así se comprobó la Gran Pirámide.

```bash
cd assets/js && node -e "import('./mundo.js').then(m=>{for(let y=124;y>=26;y--){let l='';for(let z=-118;z<=20;z++)l+=m.bloqueEn(7,y,z)?'#':' ';console.log(y,l)}})"
```

## Mallas (`trabajador.js`)

- **Chunks:** cada chunk mide 16×16 columnas × 256 de alto. El worker lo genera con un borde de un bloque y arma dos mallas: sólida (opacos y recortes) y transparente (agua, cristal tintado).
- **Caras visibles:** se ocultan las que tocan un bloque opaco, y las que tocan un bloque igual cuando son cristal, agua u hojas.
- **Vértices:** cada vértice ocupa 12 bytes: posición en dieciseisavos de bloque y capa de textura (Int16 ×4), más u, v, banderas y cara (Uint8 ×4). Las banderas son:
  - oclusión ambiental (0–3);
  - «expuesto» (+4): el aire de enfrente está por encima del techo opaco de esa columna; si no lo está, la cara se oscurece, como en el interior de las pirámides;
  - «emisivo» (+8).
- **Plantas:** las de `cruz` son dos planos cruzados de dos caras.
- **Cambios del jugador:** el worker los recibe (`{tipo:"cambios"}`) y los aplica sobre cada columna generada.
- **Tiempos:** en Node, de 3 a 30 ms por chunk (el más pesado es el centro de Keops).

## Motor (`motor.js`)

- **Cámara relativa:** todo se dibuja con la cámara en el origen. Cada chunk recibe `uOrigen = posición del chunk − cámara`, así no se pierde precisión lejos de (0, 0).
- **Texturas:** van en un `TEXTURE_2D_ARRAY` de 16×16 con mipmaps (`NEAREST_MIPMAP_LINEAR`).
- **Luz:** sombra fija por cara (arriba 1.0; sur 0.9; este 0.8; oeste 0.7; norte 0.62; abajo 0.52), multiplicada por la oclusión ambiental. Las caras sin cielo quedan al 22 %. La linterna ilumina 18 m alrededor de la cámara. Al final se mezcla la niebla.
- **Paisaje lejano:**
  - una malla de alturas cada 16 m sobre ±2048 m, con color por tipo de suelo, más las pirámides como pirámides lisas;
  - una máscara de 256×256 (un texel por chunk) dice qué chunks ya están cargados, y ahí el paisaje lejano se descarta;
  - así se ve todo hasta el horizonte sin huecos mientras cargan los chunks.
- **Cielo:** un triángulo a pantalla completa con degradado y sol.
- **Carga de chunks:**
  - se piden en círculo alrededor de la cámara, primero los cercanos y los de enfrente;
  - se reparten entre 2 y 6 workers según los núcleos;
  - se sueltan los que quedan a más de `radio + 2.5`;
  - los chunks fuera de la vista no se dibujan.
- **Transparentes:** se dibujan al final, de lejos a cerca, sin escribir profundidad.

## Juego (`juego.js`)

- **Jugador:** caja de 0.6 × 1.8 m, con los ojos a 1.62 m.
- **Choques:** se resuelven por eje en pasos de 0.45 m. Caminando se sube solo un escalón de un bloque. Atravesando paredes no hay choques.
- **Velocidades:** volando, 12 m/s (60 en turbo, ×2.5 con Ctrl); caminando, 4.3 m/s (5.6 corriendo). La gravedad es 28 m/s² y el salto, 8.6 m/s.
- **Apuntar:** rayo DDA de 14 m, que ignora líquidos.
- **Poner:** en la cara apuntada, sin encerrarte dentro del bloque.
- **Linterna:** se enciende si hay un bloque sólido en los 40 m sobre la cámara.
- **Guardado:**
  - **construcciones:** cada 3 s, en IndexedDB (base `giza`, almacén `datos`, clave `cambios`) como una lista `["x,y,z", id]`;
  - **posición y barra:** en `localStorage` (`giza:pos` y `giza:barra`);
  - **ajustes:** en `giza:ajustes`.

## Controles táctiles (`app.js`)

- **Mitad izquierda** (debajo del 20 % superior): joystick de 55 px de radio, que aparece donde pones el dedo.
- **Resto de la pantalla:** mirar. Un toque de menos de 380 ms sin moverse pone un bloque. Mantener 380 ms quita un bloque y sigue quitando cada 260 ms. Vibra al poner y al quitar.
- **Barra:** tocar elige; mantener 550 ms abre el catálogo para cambiar esa casilla.
- **Ratón:** con el ratón capturado (pointer lock) mandan los clics y los eventos táctiles se ignoran.
- **Diálogos:** son ventanas propias; no se usan `alert` ni `confirm` del navegador.

## Probar sin compilar

Los módulos que no tocan el DOM cargan en Node (bloques, texturas, mundo y trabajador con un `self` falso). Por ejemplo, para medir chunks:

```bash
cd assets/js && node -e "
const msgs=[];globalThis.self={postMessage:(m)=>msgs.push(m)};
Promise.all([import('./texturas.js'),import('./trabajador.js')]).then(([T])=>{const t=T.construirTexturas();
self.onmessage({data:{tipo:'preparar',caras:t.caras,alfa:t.capas.map(c=>c.alfa?1:0),trans:t.capas.map(c=>c.translucido?1:0)}});
self.onmessage({data:{tipo:'chunk',cx:0,cz:0,gen:1}});const m=msgs.pop();console.log(m.solido.n/4,'cuadros')})"
```

En la tablet, los errores de la página salen en `adb logcat | grep chromium`.
