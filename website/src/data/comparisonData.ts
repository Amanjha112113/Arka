import { ARKA_MODELS } from './modelsData';
import type { ArkaModelTier } from '../types/models';

export type ArkaMetricKey = 'params' | 'context' | 'ram' | 'speed' | 'capability';

export interface ArkaMetricDefinition {
  id: ArkaMetricKey;
  label: string;
  unit: string;
  subtitle: string;
  getValue: (m: ArkaModelTier) => number;
  getFormatted: (m: ArkaModelTier) => string;
  getNormalizedPercent: (m: ArkaModelTier) => number;
}

export const ARKA_FAMILY_METRICS: ArkaMetricDefinition[] = [
  {
    id: 'capability',
    label: 'Reasoning & Coding Score',
    unit: '%',
    subtitle:
      'Composite accuracy across multi-step Chain-of-Thought math, Python synthesis, and epistemic verification.',
    getValue: (m) => Math.round((m.reasoningScore + m.codingScore) / 2),
    getFormatted: (m) => `${m.reasoningScore}% Rsn · ${m.codingScore}% Code`,
    getNormalizedPercent: (m) => Math.round((m.reasoningScore + m.codingScore) / 2),
  },
  {
    id: 'params',
    label: 'Base Model Scale',
    unit: 'Params',
    subtitle:
      'Parameter scale of the base model architectures (1.5B to 7B).',
    getValue: (m) => {
      const match = m.baseModel.match(/([\d.]+)b/i);
      return match ? parseFloat(match[1]) * 1000 : 0;
    },
    getFormatted: (m) => `${m.baseModel} (${m.contextWindow})`,
    getNormalizedPercent: (m) => {
      const params = m.baseModel.match(/([\d.]+)b/i);
      const val = params ? parseFloat(params[1]) : 1.5;
      return Math.round(15 + ((val - 1.5) / (7 - 1.5)) * 85);
    },
  },
  {
    id: 'context',
    label: 'Context Window',
    unit: 'Tokens',
    subtitle:
      'Maximum sequence length for each ARKA tier.',
    getValue: (m) => Math.round(m.contextTokens / 1024),
    getFormatted: (m) => `${Math.round(m.contextTokens / 1024)}K (${m.contextWindow})`,
    getNormalizedPercent: (m) => {
      const ctxK = Math.round(m.contextTokens / 1024);
      return Math.round(20 + ((ctxK - 4) / (16 - 4)) * 80);
    },
  },
  {
    id: 'speed',
    label: 'Generation Speed',
    unit: 'tok/s',
    subtitle:
      'Sustained local token generation throughput on Apple Silicon / Laptop GPU.',
    getValue: (m) => m.speedTokensPerSec,
    getFormatted: (m) => `${m.speedTokensPerSec} tok/s`,
    getNormalizedPercent: (m) => Math.round((m.speedTokensPerSec / 180) * 100),
  },
  {
    id: 'ram',
    label: 'Active RAM (Q4_K_M)',
    unit: 'GB',
    subtitle: 'Quantized INT4 memory footprint required for zero-swap local inference.',
    getValue: (m) => parseFloat(m.ramFootprint.replace(/[^\d.]/g, '')),
    getFormatted: (m) => m.ramFootprint,
    getNormalizedPercent: (m) => {
      const ram = parseFloat(m.ramFootprint.replace(/[^\d.]/g, ''));
      return Math.round(10 + ((ram - 1.2) / (4.9 - 1.2)) * 90);
    },
  },
];

export const ARKA_FAMILY_COMPARISON_LIST = ARKA_MODELS;
