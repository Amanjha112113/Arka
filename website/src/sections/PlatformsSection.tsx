import React, { useState } from 'react';
import { Check, Copy, ArrowUpRight, Code2, Cpu, BookOpen } from 'lucide-react';
import { OllamaLogo, HuggingFaceLogo, OpenClawLogo, HermesAgentLogo, AntigravityLogo } from '../components/PlatformLogos';
import { KineticHeading } from '../components/KineticText';

interface PlatformSnippet {
  id: string;
  name: string;
  icon: React.ElementType;
  language: string;
  description: string;
  command: string;
}

const PLATFORM_SNIPPETS: PlatformSnippet[] = [
  {
    id: 'ollama',
    name: 'Ollama CLI',
    icon: OllamaLogo,
    language: 'bash',
    description: 'Pull and run quantized ARKA GGUF configurations directly from terminal.',
    command: `# Pull and run the Arka Systems Coder locally
ollama run amanjha112113/Arka:coder

# Or run the ultra-edge Router for sub-120ms intent routing
ollama run amanjha112113/Arka:router

# Or run the MCP Agent for autonomous tool calling
ollama run amanjha112113/Arka:agent

# Or run Deep Reasoner for multi-step mathematical proofs
ollama run amanjha112113/Arka:reasoner`,
  },
  {
    id: 'openclaw',
    name: 'OpenClaw Agent',
    icon: OpenClawLogo,
    language: 'json',
    description: 'Configure ARKA as the reasoning engine for OpenClaw autonomous tool execution.',
    command: `{
  "agent": {
    "name": "arka-claw-worker",
    "provider": "ollama",
    "model": "amanjha112113/Arka:agent",
    "temperature": 0.0,
    "system_prompt": "You are Arka:agent, executing multi-turn tool loops under OpenClaw.",
    "tools": ["filesystem", "bash_sandbox", "browser_view", "mcp_runner"]
  }
}`,
  },
  {
    id: 'hermes',
    name: 'Hermes Agent',
    icon: HermesAgentLogo,
    language: 'python',
    description: 'Run ARKA within the Nous Research Hermes function calling & autonomous agent loop.',
    command: `from hermes_agent import HermesRunner

# Initialize autonomous Hermes reasoning loop powered by ARKA
runner = HermesRunner(
    model_name="amanjha112113/Arka:coder",
    backend="ollama", # localhost:11434
    function_calling_format="hermes-3-xml",
    enable_scratchpad=True
)

response = runner.run("Audit repo dependencies, plan migration, and commit fixes.")
print(response.final_output)`,
  },
  {
    id: 'python',
    name: 'Python / OpenAI SDK',
    icon: Code2,
    language: 'python',
    description: 'Call local ARKA OpenAI-compatible endpoint with zero cloud telemetry.',
    command: `from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

response = client.chat.completions.create(
    model="amanjha112113/Arka:coder",
    messages=[
        {"role": "system", "content": "Principal C++17 systems architect."},
        {"role": "user", "content": "Write a bounded thread-safe queue in C++17."}
    ],
    temperature=0.1
)
print(response.choices[0].message.content)`,
  },
  {
    id: 'llamacpp',
    name: 'llama.cpp (GGUF)',
    icon: Cpu,
    language: 'bash',
    description: 'Direct quantized CPU/Metal inference with zero external dependencies.',
    command: `# Run native Q4_K_M quantized weights with Metal acceleration
./llama-cli \\
  -m ./models/arka-coder-q4_k_m.gguf \\
  -p "Implement a lock-free ring buffer in C++17:" \\
  -c 8192 \\
  --temp 0.1`,
  },
  {
    id: 'mcp',
    name: 'Antigravity MCP Agent',
    icon: AntigravityLogo,
    language: 'json',
    description: 'Register ARKA as an autonomous agent reasoning provider.',
    command: `{
  "mcpServers": {
    "arka-local": {
      "command": "ollama",
      "args": ["run", "amanjha112113/Arka:agent"],
      "env": {
        "ARKA_CONTEXT_WINDOW": "16384",
        "ARKA_MEMORY_TIER": "ALL"
      }
    }
  }
}`,
  },
];

