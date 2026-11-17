export interface TierQuantMatrix {
  id: string;
  tierBadge: string;
  greekName: string;
  tiedParams: string;
  fp32Size: string;
  fp16Bf16Size: string;
  int8Size: string;
  q4KmSize: string;
  loraRank16Trainable: string;
  loraAdapterSize: string;
  qloraVramMin: string;
  kvCacheInt8Max: string;
  visionEncoder: string;
}

export interface PrecisionModeSpec {
  id: string;
  badge: string;
  bitsPerWeight: string;
  compression: string;
  format: string;
  useCase: string;
  desc: string;
}

export const TIER_QUANT_MATRIX: TierQuantMatrix[] = [
  {
    id: 'router',
    tierBadge: 'ROUTER',
    greekName: 'Arka Nano Router',
    tiedParams: '1.54B',
    fp32Size: '6.16 GB',
    fp16Bf16Size: '3.08 GB',
    int8Size: '1.54 GB',
    q4KmSize: '1.20 GB',
    loraRank16Trainable: '18.4M (1.20%)',
    loraAdapterSize: '73.6 MB',
    qloraVramMin: '1.2 GB RAM (M1/M2 8GB)',
    kvCacheInt8Max: '64 MB (4K Ctx)',
    visionEncoder: 'Text + Strict JSON Schema Routing',
  },
  {
    id: 'coder',
    tierBadge: 'CODER',
    greekName: 'Arka Systems Coder',
    tiedParams: '3.09B',
    fp32Size: '12.36 GB',
    fp16Bf16Size: '6.18 GB',
    int8Size: '3.09 GB',
    q4KmSize: '2.40 GB',
    loraRank16Trainable: '32.8M (1.06%)',
    loraAdapterSize: '131.2 MB',
    qloraVramMin: '2.4 GB RAM (8GB–16GB)',
    kvCacheInt8Max: '256 MB (8K Ctx)',
    visionEncoder: 'C++17 RAII + Python/FastAPI AST Engine',
  },
  {
    id: 'agent',
    tierBadge: 'AGENT',
    greekName: 'Arka MCP Agent',
    tiedParams: '3.09B',
    fp32Size: '12.36 GB',
    fp16Bf16Size: '6.18 GB',
    int8Size: '3.09 GB',
    q4KmSize: '2.80 GB',
    loraRank16Trainable: '32.8M (1.06%)',
    loraAdapterSize: '131.2 MB',
    qloraVramMin: '2.8 GB RAM (8GB–16GB)',
    kvCacheInt8Max: '512 MB (16K Ctx)',
    visionEncoder: 'Deterministic MCP JSON-RPC 2.0 Executor',
  },
  {
    id: 'reasoner',
    tierBadge: 'REASONER',
    greekName: 'Arka Deep Reasoner',
    tiedParams: '7.61B',
    fp32Size: '30.44 GB',
    fp16Bf16Size: '15.22 GB',
    int8Size: '7.61 GB',
    q4KmSize: '4.90 GB',
    loraRank16Trainable: '65.4M (0.86%)',
    loraAdapterSize: '261.6 MB',
    qloraVramMin: '4.9 GB RAM (16GB+ / Tight 8GB)',
    kvCacheInt8Max: '1.02 GB (16K Ctx)',
    visionEncoder: 'Multi-step Proofs & <thought> Deliberation',
  },
];

export const PRECISION_MODES: PrecisionModeSpec[] = [
  {
    id: 'fp32',
    badge: 'FP32 (32-Bit Float)',
    bitsPerWeight: '32.0 bits/weight',
    compression: '1.0× Baseline',
    format: 'PyTorch / SafeTensors Master',
    useCase: 'Master Optimizer States, Reference Gradient Verification & Lossless Archival',
    desc: 'IEEE 754 single-precision floating point (1 sign, 8 exponent, 23 mantissa bits). Used for master parameter tracking and exact numerical unit testing.',
  },
  {
    id: 'bf16',
    badge: 'BF16 / FP16 (16-Bit)',
    bitsPerWeight: '16.0 bits/weight',
    compression: '2.0× Savings',
    format: 'SafeTensors / Hugging Face',
    useCase: 'Native Fine-Tuning, Full-Parameter SFT & High-Throughput Local Serving',
    desc: 'Brain Floating Point (BF16) preserves the exact 8-bit dynamic exponent range of FP32, preventing gradient underflow/overflow across ARKA transformer blocks.',
  },
  {
    id: 'int8',
    badge: 'INT8 / Q8_0 (8-Bit)',
    bitsPerWeight: '8.5 bits/weight',
    compression: '4.0× Savings',
    format: 'GGUF Q8_0 / Symmetric INT8 KV',
    useCase: 'Zero-Perplexity Loss Local Inference & Symmetric INT8 KV-Cache Compression',
    desc: 'Block-wise symmetric linear quantization (s = max(|x|)/127). Used both for near-lossless weight storage and compressing KV-cache footprints on consumer RAM.',
  },
  {
    id: 'q4',
    badge: 'INT4 / Q4_K_M / AWQ',
    bitsPerWeight: '4.5 bits/weight',
    compression: '7.5× Savings',
    format: 'Ollama GGUF / Ollama Native',
    useCase: 'Default Everyday Consumer Laptop Deployment (~1.2GB Router to 4.9GB Reasoner)',
    desc: 'K-quants super-block quantization (Q4_K_M) allocates higher bit-width to salient attention channels, enabling complete in-RAM execution on 8GB Apple Silicon.',
  },
  {
    id: 'lora',
    badge: 'LoRA (BF16 Base + Rank r)',
    bitsPerWeight: '16-bit Base + FP16 ΔW',
    compression: '98.8% Fewer Trainable Params',
    format: 'PEFT Adapter SafeTensors',
    useCase: 'Fast Domain Adaptation across linear projections (q, k, v, o, gate, up, down)',
    desc: 'Freezes base weights W_0 and injects low-rank trainable matrices B·A (r=16, α=32, scaling α/r = 2.0) into attention and feed-forward projections.',
  },
  {
    id: 'qlora',
    badge: 'QLoRA (4-Bit NF4 + Double Quant)',
    bitsPerWeight: '4.15 bits/weight + BF16 ΔW',
    compression: '4× Training VRAM Reduction',
    format: 'bitsandbytes NF4 + Paged AdamW',
    useCase: 'Fine-Tuning Arka Deep Reasoner (7B) on a Single Free Google Colab T4 / Local GPU',
    desc: 'Quantizes frozen base weights into 4-bit NormalFloat (NF4) with double quantization, computing gradients in BF16 through LoRA adapters.',
  },
];
