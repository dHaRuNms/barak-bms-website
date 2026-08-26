import React, { useState } from 'react';
import { 
  Bot, 
  Code2, 
  Binary, 
  Car, 
  Send, 
  CheckCircle2, 
  Terminal 
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'clara';
  text: string;
  codeSnippet?: string;
}

export const ProductShowcase: React.FC = () => {
  const [activeProductTab, setActiveProductTab] = useState<'clara' | 'eda' | 'emulator' | 'fleet'>('clara');

  // Clara Bot Interactive Demo State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'clara',
      text: "Hello, I am Clara Bot. I'm connected to your Barak BMS hardware and telemetry stream. How can I assist with diagnostics or fleet telemetry today?"
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "Diagnose Cell #4 voltage delta anomaly (45mV)",
    "Generate HIL test profile for 3C fast charge",
    "Show VCU CAN bus baud rate configuration",
    "Fleet battery health summary across Chennai depot"
  ];

  const handleSendPrompt = (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let response: ChatMessage;

      if (query.toLowerCase().includes('cell #4') || query.toLowerCase().includes('delta')) {
        response = {
          sender: 'clara',
          text: "Cell #4 voltage currently at 3.882V vs 3.840V pack mean (+42mV delta). Root cause: Internal resistance disparity during recent high-discharge burst. Active balancing switch #4 actuated with 120mA bleed current. Projected balance convergence: 4.2 minutes.",
          codeSnippet: "STATUS: BALANCING_ACTIVE // PWM: 78% // ESTIMATED_RECOVERY: 252s"
        };
      } else if (query.toLowerCase().includes('hil') || query.toLowerCase().includes('charge')) {
        response = {
          sender: 'clara',
          text: "Virtual Battery Emulator initialized in Hardware-In-The-Loop mode. Applying CC-CV 3.0C curve with ambient 35°C thermal injection. Pre-charge contactor timing validated.",
          codeSnippet: "EMULATOR_PROFILE: 3.0C_STEP // PEAK_THERMAL: 42.1°C // SAFETY_MARGIN: +12.9°C"
        };
      } else if (query.toLowerCase().includes('can') || query.toLowerCase().includes('vcu')) {
        response = {
          sender: 'clara',
          text: "VCU Communication Protocol: CAN 2.0B standard identifier 0x18F00101. Bitrate 500 kbps. Termination resistor 120Ω confirmed online.",
          codeSnippet: "CAN_CFG: BAUD=500k // ID_MASK=0x18F0XXXX // STATUS=ACK_VALID"
        };
      } else {
        response = {
          sender: 'clara',
          text: "Telematics telemetry polled for active EV fleet: 48 units reporting. Mean Pack SOH: 98.4%. Zero critical thermal faults in past 24 hours.",
          codeSnippet: "DEPOT: CHENNAI_CENTRAL // FLEET_ONLINE: 48/48 // CRITICAL_FAULTS: 0"
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="ecosystem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4 shadow-cyan-glow">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>INTELLIGENT SOFTWARE PLATFORMS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
          Software & Digital Ecosystem
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
          Barak Microelectronics delivers a unified suite of software tools designed for modern hardware development, high-fidelity simulation, AI operations, and smart EV fleet management.
        </p>
      </div>

      {/* Product Selector Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        
        <button
          onClick={() => setActiveProductTab('clara')}
          className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
            activeProductTab === 'clara'
              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-cyan-glow'
              : 'bg-[#0D1424]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'clara' ? 'bg-cyan-900 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase">PRODUCT 01</div>
            <div className="text-sm font-sans font-bold text-slate-100">Clara Bot AI</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('eda')}
          className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
            activeProductTab === 'eda'
              ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-emerald-glow'
              : 'bg-[#0D1424]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'eda' ? 'bg-emerald-900 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase">PRODUCT 02</div>
            <div className="text-sm font-sans font-bold text-slate-100">Open-Source EDA</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('emulator')}
          className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
            activeProductTab === 'emulator'
              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-cyan-glow'
              : 'bg-[#0D1424]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'emulator' ? 'bg-cyan-900 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase">PRODUCT 03</div>
            <div className="text-sm font-sans font-bold text-slate-100">Battery Digital Twin</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('fleet')}
          className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
            activeProductTab === 'fleet'
              ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-emerald-glow'
              : 'bg-[#0D1424]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'fleet' ? 'bg-emerald-900 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase">PRODUCT 04</div>
            <div className="text-sm font-sans font-bold text-slate-100">Ride-Hailing & Fleet</div>
          </div>
        </button>

      </div>

      {/* Main Tab Content Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80">
        
        {/* PRODUCT 1: CLARA BOT AI */}
        {activeProductTab === 'clara' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs">
                  AI TECHNICAL & OPERATIONAL ASSISTANT
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Clara Bot: Intelligent Hardware Copilot
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                An intelligent assistant built to simplify hardware troubleshooting, diagnostic query handling, and operational workflows for engineers, field operators, and fleet maintenance teams.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block">Instant Diagnostic Guidance:</strong>
                    <span className="text-slate-400 text-xs">Rapidly interprets telemetry telemetry, register faults, and pin voltage errors.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block">Interactive Operations:</strong>
                    <span className="text-slate-400 text-xs">Simplifies onboarding and field troubleshooting with natural language interaction.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block">Workflow Automation:</strong>
                    <span className="text-slate-400 text-xs">Integrates seamlessly into enterprise web and mobile management suites.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clara Interactive Chat Window */}
            <div className="lg:col-span-7 bg-[#090D16] rounded-2xl border border-cyan-500/30 overflow-hidden flex flex-col h-[460px] shadow-2xl">
              <div className="bg-[#0D1424] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-200">CLARA AI // HARDWARE COPILOT</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">LLM + TELEMETRY ACTIVE</span>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
                {messages.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-xl ${
                        m.sender === 'user' 
                          ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-200' 
                          : 'bg-[#111B30] border border-slate-700/80 text-slate-200'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1">
                        {m.sender === 'user' ? '// OPERATOR QUERY' : '// CLARA BOT RESPONSE'}
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                      {m.codeSnippet && (
                        <div className="mt-2 p-2 rounded bg-[#060910] border border-slate-800 text-[10px] text-cyan-300 font-mono">
                          {m.codeSnippet}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1 text-slate-400 font-mono text-xs pl-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Clara analyzing telemetry registers...</span>
                  </div>
                )}
              </div>

              {/* Quick Sample Prompts */}
              <div className="px-3 py-2 bg-[#0B101D] border-t border-slate-800 flex gap-2 overflow-x-auto">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendPrompt(p)}
                    className="whitespace-nowrap text-[10px] font-mono px-2.5 py-1 rounded bg-[#0D1424] hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    + {p}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendPrompt(inputPrompt); }}
                className="p-3 bg-[#090D16] border-t border-slate-800 flex gap-2"
              >
                <input 
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask Clara regarding BMS faults, thermal alarms, or routing..."
                  className="flex-1 bg-[#0D1424] border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#090D16] font-bold text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCT 2: OPEN-SOURCE EDA */}
        {activeProductTab === 'eda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                OPEN-SOURCE HARDWARE ECOSYSTEM
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Open-Source EDA & PCB Design Suite
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Democratizing hardware development through robust, open-source Electronic Design Automation (EDA) and PCB layout utilities tailored for next-generation power electronics engineers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Developer-Centric</div>
                  <p className="text-xs text-slate-400">Streamlines schematic capture, PCB layout DRC validation, and unified component footprint libraries.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Rapid Prototyping</div>
                  <p className="text-xs text-slate-400">Accelerates hardware design iterations for electronics engineers, startups, and academic researchers.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#090D16] p-6 rounded-2xl border border-emerald-500/30 font-mono text-xs text-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-emerald-400 font-bold">// BARAK_EDA_CORE CLI</span>
                <span className="text-slate-500">v1.4.0-STABLE</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-slate-400">$ barak-eda import-schematic --netlist=bms_8s_revC.kicad_sch</p>
                <p className="text-emerald-400">✓ DRC Check Passed: 0 Violations, 12 High-Current Net Isolations Validated.</p>
                <p className="text-slate-400">$ barak-eda export-gerber --layer-stack=4-layer-FR4-2oz</p>
                <p className="text-cyan-300">✓ 4-Layer IPC-2221 Compliance Confirmed.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#0D1424] border border-emerald-500/20 text-slate-300 text-xs">
                <strong>Community Freedom:</strong> Zero proprietary lock-in. Full KiCad, Gerber, and STEP 3D CAD compatibility.
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 3: BATTERY EMULATOR & DIGITAL TWIN */}
        {activeProductTab === 'emulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs">
                DIGITAL TWIN & HARDWARE-IN-THE-LOOP
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Battery Emulator & Digital Simulator Software
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A high-fidelity digital twin simulation suite that allows engineers to model, simulate, and stress-test battery packs dynamically under real-world conditions prior to physical pack manufacturing.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-200"><strong>Virtual Cell Emulation:</strong> Dynamic charge/discharge profiles & degradation modes.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-200"><strong>HIL Integration:</strong> Validates firmware control algorithms with zero fire risk.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-200"><strong>Accelerated Testing:</strong> Cuts physical testing cycles by up to 70%.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#090D16] p-6 rounded-2xl border border-cyan-500/30">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs font-mono text-cyan-400">
                <span>SIMULATION PROFILE // DEGRADATION TWIN</span>
                <span>10,000 CYCLES MONTE CARLO</span>
              </div>
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="w-full h-32 flex items-end gap-1.5 px-2">
                  {[99, 98, 97.5, 96.8, 95.4, 94.2, 93.1, 92.5, 91.8, 90.4, 89.2, 88.5, 87.1, 85.9, 84.8].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        className="w-full rounded-t bg-gradient-to-t from-cyan-600 to-cyan-400 hover:brightness-125 transition-all"
                        style={{ height: `${(val - 70) * 3.3}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-500">{i * 200}c</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 text-center">
                Electrochemical Capacity Retention vs. Fast-Charge Cycle Count
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 4: RIDE-HAILING & FLEET MANAGEMENT */}
        {activeProductTab === 'fleet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                URBAN ELECTRIC TRANSIT SUITE
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Commercial Ride-Hailing & Fleet App
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A scalable, real-time mobility and fleet telematics platform tailored for modern electric urban transit networks, 2W/3W auto-rickshaw fleets, and commercial EV logistics.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Real-Time Dispatch & Routing</div>
                  <span className="text-slate-300">Sub-second rider-driver matching with high-accuracy location tracking and low-latency route calculation.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">BMS Telemetry Integration</div>
                  <span className="text-slate-300">Syncs directly with onboard BMS to ensure vehicles are never dispatched below critical range thresholds.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#090D16] p-6 rounded-2xl border border-emerald-500/30 font-mono text-xs text-slate-300">
              <div className="flex justify-between pb-3 border-b border-slate-800 text-emerald-400">
                <span>// DISPATCH & TELEMATICS HUD</span>
                <span>ACTIVE DEPOT: TAMIL NADU</span>
              </div>
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3 rounded-lg bg-[#0D1424] border border-slate-800">
                  <div className="text-slate-500 text-[10px]">ACTIVE DRIVERS</div>
                  <div className="text-lg font-bold text-white">128 Online</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0D1424] border border-slate-800">
                  <div className="text-slate-500 text-[10px]">FLEET AVG SOC</div>
                  <div className="text-lg font-bold text-emerald-400">82.4%</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#0D1424] border border-slate-800 space-y-1.5 text-[11px]">
                <div className="text-slate-400">Driver Verification: OTP & SMS Integrated</div>
                <div className="text-slate-400">Geofencing & Energy Range Calculation: Active</div>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
