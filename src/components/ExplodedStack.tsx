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
  
  // Visual Media & Card Container Refs for States 1, 2, 3
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
      gsap.set(state2MediaRef.current, { opacity: 0, scale: 0.96, filter: 'blur(8px)' });
      gsap.set(state3MediaRef.current, { opacity: 0, scale: 0.96, filter: 'blur(8px)' });

      gsap.set(state1ContentRef.current, { opacity: 1, x: 0, filter: 'blur(0px)' });
      gsap.set(state2ContentRef.current, { opacity: 0, x: 30, filter: 'blur(8px)' });
      gsap.set(state3ContentRef.current, { opacity: 0, x: 30, filter: 'blur(8px)' });

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
        scale: 1.04,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .to(state1ContentRef.current, {
        opacity: 0,
        x: -30,
        filter: 'blur(8px)',
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
        scale: 1.04,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 2.5)
      .to(state2ContentRef.current, {
        opacity: 0,
        x: -30,
        filter: 'blur(8px)',
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
      className="relative w-full h-[300vh] bg-black text-white"
    >
      {/* 100vh Sticky Viewport Container */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-black"
      >
        {/* Top Telemetry & Scrub Header (Prime Intellect FIG format) */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-zinc-950 border border-white/15 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                THE EXPLODED STACK // THREE-LAYER ARCHITECTURE
              </span>
              <span 
                ref={activeStateLabelRef}
                className="text-xs font-mono font-bold text-white tracking-wider"
              >
                FIG. 1 // STATE 01: HARDWARE BMS ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Scrub Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                ref={progressBarRef}
                className="h-full bg-white w-1/3 transition-all duration-75"
              />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              SCRUB 1.0
            </span>
          </div>
        </div>

        {/* Center Split View (Visual Media on Left, Content & Telemetry on Right) */}
        <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          {/* ============================================================ */}
          {/* LEFT: PHOTOREALISTIC HARDWARE & DIGITAL VIEWPORT (7 COLS) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] md:h-[480px] w-full rounded-xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl energy-stream-border">
            
            {/* STATE 1: PCB HARDWARE SOLUTIONS */}
            <div 
              ref={state1MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/pcb-macro-hardware.jpg" 
                alt="Barak Microelectronics Automotive BMS Hardware PCB"
                className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

              {/* HUD Overlay Badges (Monochrome Solid) */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  FEED: PCB_MACRO_BQ76952
                </span>
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/15 text-zinc-300 backdrop-blur-md">
                  AEC-Q100 GRADE 1
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/90 border border-white/15 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Cpu className="w-4 h-4 text-white" />
                  <span>Dual Isolation & Active Cell Balancing Core</span>
                </div>
                <span className="text-white font-bold">±1.0mV Precision</span>
              </div>
            </div>

            {/* STATE 2: BATTERY DIGITAL TWIN & OPEN EDA */}
            <div 
              ref={state2MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/software-cad-monitor.jpg" 
                alt="Battery Digital Twin Electrochemical Emulator & Open EDA"
                className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  FEED: CAD_ELECTROCHEMICAL_TWIN
                </span>
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/15 text-zinc-300 backdrop-blur-md">
                  10,000 MONTE CARLO RUNS
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/90 border border-white/15 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Code2 className="w-4 h-4 text-white" />
                  <span>Open-Source KiCad EDA & Virtual Impedance</span>
                </div>
                <span className="text-white font-bold">144V / 87% SOC</span>
              </div>
            </div>

            {/* STATE 3: COMMERCIAL FLEET & CLARA AI */}
            <div 
              ref={state3MediaRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="./assets/smart-city-fleet-map.jpg" 
                alt="Clara AI Diagnostic Copilot & Urban EV Fleet Telemetry Network"
                className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  FEED: CITY_TELEMETRY_MAP
                </span>
                <span className="px-2.5 py-1 rounded bg-black/90 border border-white/15 text-zinc-300 backdrop-blur-md">
                  LATENCY &lt; 150MS
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/90 border border-white/15 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Bot className="w-4 h-4 text-white" />
                  <span>Clara AI Diagnostics & Real-Time EV Dispatch</span>
                </div>
                <span className="text-white font-bold">12,482 Nodes</span>
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
                <span className="text-[10px] font-mono text-black bg-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  SPEC_01 // HARDWARE
                </span>
                <span className="text-[10px] font-mono text-zinc-500">1.1 · ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Next-Generation BMS Hardware
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-body">
                Engineered for automotive-grade reliability under extreme thermal and vibration profiles. Combines high-voltage galvanic isolation with sub-15µs hardware trip execution.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>±1.0mV ADC precision with active cell balance topology</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Dual redundant contactor isolation & micro-impedance tracking</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
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
                <span className="text-[10px] font-mono text-black bg-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  SPEC_02 // SOFTWARE & SIM
                </span>
                <span className="text-[10px] font-mono text-zinc-500">2.1 · DIGITAL TWIN</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Open EDA & Electrochemical Twin
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-body">
                Zero vendor lock-in. We empower hardware engineering teams with open-source PCB schematic tooling and high-precision virtual battery simulation.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Open KiCad schematic modules & verified BOM libraries</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Real-time Hardware-In-The-Loop (HIL) electrochemical twin</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
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
                <span className="text-[10px] font-mono text-black bg-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  SPEC_03 // FLEET & AI
                </span>
                <span className="text-[10px] font-mono text-zinc-500">3.1 · INTELLIGENCE</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                Clara AI & Mobility Dispatch
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-body">
                AI technical copilot that interprets raw CAN 2.0B frames and live telemetry to predict pack degradation, combined with turn-key ride-hailing dispatch for EV fleets.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Clara Bot real-time diagnostic anomaly detection copilot</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Sub-150ms passenger matching with live battery health routing</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Automated driver OTP verification & zero-commission architecture</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Micro Navigation Ticker */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/10 pt-3 z-20">
          <span className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-white" />
            <span>// SCROLL TO PHYSICALLY ASSEMBLE ARCHITECTURE</span>
          </span>
          <div className="flex gap-4">
            <span className={activeStep === 1 ? 'text-white font-bold' : ''}>[01 HARDWARE]</span>
            <span className={activeStep === 2 ? 'text-white font-bold' : ''}>[02 SOFTWARE]</span>
            <span className={activeStep === 3 ? 'text-white font-bold' : ''}>[03 FLEET]</span>
          </div>
        </div>

      </div>
    </section>
  );
};
