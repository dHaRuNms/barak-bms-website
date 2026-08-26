import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  Code2, 
  Layers, 
  Bot, 
  Zap,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExplodedStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  
  // Video & Card Container Refs for States 1, 2, 3
  const state1MediaRef = useRef<HTMLDivElement | null>(null);
  const state2MediaRef = useRef<HTMLDivElement | null>(null);
  const state3MediaRef = useRef<HTMLDivElement | null>(null);

  const state1ContentRef = useRef<HTMLDivElement | null>(null);
  const state2ContentRef = useRef<HTMLDivElement | null>(null);
  const state3ContentRef = useRef<HTMLDivElement | null>(null);

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const activeStateLabelRef = useRef<HTMLSpanElement | null>(null);

  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(state1MediaRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
      gsap.set(state2MediaRef.current, { opacity: 0, scale: 0.95, filter: 'blur(10px)' });
      gsap.set(state3MediaRef.current, { opacity: 0, scale: 0.95, filter: 'blur(10px)' });

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
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = 'FIG. 1 // STATE 01: HARDWARE BMS ARCHITECTURE';
            } else if (p < 0.66) {
              setActiveStep(2);
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = 'FIG. 2 // STATE 02: SOFTWARE & DIGITAL TWIN';
            } else {
              setActiveStep(3);
              if (activeStateLabelRef.current) activeStateLabelRef.current.innerText = 'FIG. 3 // STATE 03: COMMERCIAL FLEET & AI OPS';
            }
          }
        }
      });

      // TRANSITION 1 -> 2 (around progress 0.33 to 0.5)
      tl.to(state1MediaRef.current, {
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
      .to(state2MediaRef.current, {
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
      tl.to(state2MediaRef.current, {
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
      .to(state3MediaRef.current, {
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
        {/* Top Telemetry & Scrub Header (Prime Intellect FIG format + Lightship RV scrubber) */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                THE EXPLODED STACK · SCRUBBED ARCHITECTURE
              </span>
              <span 
                ref={activeStateLabelRef}
                className="text-xs font-mono font-bold text-white tracking-wider"
              >
                FIG. 1 // STATE 01: HARDWARE BMS ARCHITECTURE
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

        {/* Center Split View (Visual Media on Left, Content & Telemetry on Right) */}
        <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          {/* ============================================================ */}
          {/* LEFT: CINEMATIC HARDWARE & DIGITAL VISUAL VIEWPORT (7 COLS) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 relative h-[300px] sm:h-[400px] md:h-[480px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl energy-stream-border">
            
            {/* STATE 1: PCB HARDWARE SOLUTIONS */}
            <div 
              ref={state1MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/state1-pcb-hardware.jpg" 
                alt="Barak Microelectronics Automotive BMS Hardware PCB"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="./assets/state1-pcb-hardware.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60" />

              {/* HUD Overlay Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-emerald-500/40 text-emerald-400 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED: PCB_SURFACE_ASIL_D
                </span>
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-white/10 text-slate-300 backdrop-blur-md">
                  AEC-Q100 GRADE 1
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050505]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Dual Isolation & Active Cell Balancing Core</span>
                </div>
                <span className="text-emerald-400 font-bold">±1.0mV Precision</span>
              </div>
            </div>

            {/* STATE 2: BATTERY DIGITAL TWIN & OPEN EDA */}
            <div 
              ref={state2MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/state2-software-emulator.jpg" 
                alt="Battery Digital Twin Electrochemical Emulator & Open EDA"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="./assets/state2-software-emulator.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60" />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-cyan-500/40 text-cyan-400 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  FEED: HIL_VIRTUAL_PACK_TWIN
                </span>
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-white/10 text-slate-300 backdrop-blur-md">
                  10,000 MONTE CARLO RUNS
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050505]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Open-Source KiCad EDA & Virtual Impedance</span>
                </div>
                <span className="text-cyan-400 font-bold">144V / 87% SOC</span>
              </div>
            </div>

            {/* STATE 3: COMMERCIAL FLEET & CLARA AI */}
            <div 
              ref={state3MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/state3-fleet-neural.jpg" 
                alt="Clara AI Diagnostic Copilot & Urban EV Fleet Telemetry Network"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              >
                <source src="./assets/state3-fleet-neural.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60" />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-emerald-500/40 text-emerald-400 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED: URBAN_FLEET_TELEMETRY
                </span>
                <span className="px-2.5 py-1 rounded bg-[#050505]/90 border border-white/10 text-slate-300 backdrop-blur-md">
                  LATENCY &lt; 150MS
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050505]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Clara AI Diagnostics & Real-Time EV Dispatch</span>
                </div>
                <span className="text-emerald-400 font-bold">28,450 Nodes</span>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT: NARRATIVE CONTENT PANES WITH SCRUBBED MORPHING (5 COLS) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[400px] flex items-center">
            
            {/* STATE 1 CONTENT */}
            <div 
              ref={state1ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30 font-semibold uppercase">
                  SPEC_01 // HARDWARE
                </span>
                <span className="text-[10px] font-mono text-slate-500">1.1 · ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Next-Generation BMS Hardware
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Engineered for automotive-grade reliability under extreme thermal and vibration profiles. Combines high-voltage galvanic isolation with sub-15µs hardware trip execution.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>±1.0mV ADC precision with active cell balance topology</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dual redundant contactor isolation & micro-impedance tracking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-15µs hardware overcurrent and thermal runaway interrupt</span>
                </div>
              </div>
            </div>

            {/* STATE 2 CONTENT */}
            <div 
              ref={state2ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30 font-semibold uppercase">
                  SPEC_02 // SOFTWARE & SIM
                </span>
                <span className="text-[10px] font-mono text-slate-500">2.1 · DIGITAL TWIN</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Open EDA & Electrochemical Twin
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Zero vendor lock-in. We empower hardware engineering teams with open-source PCB schematic tooling and high-precision virtual battery simulation.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Open KiCad schematic modules & verified BOM libraries</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Real-time Hardware-In-The-Loop (HIL) electrochemical twin</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Pre-silicon fault injection and aging degradation forecasting</span>
                </div>
              </div>
            </div>

            {/* STATE 3 CONTENT */}
            <div 
              ref={state3ContentRef} 
              className="absolute inset-0 flex flex-col justify-center space-y-4 will-change-transform"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30 font-semibold uppercase">
                  SPEC_03 // FLEET & AI
                </span>
                <span className="text-[10px] font-mono text-slate-500">3.1 · INTELLIGENCE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Clara AI & Mobility Dispatch
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-body">
                AI technical copilot that interprets raw CAN 2.0B frames and live telemetry to predict pack degradation, combined with turn-key ride-hailing dispatch for EV fleets.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clara Bot real-time diagnostic anomaly detection copilot</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-150ms passenger matching with live battery health routing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated driver OTP verification & zero-commission architecture</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Micro Navigation Ticker */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/[0.06] pt-3 z-20">
          <span className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>// SCROLL TO PHYSICALLY ASSEMBLE ARCHITECTURE</span>
          </span>
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
