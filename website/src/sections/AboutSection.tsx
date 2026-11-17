import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Eye, Cpu } from 'lucide-react';
import { KineticHeading } from '../components/KineticText';

const AXIOMS = [
  {
    num: '01',
    title: '100% Open Weights',
    subtitle: 'Zero Black Boxes',
    desc: 'Every layer, tokenizer rule, training checkpoint, and dataset manifest is open and inspectable. No hidden corporate safety filters or proprietary lock-in.',
    icon: Eye,
  },
  {
    num: '02',
    title: 'Epistemic Honesty',
    subtitle: 'Zero Hallucinations',
    desc: 'Engineered with strict grounding checks and calibrated abstention guardrails. If ARKA does not possess verified factual grounding, it explicitly emits INSUFFICIENT_CONTEXT.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'Everyday Hardware',
    subtitle: '8GB Unified Memory Native',
    desc: 'Engineered with Q4_K_M quantization and bounded KV-cache windows (4K–16K) so models run 100% in RAM alongside IDEs and browsers with zero swap thrashing.',
    icon: Cpu,
  },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 28, stiffness: 220, mass: 0.7 });

  // Kinetic Parallax for Greek Statue & Solar Ring
  const statueY = useTransform(smoothProgress, [0, 1], [60, -60]);
  const statueRotate = useTransform(smoothProgress, [0, 1], [-2.5, 2.5]);
  const auraScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#FBF9F5] text-[#141312] border-t border-[#141312]/8 overflow-hidden"
    >
      {/* Subtle Monumental Background Watermark */}
      <div className="pointer-events-none select-none absolute top-12 left-0 right-0 text-center font-display font-bold text-[13vw] leading-none text-[#141312]/[0.025] tracking-[0.2em] whitespace-nowrap">
        AMAN . ARKA
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols): Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <KineticHeading
              text="BUILT FOR CLARITY, NOT BLACK BOXES."
              highlightWords={['CLARITY,']}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312] leading-[1.08]"
            />

            <p className="font-serif-editorial italic text-lg sm:text-2xl text-[#141312]/85 leading-relaxed border-l-2 border-[#FF5500] pl-4">
              “ARKA represents the sun at the horizon-illuminating local-first modular intelligence.
              We architected the ARKA model ecosystem upon that exact ideal: radical openness, epistemic humility,
              and native accessibility on everyday hardware.”
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#141312]/75 leading-relaxed">
              <p>
                Modern artificial intelligence is increasingly centralized behind closed commercial APIs.
                Architectures remain opaque, pretraining data is concealed, and when prompted on topics beyond
                their knowledge boundary, models hallucinate confident falsehoods.
              </p>
              <p>
                <strong className="text-[#FF5500]">ARKA</strong> changes that completely. Built from first principles to bring high-performance intelligence directly to your everyday laptop, ARKA runs 100% offline with zero subscriptions, zero cloud lock-in, and zero hidden data collection. Everything-from its fast, deterministic sampling to its inspectable Modelfile blueprints-is completely open, transparent, and built to give you true private AI power.
              </p>
            </div>

            {/* 3 Core Axioms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#141312]/10">
              {AXIOMS.map((axiom) => {
                const Icon = axiom.icon;
                return (
                  <div
                    key={axiom.num}
                    className="p-4 rounded-xl bg-white/70 border border-[#141312]/8 shadow-xs hover:border-[#FF5500]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[#FF5500] mb-2">
                      <span className="font-mono-tabular text-[10px] font-bold tracking-wider">
                        {axiom.num}
                      </span>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-[#141312]">
                      {axiom.title}
                    </h3>
                    <p className="text-[11px] font-mono-tabular text-[#FF5500] mt-0.5">
                      {axiom.subtitle}
                    </p>
                    <p className="mt-2 text-xs text-[#141312]/70 leading-relaxed">
                      {axiom.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Kinetic Classical Sculpture Display */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Solar Halo */}
            <motion.div
              style={{ scale: auraScale }}
              className="pointer-events-none absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-radial from-[#FF5500]/25 via-[#FFA040]/10 to-transparent blur-3xl"
            />

            {/* Kinetic Marble Sculpture with Parallax & Tilt */}
            <motion.div
              style={{ y: statueY, rotateZ: statueRotate }}
              className="relative z-10 w-full max-w-md lg:max-w-lg flex flex-col items-center"
            >
              <div className="relative group flex justify-center">
                <img
                  src="/assets/ancient-greek-style-female-statue-isolated-on-transparent-background-png.png"
                  alt="Ancient Greek Style Statue"
                  className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] max-w-none h-auto object-contain drop-shadow-[0_28px_55px_rgba(20,19,18,0.28)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
