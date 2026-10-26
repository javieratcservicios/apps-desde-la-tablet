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
