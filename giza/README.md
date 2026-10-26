# Giza Creativo

App para Android (tablet) con un juego propio estilo Minecraft, hecha el 2026-10-24. Tiene dos partes:

- **Catálogo de bloques:** 872 bloques de Minecraft Java Edition 1.21 con sus características, más 4 bloques propios del mapa.
- **Giza a escala 1:1 en modo creativo:** las pirámides, la Esfinge, los templos y el valle del Nilo. Un bloque es un metro y el mapa mide unos 3 × 3 km.

No usa Minecraft ni sus archivos: el motor, el mapa y las texturas (dibujadas por código) son propios.

## Instalar

En Termux:

```bash
cd ~/giza-app
bash build.sh                       # compila y firma build/GizaCreativo.apk
adb install -r build/GizaCreativo.apk
```

- `build.sh` usa las herramientas de Termux: aapt2, javac, d8 y apksigner, con la plataforma Android 36 en `~/android-sdk/android-36/android.jar`.
- La primera vez crea `debug.keystore`. Si se pierde la llave, hay que desinstalar la app antes de instalar la nueva y se pierden las construcciones guardadas.
- Sin adb: copia el APK a Descargas y ábrelo con `termux-open`.

**Depuración inalámbrica:**
1. En la tablet, abre Opciones de desarrollador → Depuración inalámbrica → «Vincular con código», y luego corre `adb pair IP:PUERTO CÓDIGO`.
2. El puerto de conexión es otro, distinto del de vincular. Si no aparece en pantalla, busca los puertos abiertos entre 30000 y 50000 y prueba `adb connect IP:PUERTO` en cada uno.

## Cómo se usa

### Inicio
- **Explorar Giza:** entra al mapa donde lo dejaste. La primera vez aparece en la vista panorámica.
- **Catálogo de bloques:** abre el catálogo.

### Moverse

| Tablet | Teclado y ratón | Qué hace |
|---|---|---|
| Joystick: arrastra en la mitad izquierda | W A S D o flechas | Caminar o volar |
| Arrastra en la mitad derecha | Mover el ratón (clic para capturarlo) | Mirar |
| ▲ / ▼ | Espacio / Shift | Subir y bajar (caminando, ▲ salta) |
| 🕊 | F | Volar o caminar (caminando, los escalones de un bloque se suben solos) |
| 👻 | N | Atravesar paredes |
| ⏩ | Ctrl (mantener) | Velocidad alta (60 m/s) |

### Construir

| Tablet | Teclado y ratón | Qué hace |
|---|---|---|
| Tocar | Clic derecho | Poner el bloque elegido |
| Mantener | Clic izquierdo | Quitar bloques (sigue quitando mientras mantienes) |
| 💧 | Clic central | Copiar a la barra el bloque al que apuntas |
| Tocar una casilla de la barra | 1–9 o la rueda | Elegir bloque |
| Mantener una casilla | — | Cambiar el bloque de esa casilla desde el catálogo |
| ▦ Bloques | E | Catálogo para elegir un bloque |

Lo que construyes se guarda solo en la tablet (IndexedDB de la app). Ajustes → «Borrar mis construcciones» regresa el mapa a su estado original.

### Lugares (📍, tecla M)
Hay 18 lugares para saltar directo:
- **Exterior:** vista panorámica, la Esfinge, la Estela del Sueño, las cimas de Keops y de Kefrén, Micerinos y sus reinas, las pirámides de las reinas de Keops, el Templo del Valle, el cementerio occidental, el Muro del Cuervo y el Nilo.
- **Por dentro:** la entrada de Keops, la Gran Galería, la Cámara del Rey, la Cámara de la Reina, las cámaras de descarga, la cámara subterránea y la cámara de Kefrén.

Dentro de las pirámides se enciende sola una linterna. Las cámaras de descarga miden un metro de alto: para recorrerlas hay que atravesar paredes, y el lugar lo activa solo.

### Ajustes (⚙)
- **Imagen:** distancia de visión (96–384 m), resolución, campo de visión y hora del día.
- **Control:** sensibilidad al mirar, volar y atravesar paredes.
- **Borrar mis construcciones.**

### Catálogo
- **Búsqueda:** por nombre en español o por id de Minecraft (`polished_granite`).
- **Filtros:** 14 categorías, más «dan luz», «caen», «arden», «transparentes» e «indestructibles».
- **Ficha:** dureza, resistencia a explosiones, herramienta, nivel para recogerlo, luz, si arde, si cae, si deja pasar la luz, cuánto se apila, si es renovable, forma, versión y una nota. Además trae el tiempo para romperlo a mano y con cada nivel de herramienta.
- **Construir con él:** pone el bloque en la barra y abre el mapa.

La lista completa de bloques está en [docs/BLOQUES.md](docs/BLOQUES.md).

## Documentación

- [docs/MAPA.md](docs/MAPA.md): qué tiene el mapa, dónde está cada monumento y de dónde salen las medidas.
- [docs/TECNICA.md](docs/TECNICA.md): cómo está hecha la app, archivo por archivo, y cómo cambiarla.
- [docs/BLOQUES.md](docs/BLOQUES.md): los 872 bloques con todas sus características.
- [CHANGELOG.md](CHANGELOG.md): registro de cambios.

## Limitaciones conocidas

- **Iluminación:** no hay luz de antorchas que se propague. Los bloques que emiten luz se ven brillantes pero no iluminan alrededor; a cambio, dentro de las pirámides se enciende una linterna.
- **Formas simplificadas:** las escaleras se dibujan como cubo, y vallas, muros, puertas, paneles y camas se dibujan como cajas simples sin orientación.
- **Física:** el agua no fluye y la arena no cae. Los bloques no tienen comportamiento: no hay redstone ni pistones.
- **Sin criaturas** ni modo supervivencia.
- **Medidas aproximadas:** los interiores se ensancharon a 2 bloques para poder pasar (los pasadizos reales miden 1.05 × 1.2 m). Las medidas exactas están en MAPA.md.
- **Sin probar en la tablet** (al 2026-10-25): el botón Atrás de Android, poner y quitar bloques con el dedo, y el modo caminar.
