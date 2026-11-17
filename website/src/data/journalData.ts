import type { DocChapter } from '../types/models';

export const JOURNAL_AND_RUNTIME_CHAPTERS: DocChapter[] = [
  {
    id: 'journal',
    romanNumeral: '01',
    title: "Architect's Engineering Journal (Research → Problem → Solution)",
    subtitle:
      'A complete engineering walkthrough by Aman Jha on how ARKA was researched, architected, and built from first principles for local-first modular intelligence.',
    category: 'Engineering Journal',
    summary:
      'ARKA was conceived, architected, and engineered from the ground up by Aman Jha. This engineering journal documents the exact research questions, architectural bottlenecks, and mathematical solutions behind the 4-tier ARKA ecosystem (Router 1.5B → Coder 3B → Agent 3B → Reasoner 7B).',
    sections: [
      {
        heading: 'Entry I · Epistemic Honesty & Abstention Guardrails (Research → Problem → Solution)',
        body: `• Research Observation: Standard autoregressive transformers optimize purely for next-token cross-entropy. When queried beyond their knowledge boundary, they generate syntactically confident falsehoods rather than admitting uncertainty.
• The Engineering Problem: How do we guarantee that a local model answers with verifiable facts when grounded knowledge exists, performs exact computation without guessing, and explicitly abstains (INSUFFICIENT_CONTEXT) when a topic lies outside its verified knowledge boundary?
• The ARKA Solution: We engineered deterministic Modelfile blueprints with strict SYSTEM prompts and few-shot MESSAGE pairs. Arka:agent enforces JSON-RPC 2.0 tool invocation with schema validation, and explicitly emits INSUFFICIENT_CONTEXT rather than fabricating tool arguments. Arka:reasoner encloses step-by-step verification inside <thought>...</thought> blocks before emitting a concise final answer.`,
        formula:
          'Abstain(q) = ¬∃verified_grounding(q) ∨ ¬∃required_params(tool_call)',
      },
      {
        heading: 'Entry II · Everyday Hardware Budgeting: 8GB Unified Memory Native',
        body: `• Research Observation: Most "local-first" model families still require 16GB+ RAM for their flagship tiers, excluding the vast majority of consumer laptops (MacBook Air M1/M2 8GB, standard Windows ultrabooks).
• The Engineering Problem: How can we deliver 4 specialized tiers—including a 7B reasoner—such that 3 of 4 run 100% in-RAM (zero swap) on 8GB unified memory, and the 7B tier runs as a "tight fit" with only heavy apps closed?
• The ARKA Solution: We selected Q4_K_M quantization across all tiers and bounded context windows (4K–16K) to strictly budget KV-cache RAM. Router (1.5B @ 4K) = ~1.2 GB, Coder (3B @ 8K) = ~2.4 GB, Agent (3B @ 16K) = ~2.8 GB. All three fit comfortably on 8GB alongside IDE + browser. Reasoner (7B @ 16K) = ~4.9 GB runs on 16GB+ or 8GB with swap discipline.`,
        formula:
          'Total_RAM = Weights_Q4KM + KV_Cache(num_ctx) + Overhead ≤ Hardware_Budget',
      },
      {
        heading: 'Entry III · Dual-Engine Intent Routing: Sub-120ms Classification',
        body: `• Research Observation: Multi-agent systems often use large models for routing, adding latency and cost. A 1.5B model can classify intent with near-perfect accuracy when primed with few-shot JSON examples.
• The Engineering Problem: Build a router that classifies incoming queries into strict JSON schema {"intent", "target_tag", "confidence", "reasoning"} in <120ms, then dispatches to the appropriate specialist without conversational overhead.
• The ARKA Solution: Arka:router (qwen2.5:1.5b, temp=0.0, num_ctx=4096) with a SYSTEM prompt enforcing ONLY valid JSON output matching the exact schema, plus 2 few-shot MESSAGE pairs demonstrating strict JSON routing. Zero Markdown, zero conversational filler. Integrates with LangGraph for typed edge dispatch to :coder, :agent, or :reasoner.`,
        formula:
          'route(q) = JSON.parse(arka_router(q)) → {intent, target_tag, confidence} → dispatch(target_tag)',
      },
      {
        heading: 'Entry IV · Inspectable Modelfile Blueprints: Zero Black Boxes',
        body: `• Research Observation: Most model families distribute opaque GGUF blobs with hidden system prompts, unknown temperature curves, and undocumented few-shot templates. Reproducibility is impossible.
• The Engineering Problem: Make every system prompt, temperature curve, context budget (num_ctx), and few-shot MESSAGE template plain-text, version-controlled in Git, and reproducible via ollama create.
• The ARKA Solution: All 4 Modelfiles live in modelfiles/ directory. Each is a complete, self-contained blueprint: FROM base_model, PARAMETER settings, SYSTEM prompt, and MESSAGE few-shot pairs. Users can inspect, modify, and recreate: ollama create my-arka:coder -f Modelfile.coder. The website's Modelfile Inspector renders these exact files with syntax highlighting.`,
      },
    ],
  },
];