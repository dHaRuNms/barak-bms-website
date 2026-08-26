import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Cpu, 
  Car, 
  Send, 
  FileCode, 
  Download, 
  Activity, 
  Navigation,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clara' | 'eda' | 'twin' | 'fleet'>('clara');

  // Clara AI state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'clara'; text: string }>>([
    { sender: 'clara', text: 'Hello Engineer. Clara BMS Telemetry Copilot online. How can I assist with your pack diagnostics today?' },
    { sender: 'user', text: 'Cell #3 voltage dropped by 24mV during 3C discharge. Is this thermal or dendrite degradation?' },
    { sender: 'clara', text: 'Telemetry indicates internal DC resistance (DCR) on Cell 3 increased by 4.2mΩ over 120 cycles. This matches micro-dendrite formation risk. Recommendation: Trigger low-current pulse rejuvenation and set max discharge to 1.8C.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'clara', 
          text: `Analysis complete for: "${userText}". Battery state is within safety envelope (SOC 84.2%, Max Temp 31.4°C). No ASIL-D critical faults detected.` 
        }
      ]);
    }, 600);
  };

  return (
    <section id="ecosystem" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-black border-b border-white/10">
      
      {/* Section Header (Architectural light-weight typography) */}
      <div className="space-y-4 mb-16">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>[02] // SOFTWARE ECOSYSTEM & TOOLING</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-sans font-light tracking-[-0.04em] text-white leading-tight">
          Integrated Hardware & Software Stack.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light font-body">
          Barak Microelectronics unites low-level embedded firmware with generative diagnostics, open hardware design libraries, and multi-tenant commercial mobility platforms.
        </p>
      </div>

      {/* Segmented Tab Controls (Prime Intellect Style) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-950 border border-white/15 mb-8">
        <button
          onClick={() => setActiveTab('clara')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg font-mono text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'clara'
              ? 'bg-white text-black font-semibold shadow-lg'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>CLARA AI COPILOT</span>
          <span className="text-[10px] opacity-60">01</span>
        </button>

        <button
          onClick={() => setActiveTab('eda')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg font-mono text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'eda'
              ? 'bg-white text-black font-semibold shadow-lg'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>OPEN-SOURCE EDA</span>
          <span className="text-[10px] opacity-60">02</span>
        </button>

        <button
          onClick={() => setActiveTab('twin')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg font-mono text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'twin'
              ? 'bg-white text-black font-semibold shadow-lg'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>BATTERY DIGITAL TWIN</span>
          <span className="text-[10px] opacity-60">03</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg font-mono text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'fleet'
              ? 'bg-white text-black font-semibold shadow-lg'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>COMMERCIAL FLEET</span>
          <span className="text-[10px] opacity-60">04</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="stark-panel rounded-xl border border-white/15 p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-xl">
        
        {/* TAB 1: CLARA AI COPILOT */}
        {activeTab === 'clara' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>AI DIAGNOSTIC COPILOT</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans font-light text-white tracking-tight">
                Real-Time Telemetry Intelligence.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-body font-light">
                Clara processes raw CAN 2.0B bus traffic, cell impedance spectra, and thermal gradients directly at the edge. It diagnoses anomalies before they escalate to critical runaway events.
              </p>
              
              <div className="space-y-2 pt-2 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Sub-second electrochemical anomaly detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Remaining Useful Life (RUL) predictive degradation curves</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Natural language query interface for hardware engineers</span>
                </div>
              </div>
            </div>

            {/* Clara Chat Simulator */}
            <div className="lg:col-span-7 bg-black rounded-lg border border-white/15 overflow-hidden flex flex-col h-[380px]">
              <div className="px-4 py-2.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">Clara Copilot v2.4</span>
                </div>
                <span className="text-[10px] text-zinc-500">CAN_LOG_ID: #4092_EV</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-zinc-800 text-white' 
                          : 'bg-zinc-950 border border-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-1">
                        {msg.sender === 'user' ? 'Hardware Engineer' : 'Clara Diagnostics'}
                      </div>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Clara about cell imbalance, thermal trip, or CAN frames..."
                  className="flex-1 bg-black border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-white text-black font-mono text-xs font-semibold rounded hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <span>SEND</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: OPEN-SOURCE EDA */}
        {activeTab === 'eda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <FileCode className="w-3.5 h-3.5 text-white" />
                <span>OPEN HARDWARE REPOSITORIES</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans font-light text-white tracking-tight">
                Democratizing Hardware Design.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-body font-light">
                We believe electrical vehicle safety is an open imperative. Access complete KiCad reference schematics, audited Bill-of-Materials (BOM), and 4-layer automotive PCB layouts without restrictive proprietary barriers.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="https://github.com/dHaRuNms" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CLONE REPO ON GITHUB</span>
                </a>
                <span className="inline-flex items-center px-3 py-2 rounded bg-black border border-white/10 text-xs font-mono text-zinc-400">
                  CERN-OHL-P-2.0 LICENSE
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black rounded-lg border border-white/15 p-4 font-mono text-xs space-y-3">
              <div className="text-[10px] text-zinc-500 flex justify-between border-b border-white/10 pb-2">
                <span>TERMINAL // EDA PACKAGE CLONE</span>
                <span>BOM_REV_2.1</span>
              </div>
              <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
{`$ git clone https://github.com/barak-micro/open-bms-eda.git
$ cd open-bms-eda && ./verify-pcb-drc.sh

[✓] 16S Active Balance Topology Verified
[✓] Isolation Barrier: 1500V Galvanic Cleared
[✓] Texas Instruments BQ76952 Symbol Linked
[✓] JLCPCB / PCBWay SMT BOM Pre-Mapped`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: BATTERY DIGITAL TWIN */}
        {activeTab === 'twin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <Activity className="w-3.5 h-3.5 text-white" />
                <span>ELECTROCHEMICAL TWIN</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans font-light text-white tracking-tight">
                Simulate Thousands of Cycles in Minutes.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-body font-light">
                Model cell-level degradation, thermal runaway propagation, and resistance growth without destroying physical battery packs. Our physics-based electrochemical model runs in browser or HIL racks.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-left font-mono">
                <div className="p-3 rounded bg-black border border-white/10">
                  <div className="text-lg font-medium text-white">0.02%</div>
                  <div className="text-[9px] text-zinc-500 uppercase">SOC Error Margin</div>
                </div>
                <div className="p-3 rounded bg-black border border-white/10">
                  <div className="text-lg font-medium text-white">100Hz</div>
                  <div className="text-[9px] text-zinc-500 uppercase">HIL Refresh Rate</div>
                </div>
                <div className="p-3 rounded bg-black border border-white/10">
                  <div className="text-lg font-medium text-white">3D</div>
                  <div className="text-[9px] text-zinc-500 uppercase">Thermal Gradient</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black rounded-lg border border-white/15 p-4 space-y-3 font-mono">
              <div className="flex justify-between text-[10px] text-zinc-500 border-b border-white/10 pb-2">
                <span>SIMULATION OUTPUT // CELL DEGRADATION</span>
                <span className="text-white">RUNNING_PASS_4</span>
              </div>
              
              <div className="h-40 flex items-end gap-2 px-2 pt-4">
                {[80, 78, 76, 75, 73, 72, 70, 68, 67, 65, 63, 62, 60, 58, 55, 52].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-zinc-800 hover:bg-white transition-colors rounded-t relative group" style={{ height: `${val}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {val}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
                <span>Cycle 0</span>
                <span>Electrochemical Life Curve</span>
                <span>Cycle 3,000</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMERCIAL FLEET */}
        {activeTab === 'fleet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <Car className="w-3.5 h-3.5 text-white" />
                <span>TRANSIT & MOBILITY OS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans font-light text-white tracking-tight">
                Turn-Key EV Fleet Dispatch.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-body font-light">
                Enterprise fleet orchestration engineered for commercial EV 2-wheelers, 3-wheelers, and electric bus networks. Integrates live battery health into dynamic routing and driver dispatch.
              </p>

              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-white" />
                  <span>Sub-150ms passenger-to-driver dispatch matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Smart charging routing based on real-time pack SOC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Driver OTP verification and zero-commission fee structure</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black rounded-lg border border-white/15 p-4 font-mono text-xs space-y-3">
              <div className="flex justify-between text-[10px] text-zinc-500 border-b border-white/10 pb-2">
                <span>ACTIVE FLEET TELEMETRY // TAMIL NADU CORRIDOR</span>
                <span className="text-white">LIVE_PULL</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-zinc-950 border border-white/10 flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">Auto-EV #4182</div>
                    <div className="text-[10px] text-zinc-500">Route: Chennai Central → OMR Tech Hub</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">84% SOC</div>
                    <div className="text-[10px] text-zinc-400">Temp: 29.8°C</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-white/10 flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">Cargo-Trike #1094</div>
                    <div className="text-[10px] text-zinc-500">Route: Coimbatore Industrial Zone</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">42% SOC</div>
                    <div className="text-[10px] text-zinc-400">Rerouting: Depot 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
