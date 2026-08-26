import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#0a0a0a] border border-white/10 flex items-center justify-center p-1.5 group-hover:border-white/30 transition-colors">
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-wider text-white uppercase flex items-center gap-1.5">
              BARAK <span className="text-cyan-400 font-mono text-[10px] font-normal px-1 py-0.2 rounded bg-white/5 border border-white/10">BMS</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-wider uppercase text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#exploded-stack" className="hover:text-white transition-colors">
            The Stack
          </a>
          <a href="#simulator" className="hover:text-white transition-colors">
            Simulator
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="#contact" 
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-slate-200 text-[11px] font-mono font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
          >
            <span>Partner With Us</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#0a0a0a] border border-white/10 text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505]/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl animate-fadeIn font-mono text-xs">
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-1"
          >
            // 01 About
          </a>
          <a 
            href="#exploded-stack" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-1"
          >
            // 02 The Exploded Stack
          </a>
          <a 
            href="#simulator" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-1"
          >
            // 03 HIL Simulator
          </a>
          <a 
            href="#architecture" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white py-1"
          >
            // 04 Architecture Grid
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-white text-black text-xs font-semibold uppercase tracking-wider w-full"
          >
            Partner With Us
          </a>
        </div>
      )}
    </header>
  );
};
