import React from 'react';
import { Cpu, Mail, MapPin, FileCheck, ArrowUp, Terminal, Copy, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const email = "barakmicroelectronics@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer"
      className="w-full bg-black border-t border-white/10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 font-mono text-xs text-zinc-400"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Terminal Call to Action Header */}
        <div className="stark-panel p-8 sm:p-12 rounded-xl relative overflow-hidden space-y-6 border border-white/15 energy-stream-border">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIRECT ENGAGEMENT // OPEN PARTNERSHIP CHANNEL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] max-w-3xl leading-tight">
            Ready to Power Your Next Hardware & Mobility Innovation?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-2xl leading-relaxed font-body">
            Whether you need automotive-grade BMS hardware, digital twin battery simulation, or commercial EV fleet dispatch infrastructure, Barak Microelectronics is your trusted technical partner.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-zinc-200 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-xl"
            >
              <Mail className="w-4 h-4" />
              <span>Initiate Technical Contact</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-white/15 text-zinc-200 font-mono text-xs transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied to Clipboard' : email}</span>
            </button>
          </div>
        </div>

        {/* Technical Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-950 border border-white/15 flex items-center justify-center p-1.5 shadow-sm">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans font-bold text-sm tracking-wider text-white uppercase">
                BARAK MICROELECTRONICS
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-body max-w-md leading-relaxed">
              Precision Engineering. Intelligent Software. Sustainable Future. High-reliability Battery Management Systems, open EDA design tooling, and smart EV mobility infrastructure.
            </p>
          </div>

          {/* Location & Legal Col */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              // REGISTRATION & HQ
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Headquarters: Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <FileCheck className="w-3.5 h-3.5 text-white shrink-0" />
                <span>UDYAM-TN-07-0145217</span>
              </div>
            </div>
          </div>

          {/* Controls & Nav */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              // TERMINAL NAVIGATION
            </div>
            <div className="space-y-2 text-xs">
              <a href="#" className="block text-zinc-400 hover:text-white transition-colors">
                [00] Opening Sequence
              </a>
              <a href="#about" className="block text-zinc-400 hover:text-white transition-colors">
                [01] Brand Philosophy
              </a>
              <a href="#exploded-stack" className="block text-zinc-400 hover:text-white transition-colors">
                [02] The Exploded Stack
              </a>
              <a href="#architecture" className="block text-zinc-400 hover:text-white transition-colors">
                [03] Data Grid Matrix
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} BARAK MICROELECTRONICS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
