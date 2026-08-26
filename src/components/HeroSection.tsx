import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Terminal, 
  ArrowDown, 
  ShieldCheck, 
  ChevronRight,
  Activity,
  Maximize2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const metricStripRef = useRef<HTMLDivElement | null>(null);
  const floatingCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ON.energy & Prime Intellect signature kinetic reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo([headlineLine1Ref.current, headlineLine2Ref.current], 
        { y: 50, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15 }
      )
      .fromTo(subtextRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(floatingCardRef.current,
        { x: 30, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)' },
        '-=0.5'
      )
      .fromTo(metricStripRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.4'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-white/10"
    >
      
      {/* Background Image: Photorealistic BESS Energy Storage Infrastructure with Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./assets/hero-bess-facility.jpg" 
          alt="Barak Microelectronics Utility Scale Battery Energy Storage System Facility"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-25 scale-105 transition-transform duration-[10000ms] hover:scale-100 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_80%)] pointer-events-none" />
      </div>

      {/* Top Beacon Ticker (Prime Intellect Terminal Style) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-zinc-950 border border-white/15 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-400 tracking-wider">
            $ barak-bms telemetry --stream-hil // SYS_STATUS: OPERATIONAL
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500">
          <span className="hidden sm:inline">TAMIL NADU, INDIA</span>
          <span className="text-zinc-700">//</span>
          <span>UDYAM-TN-07-0145217</span>
        </div>
      </div>

      {/* Central Hero Split Layout (ON.energy Large Architectural Title + Floating Glass Card) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        {/* Left Headline & Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
            <span className="text-white font-medium">[01]</span>
            <span>THE OPEN BMS ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light text-white tracking-[-0.04em] leading-[1.08]">
            <span ref={headlineLine1Ref} className="block will-change-transform">
              Powering Next-Gen Mobility
            </span>
            <span ref={headlineLine2Ref} className="block text-zinc-400 will-change-transform font-normal">
              & Grid Energy Storage.
            </span>
          </h1>

          <p ref={subtextRef} className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-body font-light">
            Full-stack Battery Management Systems engineered for automotive reliability and utility-scale infrastructure. Combining high-voltage galvanic isolation with electrochemical digital twin simulation and real-time fleet telematics.
          </p>

          {/* CTA Button Group */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
            <a 
              href="#exploded-stack"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black font-mono text-xs font-semibold tracking-wide hover:bg-zinc-200 transition-colors shadow-2xl"
            >
              <span>EXPLORE PHYSICAL STACK</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            <a 
              href="#simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-xs font-medium tracking-wide border border-white/15 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>LAUNCH HIL SIMULATOR</span>
            </a>
          </div>
        </div>

        {/* Right: ON.energy Floating Glass Diagnostic Card */}
        <div 
          ref={floatingCardRef} 
          className="lg:col-span-4 hidden lg:flex flex-col p-4 rounded-xl border border-white/15 bg-zinc-950/80 backdrop-blur-xl shadow-2xl space-y-3 energy-stream-border"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white">
              <Activity className="w-3 h-3 text-white" />
              <span>BESS_RACK // 75kW ACTIVE</span>
            </span>
            <Maximize2 className="w-3 h-3 text-zinc-500" />
          </div>

          <div className="relative h-36 rounded-lg overflow-hidden border border-white/10">
            <img 
              src="./assets/pcb-macro-hardware.jpg" 
              alt="BMS Macro Hardware Core"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white bg-black/90 px-2 py-0.5 rounded border border-white/20">
              BQ76952 SILICON CORE
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left font-mono">
            <div className="p-2 rounded bg-black border border-white/[0.08]">
              <span className="text-[9px] text-zinc-500 block">PRECISION</span>
              <span className="text-xs font-medium text-white">±1.0mV ADC</span>
            </div>
            <div className="p-2 rounded bg-black border border-white/[0.08]">
              <span className="text-[9px] text-zinc-500 block">ISOLATION</span>
              <span className="text-xs font-medium text-white">1500V DC</span>
            </div>
          </div>
        </div>

      </div>

      {/* ON.energy Industrial Telemetry Impact Metric Strip */}
      <div ref={metricStripRef} className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/10 pt-8 mt-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-3xl sm:text-5xl font-sans font-light text-white tracking-[-0.05em]">
              ±1.0mV
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Active Balance Precision
            </div>
            <div className="text-[10px] text-zinc-600 font-mono">
              Texas Instruments BQ Architecture
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-3xl sm:text-5xl font-sans font-light text-white tracking-[-0.05em]">
              &lt;15µs
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Fault Trip Execution
            </div>
            <div className="text-[10px] text-zinc-600 font-mono">
              Hardware Analog Protection
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-3xl sm:text-5xl font-sans font-light text-white tracking-[-0.05em]">
              1500V
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Galvanic Isolation Rating
            </div>
            <div className="text-[10px] text-zinc-600 font-mono">
              Commercial & Industrial BESS Standard
            </div>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-6 space-y-1">
            <div className="text-3xl sm:text-5xl font-sans font-light text-white tracking-[-0.05em]">
              99.98%
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Degradation Forecasting
            </div>
            <div className="text-[10px] text-zinc-600 font-mono">
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
