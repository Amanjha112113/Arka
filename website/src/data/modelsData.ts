import { ArkaModelTier } from '../types/models';

export interface ArkaFrameworkTier {
  id: string;
  tierBadge: string;
  greekName: string;
  tiedParams: string;
  divineDomain: string;
  ollamaCommand: string;
  dModel: number;
  layers: number;
  headsQ: number;
  headsKV: number;
  gqaRatio: string;
  contextWindow: string;
  ropeTheta: string;
  multimodalVision: boolean;
  dFFN: number;
  speculativeRole: string;
  supportedFormats: string[];
}


export const ARKA_MODELS: ArkaModelTier[] = [
  {
    id: 'router',
    tierBadge: 'ROUTER',
    codeName: 'Arka Nano Router',
    baseModel: 'qwen2.5:1.5b',
    contextWindow: '4,096 (4K)',
    contextTokens: 4096,
    temperature: 0.0,
    topP: 0.9,
    ramFootprint: '~1.2 GB',
    quantization: 'Q4_K_M',
    speedTokensPerSec: 180,
    reasoningScore: 72,
    codingScore: 68,
    mcpToolCalling: true,
    targetHardware: '8GB Unified Memory Laptops (Apple Silicon M1–M4), Edge MicroVMs, CPU-only nodes',
    primaryWorkload: 'Sub-second intent classification, strict JSON schema routing, and multi-agent LangGraph edge dispatch',
    ollamaCommand: 'ollama run amanjha112113/Arka:router',
    ollamaRegistry: 'https://ollama.com/amanjha112113/Arka',
    accentColor: '#F59E0B',
  },
  {
    id: 'coder',
    tierBadge: 'CODER',
    codeName: 'Arka Systems Coder',
    baseModel: 'qwen2.5-coder:3b',
    contextWindow: '8,192 (8K)',
    contextTokens: 8192,
    temperature: 0.1,
    topP: 0.9,
    repeatPenalty: 1.05,
    ramFootprint: '~2.4 GB',
    quantization: 'Q4_K_M',
    speedTokensPerSec: 120,
    reasoningScore: 85,
    codingScore: 92,
    mcpToolCalling: false,
    targetHardware: '8GB–16GB Developer Laptops, Local IDE Extensions (OpenCode, Continue.dev)',
    primaryWorkload: 'Modern C++17 (RAII, STL, lock-free concurrency), Python/FastAPI engineering, algorithmic complexity & edge-case verification',
    ollamaCommand: 'ollama run amanjha112113/Arka:coder',
    ollamaRegistry: 'https://ollama.com/amanjha112113/Arka',
    accentColor: '#06B6D4',
  },
  {
    id: 'agent',
    tierBadge: 'AGENT',
    codeName: 'Arka MCP Agent',
    baseModel: 'qwen2.5:3b',
    contextWindow: '16,384 (16K)',
    contextTokens: 16384,
    temperature: 0.0,
    ramFootprint: '~2.8 GB',
    quantization: 'Q4_K_M',
    speedTokensPerSec: 100,
    reasoningScore: 88,
    codingScore: 80,
    mcpToolCalling: true,
    targetHardware: '8GB–16GB Workstations, Autonomous Terminal & MCP Tool Sandboxes',
    primaryWorkload: 'Deterministic Model Context Protocol (MCP) JSON-RPC 2.0 tool invocation and calibrated abstention (INSUFFICIENT_CONTEXT)',
    ollamaCommand: 'ollama run amanjha112113/Arka:agent',
    ollamaRegistry: 'https://ollama.com/amanjha112113/Arka',
    accentColor: '#8B5CF6',
  },
  {
    id: 'reasoner',
    tierBadge: 'REASONER',
    codeName: 'Arka Deep Reasoner',
    baseModel: 'deepseek-r1:7b',
    contextWindow: '16,384 (16K)',
    contextTokens: 16384,
    temperature: 0.2,
    ramFootprint: '~4.9 GB',
    quantization: 'Q4_K_M',
    speedTokensPerSec: 55,
    reasoningScore: 96,
    codingScore: 85,
    mcpToolCalling: false,
    targetHardware: '16GB+ Laptops / Apple Silicon M-Series / RTX 3060+ GPUs',
    primaryWorkload: 'Multi-step mathematical proofs, systems architecture trade-offs, and explicit <thought> chain-of-thought verification',
    ollamaCommand: 'ollama run amanjha112113/Arka:reasoner',
    ollamaRegistry: 'https://ollama.com/amanjha112113/Arka',
    accentColor: '#EF4444',
  },
];

