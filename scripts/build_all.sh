#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "  ARKA Model Ecosystem — Local Modelfile Build Script"
echo "  Author: Aman Jha (amanjha112113)"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
MODELFILES_DIR="$ROOT_DIR/modelfiles"

MODELS=(
  "amanjha112113/Arka:router:$MODELFILES_DIR/Modelfile.router"
  "amanjha112113/Arka:coder:$MODELFILES_DIR/Modelfile.coder"
  "amanjha112113/Arka:agent:$MODELFILES_DIR/Modelfile.agent"
  "amanjha112113/Arka:reasoner:$MODELFILES_DIR/Modelfile.reasoner"
)

for ENTRY in "${MODELS[@]}"; do
  TAG="$(echo "$ENTRY" | cut -d: -f1,2)"
  MODELFILE="$(echo "$ENTRY" | cut -d: -f3)"

  echo ""
  echo "Building [$TAG] from $(basename "$MODELFILE")..."
  if command -v ollama >/dev/null 2>&1; then
    ollama create "$TAG" -f "$MODELFILE"
    echo "Successfully built [$TAG]."
  else
    echo "ollama CLI not found in PATH. Please install Ollama or ensure it is running."
    exit 1
  fi
done

echo ""
echo "All 4 ARKA model tiers successfully built and registered in local Ollama."
