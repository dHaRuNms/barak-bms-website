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
    "Diagnose Cell #4 voltage delta anomaly (42mV)",
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
    }, 700);
  };

  return (
    <section id="ecosystem" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-black">
      
      {/* Section Header (Prime Intellect FIG Style) */}
      <div className="max-w-3xl mb-14 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>// SOFTWARE PLATFORMS & CLOUD ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-[-0.03em] leading-tight">
          Unified Digital Intelligence
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed font-body">
          From AI-driven diagnostics to open EDA PCB utilities and electrochemical simulation, explore the modular software layers powering modern battery systems.
        </p>
      </div>

      {/* Product Selector Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        
        <button
          onClick={() => setActiveProductTab('clara')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
            activeProductTab === 'clara'
              ? 'bg-zinc-900 border-white text-white shadow-xl'
              : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'clara' ? 'bg-white text-black border-white' : 'bg-black border-white/10 text-zinc-400'}`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FIG. 01</div>
            <div className="text-sm font-sans font-bold text-white">Clara AI Copilot</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('eda')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
            activeProductTab === 'eda'
              ? 'bg-zinc-900 border-white text-white shadow-xl'
              : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'eda' ? 'bg-white text-black border-white' : 'bg-black border-white/10 text-zinc-400'}`}>
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FIG. 02</div>
            <div className="text-sm font-sans font-bold text-white">Open EDA Suite</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('emulator')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
            activeProductTab === 'emulator'
              ? 'bg-zinc-900 border-white text-white shadow-xl'
              : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'emulator' ? 'bg-white text-black border-white' : 'bg-black border-white/10 text-zinc-400'}`}>
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FIG. 03</div>
            <div className="text-sm font-sans font-bold text-white">Digital Twin</div>
          </div>
        </button>

        <button
          onClick={() => setActiveProductTab('fleet')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
            activeProductTab === 'fleet'
              ? 'bg-zinc-900 border-white text-white shadow-xl'
              : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
          }`}
        >
          <div className={`p-2.5 rounded-lg border ${activeProductTab === 'fleet' ? 'bg-white text-black border-white' : 'bg-black border-white/10 text-zinc-400'}`}>
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FIG. 04</div>
            <div className="text-sm font-sans font-bold text-white">Fleet Dispatch</div>
          </div>
        </button>

      </div>

      {/* Main Tab Content Card */}
      <div className="stark-panel rounded-xl p-6 sm:p-8 border border-white/15 energy-stream-border">
        
        {/* PRODUCT 1: CLARA BOT AI */}
        {activeProductTab === 'clara' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-white text-black font-mono text-xs font-bold">
                  AI TECHNICAL & OPERATIONAL COPILOT
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Clara Bot: Intelligent Hardware Diagnostics
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-body">
                An intelligent assistant built to simplify hardware troubleshooting, diagnostic query handling, and operational workflows for engineers, field operators, and fleet maintenance teams.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                  <div>
                    <strong className="text-white text-xs block font-mono">Instant Diagnostic Guidance:</strong>
                    <span className="text-zinc-400 text-xs">Rapidly interprets telemetry data, register faults, and pin voltage errors.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                  <div>
                    <strong className="text-white text-xs block font-mono">Interactive Operations:</strong>
                    <span className="text-zinc-400 text-xs">Simplifies onboarding and field troubleshooting with natural language interaction.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                  <div>
                    <strong className="text-white text-xs block font-mono">Workflow Automation:</strong>
                    <span className="text-zinc-400 text-xs">Integrates seamlessly into enterprise web and mobile management suites.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clara Interactive Chat Window */}
            <div className="lg:col-span-7 bg-black rounded-xl border border-white/15 overflow-hidden flex flex-col h-[460px] shadow-2xl">
              <div className="bg-zinc-950 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white">CLARA AI // HARDWARE COPILOT</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">LLM + TELEMETRY ACTIVE</span>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
                {messages.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-xl ${
                        m.sender === 'user' 
                          ? 'bg-zinc-900 border border-white/20 text-white' 
                          : 'bg-zinc-950 border border-white/10 text-zinc-200'
                      }`}
                    >
                      <div className="text-[10px] text-zinc-500 mb-1">
                        {m.sender === 'user' ? '// OPERATOR QUERY' : '// CLARA BOT RESPONSE'}
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                      {m.codeSnippet && (
                        <div className="mt-2 p-2 rounded bg-black border border-white/10 text-[10px] text-zinc-300 font-mono">
                          {m.codeSnippet}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs pl-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Clara analyzing telemetry registers...</span>
                  </div>
                )}
              </div>

              {/* Quick Sample Prompts */}
              <div className="px-3 py-2 bg-zinc-950 border-t border-white/10 flex gap-2 overflow-x-auto">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendPrompt(p)}
                    className="whitespace-nowrap text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 hover:bg-white hover:text-black border border-white/10 text-zinc-300 transition-colors"
                  >
                    + {p}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendPrompt(inputPrompt); }}
                className="p-3 bg-black border-t border-white/10 flex gap-2"
              >
                <input 
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask Clara regarding BMS faults, thermal alarms, or routing..."
                  className="flex-1 bg-zinc-950 border border-white/15 rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 font-bold text-xs font-mono transition-colors flex items-center gap-1.5"
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
              <span className="px-2.5 py-0.5 rounded bg-white text-black font-mono text-xs font-bold">
                OPEN-SOURCE HARDWARE SUITE
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Open-Source EDA & PCB Design Suite
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-body">
                Democratizing hardware development through robust, open-source Electronic Design Automation (EDA) and PCB layout utilities tailored for next-generation power electronics engineers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-xs font-mono text-white font-bold mb-1">Developer-Centric</div>
                  <p className="text-xs text-zinc-400 font-body">Streamlines schematic capture, PCB layout DRC validation, and unified component footprint libraries.</p>
                </div>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-xs font-mono text-white font-bold mb-1">Rapid Prototyping</div>
                  <p className="text-xs text-zinc-400 font-body">Accelerates hardware design iterations for electronics engineers, startups, and academic researchers.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black p-6 rounded-xl border border-white/15 font-mono text-xs text-zinc-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-white font-bold">// BARAK_EDA_CORE CLI</span>
                <span className="text-zinc-500">v1.4.0-STABLE</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-zinc-400">$ barak-eda import-schematic --netlist=bms_8s_revC.kicad_sch</p>
                <p className="text-white">✓ DRC Check Passed: 0 Violations, 12 High-Current Net Isolations Validated.</p>
                <p className="text-zinc-400">$ barak-eda export-gerber --layer-stack=4-layer-FR4-2oz</p>
                <p className="text-zinc-300">✓ 4-Layer IPC-2221 Compliance Confirmed.</p>
              </div>
              <div className="p-3 rounded bg-zinc-950 border border-white/10 text-zinc-300 text-xs">
                <strong>Community Freedom:</strong> Zero proprietary lock-in. Full KiCad, Gerber, and STEP 3D CAD compatibility.
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 3: BATTERY EMULATOR & DIGITAL TWIN */}
        {activeProductTab === 'emulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-white text-black font-mono text-xs font-bold">
                DIGITAL TWIN & HARDWARE-IN-THE-LOOP
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Battery Emulator & Digital Twin
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-body">
                A high-fidelity digital twin simulation suite that allows engineers to model, simulate, and stress-test battery packs dynamically under real-world conditions prior to physical pack manufacturing.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-zinc-200"><strong>Virtual Cell Emulation:</strong> Dynamic charge/discharge profiles & degradation modes.</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-zinc-200"><strong>HIL Integration:</strong> Validates firmware control algorithms with zero fire risk.</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-zinc-200"><strong>Accelerated Testing:</strong> Cuts physical testing cycles by up to 70%.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black p-6 rounded-xl border border-white/15">
              <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs font-mono text-white">
                <span>SIMULATION PROFILE // DEGRADATION TWIN</span>
                <span className="text-zinc-400">10,000 CYCLES MONTE CARLO</span>
              </div>
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="w-full h-32 flex items-end gap-1.5 px-2">
                  {[99, 98, 97.5, 96.8, 95.4, 94.2, 93.1, 92.5, 91.8, 90.4, 89.2, 88.5, 87.1, 85.9, 84.8].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        className="w-full rounded-t bg-zinc-400 hover:bg-white transition-all"
                        style={{ height: `${(val - 70) * 3.3}%` }}
                      />
                      <span className="text-[9px] font-mono text-zinc-500">{i * 200}c</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 text-center">
                Electrochemical Capacity Retention vs. Fast-Charge Cycle Count
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT 4: RIDE-HAILING & FLEET MANAGEMENT */}
        {activeProductTab === 'fleet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-white text-black font-mono text-xs font-bold">
                URBAN ELECTRIC TRANSIT SUITE
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Commercial Ride-Hailing & Fleet App
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-body">
                A scalable, real-time mobility and fleet telematics platform tailored for modern electric urban transit networks, 2W/3W auto-rickshaw fleets, and commercial EV logistics.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-xs font-mono text-white font-bold mb-1">Real-Time Dispatch & Routing</div>
                  <span className="text-zinc-300 font-body">Sub-second rider-driver matching with high-accuracy location tracking and low-latency route calculation.</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-xs font-mono text-white font-bold mb-1">BMS Telemetry Integration</div>
                  <span className="text-zinc-300 font-body">Syncs directly with onboard BMS to ensure vehicles are never dispatched below critical range thresholds.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black p-6 rounded-xl border border-white/15 font-mono text-xs text-zinc-300">
              <div className="flex justify-between pb-3 border-b border-white/10 text-white">
                <span>// DISPATCH & TELEMATICS HUD</span>
                <span className="text-zinc-400">ACTIVE DEPOT: TAMIL NADU</span>
              </div>
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-zinc-500 text-[10px]">ACTIVE DRIVERS</div>
                  <div className="text-lg font-bold text-white">128 Online</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/10">
                  <div className="text-zinc-500 text-[10px]">FLEET AVG SOC</div>
                  <div className="text-lg font-bold text-white">82.4%</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 space-y-1.5 text-[11px]">
                <div className="text-zinc-400">Driver Verification: OTP & SMS Integrated</div>
                <div className="text-zinc-400">Geofencing & Energy Range Calculation: Active</div>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
