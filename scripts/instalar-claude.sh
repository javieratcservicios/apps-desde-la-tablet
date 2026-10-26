#!/data/data/com.termux/files/usr/bin/bash
# Instala Claude Code en Termux.
#
# El instalador oficial (curl https://claude.ai/install.sh | bash) NO sirve en
# Android: el binario es para glibc y Termux usa Bionic. Aqui se descarga el binario
# oficial de linux-arm64, se verifica su checksum y se arranca con el loader de glibc
# que trae el paquete glibc-runner.
#
# Deja dos comandos en ~/.local/bin:
#   claude          lanzador
#   claude-update   baja la ultima version
set -e

[ "$(uname -m)" = "aarch64" ] || { echo "Solo hay binario para dispositivos arm64 (aarch64)." >&2; exit 1; }

echo "==> Paquetes: glibc-runner"
pkg install -y glibc-repo
pkg install -y glibc-runner curl python

BINDIR="$HOME/.local/bin"
mkdir -p "$BINDIR" "$HOME/.claude/local" "$HOME/.claude/downloads"

cat > "$BINDIR/claude" <<'LANZADOR'
#!/data/data/com.termux/files/usr/bin/bash
# Claude Code en Termux (Android/Bionic).
#
# El binario oficial de Claude Code es glibc, no bionico: se arranca con el
# loader de glibc que instala el paquete glibc-runner.
#
# Dos reglas que costaron encontrar:
#  1) Hay que quitar el LD_PRELOAD bionico de Termux
#     (libtermux-exec-ld-preload.so) antes de exec; si no, el loader de glibc
#     intenta cargarlo y aborta con "libc.so: invalid ELF header".
#  2) NO pasar el binario por patchelf (a diferencia de otros programas
#     glibc): el resultado segfaultea. Se ejecuta el binario original.
#
# No se usa 'grun' porque su script expande "$@" sin comillas y parte los
# argumentos con espacios (p. ej. -p "texto con espacios").
G="$PREFIX/glibc"
BIN="$HOME/.claude/local/claude"
[ -x "$BIN" ] || { echo "claude: falta el binario en $BIN" >&2; exit 1; }
unset LD_PRELOAD
exec "$G/lib/ld-linux-aarch64.so.1" "$BIN" "$@"
LANZADOR

cat > "$BINDIR/claude-update" <<'ACTUALIZADOR'
#!/data/data/com.termux/files/usr/bin/bash
# Actualiza el binario de Claude Code en Termux (el instalador oficial
# curl https://claude.ai/install.sh | bash NO sirve en Android/Bionic).
set -e
export PATH="$HOME/.local/bin:$PATH"
BIN="$HOME/.claude/local/claude"
DL="$HOME/.claude/downloads"
V=$(curl -fsSL https://downloads.claude.ai/claude-code-releases/latest)
[[ "$V" =~ ^[0-9]+\.[0-9]+\.[0-9]+ ]] || { echo "Version no valida: $V" >&2; exit 1; }
echo "Ultima version: $V"
EXP=$(curl -fsSL "https://downloads.claude.ai/claude-code-releases/$V/manifest.json" \
      | python3 -c 'import sys,json;print(json.load(sys.stdin)["platforms"]["linux-arm64"]["checksum"])')
mkdir -p "$DL" "$(dirname "$BIN")"
TMP="$DL/claude-$V-linux-arm64"
echo "Descargando..."
curl -fL --progress-bar -o "$TMP" "https://downloads.claude.ai/claude-code-releases/$V/linux-arm64/claude"
GOT=$(sha256sum "$TMP" | awk '{print $1}')
[ "$GOT" = "$EXP" ] || { echo "Checksum no coincide" >&2; rm -f "$TMP"; exit 1; }
chmod 700 "$TMP"
cp "$TMP" "$BIN"
echo "$V" > "$DL/.latest"
find "$DL" -name 'claude-*-linux-arm64' ! -name "claude-$V-linux-arm64" -delete
echo "Instalado: $(claude --version)"
ACTUALIZADOR
chmod 700 "$BINDIR/claude" "$BINDIR/claude-update"

# ~/.local/bin en el PATH de las proximas terminales
grep -qs '\.local/bin' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
export PATH="$BINDIR:$PATH"

echo "==> Descargando Claude Code"
"$BINDIR/claude-update"

echo
echo "Listo. Abre una terminal nueva y ejecuta 'claude' una vez para iniciar sesion."
