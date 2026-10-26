#!/data/data/com.termux/files/usr/bin/bash
# Conecta adb a la depuración inalámbrica de este mismo Android.
#
# El puerto de conexión cambia cada vez y no siempre coincide con el que muestra la
# pantalla. Este script busca los puertos abiertos entre 30000 y 50000 y prueba
# `adb connect` en cada uno hasta que uno responde.
#
# Uso:  bash scripts/conectar-adb.sh [IP]
# Antes, una sola vez por dispositivo: adb pair IP:PUERTO_DE_VINCULAR CODIGO
set -e
IP="$1"
if [ -z "$IP" ]; then
  IP=$(ifconfig 2>/dev/null | awk '/inet / && $2 != "127.0.0.1" {print $2; exit}')
fi
[ -n "$IP" ] || { echo "No encontré la IP de la red Wi-Fi. Pásala como argumento." >&2; exit 1; }
echo "Buscando puertos abiertos en $IP..."
PUERTOS=$(python3 - "$IP" <<'PY'
import socket, sys
from concurrent.futures import ThreadPoolExecutor
ip = sys.argv[1]
def abierto(p):
    s = socket.socket(); s.settimeout(0.3)
    try: return p if s.connect_ex((ip, p)) == 0 else None
    finally: s.close()
with ThreadPoolExecutor(200) as ex:
    print(" ".join(str(p) for p in ex.map(abierto, range(30000, 50001)) if p))
PY
)
[ -n "$PUERTOS" ] || { echo "No hay puertos abiertos. ¿Está activa la depuración inalámbrica?" >&2; exit 1; }
for p in $PUERTOS; do
  echo "Probando $IP:$p"
  if adb connect "$IP:$p" 2>&1 | grep -q "connected to"; then
    sleep 1
    if adb -s "$IP:$p" get-state 2>/dev/null | grep -q device; then
      echo "Conectado: $IP:$p"
      exit 0
    fi
  fi
  adb disconnect "$IP:$p" >/dev/null 2>&1 || true
done
echo "Ningún puerto aceptó la conexión. Vuelve a vincular con adb pair." >&2
exit 1
