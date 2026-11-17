export type ArkaTierId =
  | 'router'
  | 'coder'
  | 'agent'
  | 'reasoner';

export type ArkaTierBadge = 'ROUTER' | 'CODER' | 'AGENT' | 'REASONER';

export interface ArkaModelTier {
  id: ArkaTierId;
  tierBadge: ArkaTierBadge;
  codeName: string;
  baseModel: string;
  contextWindow: string;
  contextTokens: number;
  temperature: number;
  topP?: number;
  repeatPenalty?: number;
  ramFootprint: string;
  quantization: string;
  speedTokensPerSec: number;
  reasoningScore: number;
  codingScore: number;
  mcpToolCalling: boolean;
  targetHardware: string;
  primaryWorkload: string;
  ollamaCommand: string;
  ollamaRegistry: string;
  accentColor: string;
}

export interface DocChapter {
  id: string;
  romanNumeral: string;
  greekTerm?: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
    formula?: string;
    codeSnippet?: {
      language: string;
      label: string;
      code: string;
    };
    metricsTable?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}
