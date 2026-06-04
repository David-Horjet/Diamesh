#!/bin/bash
# Pre-downloads MedPsy models to local cache before QVAC ingest.
# QVAC's HTTP downloader doesn't support HuggingFace XET storage;
# this script uses curl which handles redirects correctly.

set -e

MODELS_DIR="$(cd "$(dirname "$0")/.." && pwd)/models"
mkdir -p "$MODELS_DIR"

echo "📥 Downloading MedPsy models to $MODELS_DIR"
echo "   (This is a one-time download ~2.5GB total)"
echo ""

download_if_missing() {
  local url="$1"
  local dest="$2"
  local name="$3"

  if [ -f "$dest" ]; then
    echo "✅ $name already downloaded — skipping"
    return
  fi

  echo "⬇️  Downloading $name..."
  curl -L --progress-bar \
    -H "User-Agent: Mozilla/5.0" \
    --retry 3 --retry-delay 5 \
    -o "$dest" \
    "$url"
  echo "✅ $name downloaded ($(du -sh "$dest" | cut -f1))"
}

download_if_missing \
  "https://huggingface.co/qvac/MedPsy-1.7B-GGUF/resolve/main/medpsy-1.7b-q4_k_m-imat.gguf" \
  "$MODELS_DIR/medpsy-1.7b-q4_k_m-imat.gguf" \
  "MedPsy-1.7B Q4_K_M"

download_if_missing \
  "https://huggingface.co/qvac/MedPsy-4B-GGUF/resolve/main/medpsy-4b-q4_k_m-imat.gguf" \
  "$MODELS_DIR/medpsy-4b-q4_k_m-imat.gguf" \
  "MedPsy-4B Q4_K_M"

download_if_missing \
  "https://huggingface.co/unsloth/embeddinggemma-300m-GGUF/resolve/6661a6504c30d8304af13455cb4a5d4f5bc6011f/embeddinggemma-300m-Q4_0.gguf" \
  "$MODELS_DIR/embeddinggemma-300m-Q4_0.gguf" \
  "EmbeddingGemma-300M Q4"

echo ""
echo "✅ All models ready."
echo "   Run 'npm run rag:ingest' next."
