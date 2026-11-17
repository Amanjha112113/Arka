#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "  ARKA Model Ecosystem — Ollama Registry Push Script"
echo "  Author: Aman Jha (amanjha112113)"
echo "=========================================================="

TAGS=(
  "amanjha112113/Arka:router"
  "amanjha112113/Arka:coder"
  "amanjha112113/Arka:agent"
  "amanjha112113/Arka:reasoner"
)

for TAG in "${TAGS[@]}"; do
  echo ""
  echo "Pushing [$TAG] to Ollama Registry..."
  if command -v ollama >/dev/null 2>&1; then
    ollama push "$TAG"
    echo "Pushed [$TAG]."
  else
    echo "ollama CLI not found in PATH."
    exit 1
  fi
done

echo ""
echo "All 4 ARKA model tiers pushed to https://ollama.com/amanjha112113/Arka"
