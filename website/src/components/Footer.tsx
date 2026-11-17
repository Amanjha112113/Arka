import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { OllamaLogo } from './PlatformLogos';

interface FooterProps {
  onOpenDocs: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onNavigateSection }) => {
  return (
    <footer className="bg-[#09090B] text-[#FAFAFA] py-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          {/* Left: Brand & Architect */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F59E0B]/60 bg-[#09090B] shrink-0">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-[#F59E0B]"
                >
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                  <polygon points="32,8 54,32 32,56 10,32" stroke="currentColor" strokeWidth="2.5" fill="rgba(245,158,11,0.1)" />
                  <polygon points="32,16 46,32 32,48 18,32" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="32" y1="2" x2="32" y2="10" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="32" y1="54" x2="32" y2="62" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="32" cy="32" r="5" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-bold tracking-[0.22em] text-base text-white">
                ARKA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#FAFAFA]/70 max-w-md leading-relaxed font-sans">
              Modular, local-first intelligence configurations & agentic runtimes for everyday hardware.
              Engineered by <strong className="text-white font-medium">Aman Jha</strong>.
              Four specialized tiers from 1.5B router to 7B reasoner.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-tabular">
              <a
                href="https://github.com/AmanJha112113"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F59E0B] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>github.com/AmanJha112113</span>
              </a>
              <span className="text-white/30">·</span>
              <a
                href="https://orcid.org/0009-0007-1015-4782"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA]/50 hover:text-[#F59E0B] transition-colors"
              >
                ORCID
              </a>
            </div>
          </div>
        </div>

          {/* Center: Navigation */}
          <div className="md:col-span-3 space-y-3 text-xs font-mono-tabular">
            <span className="uppercase tracking-widest text-[#F59E0B] block text-[10px] font-bold">
              ARCHITECTURE
            </span>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architectural Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('family')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tier Explorer (4 Tiers)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('training')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Modelfile Inspector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('comparison')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Benchmarks & Telemetry
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocs}
                  className="text-[#F59E0B] font-medium hover:underline cursor-pointer"
                >
                  Interactive Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Right: Ecosystem Registries */}
          <div className="md:col-span-3 space-y-3 text-xs font-mono-tabular">
            <span className="uppercase tracking-widest text-[#F59E0B] block text-[10px] font-bold">
              REGISTRIES
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://ollama.com/amanjha112113/Arka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
              >
                <span className="flex items-center gap-2">
                  <OllamaLogo size={14} />
                  <span>amanjha112113/Arka</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </a>

              <a
                href="https://github.com/AmanJha112113/Arka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
              >
                <span className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>AmanJha112113/Arka</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tabular text-white/40">
          <span>© {new Date().getFullYear()} ARKA Model Ecosystem · Open-Weight Configurations & Runtimes · Engineered by Aman Jha</span>
          <div className="flex items-center gap-1">
            <span>Conceived & Architected with</span>
            <span className="text-[#F59E0B] font-bold">First Principles</span>
          </div>
        </div>
    </footer>
  );
};