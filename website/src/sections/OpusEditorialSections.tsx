import React from 'react';

interface MarginaliaItem {
  label: string;
  value: string;
}

interface EditorialBlockProps {
  id: string;
  numeral: string;
  category: string;
  title: string;
  leadParagraph: string;
  paragraphs: string[];
  marginalia: MarginaliaItem[];
  quote?: {
    text: string;
    attribution: string;
  };
  specGrid?: {
    heading: string;
    detail: string;
  }[];
  sideVideo?: {
    src: string;
    caption: string;
    badge: string;
  };
  bgVariant?: 'cream' | 'sand';
}

const EditorialNarrativeSection: React.FC<EditorialBlockProps> = ({
  id,
  numeral,
  category,
  title,
  leadParagraph,
  paragraphs,
  marginalia,
  quote,
  specGrid,
  sideVideo,
  bgVariant = 'cream',
}) => {
  const bgClass = bgVariant === 'sand' ? 'bg-[#F4EFE6]' : 'bg-[#FBF9F5]';

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 ${bgClass} text-[#141312] border-t border-[#141312]/10`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Sticky Column (4 cols): Editorial Index & Marginalia */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="flex items-baseline gap-3 border-b border-[#141312]/15 pb-3">
              <span className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FF5500] font-semibold">
                {numeral}.
              </span>
              <span className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#141312]/60">
                {category}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#141312] leading-[1.14]">
              {title}
            </h2>

            {quote && (
              <blockquote className="pt-2 border-l-2 border-[#FF5500] pl-4 space-y-1.5">
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#141312]/80 leading-relaxed">
                  “{quote.text}”
                </p>
                <footer className="font-mono-tabular text-[10px] uppercase tracking-wider text-[#141312]/50">
                  — {quote.attribution}
                </footer>
              </blockquote>
            )}

            {/* Key Architectural Marginalia */}
            <div className="pt-4 border-t border-[#141312]/10 space-y-3">
              {marginalia.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 text-xs">
                  <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-[#141312]/50">
                    {item.label}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#141312] text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Side In-Situ Video Player Widget */}
            {sideVideo && (
              <div className="pt-4 border-t border-[#141312]/10 space-y-2">
                <div className="rounded-xl overflow-hidden bg-black/90 border border-[#141312]/15 shadow-md aspect-video relative group">
                  <video
                    src={sideVideo.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono-tabular text-[#FF5500] border border-white/10">
                    {sideVideo.badge}
                  </div>
                </div>
                <p className="text-[11px] font-mono-tabular text-[#141312]/60 leading-normal">
                  {sideVideo.caption}
                </p>
              </div>
            )}
          </div>

          {/* Right Long-Form Reading Column (8 cols): Magazine Prose */}
          <div className="lg:col-span-8 space-y-6 max-w-[68ch]">
            {/* Lead Editorial Serif Paragraph */}
            <p className="font-serif-editorial text-xl sm:text-2xl md:text-[26px] text-[#141312] leading-[1.45] font-normal">
              {leadParagraph}
            </p>

            <div className="h-[1px] w-16 bg-[#FF5500]/60 my-2" />

            {/* Multi-Paragraph Technical Narrative */}
            <div className="space-y-5 text-[15px] sm:text-base text-[#141312]/80 leading-[1.82] font-normal">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Technical Detail Grid */}
            {specGrid && specGrid.length > 0 && (
              <div className="pt-6 border-t border-[#141312]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specGrid.map((spec) => (
                  <div
                    key={spec.heading}
                    className="p-4 rounded-xl bg-white border border-[#141312]/8 shadow-xs space-y-1"
                  >
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                      {spec.heading}
                    </h3>
                    <p className="text-xs text-[#141312]/70 leading-relaxed font-sans">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const EditorialReasoningSection: React.FC = () => (
  <EditorialNarrativeSection
    id="editorial-reasoning"
    numeral="I"
    category="Extended Thinking & Autonomy"
    title="How ARKA Thinks, Reasons, and Dispatches Before Speaking"
    bgVariant="sand"
    leadParagraph="Most language models generate responses reflexively, committing to a conclusion token by token before verifying whether the underlying premise holds. ARKA is architected to deliberate first—separating internal step-by-step reasoning and sub-second intent classification from its final spoken synthesis."
    paragraphs={[
      "When presented with complex mathematical proofs, systems architecture trade-offs, or algorithmic complexity tasks, Arka:reasoner (7B) opens a dedicated internal reasoning workspace delimited by native <thought> and </thought> control tokens. Inside this scratchpad, the model decomposes the problem into verifiable sub-goals, tests edge cases, and audits its own intermediate logic before emitting a single user-facing sentence. Users can inspect this reasoning trace in real time or collapse it for concise answers.",
      "Beyond passive text generation, ARKA is built from the ground up as a modular agentic runtime. Arka:agent natively encodes Model Context Protocol (MCP) JSON-RPC 2.0 invocations. Whether orchestrating terminal sandboxes, executing multi-file edits in local development environments, or running deterministic Python calculations, ARKA treats external tools as first-class extensions of its own cognition.",
      "To make deep deliberation instantaneous on consumer hardware, ARKA routes incoming prompts through Arka:router (1.5B). Operating at sub-120ms latency and temperature 0.0, the router outputs strict JSON schema intent dispatches, directing algorithmic problems to :coder, tool executions to :agent, and mathematical proofs to :reasoner. The result is a specialized, zero-overhead multi-agent workflow on everyday laptops."
    ]}
    quote={{
      text: "True intelligence is measured not by how quickly a model speaks, but by how rigorously it verifies its own chain of thought before answering.",
      attribution: "ARKA Architecture Journal, Aman Jha"
    }}
    marginalia={[
      { label: "Reasoning Format", value: "Native <thought> CoT" },
      { label: "Agent Protocols", value: "MCP JSON-RPC · OpenClaw · Hermes" },
      { label: "Routing Latency", value: "Sub-120ms Classification" },
      { label: "Hardware Target", value: "Apple Silicon 8GB–16GB" },
    ]}
    sideVideo={{
      src: "/assets/video/arka_ollama_reasoning.mp4",
      badge: "LIVE DELIBERATION",
      caption: "Screen capture of Arka:reasoner decomposing complex mathematical equations into step-by-step proofs before outputting answers."
    }}
    specGrid={[
      {
        heading: "Deliberative Scratchpad",
        detail: "Dedicated Chain-of-Thought tokens allow the model to backtrack, verify arithmetic, and plan multi-turn tool trajectories prior to final synthesis."
      },
      {
        heading: "Zero-Drift Tool Execution",
        detail: "Strict JSON Schema validation ensures every OpenClaw, Hermes, and Antigravity MCP tool call is syntactically sound and deterministic."
      }
    ]}
  />
);

export const EditorialTrainingSection: React.FC = () => (
  <EditorialNarrativeSection
    id="editorial-training"
    numeral="II"
    category="Modelfiles & Architecture"
    title="Inspectable Modelfiles & Reproducible Blueprints"
    bgVariant="cream"
    leadParagraph="A modular foundation runtime is only as trustworthy as the transparency of its blueprints and the strict discipline of its parameter budgeting. Every configuration in the ARKA family was engineered from first principles for zero black boxes, deterministic sampling, and everyday hardware budgets."
    paragraphs={[
      "Rather than distributing opaque blobs with hidden system prompts and undocumented few-shot templates, the ARKA ecosystem provides 100% inspectable Modelfiles in modelfiles/. Every FROM base model, PARAMETER setting, SYSTEM prompt, and few-shot MESSAGE pair is plain-text, version-controlled in Git, and fully reproducible via ollama create.",
      "Standard 'local-first' model families frequently require 16GB–32GB RAM, excluding consumer laptops (MacBook Air M1/M2 8GB, standard ultrabooks). ARKA solves this by combining Q4_K_M quantization with bounded context windows (4K–16K). Router (1.5B @ 4K) requires ~1.2 GB, Coder (3B @ 8K) takes ~2.4 GB, and Agent (3B @ 16K) uses ~2.8 GB—all running 100% in-RAM with zero swap thrashing alongside active IDEs and browsers.",
      "For demanding analytical tasks, Arka:reasoner (7B @ 16K) runs in ~4.9 GB RAM on 16GB+ systems, or as a tight fit on 8GB machines. With 100% deterministic sampling (temperature 0.0 on router/agent, 0.1 on coder, 0.2 on reasoner), ARKA delivers consistent, reproducible code structures, RAII discipline, and verified JSON-RPC tool schemas."
    ]}
    marginalia={[
      { label: "Blueprint Format", value: "Plain-Text Git Modelfiles" },
      { label: "Quantization Tier", value: "Q4_K_M Balanced" },
      { label: "Memory Footprint", value: "~1.2 GB to ~4.9 GB RAM" },
      { label: "Hardware Target", value: "8GB Unified Memory Native" },
    ]}
    specGrid={[
      {
        heading: "Inspectable Modelfiles",
        detail: "Zero hidden wrappers—every prompt, temperature curve, and few-shot pair is version-controlled."
      },
      {
        heading: "Bounded KV-Cache",
        detail: "Carefully calibrated num_ctx (4,096 to 16,384) guarantees zero out-of-memory crashes on consumer devices."
      },
      {
        heading: "Deterministic Sampling",
        detail: "Fixed temperatures (0.0 to 0.2) ensure repeatable, testable output schemas without generative drift."
      },
      {
        heading: "Local IDE Integration",
        detail: "Drop-in configuration files for OpenCode, Continue.dev, and local OpenAI-compatible /v1 endpoints."
      }
    ]}
  />
);

export const EditorialHonestySection: React.FC = () => (
  <EditorialNarrativeSection
    id="editorial-honesty"
    numeral="III"
    category="Epistemic Honesty & Sovereignty"
    title="Calibrated Abstention, Zero Telemetry, and Local Ownership"
    bgVariant="sand"
    leadParagraph="When a closed commercial model encounters a question beyond its knowledge boundary, it frequently fabricates citations with fluent confidence. ARKA is engineered around a stricter scientific ethic: verify what is known, compute what is exact, and openly state what is uncertain."
    paragraphs={[
      "To eliminate fluent hallucination, ARKA pairs its agentic execution with strict grounding checks and an explicit abstention guardrail. If required tool parameters or factual context are missing, Arka:agent explicitly returns INSUFFICIENT_CONTEXT rather than inventing plausible fiction or guessing tool arguments.",
      "Every benchmark and telemetry metric published for the ARKA ecosystem is produced by reproducible evaluation scripts under strict zero-contamination rules. Benchmarks measure actual JSON schema validity rates, C++17 RAII code structure adherence, and Apple Silicon M1 (8GB) hardware telemetry (TTFT, tokens/sec, and RSS memory) with seed=42 and greedy decoding.",
      "Above all, ARKA restores sovereignty to the individual developer, researcher, and engineer. Requiring no API keys, no per-token billing, and zero telemetry, ARKA runs 100% offline on your local hardware. The prompts, the memory, and the intelligence remain entirely yours."
    ]}
    quote={{
      text: "An AI system worthy of engineering trust must be inspectable down to its Modelfile blueprint—and humble enough to abstain when context is insufficient.",
      attribution: "Aman Jha, Creator of ARKA"
    }}
    marginalia={[
      { label: "Abstention Guard", value: "Explicit INSUFFICIENT_CONTEXT" },
      { label: "Evaluation Protocol", value: "Greedy T=0.0 · Seed 42" },
      { label: "Telemetry", value: "0% Cloud · 100% Offline" },
      { label: "Repository License", value: "Open-Weight Configurations" },
    ]}
  />
);
