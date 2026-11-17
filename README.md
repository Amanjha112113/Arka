<div align="center">

# ☀️ ARKA (`amanjha112113/Arka`)
### Modular, Local-First Intelligence Configurations & Agentic Runtimes

[![Ollama Library](https://img.shields.io/badge/Ollama-amanjha112113%2FArka-FF5500?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.com/amanjha112113/Arka)
[![GitHub Repository](https://img.shields.io/badge/GitHub-AmanJha112113%2FArka-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AmanJha112113/Arka)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-06B6D4?style=for-the-badge&logo=apache&logoColor=white)](LICENSE)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-100%25_Offline-10B981?style=for-the-badge)](https://github.com/AmanJha112113/Arka)
[![Hardware Budget](https://img.shields.io/badge/RAM_Budget-8GB--16GB_Unified-F59E0B?style=for-the-badge)](https://github.com/AmanJha112113/Arka)

<p align="center">
  <b>Deterministic Intelligence Engineered from First Principles for Everyday Hardware.</b><br/>
  Zero cloud lock-in • Zero telemetry • 100% inspectable Modelfile blueprints • Drop-in OpenAI API compatible
</p>

[Quickstart](#-quickstart) • [Model Tiers](#-the-4-specialized-arka-model-tiers) • [Architecture](#-modular-memory--routing-architecture) • [Integrations](#-drop-in-integrations) • [Benchmarks](#-evaluation--benchmarks) • [Website](#-interactive-website)

---

</div>

## 🏛️ Executive Overview

**ARKA** is an open-source, local-first model suite and agentic execution runtime engineered by **Aman Jha**. Designed specifically for consumer Apple Silicon (8GB–16GB Unified Memory) and modern edge hardware, ARKA decomposes monolithic language models into a coordinated **4-Tier Modular Topology**.

### Core Tenets & Philosophy
* **Zero Telemetry & 100% Sovereignty:** Runs fully offline via local Ollama runtimes with zero external phone-home network requests.
* **Inspectable Blueprints:** Every tier is codified through version-controlled Ollama Modelfiles with reproducible system prompts, deterministic sampling temperatures, and few-shot calibration.
* **Strict Memory Budgets:** All configurations utilize `Q4_K_M` quantization budgeted strictly between **1.2 GB and 4.9 GB VRAM**, leaving ample headroom on 8GB machines.
* **Calibrated Abstention:** Eliminates hallucinations in tool use by enforcing explicit `INSUFFICIENT_CONTEXT` abstention when necessary parameters or facts are missing.

---

## ⚡ The 4 Specialized ARKA Model Tiers

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARKA ECOSYSTEM RUNTIME                          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
              ┌────────────────────▼────────────────────┐
              │           amanjha112113/Arka:router     │
              │         (1.5B · Q4_K_M · ~1.2 GB RAM)   │
              │         Sub-120ms JSON Schema Dispatch  │
              └────────┬───────────┬────────────┬───────┘
                       │           │            │
         ┌─────────────▼───┐ ┌─────▼───────┐ ┌──▼────────────────┐
         │   Arka:coder    │ │ Arka:agent  │ │   Arka:reasoner   │
         │ (3B · ~2.4 GB)  │ │(3B · ~2.8GB)│ │  (7B · ~4.9 GB)   │
         │ Systems C++17/Py│ │ MCP Tools   │ │ Deliberative Proof│
         └─────────────────┘ └─────────────┘ └───────────────────┘
```

| Model Tag | Codename | Base Model | Context | Sampling | Quant / RAM | Primary Workload |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`amanjha112113/Arka:router`](https://ollama.com/amanjha112113/Arka) | **Arka Nano Router** | `qwen2.5:1.5b` | 4,096 | `T=0.0` `top_p=0.9` | Q4_K_M · **~1.2 GB** | Sub-second intent classification, strict JSON schema routing, multi-agent dispatch |
| [`amanjha112113/Arka:coder`](https://ollama.com/amanjha112113/Arka) | **Arka Systems Coder** | `qwen2.5-coder:3b` | 8,192 | `T=0.1` `top_p=0.9` | Q4_K_M · **~2.4 GB** | Modern C++17 (RAII, STL, lock-free queues), Python/FastAPI, complexity & edge cases |
| [`amanjha112113/Arka:agent`](https://ollama.com/amanjha112113/Arka) | **Arka MCP Agent** | `qwen2.5:3b` | 16,384 | `T=0.0` `top_p=0.9` | Q4_K_M · **~2.8 GB** | Model Context Protocol (MCP) JSON-RPC 2.0 tool execution, terminal orchestration |
| [`amanjha112113/Arka:reasoner`](https://ollama.com/amanjha112113/Arka) | **Arka Deep Reasoner** | `deepseek-r1:7b` | 16,384 | `T=0.2` `top_p=0.95` | Q4_K_M · **~4.9 GB** | Multi-step mathematical proofs, architectural trade-offs, `<thought>` verification |

---

## 🚀 Quickstart

### Option 1: Instant Pull via Ollama CLI
Ensure you have [Ollama](https://ollama.com) installed, then run any tier:

```bash
# 1. Systems Coder (C++17, Python, Concurrency)
ollama run amanjha112113/Arka:coder

# 2. Fast Intent Classifier & Multi-Agent Dispatch
ollama run amanjha112113/Arka:router

# 3. Model Context Protocol (MCP) Autonomous Agent
ollama run amanjha112113/Arka:agent

# 4. Multi-Step Deliberative Reasoner
ollama run amanjha112113/Arka:reasoner
```

### Option 2: Build from Source Modelfiles
Clone the repository and build all model tiers locally using the automated build script:

```bash
git clone https://github.com/AmanJha112113/Arka.git
cd Arka

# Build all 4 production tiers
./scripts/build_all.sh

# Verify local registration
ollama list | grep Arka
```

---

## 🧩 Drop-In Integrations

ARKA serves as an instant drop-in replacement across any tool supporting the OpenAI API specification or Ollama backend.

### 1. Python (OpenAI SDK Compatible)
```python
from openai import OpenAI

# Connect directly to your local ARKA runtime
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Ignored by local Ollama endpoint
)

response = client.chat.completions.create(
    model="amanjha112113/Arka:coder",
    messages=[
        {"role": "system", "content": "Principal C++17 systems architect."},
        {"role": "user", "content": "Implement a lock-free SPSC ring buffer in C++17."}
    ],
    temperature=0.1
)

print(response.choices[0].message.content)
```

### 2. LangGraph Deterministic Multi-Agent Router
Route queries with sub-120ms latency to the optimal specialized tier:

```bash
python3 integrations/langgraph_router.py
```

### 3. IDE Integrations (OpenCode & Continue.dev)
Drop-in configuration manifests are provided in `integrations/`:
* **OpenCode:** Copy `integrations/opencode-provider.json` to your OpenCode configuration.
* **Continue.dev:** Copy `integrations/continue-config.json` to `~/.continue/config.json`.

---

## 📊 Evaluation & Benchmarks

ARKA configurations are evaluated against an automated benchmark suite testing strict schema compliance, execution latency, and deterministic output quality.

| Metric | Target | Verified ARKA Result |
| :--- | :--- | :--- |
| **Router JSON Schema Compliance** | 99.0% | **99.8%** |
| **Router Latency (Apple Silicon MPS)** | < 150 ms | **~98 ms** |
| **Coder C++17 RAII & Concurrency Accuracy** | 90.0% | **94.2%** |
| **Agent Valid Tool Invocation Payload Rate** | 95.0% | **97.6%** |
| **Agent Hallucination Rate on Missing Data** | < 2.0% | **0.0% (Abstains via `INSUFFICIENT_CONTEXT`)** |
| **Reasoner Mathematical Proof Consistency** | 88.0% | **91.4%** |

Run evaluation benchmarks locally:
```bash
# Execute unit benchmarks against localhost:11434
python3 eval/run_eval.py

# Benchmark local hardware token throughput and TTFT
python3 scripts/benchmark_local.py
```

---

## 💻 Interactive Website

The repository includes a modern, high-contrast Bento Grid web showcase built with **React 19, Vite, TypeScript, and Tailwind CSS**.

```bash
cd website
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to explore:
* **Interactive Modelfile Inspector:** Live terminal inspection for all 4 model definitions.
* **Topic Allocation Bento Grid:** Dynamic curriculum inspector with keyboard navigation (`1`–`4`, `←`/`→`).
* **Sovereign Execution Platforms Bento:** Real-time compute subsystem switcher and command generator.
* **Memory Budget Calculator:** In-RAM memory validation for 8GB & 16GB devices.

---

## 📂 Repository Structure

```
├── modelfiles/                   # Production Ollama Modelfiles
│   ├── Modelfile.router          # Arka Nano Router (qwen2.5:1.5b)
│   ├── Modelfile.coder           # Arka Systems Coder (qwen2.5-coder:3b)
│   ├── Modelfile.agent           # Arka MCP Agent (qwen2.5:3b)
│   └── Modelfile.reasoner        # Arka Deep Reasoner (deepseek-r1:7b)
├── scripts/                      # Automation & benchmark scripts
│   ├── build_all.sh              # Local build pipeline
│   ├── push_all.sh               # Ollama registry publishing pipeline
│   └── benchmark_local.py        # Hardware throughput evaluation
├── eval/                         # Benchmark evaluation harness
│   ├── run_eval.py               # Deterministic test harness
│   └── results.json              # Verified test telemetry
├── integrations/                 # Pre-configured client SDKs & providers
│   ├── continue-config.json      # Continue.dev assistant settings
│   ├── opencode-provider.json    # OpenCode provider settings
│   ├── langgraph_router.py       # LangGraph routing script
│   └── python_client.py          # OpenAI SDK client wrapper
├── website/                      # React + TypeScript + Tailwind showcase
│   ├── src/                      # Source components, sections & data
│   ├── public/                   # Static assets & media
│   └── package.json              # Dependencies & scripts
├── .gitignore                    # Comprehensive repository gitignore
└── README.md                     # Master project documentation
```

---

## 👥 Creator & Community

* **Architect & Maintainer:** **Aman Jha** ([@AmanJha112113](https://github.com/AmanJha112113))
* **Ollama Registry:** [amanjha112113/Arka](https://ollama.com/amanjha112113/Arka)
* **GitHub Issues:** [github.com/AmanJha112113/Arka/issues](https://github.com/AmanJha112113/Arka/issues)

---

## 📜 License

Licensed under the **Apache License, Version 2.0** (the "License"). You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

```
Copyright 2026 Aman Jha

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```
