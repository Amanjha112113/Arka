import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Globe,
  Code2,
  Sparkles,
  Network,
  Boxes,
  Copy,
  Check,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';
import pretrainData from '../data/pretrain_metrics.json';
import type { PretrainMetricsData } from '../types/pretrain';

const data = pretrainData as PretrainMetricsData;

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  ollama: <Cpu className="w-4 h-4" />,
  'ollama-registry': <Globe className="w-4 h-4" />,
  opencode: <Code2 className="w-4 h-4" />,
  'continue-dev': <Sparkles className="w-4 h-4" />,
  langgraph: <Network className="w-4 h-4" />,
  'python-sdk': <Boxes className="w-4 h-4" />,
};

export const PlatformsBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-cycle through the platforms every 6 seconds if not paused by interaction
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.platforms.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const activePlatform = data.platforms[activeIndex] ?? data.platforms[0];

  const handleCopyCommand = useCallback((cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsAutoCycling(false)}
      onMouseLeave={() => setIsAutoCycling(true)}
    >
      <div className="relative bg-[#0D0D0D] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden">
        {/* Subtle ambient background glow */}
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-[#FF4D00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
          <div>
            <span className="font-mono-tabular text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FF4D00] font-semibold block">
              Sovereign Execution Platforms
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
              Trained & Verified Across {data.platforms.length} Compute Subsystems
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAutoCycling ? 'bg-[#FF4D00] animate-pulse' : 'bg-neutral-500'
              }`}
            />
            <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-white/60">
              {isAutoCycling ? 'Auto-Cycle Active' : 'Interactive Mode'}
            </span>
          </div>
        </div>

        {/* Bento Split: Left Platform Navigator + Right Inspector Sub-Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
          {/* Left Column: Platform Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {data.platforms.map((platform, idx) => {
              const isActive = idx === activeIndex;
              const icon = PLATFORM_ICONS[platform.id] ?? <Terminal className="w-4 h-4" />;
              return (
                <button
                  key={platform.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoCycling(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-[#FF4D00] bg-gradient-to-r from-[#FF4D00]/15 via-[#FF4D00]/5 to-transparent text-white shadow-[0_0_15px_rgba(255,77,0,0.1)]'
                      : 'border-white/5 bg-[#141414] text-neutral-400 hover:text-white hover:border-white/15 hover:bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`p-1.5 rounded-lg flex-shrink-0 ${
                        isActive ? 'bg-[#FF4D00]/20 text-[#FF4D00]' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono-tabular text-[10px] font-semibold ${
                            isActive ? 'text-[#FF4D00]' : 'text-neutral-500'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-display text-xs sm:text-sm font-semibold truncate text-white">
                          {platform.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-mono-tabular text-[9px] uppercase tracking-wider px-2 py-0.5 rounded flex-shrink-0 ${
                      isActive
                        ? 'bg-[#FF4D00]/20 text-[#FF4D00] border border-[#FF4D00]/30 font-semibold'
                        : 'bg-white/5 text-neutral-500 border border-white/5'
                    }`}
                  >
                    {platform.category.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Platform Inspector Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-[#141414] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4"
              >
                {/* Header & Badges */}
                <div className="space-y-1.5 pb-3 border-b border-white/5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[10px] uppercase tracking-widest text-[#FF4D00] font-semibold bg-[#FF4D00]/10 border border-[#FF4D00]/20 px-2 py-0.5 rounded">
                      {activePlatform.statusBadge}
                    </span>
                    <span className="font-mono-tabular text-[10px] text-neutral-500 uppercase tracking-wider">
                      {activePlatform.category}
                    </span>
                  </div>

                  <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight pt-1">
                    {activePlatform.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400">
                    {activePlatform.subtitle}
                  </p>
                </div>

                {/* Architecture Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {activePlatform.architecture}
                </p>

                {/* 3 Telemetry Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-[#0A0A0A] border border-white/5 p-2.5 rounded-lg">
                    <span className="font-mono-tabular text-[9px] uppercase tracking-wider text-neutral-500 block">
                      Latency / Pacing
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-neutral-200 mt-0.5 block truncate">
                      {activePlatform.latency}
                    </span>
                  </div>
                  <div className="bg-[#0A0A0A] border border-white/5 p-2.5 rounded-lg">
                    <span className="font-mono-tabular text-[9px] uppercase tracking-wider text-neutral-500 block">
                      Memory Ceiling
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-neutral-200 mt-0.5 block truncate">
                      {activePlatform.memory}
                    </span>
                  </div>
                  <div className="bg-[#0A0A0A] border border-white/5 p-2.5 rounded-lg">
                    <span className="font-mono-tabular text-[9px] uppercase tracking-wider text-neutral-500 block">
                      Throughput Target
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-neutral-200 mt-0.5 block truncate">
                      {activePlatform.throughput}
                    </span>
                  </div>
                </div>

                {/* Monospace Command Bar with Copy Button */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-neutral-400">
                      Terminal Invocation:
                    </span>
                    <button
                      onClick={() => handleCopyCommand(activePlatform.command)}
                      className="inline-flex items-center gap-1 text-[10px] font-mono-tabular text-neutral-400 hover:text-[#FF4D00] transition-colors p-1 cursor-pointer"
                      title="Copy command"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-[#FF4D00]" />
                          <span className="text-[#FF4D00]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#0A0A0A] border-l-2 border-[#FF4D00] p-3.5 sm:p-4 rounded-r-lg font-mono text-xs sm:text-sm text-neutral-100 flex items-center justify-between gap-3 overflow-x-auto">
                    <span className="truncate select-all">$ {activePlatform.command}</span>
                  </div>
                </div>

                {/* Provenance Links */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-4 text-[11px] font-mono-tabular text-neutral-500">
                  <a
                    href="https://github.com/AmanJha112113/Arka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF4D00] transition-colors inline-flex items-center gap-1"
                  >
                    Inspect Modelfile Repository
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/AmanJha112113/Arka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF4D00] transition-colors inline-flex items-center gap-1"
                  >
                    Evaluation Manifests
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformsBento;
