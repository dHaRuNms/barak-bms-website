import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  Code2, 
  Layers, 
  Bot, 
  Video 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExplodedStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  
  // Video & Card Container Refs for States 1, 2, 3
  const state1VideoRef = useRef<HTMLDivElement | null>(null);
  const state2VideoRef = useRef<HTMLDivElement | null>(null);
  const state3VideoRef = useRef<HTMLDivElement | null>(null);

  const state1ContentRef = useRef<HTMLDivElement | null>(null);
  const state2ContentRef = useRef<HTMLDivElement | null>(null);
  const state3ContentRef = useRef<HTMLDivElement | null>(null);

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const activeStateLabelRef = useRef<HTMLSpanElement | null>(null);

  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(state1VideoRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
      gsap.set(state2VideoRef.current, { opacity: 0, scale: 0.95, filter: 'blur(10px)' });
      gsap.set(state3VideoRef.current, { opacity: 0, scale: 0.95, filter: 'blur(10px)' });

      gsap.set(state1ContentRef.current, { opacity: 1, x: 0, filter: 'blur(0px)' });
      gsap.set(state2ContentRef.current, { opacity: 0, x: 40, filter: 'blur(10px)' });
      gsap.set(state3ContentRef.current, { opacity: 0, x: 40, filter: 'blur(10px)' });

      // Lightship RV style cinematic scrubbed timeline (300vh scroll)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.round(p * 100)}%`;
            }

            if (p < 0.33) {
              setActiveStep(1);
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = '01 // HARDWARE SOLUTIONS';
            } else if (p < 0.66) {
              setActiveStep(2);
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = '02 // SOFTWARE & SIMULATION';
            } else {
              setActiveStep(3);
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = '03 // FLEET & AI OPS';
            }
          }
        }
      });

      // TRANSITION 1 -> 2 (around progress 0.33 to 0.5)
      tl.to(state1VideoRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .to(state1ContentRef.current, {
        opacity: 0,
        x: -40,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .to(state2VideoRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1.2)
      .to(state2ContentRef.current, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1.2);

      // TRANSITION 2 -> 3 (around progress 0.66 to 0.85)
      tl.to(state2VideoRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 2.5)
      .to(state2ContentRef.current, {
        opacity: 0,
        x: -40,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 2.5)
      .to(state3VideoRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 2.7)
      .to(state3ContentRef.current, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 2.7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="exploded-stack" 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-[#050505] text-slate-100"
    >
      {/* 100vh Sticky Viewport Container */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-[#050505]"
      >
        {/* Top Telemetry & Scrub Header */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                THE EXPLODED STACK
              </span>
              <span 
                ref={activeStateLabelRef}
                className="text-xs font-mono font-bold text-white tracking-wider"
              >
                01 // HARDWARE SOLUTIONS
              </span>
            </div>
          </div>

          {/* Scrub Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-1/3 transition-all duration-75"
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              SCRUB 1.0
            </span>
          </div>
        </div>

        {/* Center Split View (Video Slot on Left/Top, Content Pane on Right) */}
        <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          {/* ============================================================ */}
          {/* LEFT: FULL-WIDTH VIDEO & GRAPHIC CINEMATIC PLACEHOLDER SLOTS */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 relative h-[280px] sm:h-[380px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
            
            {/* STATE 1 VIDEO PLACEHOLDER (PCB Hardware) */}
            <div 
              ref={state1VideoRef} 
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0c131a] to-[#05080c] will-change-transform"
            >
              {/* Overlay Video Element for User Drop: /assets/state1-pcb-hardware.mp4 */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="/assets/state1-pcb-hardware.mp4" type="video/mp4" />
              </video>

              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED: PCB_SURFACE_MACRO
                </span>
                <span className="text-slate-400">AEC-Q100 AUTOMOTIVE</span>
              </div>

              {/* Graphic Wireframe Schematic */}
              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="inline-block p-4 rounded-2xl bg-[#050505]/80 border border-emerald-500/30 shadow-emerald-glow backdrop-blur-md">
                  <Cpu className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                  <span className="text-xs font-mono font-bold text-white block">Next-Gen BMS Silicon Core</span>
                  <span className="text-[10px] font-mono text-slate-400 block">±1.0mV Voltage ADC | Dual Contactor Isolation</span>
                </div>
              </div>

              <div className="relative z-10 p-3 rounded-lg bg-[#050505]/90 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">
                  Video Slot: "Close up pan over a sleek, industrial black Printed Circuit Board (PCB). Emerald green light glows softly from micro-components."
                </span>
              </div>
            </div>

            {/* STATE 2 VIDEO PLACEHOLDER (Battery Digital Twin & Open EDA) */}
            <div 
              ref={state2VideoRef} 
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0c161d] to-[#04080d] will-change-transform"
            >
              {/* Overlay Video Element for User Drop: /assets/state2-software-emulator.mp4 */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="/assets/state2-software-emulator.mp4" type="video/mp4" />
              </video>

              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-cyan-400">
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  FEED: HIL_VIRTUAL_TWIN
                </span>
                <span className="text-slate-400">10,000 MONTE CARLO CYCLES</span>
              </div>

              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="inline-block p-4 rounded-2xl bg-[#050505]/80 border border-cyan-500/30 shadow-cyan-glow backdrop-blur-md">
                  <Code2 className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                  <span className="text-xs font-mono font-bold text-white block">Electrochemical Emulator</span>
                  <span className="text-[10px] font-mono text-slate-400 block">Virtual Battery Stress-Testing & Open EDA</span>
                </div>
              </div>

              <div className="relative z-10 p-3 rounded-lg bg-[#050505]/90 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">
                  Video Slot: "A holographic 3D wireframe of a battery pack floating over a dark glowing grid shifting between metallic gray and cyan data points."
                </span>
              </div>
            </div>

            {/* STATE 3 VIDEO PLACEHOLDER (Fleet Neural Dispatch & Clara Bot) */}
            <div 
              ref={state3VideoRef} 
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#101018] to-[#050508] will-change-transform"
            >
              {/* Overlay Video Element for User Drop: /assets/state3-fleet-neural.mp4 */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="/assets/state3-fleet-neural.mp4" type="video/mp4" />
              </video>

              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED: NEURAL_FLEET_DISPATCH
                </span>
                <span className="text-slate-400">SUB-150MS ROUTING</span>
              </div>

              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="inline-block p-4 rounded-2xl bg-[#050505]/80 border border-white/20 shadow-2xl backdrop-blur-md">
                  <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                  <span className="text-xs font-mono font-bold text-white block">Clara AI & Mobility Network</span>
                  <span className="text-[10px] font-mono text-slate-400 block">Real-Time EV Telematics & Auto-Rickshaw Dispatch</span>
                </div>
              </div>

              <div className="relative z-10 p-3 rounded-lg bg-[#050505]/90 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">
                  Video Slot: "Abstract visualization of a neural network in dark space. Glowing white and cyan nodes connecting via fiber-optic light pulses."
                </span>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT: NARRATIVE CONTENT PANES WITH SCRUBBED MORPHING STATES */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[360px] flex items-center">
            
            {/* STATE 1 CONTENT */}
            <div 
              ref={state1ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 w-fit">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>STATE 01 // HARDWARE SOLUTIONS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Next-Generation BMS
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Our proprietary Battery Management System delivers zero-compromise predictive intelligence, continuous micro-impedance monitoring, and automotive-grade reliability for 2W/3W fleets, commercial EVs, and stationary ESS.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">SAMPLING PRECISION</span>
                  <span className="text-white font-semibold">±1.0 mV ADC</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">BALANCING ARCH</span>
                  <span className="text-emerald-400 font-semibold">Active + Passive</span>
                </div>
              </div>
            </div>

            {/* STATE 2 CONTENT */}
            <div 
              ref={state2ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 w-fit">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>STATE 02 // SOFTWARE & SIMULATION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Software & Digital Ecosystem
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Democratizing power electronics with community-driven open EDA PCB tooling, paired with a virtual electrochemical battery emulator for rapid Hardware-In-The-Loop (HIL) safety validation.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">EDA ECOSYSTEM</span>
                  <span className="text-white font-semibold">Open PCB Tooling</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">DIGITAL TWIN</span>
                  <span className="text-cyan-400 font-semibold">Real-Time HIL</span>
                </div>
              </div>
            </div>

            {/* STATE 3 CONTENT */}
            <div 
              ref={state3ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 w-fit">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>STATE 03 // FLEET & AI OPS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Commercial Fleet & Clara AI
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Clara Bot AI technical copilot for automated hardware diagnostics, combined with an urban electric ride-hailing dispatch engine with direct BMS battery telemetry synchronization.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">AI COPILOT</span>
                  <span className="text-white font-semibold">Clara Diagnostic</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10">
                  <span className="text-slate-500 block text-[9px]">DISPATCH LATENCY</span>
                  <span className="text-emerald-400 font-semibold">&lt; 150ms Telematics</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Micro Navigation Ticker */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/[0.06] pt-3 z-20">
          <span>// SCROLL TO PHYSICALLY ASSEMBLE ARCHITECTURE</span>
          <div className="flex gap-4">
            <span className={activeStep === 1 ? 'text-emerald-400 font-bold' : ''}>[01 HARDWARE]</span>
            <span className={activeStep === 2 ? 'text-cyan-400 font-bold' : ''}>[02 SOFTWARE]</span>
            <span className={activeStep === 3 ? 'text-emerald-400 font-bold' : ''}>[03 FLEET]</span>
          </div>
        </div>

      </div>
    </section>
  );
};
