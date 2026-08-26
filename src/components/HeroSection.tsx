import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ChevronRight, Zap, Shield, Activity, Terminal, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !headlineRef.current || !canvasRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    tl.to(headlineRef.current, {
      scale: 0.92,
      opacity: 0.1,
      filter: 'blur(12px)',
      y: -60,
      ease: 'power2.out',
    }, 0);

    tl.to(canvasRef.current, {
      y: -100,
      opacity: 0.35,
      ease: 'power2.out',
    }, 0);

    if (metricsRef.current) {
      tl.to(metricsRef.current, {
        opacity: 0,
        y: -40,
        ease: 'power2.out',
      }, 0);
    }
  }, { scope: containerRef });

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]"
    >
      {/* Background High-Res Silicon Render & 3D WebGL Mesh */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img 
          src="./assets/hero-silicon-chip.jpg" 
          alt="Barak Microelectronics Silicon Core" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        <Hero3DCanvas />
      </div>

      {/* Top Prime Intellect Style Terminal Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-300 tracking-wider uppercase">
            // ASIL-D GRADE BMS ARCHITECTURE · V2.4 LIVE
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-[#0a0a0a]/90 px-3 py-1.5 rounded-md border border-white/[0.06]">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-emerald-400">$</span>
          <span className="text-slate-200">barak-bms telemetry --stream-hil --port 5173</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div 
        ref={headlineRef}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col items-start"
      >
        <div className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 uppercase block">
              // Barak Microelectronics
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-[1.05]">
              Powering Next-Gen Mobility & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Intelligent Battery Hardware</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl font-body">
            Full-stack Battery Management Systems, digital twin electrochemical emulation, open-source EDA tools, and real-time EV fleet intelligence engineered for uncompromising safety.
          </p>

          {/* High-Contrast Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a 
              href="#exploded-stack"
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.15)] group"
            >
              <span>Explore The Exploded Stack</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a 
              href="#simulator"
              className="px-6 py-3 rounded-lg bg-[#0e0e0e] hover:bg-[#161616] text-white border border-white/10 hover:border-white/20 text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 group"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch Live Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Industrial Telemetry Impact Grid (ON.energy + Prime Intellect Spec Bar) */}
      <div 
        ref={metricsRef}
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08]"
      >
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase mb-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>ADC PRECISION</span>
          </div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            ±1.0<span className="text-cyan-400 text-base sm:text-lg font-normal">mV</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Automotive Class</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase mb-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>HARDWARE TRIP</span>
          </div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            &lt;15<span className="text-emerald-400 text-base sm:text-lg font-normal">µs</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Hardware Interrupt</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase mb-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>ISOLATION</span>
          </div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            1500<span className="text-cyan-400 text-base sm:text-lg font-normal">V</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Galvanic Reinforced</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase mb-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>FLEET UPTIME</span>
          </div>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            99.98<span className="text-emerald-400 text-base sm:text-lg font-normal">%</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Deterministic Link</span>
        </div>
      </div>
    </section>
  );
};
