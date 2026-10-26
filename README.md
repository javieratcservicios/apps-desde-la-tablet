# Apps Android hechas, compiladas e instaladas desde la misma tablet

Sin computadora y sin Android Studio. Le pido la app a Claude Code en Termux, se compila ahí mismo en segundos y se instala por depuración inalámbrica en la propia tablet. Después se prueba en pantalla por adb.

**Equipo:** Samsung Galaxy Tab S10 Ultra (SM-X920) · Termux · Claude Code · adb inalámbrico

| Compilar Giza Creativo de cero | Instalarla por adb inalámbrico | APK firmado |
|---|---|---|
| **2.9 s** | **336 ms** | **79 KB** |

![Giza Creativo: vista aérea en bloques de la Gran Esfinge y sus templos](img/giza-juego.jpg)

*Giza Creativo corriendo en la tablet, minutos después de compilarse e instalarse desde Termux. Los números de arriba son de esa misma corrida (26 de octubre de 2026).*

## Qué hay en este repositorio

| Carpeta | Qué es |
|---|---|
| [`giza/`](giza/) | Código completo de Giza Creativo, listo para compilar con `bash build.sh` |
| [`scripts/instalar-entorno.sh`](scripts/instalar-entorno.sh) | Instala en Termux todo lo necesario para compilar APKs |
| [`scripts/instalar-claude.sh`](scripts/instalar-claude.sh) | Instala Claude Code en Termux (el instalador oficial no funciona en Android) |
| [`scripts/conectar-adb.sh`](scripts/conectar-adb.sh) | Encuentra el puerto real de la depuración inalámbrica y conecta adb |
| [`img/`](img/) | Capturas de las apps |

## Montar el entorno desde cero

Necesitas un Android de 64 bits (`uname -m` debe decir `aarch64`), Android 11 o más nuevo para la depuración inalámbrica y una red Wi-Fi.

### 1. Instalar Termux