export const ARKA_FRAMEWORK_TIERS: ArkaFrameworkTier[] = [
  {
    id: 'router',
    tierBadge: 'ROUTER',
    greekName: 'Arka Nano Router',
    tiedParams: '1.54B',
    divineDomain: 'Sub-second Intent Classification & Schema Routing',
    ollamaCommand: 'ollama run amanjha112113/Arka:router',
    dModel: 1536,
    layers: 28,
    headsQ: 12,
    headsKV: 2,
    gqaRatio: '6:1 GQA',
    contextWindow: '4,096 (4K)',
    ropeTheta: '1,000,000',
    multimodalVision: false,
    dFFN: 8960,
    speculativeRole: 'Sub-120ms JSON Intent Classifier & Edge Router',
    supportedFormats: ['Ollama GGUF (Q4_K_M)', 'Modelfile', 'JSON-RPC 2.0', 'LangGraph'],
  },
  {
    id: 'coder',
    tierBadge: 'CODER',
    greekName: 'Arka Systems Coder',
    tiedParams: '3.09B',
    divineDomain: 'Modern C++17 & Python Systems Engineering',
    ollamaCommand: 'ollama run amanjha112113/Arka:coder',
    dModel: 2048,
    layers: 36,
    headsQ: 16,
    headsKV: 2,
    gqaRatio: '8:1 GQA',
    contextWindow: '8,192 (8K)',
    ropeTheta: '1,000,000',
    multimodalVision: false,
    dFFN: 11008,
    speculativeRole: 'RAII C++17 & Python/FastAPI Local Specialist',
    supportedFormats: ['Ollama GGUF (Q4_K_M)', 'Modelfile', 'OpenCode / Continue.dev'],
  },
  {
    id: 'agent',
    tierBadge: 'AGENT',
    greekName: 'Arka MCP Agent',
    tiedParams: '3.09B',
    divineDomain: 'Deterministic MCP Tool Calling & Calibrated Abstention',
    ollamaCommand: 'ollama run amanjha112113/Arka:agent',
    dModel: 2048,
    layers: 36,
    headsQ: 16,
    headsKV: 2,
    gqaRatio: '8:1 GQA',
    contextWindow: '16,384 (16K)',
    ropeTheta: '1,000,000',
    multimodalVision: false,
    dFFN: 11008,
    speculativeRole: 'Autonomous Sandbox & Terminal Orchestrator',
    supportedFormats: ['Ollama GGUF (Q4_K_M)', 'Modelfile', 'MCP JSON-RPC 2.0'],
  },
  {
    id: 'reasoner',
    tierBadge: 'REASONER',
    greekName: 'Arka Deep Reasoner',
    tiedParams: '7.61B',
    divineDomain: 'Multi-step Mathematical Proofs & <thought> Verification',
    ollamaCommand: 'ollama run amanjha112113/Arka:reasoner',
    dModel: 3584,
    layers: 28,
    headsQ: 28,
    headsKV: 4,
    gqaRatio: '7:1 GQA',
    contextWindow: '16,384 (16K)',
    ropeTheta: '10,000',
    multimodalVision: false,
    dFFN: 18944,
    speculativeRole: 'Deep Analytical Deliberation Engine',
    supportedFormats: ['Ollama GGUF (Q4_K_M)', 'Modelfile', '<thought> Verification'],
  },
];

