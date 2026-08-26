import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  BatteryCharging, 
  Zap, 
  Gauge, 
  Truck, 
  Building2, 
  Wrench, 
  CheckCircle2 
} from 'lucide-react';

export const HardwareBmsSection: React.FC = () => {
  const [activeApp, setActiveApp] = useState<number>(0);

  const applications = [
    {
      title: "Electric Commercial Vehicles & 2W/3W Fleets",
      icon: Truck,
      description: "Custom-tailored for high-vibration, high-duty-cycle urban mobility. Supports fast-charging thermal management, dynamic regenerative braking capture, and edge CAN telemetry.",
      metrics: ["IP67 Ingress Rating", "CAN 2.0B / J1939", "Dual Contactor Control"]
    },
    {
      title: "Stationary Energy Storage Systems (ESS)",
      icon: Building2,
      description: "Grid-scale and industrial microgrid battery rack management. Delivers multi-string cell balancing, 1500V galvanic isolation, and high-precision SOC/SOH predictive drift modeling.",
      metrics: ["1500V DC Insulation", "Modbus TCP / RTU", "Stackable Architecture"]
    },
    {
      title: "Industrial Automation & Heavy Equipment",
      icon: Wrench,
      description: "Engineered for mining, warehousing AGVs, and heavy robotics operating in extreme temperatures (-30°C to +65°C) with zero downtime tolerance.",
      metrics: ["Extreme Temp Tolerance", "Automated Fault Lockout", "Blackbox Flight Recorder"]
    }
  ];

  return (
    <section id="hardware-bms" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Top Tag & Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 shadow-cyan-glow">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>PROPRIETARY HARDWARE ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
          Next-Generation Battery Management System (BMS)
        </h2>
        <p className="text-cyan-400 font-mono text-sm mt-3 tracking-wide italic">
          "Predictive Intelligence for Maximum Battery Life & Peak Safety"
        </p>
        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
          Engineered to deliver high reliability, dynamic safety monitoring, and extended life cycles for modern energy storage and electric vehicle platforms across demanding automotive and industrial climates.
        </p>
      </div>

      {/* 4 Key Value Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        
        {/* Driver 1 */}
        <div className="glass-panel p-6 rounded-2xl hover:border-cyan-400/60 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform shadow-cyan-glow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-sans font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
              Predictive Safety Monitoring
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuously observes micro-impedance, voltage drift, and thermal signatures to preempt abnormal conditions before they impact operations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preemptive Thermal Trip</span>
          </div>
        </div>

        {/* Driver 2 */}
        <div className="glass-panel-emerald p-6 rounded-2xl hover:border-emerald-400/60 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform shadow-emerald-glow">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="text-base font-sans font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
              Extended Life Cycle Optimization
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Intelligent multi-stage cell balancing and dynamic state-estimation keep battery packs operating at peak efficiency over extended multi-year service life.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>+25% Pack Longevity</span>
          </div>
        </div>

        {/* Driver 3 */}
        <div className="glass-panel p-6 rounded-2xl hover:border-cyan-400/60 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform shadow-cyan-glow">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-base font-sans font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
              Automotive-Grade Reliability
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built with industrial-rated semiconductors and fail-safe watchdog circuits to meet rigorous vehicular vibration and harsh environmental standards.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>AEC-Q100 Qualified</span>
          </div>
        </div>

        {/* Driver 4 */}
        <div className="glass-panel-emerald p-6 rounded-2xl hover:border-emerald-400/60 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform shadow-emerald-glow">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-sans font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
              Seamless Edge Integration
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connects effortlessly with vehicle controllers (VCU), IoT edge gateways, telematics units, and remote cloud management dashboards.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Plug & Play VCU Protocols</span>
          </div>
        </div>

      </div>

      {/* Interactive Hardware Application Matrix */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              DEPLOYMENT DOMAINS
            </span>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
              Engineered for Diverse Mission-Critical Applications
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveApp(idx)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                    activeApp === idx
                      ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-cyan-glow'
                      : 'bg-[#0D1424] border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{app.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Application Detail Card */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h4 className="text-lg font-sans font-bold text-white mb-2">
              {applications[activeApp].title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {applications[activeApp].description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {applications[activeApp].metrics.map((metric, i) => (
                <div key={i} className="bg-[#090D16] p-3 rounded-xl border border-slate-800 text-xs font-mono flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-200">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#090D16] p-5 rounded-xl border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-slate-800 text-cyan-400">
              <span>// FIRMWARE ARCHITECTURE</span>
              <span>v2.8.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Core Loop:</span>
              <span className="text-slate-200">Deterministic RTOS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CAN Baud:</span>
              <span className="text-emerald-400">500 kbps (Auto-detect)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Overcurrent Trip:</span>
              <span className="text-cyan-300">&lt; 15 microseconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hardware Watchdog:</span>
              <span className="text-emerald-400">Dual Independent</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
