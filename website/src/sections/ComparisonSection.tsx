import React from 'react';
import { Layers } from 'lucide-react';
import { ARKA_FAMILY_COMPARISON_LIST } from '../data/comparisonData';
import { BespokeSeal } from '../components/BespokeSeals';
import { AnimatedMultiLineChart } from '../components/AnimatedMultiLineChart';

export const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="relative py-20 md:py-28 bg-[#09090B] text-[#FAFAFA] border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA]">
              ARKA <span className="text-[#F59E0B]">FAMILY</span> BENCHMARKS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#FAFAFA]/70 max-w-md leading-relaxed">
            Side-by-side comparison: base models vs ARKA Modelfile-primed variants. JSON Schema Validity, Code Structure Adherence, Apple Silicon M1 (8GB) Hardware Telemetry.
          </p>
        </div>

        {/* Multi-Line Animated Benchmark Chart */}
        <div className="mb-10">
          <AnimatedMultiLineChart showBaselinesToggle={true} />
        </div>

        {/* Detailed Architecture & Hardware Matrix Table */}
        <div className="rounded-2xl bg-[#18181B] border border-zinc-800 overflow-hidden shadow-xs">
          <div className="px-5 py-4 bg-[#18181B]/50 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
              <h3 className="font-display text-sm sm:text-base font-bold text-[#FAFAFA]">
                Detailed Architecture & Hardware Matrix
              </h3>
            </div>
            <span className="text-[10px] font-mono-tabular text-[#FAFAFA]/50">
              Open-Weight Configurations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono-tabular">
              <thead>
                <tr className="border-b border-zinc-800 text-[9px] uppercase tracking-wider text-[#FAFAFA]/60 bg-[#09090B]/50">
                  <th className="py-3 px-4">Tag & Codename</th>
                  <th className="py-3 px-3">Base Model</th>
                  <th className="py-3 px-3">Context</th>
                  <th className="py-3 px-3">Temp</th>
                  <th className="py-3 px-3">RAM (Q4_K_M)</th>
                  <th className="py-3 px-3">Throughput</th>
                  <th className="py-3 px-4">Primary Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {ARKA_FAMILY_COMPARISON_LIST.map((model) => (
                  <tr key={model.id} className="hover:bg-[#18181B] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BespokeSeal tierId={model.id} size={16} className="text-[#F59E0B]" />
                        <div>
                          <span className="font-display font-bold text-[#FAFAFA] block">
                            {model.codeName}
                          </span>
                          <span className="text-[10px] text-[#F59E0B]">
                            {model.tierBadge}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#FAFAFA]">{model.baseModel}</td>
                    <td className="py-3 px-3 text-[#FAFAFA]/80">{model.contextWindow}</td>
                    <td className="py-3 px-3 text-[#FAFAFA]/80">{model.temperature}</td>
                    <td className="py-3 px-3 font-semibold text-[#F59E0B]">{model.ramFootprint}</td>
                    <td className="py-3 px-3 text-[#FAFAFA]/80">{model.speedTokensPerSec} tok/s</td>
                    <td className="py-3 px-4 text-[#FAFAFA]/70 text-[11px] font-sans max-w-xs truncate">
                      {model.primaryWorkload}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
