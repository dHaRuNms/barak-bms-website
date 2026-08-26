import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Code2, 
  Truck, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';

interface BentoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  specs: string[];
}

export const TechnicalMatrix: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll<HTMLDivElement>('.bento-spotlight');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const bentoItems: BentoItem[] = [
    {
      id: "01",
      title: "End-to-End Synergy",
      category: "HARDWARE & CLOUD CO-DESIGN",
      description: "Seamless integration between physical BMS hardware, deterministic real-time firmware, and cloud/edge software platforms for unified telemetry.",
      icon: Layers,
      accentColor: "#06B6D4",
      specs: ["Hardware-Firmware-Cloud Link", "Unified CAN Telematics", "Zero Middleware Latency"]
    },
    {
      id: "02",
      title: "Safety First",
      category: "PREDICTIVE ASIL-D MONITORING",
      description: "Multi-layered monitoring designed to maintain peak reliability under all conditions. Preempts micro-impedance drift and thermal runaway before fault escalation.",
      icon: ShieldCheck,
      accentColor: "#10B981",
      specs: ["Sub-15µs Hardware Trip", "1500V Galvanic Isolation", "Redundant Watchdog Cores"]
    },
    {
      id: "03",
      title: "Open Ecosystem",
      category: "NO VENDOR LOCK-IN",
      description: "Developer-friendly open-source PCB software tools, transparent KiCad schematic libraries, and modular software solutions that empower electronics engineering teams.",
      icon: Code2,
      accentColor: "#06B6D4",
      specs: ["Open-Source EDA Tools", "Community KiCad Libraries", "Modular Firmware Stacks"]
    },
    {
      id: "04",
      title: "Scalable Fleet Tech",
      category: "URBAN EV MOBILITY OS",
      description: "Ready-to-deploy ride-hailing and telemetry infrastructure tailored for EV operators, 2W/3W auto-rickshaw fleets, and commercial energy storage logistics.",
      icon: Truck,
      accentColor: "#10B981",
      specs: ["Sub-150ms Ride Matching", "Live Pack SOC Dispatch", "Integrated Driver OTP"]
    }
  ];

  return (
    <section 
      id="architecture" 
      className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#050505]"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-16 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-slate-500 uppercase">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>// WHY CHOOSE BARAK MICROELECTRONICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-[-0.03em] text-white leading-tight">
          Engineering Differentiators
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed font-body">
          Engineered for mission-critical reliability with absolute transparency, robust open standards, and unified digital intelligence.
        </p>
      </div>

      {/* 2x2 Bento Box Grid with Cursor Spotlight Effect */}
      <div 
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {bentoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bento-spotlight spotlight-card crosshair-corner p-7 sm:p-9 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:border-white/20"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0e0e0e] border border-white/10 flex items-center justify-center text-white group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 tracking-widest block uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-300">
                        SPEC_ID // {item.id}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Title & Copy */}
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  {item.description}
                </p>
              </div>

              {/* Spec Tags */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2 text-[10px] font-mono">
                {item.specs.map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded bg-[#0e0e0e] border border-white/[0.08] text-slate-300 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
