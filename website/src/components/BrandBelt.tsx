import React from 'react';
import { motion } from 'framer-motion';
import {
  OllamaLogo,
  PythonLogo,
  PyTorchLogo,
  OnnxLogo,
} from './PlatformLogos';

const BRAND_ITEMS = [
  { name: 'Ollama', Logo: OllamaLogo, color: '#000000' },
  { name: 'Python', Logo: PythonLogo, color: '#3776AB' },
  { name: 'PyTorch', Logo: PyTorchLogo, color: '#EE4C2C' },
  { name: 'ONNX Runtime', Logo: OnnxLogo, color: '#005CED' },
  { name: 'OpenCode', Logo: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#1A1A2E"/>
      <path d="M10 14h16M10 18h12M10 22h8" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="26" cy="10" r="4" fill="#00D4AA"/>
    </svg>
  ), color: '#00D4AA' },
  { name: 'Continue.dev', Logo: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10h20M8 18h16M8 26h12" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="30" cy="6" r="5" fill="#0066FF"/>
    </svg>
  ), color: '#0066FF' },
  { name: 'LangGraph', Logo: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="4" fill="#FF6B6B"/>
      <circle cx="26" cy="10" r="4" fill="#4ECDC4"/>
      <circle cx="18" cy="26" r="4" fill="#FFD93D"/>
      <path d="M13 10h10M14 12L18 22L22 12" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ), color: '#FF6B6B' },
];

export const BrandBelt: React.FC = () => {
  const marqueeList = [...BRAND_ITEMS, ...BRAND_ITEMS, ...BRAND_ITEMS];

  return (
    <div className="relative w-full py-10 bg-[#09090B] border-y border-zinc-800 overflow-hidden select-none">
      {/* Subtle left & right gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#09090B] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#09090B] to-transparent z-10" />

      <div className="max-w-6xl mx-auto px-4 mb-5 text-center">
        <span className="font-mono-tabular text-[10px] uppercase tracking-[0.28em] text-[#FAFAFA]/50">
          ENGINEERED & INTEGRATED ACROSS THE OPEN ECOSYSTEM
        </span>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-12 sm:gap-16 whitespace-nowrap px-6"
        >
          {marqueeList.map((item, idx) => {
            const Icon = item.Logo;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-3 text-[#FAFAFA]/70 hover:text-[#F59E0B] transition-colors duration-300 group cursor-default"
              >
                <Icon size={28} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="font-display font-medium text-xs sm:text-sm tracking-[0.14em] uppercase">
                  {item.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
