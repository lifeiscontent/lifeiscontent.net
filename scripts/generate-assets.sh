#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"
ICON_SQUARE="$ROOT_DIR/src/assets/images/icon-square.svg"
ICON_SVG="$ROOT_DIR/src/assets/images/icon.svg"

PREVIEW_PORT="${PREVIEW_PORT:-4321}"
BASE_URL="http://localhost:${PREVIEW_PORT}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: '$1' command is required but not found." >&2
    exit 1
  fi
}

require_cmd magick
require_cmd pnpm
require_cmd curl

mkdir -p "$PUBLIC_DIR"

echo "Generating base icons..."
magick -background none "$ICON_SQUARE" -resize 144x144 "$PUBLIC_DIR/icon-144.png"
magick -background none "$ICON_SQUARE" -resize 192x192 "$PUBLIC_DIR/icon-192.png"
magick -background none "$ICON_SQUARE" -resize 512x512 "$PUBLIC_DIR/icon-512.png"

magick -background none "$ICON_SQUARE" -resize 192x192 "$PUBLIC_DIR/apple-touch-icon.png"
magick -background none "$ICON_SQUARE" -resize 192x192 "$PUBLIC_DIR/apple-touch-icon-precomposed.png"
magick -background none "$ICON_SQUARE" -define icon:auto-resize=16,32,48,64 "$PUBLIC_DIR/favicon.ico"

echo "Skipping build/preview (assuming server is running at ${BASE_URL})..."

echo "Capturing Playwright screenshots..."
pnpm exec playwright screenshot --color-scheme=light --viewport-size=1280,720 "$BASE_URL" "$PUBLIC_DIR/screenshot-desktop.png"
pnpm exec playwright screenshot --color-scheme=light --device="iPhone 15 Pro" "$BASE_URL" "$PUBLIC_DIR/screenshot-mobile.png"

echo "Assets regenerated successfully."
