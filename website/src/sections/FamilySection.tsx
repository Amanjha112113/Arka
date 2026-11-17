import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Copy, Check, Cpu, ExternalLink } from 'lucide-react';
import { ARKA_MODELS } from '../data/modelsData';
import { BespokeSeal } from '../components/BespokeSeals';
import { OllamaLogo } from '../components/PlatformLogos';
import type { ArkaModelTier } from '../types/models';

interface FamilyKineticCardProps {
  model: ArkaModelTier;
  index: number;
  smoothScroll: any;
  copiedCmd: string | null;
  onCopy: (cmd: string) => void;
}

const FamilyKineticCard: React.FC<FamilyKineticCardProps> = ({
  model,
  index,
  smoothScroll,
  copiedCmd,
  onCopy,
}) => {
  // Adjust animations based on card position (0-3 for 4 cards)
  // Each card gets focus at its position in the sequence
  const totalCards = 4;
  const centerProgress = index / (totalCards - 1);
  
  const scale = useTransform(
    smoothScroll,
    [
      Math.max(0, centerProgress - 0.25),
      centerProgress,
      Math.min(1, centerProgress + 0.25)
    ],
    [0.92, 1.08, 0.92]
  );
  
  // Removed opacity fade - all cards stay fully visible
  // const opacity = 1; // kept for reference but unused
  
  const shadowOpacity = useTransform(
    smoothScroll,
    [
      Math.max(0, centerProgress - 0.2),
      centerProgress,
      Math.min(1, centerProgress + 0.2)
    ],
    [0, 0.5, 0]
  );

  return (
    <motion.div
      style={{
        scale,
      }}
      whileHover={{ y: -8 }}
      className="w-[340px] sm:w-[380px] md:w-[420px] rounded-3xl bg-[#141312] border border-white/10 hover:border-[#F59E0B]/60 p-6 sm:p-7 flex flex-col justify-between shrink-0 shadow-2xl relative group transition-all duration-300"
    >
      {/* Dynamic Accent Glow Halo */}
      <motion.div
        style={{ opacity: shadowOpacity }}
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-radial from-[#F59E0B]/30 to-transparent blur-xl -z-10"
      />
      
      {/* Additional animated glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${model.accentColor}40, transparent 70%)`,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: model.accentColor,
              left: `${20 + i * 15}%`,
              bottom: '10%',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div>
        {/* Top Header: Tier Badge & Seal */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-mono-tabular font-bold uppercase tracking-wider">
              {model.tierBadge}
            </span>
            <span className="font-mono-tabular text-xs text-white/50">{model.baseModel}</span>
          </div>
          <BespokeSeal tierId={model.id} size={22} className="text-[#F59E0B]" />
        </div>

        {/* Model Title */}
        <div className="mt-4">
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F59E0B] transition-colors">
            {model.codeName}
          </h3>
          <p className="font-serif-editorial text-xs italic text-[#F59E0B]/90 mt-0.5">
            {model.contextWindow} · {model.ramFootprint} · {model.quantization}
          </p>
          <p className="mt-2 text-xs text-white/70 leading-relaxed min-h-[36px]">
            {model.primaryWorkload}
          </p>
        </div>

        {/* Target Runtime Chip */}
        <div className="mt-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2 text-[11px] font-mono-tabular text-white/80">
          <Cpu className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[9px] uppercase tracking-wider text-white/40 block">TARGET RUNTIME</span>
            <span className="truncate block font-sans text-xs text-white/90">{model.targetHardware}</span>
          </div>
        </div>

        {/* Key Specs Row */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono-tabular text-white/60">
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[8px] uppercase tracking-wider block">CONTEXT</span>
            <span className="font-semibold text-white">{model.contextWindow}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[8px] uppercase tracking-wider block">TEMP</span>
            <span className="font-semibold text-white">{model.temperature}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[8px] uppercase tracking-wider block">SPEED</span>
            <span className="font-semibold text-white">{model.speedTokensPerSec} tok/s</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[8px] uppercase tracking-wider block">RAM</span>
            <span className="font-semibold text-white">{model.ramFootprint}</span>
          </div>
        </div>
      </div>

      {/* Bottom: Pull Command & Registry Link */}
      <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between gap-2 font-mono-tabular text-xs bg-[#09090B] rounded-xl p-3 border border-white/5 relative">
          <span className="truncate text-white/90 select-all" style={{ color: model.accentColor }}>$ ollama run amanjha112113/Arka:{model.id}</span>
          <button
            onClick={() => onCopy(`ollama run amanjha112113/Arka:${model.id}`)}
            className="text-white/50 hover:text-[#F59E0B] transition-colors p-1 cursor-pointer flex-shrink-0"
            title="Copy pull command"
            aria-label="Copy pull command"
          >
            {copiedCmd === `ollama run amanjha112113/Arka:${model.id}` ? (
              <Check className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <a
          href={model.ollamaRegistry}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/5 text-[10px] font-mono-tabular transition-colors"
        >
          <OllamaLogo size={12} />
          <span>View on Ollama</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

export const FamilySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothScroll = useSpring(scrollYProgress, { damping: 28, stiffness: 180, mass: 0.6 });
  
  // Calculate proper horizontal scroll distance based on number of cards
  // We have 4 cards, so we need to scroll through 3 gaps to show all cards
  // Adjusted to show cards properly throughout the scroll
  const scrollX = useTransform(smoothScroll, [0, 1], ['0%', '-75%']);
  const progressPercent = useTransform(smoothScroll, [0, 1], ['0%', '100%']);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleScrollToTier = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const trackHeight = containerRef.current.offsetHeight - window.innerHeight;
    // Adjusted for 4 cards (indices 0-3)
    const targetScroll = scrollTop + (idx / 3) * trackHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      id="family"
      ref={containerRef}
      className="relative h-[260vh] bg-[#0D0C0B] text-[#FAF7F2]"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 px-4 sm:px-8">
        {/* Top Header Bar with Segmented Tier Jumper Tabs */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-white/10 gap-4 shrink-0 backdrop-blur-sm bg-[#0D0C0B]/30 rounded-2xl px-6 py-4">
          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white relative"
            >
              THE <span className="text-[#F59E0B] relative inline-block">
                <span className="relative z-10">ARKA</span>
                <motion.span
                  className="absolute inset-0 bg-[#F59E0B]/20 blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span> MODEL FAMILY
            </motion.h2>
            
            {/* Decorative accent line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F59E0B]/50 to-transparent mt-2"
            />
            
            {/* Subtitle with animated entrance */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 text-xs sm:text-sm text-white/60 font-mono-tabular"
            >
              Four specialized tiers · 1.5B to 7B parameters · Local-first intelligence
            </motion.p>
          </div>

          {/* Tier Jumper Segmented Control */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 backdrop-blur-md bg-white/5 rounded-full px-2 py-1.5 border border-white/10">
            {ARKA_MODELS.map((model, idx) => (
              <motion.button
                key={model.id}
                onClick={() => handleScrollToTier(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#F59E0B] text-white/70 hover:text-white text-[11px] font-mono-tabular uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap group overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/0 via-[#F59E0B]/50 to-[#F59E0B]/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">{model.tierBadge}</span>
                
                {/* Glow effect on hover */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-[#F59E0B]/30"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Kinetic Horizontal Scrolly Carousel Track */}
        <div className="relative w-full my-auto overflow-hidden py-4">
          <motion.div
            ref={trackRef}
            style={{ x: scrollX }}
            className="flex items-center gap-6 sm:gap-8 will-change-transform pl-4 sm:pl-12 w-max"
          >
            {ARKA_MODELS.map((model, idx) => (
              <FamilyKineticCard
                key={model.id}
                model={model}
                index={idx}
                smoothScroll={smoothScroll}
                copiedCmd={copiedCmd}
                onCopy={handleCopy}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Tactile Progress Bar & Unpin Indicator */}
        <div className="w-full max-w-7xl mx-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tabular text-white/50 gap-2 shrink-0 backdrop-blur-sm bg-[#0D0C0B]/30 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              01 / ROUTER
            </motion.span>
            <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                style={{ width: progressPercent }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F59E0B] to-[#FF7700] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />
              {/* Animated glow on progress bar */}
              <motion.div
                style={{ width: progressPercent }}
                className="absolute inset-y-0 left-0 bg-[#F59E0B] rounded-full blur-sm opacity-50"
              />
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              04 / REASONER
            </motion.span>
          </div>

          <div className="flex items-center gap-3">
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll down to traverse tiers
            </motion.span>
            <motion.span 
              className="text-[#F59E0B] font-semibold"
              animate={{ 
                textShadow: [
                  '0 0 0px rgba(245,158,11,0)',
                  '0 0 10px rgba(245,158,11,0.5)',
                  '0 0 0px rgba(245,158,11,0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              1.5B → 7B Parameters
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
};
