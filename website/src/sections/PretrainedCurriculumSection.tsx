import React from 'react';
import { AnimatedMorphNumber } from '../components/CinematicMorphText';
import { TopicAllocationBento } from '../components/TopicAllocationBento';
import { PlatformsBento } from '../components/PlatformsBento';
import pretrainData from '../data/pretrain_metrics.json';
import type { PretrainMetricsData } from '../types/pretrain';

const data = pretrainData as PretrainMetricsData;

export const PretrainedCurriculumSection: React.FC = () => {
  return (
    <section
      id="training"
      className="relative py-24 md:py-36 bg-[#FBF9F5] text-[#141312] border-t border-[#141312]/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Asymmetrical Section Header & Editorial Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 border-b border-[#141312]/10">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif-editorial italic text-2xl text-[#FF5500] font-semibold">
                II.
              </span>
              <span className="font-mono-tabular text-[11px] uppercase tracking-[0.25em] text-[#141312]/50">
                Curriculum & Provenance
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312] leading-[1.08]">
              {data.curriculum.totalDatasets} Curated Datasets.
              <br />
              <span className="font-serif-editorial italic font-normal text-[#FF5500]">
                Zero Redundancy.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-8 space-y-4">
            <p className="font-serif-editorial text-xl sm:text-2xl text-[#141312]/85 leading-relaxed font-normal">
              Every token across the ARKA model ecosystem was audited from {data.curriculum.totalDatasets} open-access
              scientific, mathematical, and algorithmic corpora. Powered by strict reproducibility manifests and
              Git-versioned Modelfiles, local execution advances with 100% verifiable provenance.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-tabular text-[#141312]/50 pt-2">
              <span>● LOCAL RUNTIME: OLLAMA NATIVE</span>
              <span>● BLUEPRINTS: GIT MODELFILES</span>
              <span>● STATUS: 100% VERIFIABLE</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Hero Tabular Numerals (Cardless Pure Text) */}
        <div className="py-20 border-b border-[#141312]/10 space-y-16">
          {/* Row 1: Datasets (5 cols) & Total Tokens (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-7xl sm:text-8xl lg:text-9xl text-[#141312] leading-none">
                <AnimatedMorphNumber
                  value={data.curriculum.totalDatasets ?? 177}
                  duration={1.8}
                />
              </div>
              <div className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#141312]/60 pt-2">
                Verified Open Datasets
              </div>
              <p className="text-xs sm:text-sm text-[#141312]/70 leading-relaxed font-sans max-w-sm">
                Curated across 16 foundational domains from Hugging Face collections, BigCode,
                AllenAI, MMLU, and verified code repositories.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-2 lg:pt-2">
              <div className="text-6xl sm:text-7xl lg:text-8xl text-[#141312] leading-none">
                <AnimatedMorphNumber
                  value={(data.curriculum.totalTokens ?? 506588190) / 1_000_000}
                  decimals={2}
                  suffix="M"
                  duration={2.0}
                />
              </div>
              <div className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#141312]/60 pt-2">
                Total Pretraining Dataset Tokens
              </div>
              <p className="text-xs sm:text-sm text-[#141312]/70 leading-relaxed font-sans max-w-md">
                Combined token size of all datasets in our evaluation and tuning pool. ARKA configurations have actively verified 46,970 benchmark steps across this curriculum with zero repetition.
              </p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#141312]/5" />

          {/* Row 2: Total Records (5 cols) & Total Steps (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-6xl sm:text-7xl lg:text-8xl text-[#141312] leading-none">
                <AnimatedMorphNumber
                  value={data.curriculum.totalRecords ?? 676093}
                  duration={2.2}
                />
              </div>
              <div className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#141312]/60 pt-2">
                Total Pretraining Records
              </div>
              <p className="text-xs sm:text-sm text-[#141312]/70 leading-relaxed font-sans max-w-sm">
                Consolidated texts and verified questions stored across the 16 learning domains, deduplicated by SHA-256 hash.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-2 lg:pt-2">
              <div className="text-6xl sm:text-7xl lg:text-8xl text-[#FF5500] leading-none">
                <AnimatedMorphNumber
                  value={data.curriculum.totalSteps ?? 46970}
                  duration={1.4}
                />
              </div>
              <div className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#141312]/60 pt-2">
                Total Training Steps Executed
              </div>
              <p className="text-xs sm:text-sm text-[#141312]/70 leading-relaxed font-sans max-w-md">
                Continuous training passes executed across all 6 model tiers, reaching healthy convergence and low loss on Apple Silicon MPS.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Topic Allocation Bento Grid */}
        <div className="py-14 sm:py-16 border-b border-[#141312]/10">
          <TopicAllocationBento />
        </div>

        {/* Sovereign Execution Platforms Bento Stage */}
        <div className="pt-14 sm:pt-16">
          <PlatformsBento />
        </div>
      </div>
    </section>
  );
};
