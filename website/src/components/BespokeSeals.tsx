import React from 'react';
import { ArkaTierId } from '../types/models';

interface SealProps {
  tierId: ArkaTierId | string;
  className?: string;
  size?: number;
}

export const BespokeSeal: React.FC<SealProps> = ({ tierId, className = '', size = 56 }) => {
  switch (tierId) {
    case 'router':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
          <polygon points="32,8 54,32 32,56 10,32" stroke="currentColor" strokeWidth="2" fill="rgba(245,158,11,0.1)" />
          <polygon points="32,16 46,32 32,48 18,32" stroke="currentColor" strokeWidth="1.25" />
          <line x1="32" y1="2" x2="32" y2="10" stroke="currentColor" strokeWidth="2" />
          <line x1="32" y1="54" x2="32" y2="62" stroke="currentColor" strokeWidth="2" />
          <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="2" />
          <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </svg>
      );

    case 'coder':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <rect x="8" y="8" width="48" height="48" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 20h32M16 32h32M16 44h24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 20v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M44 20v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="6" fill="none" stroke="#06B6D4" strokeWidth="2" />
          <circle cx="32" cy="32" r="2.5" fill="#06B6D4" />
        </svg>
      );

    case 'agent':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <rect x="6" y="10" width="52" height="44" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 18h40M12 26h40M12 34h30M12 42h35" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3" fill="#8B5CF6" />
          <circle cx="48" cy="16" r="3" fill="#8B5CF6" />
          <circle cx="16" cy="48" r="3" fill="#8B5CF6" />
          <circle cx="48" cy="48" r="3" fill="#8B5CF6" />
          <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );

    case 'reasoner':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.25" />
          <path d="M16 32h32" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32 16v32" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 16l32 32M48 16l-32 32" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="32" cy="32" rx="12" ry="8" fill="rgba(239,68,68,0.1)" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M32 28l3 3 8-8" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};