Instálalo desde [F-Droid](https://f-droid.org/packages/com.termux/) o desde los [releases de GitHub](https://github.com/termux/termux-app/releases). **No uses la versión de Google Play**: está desactualizada. Si después instalas complementos como Termux:API, bájalos del mismo lugar, porque comparten firma.

Ábrelo y deja que termine de preparar su sistema la primera vez.

### 2. Bajar este repositorio e instalar las herramientas

```bash
pkg install -y git
git clone https://github.com/javieratcservicios/apps-desde-la-tablet
cd apps-desde-la-tablet
bash scripts/instalar-entorno.sh
```

El script instala Java (OpenJDK 21), `aapt2`, `d8`, `apksigner`, `adb` y `zip`, y baja de los servidores de Google la plataforma Android 36 (`android.jar`, unos 65 MB) en `~/android-sdk/android-36/`. También pide el permiso de almacenamiento para que Termux pueda copiar APKs a Descargas: acéptalo.

### 3. Instalar Claude Code

```bash
bash scripts/instalar-claude.sh
```

El instalador oficial (`curl https://claude.ai/install.sh | bash`) no funciona en Termux porque el programa está hecho para Linux con glibc y Android usa otra biblioteca (Bionic). El script:

- instala `glibc-runner`, que trae el cargador de glibc para Termux;
- baja el binario oficial de Claude Code para `linux-arm64` y verifica su checksum;
- crea el comando `claude`, que lo arranca con ese cargador, y `claude-update` para actualizarlo.

Abre una terminal nueva y ejecuta `claude`. La primera vez te da un enlace para iniciar sesión con tu cuenta de Claude: ábrelo en el navegador y pega el código de regreso en Termux.

### 4. Activar la depuración inalámbrica

1. **Opciones de desarrollador:** en Ajustes → Acerca de la tableta → Información de software, toca 7 veces «Número de compilación». En otras marcas el lugar cambia un poco.
2. En Ajustes → Opciones de desarrollador, activa **Depuración inalámbrica**.
3. Pon la pantalla dividida: Termux de un lado y Ajustes del otro. La ventana con el código se cierra si cambias de app, por eso hace falta.
4. Toca «Vincular dispositivo con código de sincronización» y en Termux escribe la IP, el puerto y el código que aparecen:

```bash
adb pair 192.168.1.x:PUERTO_DE_VINCULAR CODIGO
```

5. Conecta. El puerto de conexión es otro y no siempre coincide con el que muestra la pantalla, así que el script lo busca solo (tarda unos 20 segundos):

```bash
bash scripts/conectar-adb.sh
adb devices      # debe aparecer   192.168.1.x:PUERTO   device
```

La vinculación se hace una sola vez. Cuando reinicies la tablet o cambie la red, solo vuelve a correr `conectar-adb.sh`.

## Pruébalo: compila e instala Giza

```bash
cd giza
bash build.sh                          # unos 3 segundos
adb install -r build/GizaCreativo.apk
adb shell monkey -p com.javier.giza -c android.intent.category.LAUNCHER 1
```

La primera vez, `build.sh` crea su propia llave de firma (`debug.keystore`). **Guárdala:** si se pierde, las siguientes versiones no se instalan encima y hay que desinstalar la app, con todo y lo que hayas construido.

¿Sin adb? Copia el APK a Descargas y ábrelo para instalarlo a mano:

```bash
cp build/GizaCreativo.apk ~/storage/downloads/ && termux-open ~/storage/downloads/GizaCreativo.apk
```

Cómo se juega, el mapa y el catálogo de bloques están en [`giza/README.md`](giza/README.md) y en [`giza/docs/`](giza/docs/).

## De la idea a la app instalada

### 1. Pedir la app

Le explico a Claude qué quiero, en español y con mis palabras: «una app para mis inspecciones contra incendio», «un juego tipo Minecraft con las pirámides de Giza». Claude escribe el proyecto completo en una carpeta de Termux.

### 2. Una forma de app que sí compila en Termux

Gradle no corre bien en Termux, así que todas las apps siguen el mismo molde: una **WebView** que muestra HTML, CSS y JavaScript. Cuando la app necesita algo del teléfono (SQLite, cámara, ubicación, archivos o PDF), se agrega un **puente en Java**.

```
AndroidManifest.xml
assets/        # la interfaz: index.html, app.js, estilos
java/          # MainActivity (+ el puente con Android si hace falta)
res/           # ícono y recursos
build.sh       # compila y firma
```

En Giza, la parte de Java es una sola clase. Sirve los archivos de `assets/` como si fueran un sitio web real (`https://giza.local/`), para que los módulos de JavaScript, los workers e IndexedDB funcionen igual que en un navegador ([código completo](giza/java/com/javier/giza/MainActivity.java)):

```java
web.setWebViewClient(new WebViewClient() {
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
        Uri u = r.getUrl();
        if (!HOST.equals(u.getHost())) return null;
        String path = u.getPath() == null ? "" : u.getPath().replaceFirst("^/+", "");
        if (path.isEmpty()) path = "index.html";
        try {
            InputStream in = getAssets().open(path);
            Map<String, String> h = new HashMap<>();
            h.put("Cache-Control", "no-cache");
            h.put("Access-Control-Allow-Origin", "*");
            return new WebResourceResponse(tipo(path), "utf-8", 200, "OK", h, in);
        } catch (Exception e) {
            return new WebResourceResponse("text/plain", "utf-8", 404, "No encontrado", new HashMap<>(), null);
        }
    }
});
web.loadUrl("https://" + HOST + "/index.html");
```

### 3. Compilar con las herramientas de Android

Un `build.sh` de 20 líneas llama directo a las mismas herramientas que usa Android Studio por dentro:

**aapt2 → javac → d8 → zip → apksigner**

Este es el de Giza, completo:

```bash
#!/data/data/com.termux/files/usr/bin/bash
# Compila y firma el APK con las herramientas de Termux (aapt2, javac, d8, apksigner).
set -e
cd "$(dirname "$0")"
JAR="$HOME/android-sdk/android-36/android.jar"
KS=debug.keystore
VERSION=1.0
LIBS=""
rm -rf build && mkdir -p build/gen build/classes build/dex
# 1. recursos (íconos, textos) y manifiesto -> APK base con los assets
aapt2 compile --dir res -o build/res.zip
aapt2 link -o build/base.apk -I "$JAR" --manifest AndroidManifest.xml -A assets --java build/gen \
  --debug-mode --min-sdk-version 30 --target-sdk-version 34 --version-code 1 --version-name "$VERSION" build/res.zip
# 2. Java -> .class
javac -nowarn -source 11 -target 11 -classpath "$JAR" -d build/classes \
  $(command find java build/gen -name '*.java') 2>&1 | command grep -v 'bootstrap class path' || true
# 3. .class -> classes.dex (el formato que corre Android)
d8 --lib "$JAR" --min-api 30 --output build/dex $(command find build/classes -name '*.class') $LIBS 2>&1 \
  | command grep -v -e '^Info' -e 'CachingSha2' -e 'nextAuthenticationStep' -e 'locals-table' || true
# 4. meter el .dex al APK
cp build/base.apk build/unsigned.apk
(cd build/dex && zip -q -u ../unsigned.apk classes*.dex)
# 5. firmar (la llave se crea la primera vez)
[ -f "$KS" ] || keytool -genkeypair -keystore "$KS" -storepass android -keypass android -alias key \
  -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Giza Creativo" >/dev/null 2>&1
apksigner sign --ks "$KS" --ks-pass pass:android --key-pass pass:android --out build/GizaCreativo.apk build/unsigned.apk
ls -l build/GizaCreativo.apk
```

La contraseña `android` es la convencional de las llaves de depuración. Para una app que vas a repartir, usa una llave propia con contraseña fuerte y guárdala fuera del aparato.

### 4. Conectar la depuración inalámbrica a la propia tablet

Termux hace de computadora y se conecta a la misma tablet por la red Wi-Fi: `adb pair` una vez, y `scripts/conectar-adb.sh` cada vez que cambie el puerto (ver [Montar el entorno](#4-activar-la-depuración-inalámbrica)).

### 5. Instalar y probar

Con adb conectado, Claude instala la app, la abre, toma capturas de pantalla y las revisa. Si algo se ve mal, corrige el código, vuelve a compilar y repite.

```bash
adb install -r build/GizaCreativo.apk      # Success · 336 ms
adb shell monkey -p PAQUETE 1              # abrir la app
adb exec-out screencap -p > captura.png    # Claude la mira
adb shell pm grant PAQUETE PERMISO         # dar permisos sin tocar
adb shell pm clear PAQUETE                 # borrar datos y empezar de cero
```

Para ver lo que pasa dentro de la WebView, la app se compila en modo depuración (`--debug-mode`, como en el `build.sh` de arriba) y adb abre un túnel a sus DevTools. Así Claude puede leer errores y ejecutar JavaScript dentro de la app mientras corre:

```bash
adb forward tcp:9222 localabstract:webview_devtools_remote_$(adb shell pidof PAQUETE)
curl -s http://localhost:9222/json     # lista las páginas que se pueden inspeccionar
```

## Lo que ya salió de aquí

### Inspector
![Inspector](img/inspector.jpg)

Inspecciones contra incendio para reemplazar AppSheet. Tiene 19 formatos de checklist, escaneo de equipos, check-in con ubicación, firma y fotos. Guarda todo en el teléfono y sincroniza con un servidor propio.

### Giza Creativo
![Giza Creativo](img/giza.jpg)

Juego de bloques en modo creativo: la meseta de Giza de 3 × 3 km a escala 1:1, nueve pirámides con pasadizos por dentro y 872 bloques con texturas dibujadas por código. Su código completo está en [`giza/`](giza/).

### Módulos
![Módulos](img/modulos.jpg)

Corre pantallas HTML que se pegan en una carpeta, sin volver a compilar, organizadas por categorías. Cada formulario tiene su propia tabla en SQLite.

### Claudio
![Claudio](img/claudio.jpg)

Una interfaz propia para platicar con Claude y otros asistentes que corren en Termux, con voz y consumo del plan a la vista.

## Trampas del camino

- **El puerto de la pantalla engaña.** El puerto que muestra Depuración inalámbrica no siempre es el que acepta la conexión. `scripts/conectar-adb.sh` busca los puertos abiertos entre 30000 y 50000 y se conecta al que responde. El `adb` de Termux no trae `adb mdns`, así que no se puede preguntar directamente.
- **La IP cambia.** Cada red o cada reinicio puede dar otra IP. El script toma la IP actual de la tablet.
- **Cuida la llave de firma.** Si se pierde el `keystore`, la siguiente versión ya no se instala encima de la anterior y hay que desinstalar, con todo y datos. Respáldala fuera del aparato y nunca la subas a un repositorio público.
- **Gradle no es opción.** Los proyectos con Gradle y Android Gradle Plugin no compilan en Termux. Llamar directo a aapt2, javac y d8 es lo que hace que todo funcione aquí.
- **Claude Code necesita su cargador.** El binario oficial es para glibc; en Termux se arranca con el cargador de `glibc-runner`. Además hay que quitar `LD_PRELOAD` antes de arrancarlo y no modificar el binario con `patchelf`, porque falla. `scripts/instalar-claude.sh` ya lo hace así.
- **Nada de ventanas del navegador.** Los `alert` y `confirm` de una WebView salen con «La página … dice». Se ven feos, así que cada app usa ventanas propias.

## Lo que hay en GitHub

Encontré proyectos que cubren partes del camino, pero ninguno junta todo: un asistente de IA que escribe la app, la compila en el mismo Android sin Gradle, la instala por depuración inalámbrica y la revisa con capturas.

- [buildAPKs](https://github.com/BuildAPKs/buildAPKs.keyboards) y [termux-buildapk](https://github.com/TheDiamondYT1/termux-buildapk): scripts para compilar APKs en Termux.
- [Bacol](https://community.e.foundation/t/bacol-build-apks-from-the-command-line-aka-bacol/20891): los mismos pasos aapt2, javac y d8, pero pensado para computadora.
- [claude-code-android](https://github.com/ferrumclaudepilgrim/claude-code-android): guía para correr Claude Code en Android, con una sección de adb hacia el mismo aparato.

---

Capturas tomadas por adb en la tablet el 26 de octubre de 2026. Se difuminaron nombres, conversaciones y datos de cuenta.
