import React from 'react';
import { 
  Terminal, 
  ArrowDown, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-white/10">
      
      {/* Background Image: Photorealistic BESS Energy Storage Infrastructure */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./assets/hero-bess-facility.jpg" 
          alt="Barak Microelectronics Utility Scale Battery Energy Storage System Facility"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_80%)] pointer-events-none" />
      </div>

      {/* Top Beacon Ticker (Prime Intellect Terminal Style) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-zinc-950/90 border border-white/15 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-300 tracking-wider">
            $ barak-bms telemetry --stream-hil // SYS_STATUS: OPERATIONAL
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="hidden sm:inline">TAMIL NADU, INDIA</span>
          <span className="text-zinc-600">//</span>
          <span>UDYAM-TN-07-0145217</span>
        </div>
      </div>

      {/* Central High-Impact Typography & Narrative */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 lg:py-20 space-y-8">
        
        <div className="space-y-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span className="text-white font-bold">[01]</span>
            <span>NEXT-GENERATION BATTERY ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-white tracking-[-0.04em] leading-[1.05]">
            Powering Next-Gen Mobility & Grid Energy Storage
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed font-body">
            Full-stack Battery Management Systems engineered for automotive reliability and utility-scale battery infrastructure. Combining high-voltage galvanic isolation with electrochemical digital twin simulation and real-time fleet telematics.
          </p>
        </div>

        {/* CTA Button Group (Stark Prime Intellect Black/White) */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a 
            href="#exploded-stack"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-white text-black font-mono text-xs font-bold tracking-wide hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            <span>EXPLORE PHYSICAL STACK</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a 
            href="#simulator"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-zinc-900/90 hover:bg-zinc-800 text-white font-mono text-xs font-medium tracking-wide border border-white/15 transition-all"
          >
            <Terminal className="w-4 h-4 text-zinc-300" />
            <span>LAUNCH HIL SIMULATOR</span>
          </a>
        </div>

      </div>

      {/* ON.energy Industrial Telemetry Impact Metric Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/10 pt-8 mt-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              ±1.0mV
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Active Cell Balance Precision
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              Texas Instruments BQ-Core Architecture
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              &lt;15µs
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Fault Trip Execution
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              Hardware Analog Runaway Protection
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              1500V
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Galvanic Isolation Rating
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              Commercial & Industrial BESS Standard
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              99.98%
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Degradation Forecasting
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              Digital Twin Electrochemical Model
            </div>
          </div>

        </div>

        {/* Scroll Indicator Prompt */}
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-6">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>CERTIFIED ASIL-D & ISO 26262 READY ARCHITECTURE</span>
          </span>
          <a href="#exploded-stack" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span>SCROLL TO INSPECT HARDWARE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

      </div>

    </section>
  );
};
