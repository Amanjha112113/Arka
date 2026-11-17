import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';
import { OllamaLogo } from './PlatformLogos';

interface NavbarProps {
  activeView: 'landing' | 'docs';
  setActiveView: (view: 'landing' | 'docs') => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Models' },
  { id: 'about', label: 'Architecture' },
  { id: 'demo', label: 'Playground' },
  { id: 'family', label: 'Tier Explorer' },
  { id: 'training', label: 'Modelfiles' },
  { id: 'capabilities', label: 'Pillars' },
  { id: 'comparison', label: 'Benchmarks' },
  { id: 'platforms', label: 'Integrate' },
];

export const GitHubStarButton: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchStars = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/AmanJha112113/Arka');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      } catch {
        // graceful offline fallback
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 60000); // sync every 60s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <a
      href="https://github.com/AmanJha112113/Arka"
      target="_blank"
      rel="noopener noreferrer"
      title="Star AmanJha112113/Arka on GitHub"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono-tabular transition-all group border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white shrink-0 min-h-[32px] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="currentColor"
        className="opacity-80 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      <span className="font-semibold hidden sm:inline">Star</span>
      <span className="flex items-center gap-0.5 text-[#FFBD2E] font-bold">
        <Star className="w-3 h-3 fill-current" />
        <span>{stars !== null ? stars.toLocaleString() : '0'}</span>
      </span>
    </a>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  const navMaxWidth = useTransform(smoothScrollY, [0, 140], [1320, 1180]);
  const navTopOffset = useTransform(smoothScrollY, [0, 140], [0, 14]);
  const navBorderRadius = useTransform(smoothScrollY, [0, 140], [0, 9999]);
  const navPaddingY = useTransform(smoothScrollY, [0, 140], [16, 9]);
  const navPaddingX = useTransform(smoothScrollY, [0, 140], [24, 14]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 30);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleSectionNavigate = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4">
      <motion.nav
        style={{
          maxWidth: navMaxWidth,
          marginTop: navTopOffset,
          borderRadius: navBorderRadius,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
        }}
        className={`pointer-events-auto w-full transition-colors duration-300 flex items-center justify-between gap-2 sm:gap-4 overflow-visible ${
          isScrolled
            ? 'bg-[#141312]/92 text-[#FAF7F2] backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(20,19,18,0.22)]'
            : activeView === 'docs'
            ? 'bg-[#141312]/95 text-[#FAF7F2] backdrop-blur-xl border border-white/10 shadow-lg'
            : 'bg-transparent text-[#FAF7F2]'
        }`}
      >
        {/* Brand Identity */}
        <button
          onClick={() => handleSectionNavigate('hero')}
          className="flex items-center gap-2.5 focus:outline-none cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#F59E0B]/50 bg-[#09090B] shrink-0">
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
          <span className="font-display font-bold tracking-[0.20em] text-sm sm:text-base">
            ARKA
          </span>
        </button>

        {/* Center Minimalist Links */}
        <div className="hidden xl:flex items-center gap-0.5 shrink-0">
          {NAV_LINKS.map((item) => {
            const isActive = activeView === 'landing' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionNavigate(item.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono-tabular tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#FAF7F2]/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navMorphActivePill"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#FF5500] -z-10"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Platform Repos & Docs Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
          <GitHubStarButton />

          <a
            href="https://ollama.com/amanjha112113/Arka"
            target="_blank"
            rel="noopener noreferrer"
            title="Ollama Registry"
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <OllamaLogo size={16} />
          </a>
          <a
            href="https://github.com/AmanJha112113"
            target="_blank"
            rel="noopener noreferrer"
            title="Author GitHub"
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://orcid.org/0009-0007-1015-4782"
            target="_blank"
            rel="noopener noreferrer"
            title="Author ORCID"
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="ORCID">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.21 16.12c0 1.58-1.44 2.94-3.21 2.94-1.78 0-3.22-1.36-3.22-2.94 0-1.57 1.44-2.93 3.22-2.93 1.78 0 3.21 1.36 3.21 2.93zm-9.86.12c0 2.85 2.31 5.16 5.16 5.16s5.16-2.31 5.16-5.16-2.31-5.16-5.16-5.16-5.16 2.31-5.16 5.16zm9.86-6.12c0 2.85-2.31 5.16-5.16 5.16S2.31 13.12 2.31 10.28 4.62 5.12 7.47 5.12 12.62 7.43 12.62 10.28z"/>
            </svg>
          </a>

          <button
            onClick={() => {
              setActiveView(activeView === 'docs' ? 'landing' : 'docs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono-tabular font-bold tracking-wider uppercase bg-[#F59E0B] text-white hover:bg-[#D97706] transition-all cursor-pointer active:scale-95 shrink-0"
          >
            {activeView === 'docs' ? 'Showcase' : 'Docs'}
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 cursor-pointer shrink-0 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="pointer-events-auto fixed top-20 left-4 right-4 z-50 rounded-2xl bg-[#141312] text-[#FAF7F2] border border-white/10 p-5 shadow-2xl lg:hidden backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionNavigate(item.id)}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 text-left text-sm font-mono-tabular tracking-wider uppercase min-h-[44px]"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GitHubStarButton />
                  <a
                    href="https://ollama.com/amanjha112113/Arka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-white"
                  >
                    <OllamaLogo size={18} />
                  </a>
                  <a
                    href="https://github.com/AmanJha112113"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://orcid.org/0009-0007-1015-4782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="ORCID">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.21 16.12c0 1.58-1.44 2.94-3.21 2.94-1.78 0-3.22-1.36-3.22-2.94 0-1.57 1.44-2.93 3.22-2.93 1.78 0 3.21 1.36 3.21 2.93zm-9.86.12c0 2.85 2.31 5.16 5.16 5.16s5.16-2.31 5.16-5.16-2.31-5.16-5.16-5.16-5.16 2.31-5.16 5.16zm9.86-6.12c0 2.85-2.31 5.16-5.16 5.16S2.31 13.12 2.31 10.28 4.62 5.12 7.47 5.12 12.62 7.43 12.62 10.28z"/>
                    </svg>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveView(activeView === 'docs' ? 'landing' : 'docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF5500] text-white text-xs font-mono-tabular font-bold uppercase tracking-wider min-h-[44px]"
                >
                  {activeView === 'docs' ? 'Showcase' : 'Docs'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
