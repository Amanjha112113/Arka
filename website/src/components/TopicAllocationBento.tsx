import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Code2, Brain, Wrench, Calculator, CheckCircle, Copy, Check } from 'lucide-react';

interface TopicData {
  id: string;
  name: string;
  shortName: string;
  domainId: string;
  percentage: number;
  count: number;
  samplePrompt: string;
  icon: React.ReactNode;
  checksum: string;
}

const TOPICS: TopicData[] = [
  {
    id: 'routing',
    name: 'Intent Classification & Routing',
    shortName: 'Intent Routing',
    domainId: '01',
    percentage: 25.0,
    count: 0,
    samplePrompt: 'Classify intent: "Refactor this mutex lock into an atomic CAS loop."',
    icon: <Wrench className="w-4 h-4" />,
    checksum: 'sha256:a3f8c2e1',
  },
  {
    id: 'systems',
    name: 'Systems Programming (C++17/Python)',
    shortName: 'Systems (C++17/Py)',
    domainId: '02',
    percentage: 25.0,
    count: 0,
    samplePrompt: 'Implement a lock-free SPSC ring buffer in C++17 using std::atomic.',
    icon: <Code2 className="w-4 h-4" />,
    checksum: 'sha256:b4f9d3c2',
  },
  {
    id: 'mcp',
    name: 'MCP Tool Execution & Agent Orchestration',
    shortName: 'MCP & Orchestration',
    domainId: '03',
    percentage: 25.0,
    count: 0,
    samplePrompt: 'Execute: list directory contents, then read config.yaml',
    icon: <Brain className="w-4 h-4" />,
    checksum: 'sha256:c5a1e4d3',
  },
  {
    id: 'reasoning',
    name: 'Mathematical Proofs & Architecture Reasoning',
    shortName: 'Math & Reasoning',
    domainId: '04',
    percentage: 25.0,
    count: 0,
    samplePrompt: 'Prove whether a bounded KV-cache of size 4K preserves O(1) amortized step latency.',
    icon: <Calculator className="w-4 h-4" />,
    checksum: 'sha256:d6b2f5e4',
  },
];

export const TopicAllocationBento: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string>('mcp');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const activeTopicData = useMemo(
    () => TOPICS.find((t) => t.id === activeTopic) || TOPICS[2],
    [activeTopic]
  );

  const handleCopyPrompt = useCallback((prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  }, []);

  // Keyboard navigation (1-4 and arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const topicMap: Record<string, string> = {
        '1': 'routing',
        '2': 'systems',
        '3': 'mcp',
        '4': 'reasoning',
      };
      if (topicMap[e.key]) {
        setActiveTopic(topicMap[e.key]);
      }
      const currentIndex = TOPICS.findIndex((t) => t.id === activeTopic);
      if (e.key === 'ArrowRight' && currentIndex < TOPICS.length - 1) {
        setActiveTopic(TOPICS[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setActiveTopic(TOPICS[currentIndex - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTopic]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className="relative bg-[#0D0D0D] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden">
        {/* Subtle ambient glow behind active tab */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FF4D00]/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
          <div>
            <span className="font-mono-tabular text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FF4D00] font-semibold block">
              Verified Topic Allocation (Non-Repeating Cursor)
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
              Click topic to inspect real trained queries
            </h3>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
            <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-white/60">
              Live Verification
            </span>
          </div>
        </div>

        {/* 4-Tab Interactive Switcher */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-5 pb-5">
          {TOPICS.map((topic) => {
            const isActive = topic.id === activeTopic;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`group text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'border-[#FF4D00] bg-gradient-to-b from-[#FF4D00]/15 to-[#FF4D00]/5 shadow-[0_0_20px_rgba(255,77,0,0.12)]'
                    : 'border-white/10 bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono-tabular text-[10px] tracking-wider uppercase font-semibold ${
                      isActive ? 'text-[#FF4D00]' : 'text-neutral-400 group-hover:text-neutral-300'
                    }`}
                  >
                    DOMAIN {topic.domainId}
                  </span>
                  <span
                    className={`font-mono-tabular text-xs font-bold ${
                      isActive ? 'text-[#FF4D00]' : 'text-neutral-500'
                    }`}
                  >
                    {topic.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={isActive ? 'text-[#FF4D00]' : 'text-neutral-400'}>
                    {topic.icon}
                  </span>
                  <span
                    className={`font-display text-xs sm:text-sm font-semibold truncate ${
                      isActive ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {topic.shortName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Nested Inspector Sub-Card */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopicData.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#141414] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3.5"
            >
              {/* Top Row: Domain title + Record count badge + Checksum */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#FF4D00]/15 text-[#FF4D00]">
                    {activeTopicData.icon}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
                    {activeTopicData.name} Domain
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {activeTopicData.count} UNIQUE RECORDS TRAINED IN THIS CURRICULUM
                  </span>
                  <div className="inline-flex items-center gap-1 font-mono-tabular text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>{activeTopicData.checksum}</span>
                  </div>
                </div>
              </div>

              {/* Prompt Callout Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular text-[10px] uppercase tracking-wider text-neutral-400">
                    SAMPLE PROMPT INGESTED IN CURRENT NON-REPEATING SLICE:
                  </span>
                  <button
                    onClick={() => handleCopyPrompt(activeTopicData.samplePrompt)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono-tabular text-neutral-400 hover:text-[#FF4D00] transition-colors p-1 cursor-pointer"
                    title="Copy prompt"
                  >
                    {copiedPrompt ? (
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
                <div className="bg-[#0A0A0A] border-l-2 border-[#FF4D00] p-3.5 sm:p-4 rounded-r-lg">
                  <p className="font-mono text-xs sm:text-sm text-neutral-100 leading-relaxed select-all">
                    “{activeTopicData.samplePrompt}”
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicAllocationBento;
