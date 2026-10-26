#!/data/data/com.termux/files/usr/bin/bash
# Deja Termux listo para compilar apps Android sin Gradle:
#   1. paquetes: Java, aapt2, d8, apksigner, adb, git
#   2. android.jar de la plataforma Android 36 (de los servidores de Google)
#   3. acceso al almacenamiento (para copiar APKs a Descargas)
# Se puede correr varias veces: lo que ya está instalado se salta.
set -e
SDK="$HOME/android-sdk"
PLATFORM=36
JAR="$SDK/android-$PLATFORM/android.jar"

[ -n "$PREFIX" ] && [ -d /data/data/com.termux ] || { echo "Este script es para Termux (Android)." >&2; exit 1; }

echo "==> Paquetes de Termux"
export DEBIAN_FRONTEND=noninteractive
pkg update -y -o Dpkg::Options::="--force-confnew"
pkg upgrade -y -o Dpkg::Options::="--force-confnew"
pkg install -y curl unzip zip python git openjdk-21 aapt2 d8 apksigner android-tools

echo "==> Plataforma Android $PLATFORM (android.jar)"
if [ -f "$JAR" ]; then
  echo "  ya está en $JAR"
else
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  for rev in r02 r01; do
    url="https://dl.google.com/android/repository/platform-${PLATFORM}_${rev}.zip"
    echo "  descargando $url (unos 65 MB)"
    if curl -fL --retry 3 -o "$tmp/platform.zip" "$url"; then break; fi
    rm -f "$tmp/platform.zip"
  done
  [ -f "$tmp/platform.zip" ] || { echo "No se pudo descargar la plataforma Android." >&2; exit 1; }
  unzip -q "$tmp/platform.zip" -d "$tmp/x"
  mkdir -p "$SDK"
  mv "$tmp"/x/* "$SDK/android-$PLATFORM"
  [ -f "$JAR" ] || { echo "El archivo descargado no trae android.jar." >&2; exit 1; }
  echo "  instalada en $SDK/android-$PLATFORM"
fi

echo "==> Almacenamiento"
[ -d "$HOME/storage/downloads" ] && echo "  ya configurado" || termux-setup-storage

echo
echo "Listo. Revisa con:  java -version; aapt2 version; d8 --version; adb version"
