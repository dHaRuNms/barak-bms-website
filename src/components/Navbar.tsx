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
    { name: 'HARDWARE', num: '01', href: '#exploded-stack' },
    { name: 'SOFTWARE', num: '02', href: '#ecosystem' },
    { name: 'SIMULATOR', num: '03', href: '#simulator' },
    { name: 'MATRIX', num: '04', href: '#architecture' },
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
              <span className="font-sans font-medium text-sm tracking-tight text-white flex items-center gap-2">
                BARAK MICROELECTRONICS
              </span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">
                BMS ARCHITECTURE // DEEP-TECH
              </span>
            </div>
          </a>

          {/* Prime Intellect Center Segmented Tabs */}
          <nav className="hidden md:flex items-center gap-1 border border-white/10 p-1 rounded-lg bg-black/60 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 px-3 py-1.5 rounded text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>{link.name}</span>
                <span className="text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  {link.num}
                </span>
              </a>
            ))}
          </nav>

          {/* Right Action Terminal Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="mailto:barakmicroelectronics@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md"
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
              className="p-2 text-zinc-300 hover:text-white border border-white/10 rounded bg-white/[0.04]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-3 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
            >
              <span>{link.name}</span>
              <span className="text-zinc-500">{link.num}</span>
            </a>
          ))}
          <div className="pt-2">
            <a
              href="mailto:barakmicroelectronics@gmail.com"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-white text-black font-mono text-xs font-bold"
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
