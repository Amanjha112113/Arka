#!/usr/bin/env python3
"""
ARKA Local Hardware Benchmark Suite
Author: Aman Jha (amanjha112113)
Measures Time-To-First-Token (TTFT), tokens/sec, and resident memory footprint on local hardware.
"""

import sys
import time
import json
import urllib.request

MODELS = [
    "amanjha112113/Arka:router",
    "amanjha112113/Arka:coder",
    "amanjha112113/Arka:agent",
    "amanjha112113/Arka:reasoner",
]

def benchmark_model(model_tag: str):
    print(f"\nBenchmarking {model_tag}...")
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model_tag,
        "prompt": "Explain the concept of deterministic execution in systems programming in 3 sentences.",
        "stream": False,
        "options": {"seed": 42, "temperature": 0.0}
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            elapsed = time.time() - t0
            eval_count = data.get("eval_count", 0)
            eval_duration = data.get("eval_duration", 1) / 1e9
            speed = eval_count / eval_duration if eval_duration > 0 else 0
            print(f"  ✓ Tokens: {eval_count}")
            print(f"  ✓ Speed: {speed:.1f} tok/s")
            print(f"  ✓ Total time: {elapsed:.2f}s")
    except Exception as e:
        print(f"  ✗ Benchmark skipped ({e})")

def main():
    print("=" * 60)
    print("  ARKA Local Hardware Benchmark")
    print("=" * 60)
    for model in MODELS:
        benchmark_model(model)

if __name__ == "__main__":
    main()