interface PlatformsSectionProps {
  onOpenDocs: () => void;
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ onOpenDocs }) => {
  const [activeTabId, setActiveTabId] = useState<string>('ollama');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = PLATFORM_SNIPPETS.find((s) => s.id === activeTabId) ?? PLATFORM_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="platforms" className="py-20 md:py-28 bg-[#FBF9F5] text-[#141312] border-t border-[#141312]/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#141312]/10 gap-4">
          <div>
            <KineticHeading
              text="RUN ARKA ANYWHERE"
              highlightWords={['ARKA']}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]"
            />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-[#141312]/70 max-w-md leading-relaxed">
              Standard open-weight configurations compatible with Ollama, OpenAI SDK, OpenCode, Continue.dev, and Model Context Protocol (MCP).
            </p>
            <button
              onClick={onOpenDocs}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#141312] hover:bg-[#FF5500] text-white text-xs font-mono-tabular transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Complete Docs & Modelfiles</span>
            </button>
          </div>
        </div>

        {/* Devlets Multi-Environment Developer Terminal */}
        <div className="mt-8 rounded-2xl bg-[#141312] text-[#FAF7F2] border border-white/10 shadow-2xl overflow-hidden">
          {/* Terminal Tab Bar */}
          <div className="px-4 py-3 bg-[#0D0C0B] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {PLATFORM_SNIPPETS.map((snippet) => {
                const isActive = snippet.id === activeTabId;
                const Icon = snippet.icon;
                return (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveTabId(snippet.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5500] text-white font-medium shadow-xs'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{snippet.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tabular transition-colors cursor-pointer active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FF5500]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Description Strip */}
          <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-white/70 font-mono-tabular flex items-center justify-between">
            <span>{activeSnippet.description}</span>
            <span className="text-[#FF5500] uppercase text-[10px]">Lang: {activeSnippet.language}</span>
          </div>

          {/* Code Viewer Stage */}
          <div className="p-6 overflow-x-auto font-mono-tabular text-xs text-white/90 leading-relaxed bg-black/60 min-h-[160px]">
            <pre>
              <code>{activeSnippet.command}</code>
            </pre>
          </div>
        </div>

        {/* Direct Platform Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="https://ollama.com/amanjha112113/Arka"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-[#141312]/10 hover:border-[#FF5500]/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#141312] text-white">
                <OllamaLogo size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-xs text-[#141312] truncate">
                  Ollama Registry
                </h4>
                <p className="text-[11px] text-[#141312]/60 font-mono-tabular truncate">
                  amanjha112113/Arka
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#141312]/40 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          <a
            href="https://github.com/AmanJha112113/Arka"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-[#141312]/10 hover:border-[#FF5500]/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#141312] text-white">
                <HuggingFaceLogo size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-xs text-[#141312] truncate">
                  GitHub Repository
                </h4>
                <p className="text-[11px] text-[#141312]/60 font-mono-tabular truncate">
                  AmanJha112113/Arka
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#141312]/40 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          <button
            onClick={() => {
              setActiveTabId('openclaw');
              const el = document.getElementById('platforms');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 rounded-2xl bg-white border border-[#141312]/10 hover:border-[#FF5500]/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#141312] text-white">
                <OpenClawLogo size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-xs text-[#141312] truncate">
                  OpenClaw Agent
                </h4>
                <p className="text-[11px] text-[#141312]/60 font-mono-tabular truncate">
                  Cybernetic Tool Loop
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#141312]/40 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </button>

          <button
            onClick={() => {
              setActiveTabId('hermes');
              const el = document.getElementById('platforms');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-4 rounded-2xl bg-white border border-[#141312]/10 hover:border-[#FF5500]/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#141312] text-white">
                <HermesAgentLogo size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-bold text-xs text-[#141312] truncate">
                  Hermes Agent
                </h4>
                <p className="text-[11px] text-[#141312]/60 font-mono-tabular truncate">
                  Nous Function Loop
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#141312]/40 group-hover:text-[#FF5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
