import React, { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowUpRight, Menu, X } from 'lucide-react';

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

  const navLinks = [
    { name: 'Hardware Stack', href: '#exploded-stack' },
    { name: 'Software Suite', href: '#ecosystem' },
    { name: 'HIL Simulator', href: '#simulator' },
    { name: 'Architecture Matrix', href: '#architecture' },
    { name: 'Documentation', href: '#footer' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Identifier */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-white/[0.06] border border-white/15 flex items-center justify-center text-white transition-all group-hover:border-white/40">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-white flex items-center gap-2">
                BARAK MICROELECTRONICS
              </span>
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider">
                BMS ARCHITECTURE // DEEP-TECH
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-wide text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Terminal Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="mailto:barakmicroelectronics@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Contact Engineering</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white border border-white/10 rounded-lg bg-white/[0.04]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="mailto:barakmicroelectronics@gmail.com"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Contact Engineering</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
