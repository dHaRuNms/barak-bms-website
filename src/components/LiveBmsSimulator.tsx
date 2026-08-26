import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Radio, 
  AlertTriangle,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface CellData {
  id: number;
  voltage: number;
  temp: number;
  balancing: boolean;
}

export const LiveBmsSimulator: React.FC = () => {
  const [cRate, setCRate] = useState<number>(1.2);
  const [ambientTemp, setAmbientTemp] = useState<number>(28);
  const [injectFault, setInjectFault] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'canbus' | 'hardware'>('matrix');
  const [soc, setSoc] = useState<number>(84.6);
  const soh = 98.2;

  const [cells, setCells] = useState<CellData[]>([
    { id: 1, voltage: 3.842, temp: 29.4, balancing: false },
    { id: 2, voltage: 3.845, temp: 29.6, balancing: false },
    { id: 3, voltage: 3.841, temp: 29.2, balancing: false },
    { id: 4, voltage: 3.839, temp: 30.1, balancing: false },
    { id: 5, voltage: 3.844, temp: 29.8, balancing: false },
    { id: 6, voltage: 3.840, temp: 29.3, balancing: false },
    { id: 7, voltage: 3.843, temp: 29.5, balancing: false },
    { id: 8, voltage: 3.842, temp: 29.7, balancing: false },
  ]);

  const [canLogs, setCanLogs] = useState<string[]>([
    '0x18F00101 [8] 0E A2 0E B4 0E 9F 1D 02 // VOLT_ALL_OK',
    '0x18F00201 [8] 21 22 21 23 00 00 54 86 // TEMP_MATRIX_STABLE',
    '0x18F00301 [4] 01 54 03 D6 // ACTIVE_BAL_ENGAGED'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(prevCells => {
        const avgVolt = prevCells.reduce((acc, c) => acc + c.voltage, 0) / prevCells.length;

        return prevCells.map((cell) => {
          let targetVolt = cell.voltage;
          
          if (injectFault && cell.id === 4) {
            targetVolt = 3.965;
          } else if (!injectFault && cell.id === 4 && cell.voltage > 3.850) {
            targetVolt -= 0.008;
          }

          const cellTemp = ambientTemp + (cRate * 3.2) + (cell.id === 4 && injectFault ? 8.0 : 0) + (Math.random() * 0.4 - 0.2);
          const isBalancing = Math.abs(cell.voltage - avgVolt) > 0.015;
          const jitter = (Math.random() - 0.5) * 0.002;
          const newVolt = Math.min(4.2, Math.max(3.0, targetVolt + jitter));

          return {
            ...cell,
            voltage: Number(newVolt.toFixed(3)),
            temp: Number(cellTemp.toFixed(1)),
            balancing: isBalancing
          };
        });
      });

      setCanLogs(prev => {
        const time = new Date().toISOString().substring(11, 19);
        const hex1 = Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase();
        const hex2 = Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase();
        const newLog = `[${time}] 0x18F004${Math.floor(Math.random() * 9)} [8] ${hex1} ${hex2} A0 14 00 00 ${injectFault ? 'E1_BAL_TRIGGER' : 'NORMAL_STREAM'}`;
        return [newLog, ...prev.slice(0, 4)];
      });

    }, 1200);

    return () => clearInterval(interval);
  }, [cRate, ambientTemp, injectFault]);

  const minCell = Math.min(...cells.map(c => c.voltage));
  const maxCell = Math.max(...cells.map(c => c.voltage));
  const deltaV = Math.round((maxCell - minCell) * 1000);
  const maxTemp = Math.max(...cells.map(c => c.temp));
  const isWarning = deltaV > 40 || maxTemp > 45;

  return (
    <section id="simulator" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-black">
      
      {/* Header (Prime Intellect + ON.energy telemetry layout) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>// HARDWARE-IN-THE-LOOP (HIL) TELEMETRY BENCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-[-0.03em]">
            Interactive BMS Simulator
          </h2>
          <p className="text-zinc-400 text-sm font-normal mt-2 max-w-2xl font-body">
            Real-time 8S cell telemetry HUD reflecting active balance physics, ambient temperature stress, and CAN 2.0B diagnostic frames.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-950 border border-white/15 font-mono text-xs shadow-xl">
          <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-white animate-ping' : 'bg-white'}`} />
          <span className="text-zinc-200 font-semibold">
            {isWarning ? 'BALANCING ACTUATED' : 'CELL STATUS NOMINAL'}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white font-bold">ΔV: {deltaV} mV</span>
        </div>
      </div>

      {/* Main Terminal Container */}
      <div className="stark-panel rounded-xl overflow-hidden border border-white/15 energy-stream-border">
        
        {/* Top Control Bar & Live Gauges */}
        <div className="p-4 sm:p-6 border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950">
          
          <div className="p-3.5 rounded-lg bg-black border border-white/10">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">PACK SOC</span>
            <div className="text-2xl font-mono font-bold text-white mt-1">{soc}%</div>
            <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${soc}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-black border border-white/10">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">PACK SOH</span>
            <div className="text-2xl font-mono font-bold text-white mt-1">{soh}%</div>
            <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${soh}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-black border border-white/10">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">MAX DELTA (ΔV)</span>
            <div className="text-2xl font-mono font-bold mt-1 text-white">
              {deltaV} <span className="text-xs font-normal text-zinc-400">mV</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-black border border-white/10">
            <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider">THERMAL PEAK</span>
            <div className="text-2xl font-mono font-bold mt-1 text-white">
              {maxTemp}°C
            </div>
          </div>

        </div>

        {/* Middle Interactive Sandbox Controls */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-white/10 bg-black">
          
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">LOAD C-RATE:</span>
              <span className="text-white font-bold">{cRate.toFixed(1)} C</span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="3.0" 
              step="0.1" 
              value={cRate}
              onChange={(e) => setCRate(parseFloat(e.target.value))}
              className="w-full accent-white bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">AMBIENT CLIMATE:</span>
              <span className="text-white font-bold">{ambientTemp}°C</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="50" 
              step="1" 
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
              className="w-full accent-white bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setInjectFault(!injectFault)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                injectFault 
                  ? 'bg-white text-black border-white' 
                  : 'bg-zinc-950 border-white/15 text-zinc-300 hover:border-white/30'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{injectFault ? 'Cell 4 Drift Injected' : 'Inject Imbalance'}</span>
            </button>

            <button
              onClick={() => {
                setSoc(92.0);
                setCRate(2.8);
                setTimeout(() => setCRate(1.2), 2000);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 border border-white/20 text-white text-xs font-mono hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Regen</span>
            </button>
          </div>

        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-zinc-950 px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 px-4 text-xs font-mono border-b font-semibold transition-colors shrink-0 ${
              activeTab === 'matrix' 
                ? 'border-white text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            [01] 8S CELL VOLTAGE MATRIX
          </button>
          <button
            onClick={() => setActiveTab('canbus')}
            className={`py-3 px-4 text-xs font-mono border-b font-semibold transition-colors shrink-0 ${
              activeTab === 'canbus' 
                ? 'border-white text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            [02] CAN 2.0B TELEMETRY STREAM
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`py-3 px-4 text-xs font-mono border-b font-semibold transition-colors shrink-0 ${
              activeTab === 'hardware' 
                ? 'border-white text-white' 
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            [03] BESS STORAGE TEST RIG
          </button>
        </div>

        {/* Tab 1: 8S Cell Matrix Display */}
        {activeTab === 'matrix' && (
          <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 bg-black">
            {cells.map((cell) => {
              const voltPct = ((cell.voltage - 3.0) / (4.2 - 3.0)) * 100;
              const isCellImbalanced = cell.id === 4 && injectFault;

              return (
                <div 
                  key={cell.id}
                  className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                    isCellImbalanced 
                      ? 'bg-zinc-900 border-white' 
                      : cell.balancing 
                      ? 'bg-zinc-900/60 border-white/40' 
                      : 'bg-zinc-950 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mb-2">
                    <span className="font-bold text-zinc-300">C{cell.id.toString().padStart(2, '0')}</span>
                    {cell.balancing ? (
                      <span className="text-white font-bold flex items-center gap-0.5 animate-pulse">
                        <Activity className="w-2.5 h-2.5" /> BAL
                      </span>
                    ) : (
                      <span className="text-zinc-400">OK</span>
                    )}
                  </div>

                  <div className="w-full h-14 bg-black rounded p-0.5 flex flex-col justify-end my-2 border border-white/5">
                    <div 
                      className={`w-full rounded-sm transition-all duration-500 ${
                        isCellImbalanced 
                          ? 'bg-white' 
                          : 'bg-zinc-400'
                      }`}
                      style={{ height: `${Math.max(10, Math.min(100, voltPct))}%` }}
                    />
                  </div>

                  <div className="text-center font-mono">
                    <span className={`text-xs font-bold ${isCellImbalanced ? 'text-white' : 'text-zinc-200'}`}>
                      {cell.voltage.toFixed(3)}V
                    </span>
                    <span className="block text-[9px] text-zinc-500 mt-0.5">
                      {cell.temp.toFixed(1)}°C
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: CAN-Bus Raw Stream */}
        {activeTab === 'canbus' && (
          <div className="p-4 sm:p-6 font-mono text-xs bg-black space-y-1.5 text-zinc-300">
            {canLogs.map((log, idx) => (
              <div key={idx} className="p-2.5 rounded bg-zinc-950 border border-white/10 text-zinc-300 flex items-center gap-2">
                <span className="text-white font-bold">{`>`}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: BESS Storage Test Rig (Hardware Visual) */}
        {activeTab === 'hardware' && (
          <div className="p-4 sm:p-6 bg-black grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 rounded-xl overflow-hidden border border-white/15 relative h-[260px] sm:h-[320px]">
              <img 
                src="./assets/hero-bess-facility.jpg" 
                alt="Industrial BESS Lithium Energy Storage Rack & Telemetry Rig" 
                className="w-full h-full object-cover object-center filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white bg-black/90 px-2.5 py-1 rounded border border-white/20">
                LITHIUM BESS RACK 75kW/120kWh
              </div>
            </div>

            <div className="md:col-span-5 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Layers className="w-4 h-4 text-white" />
                <span>Stationary ESS & EV Pack Architecture</span>
              </div>
              <p className="text-zinc-400 text-xs font-normal leading-relaxed font-body">
                Compatible with standard rack-mount stationary storage systems, heavy commercial truck chassis, and 2W/3W swappable battery formats.
              </p>
              <div className="space-y-1.5 pt-2 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>High-current copper busbar topology</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Opto-isolated contactor driver stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Redundant emergency safety interlock</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
