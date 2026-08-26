import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Radio, 
  AlertTriangle 
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
  const [activeTab, setActiveTab] = useState<'matrix' | 'canbus'>('matrix');
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
    <section id="simulator" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#050505]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase mb-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>// HARDWARE-IN-THE-LOOP TELEMETRY HUD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-[-0.03em]">
            Interactive BMS Cell Simulator
          </h2>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#0e0e0e] border border-white/10 font-mono text-xs">
          <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className="text-slate-300">
            {isWarning ? 'BALANCING ACTUATED' : 'CELL STATUS NOMINAL'}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-cyan-400">ΔV: {deltaV} mV</span>
        </div>
      </div>

      {/* Main Terminal Container */}
      <div className="stark-panel rounded-2xl overflow-hidden border border-white/10">
        
        {/* Top Control Bar & Live Gauges */}
        <div className="p-4 sm:p-6 border-b border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#0a0a0a]">
          
          <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">PACK SOC</span>
            <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">{soc}%</div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${soc}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">PACK SOH</span>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{soh}%</div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${soh}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">MAX DELTA (ΔV)</span>
            <div className={`text-2xl font-mono font-bold mt-1 ${deltaV > 30 ? 'text-amber-400' : 'text-slate-200'}`}>
              {deltaV} <span className="text-xs font-normal text-slate-400">mV</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">THERMAL PEAK</span>
            <div className={`text-2xl font-mono font-bold mt-1 ${maxTemp > 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {maxTemp}°C
            </div>
          </div>

        </div>

        {/* Middle Interactive Sandbox Controls */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-white/[0.06] bg-[#070707]">
          
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">LOAD C-RATE:</span>
              <span className="text-cyan-400 font-bold">{cRate.toFixed(1)} C</span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="3.0" 
              step="0.1" 
              value={cRate}
              onChange={(e) => setCRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">AMBIENT CLIMATE:</span>
              <span className="text-emerald-400 font-bold">{ambientTemp}°C</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="50" 
              step="1" 
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
              className="w-full accent-emerald-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setInjectFault(!injectFault)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                injectFault 
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300' 
                  : 'bg-[#0e0e0e] border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{injectFault ? 'Cell 4 Drift Injected' : 'Inject Cell Imbalance'}</span>
            </button>

            <button
              onClick={() => {
                setSoc(92.0);
                setCRate(2.8);
                setTimeout(() => setCRate(1.2), 2000);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-900/50 transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Regen</span>
            </button>
          </div>

        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.06] bg-[#0a0a0a] px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 px-4 text-xs font-mono border-b font-semibold transition-colors ${
              activeTab === 'matrix' 
                ? 'border-cyan-400 text-cyan-300' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            [01] 8S CELL VOLTAGE MATRIX
          </button>
          <button
            onClick={() => setActiveTab('canbus')}
            className={`py-3 px-4 text-xs font-mono border-b font-semibold transition-colors ${
              activeTab === 'canbus' 
                ? 'border-emerald-400 text-emerald-300' 
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            [02] CAN 2.0B TELEMETRY STREAM
          </button>
        </div>

        {/* Tab 1: 8S Cell Matrix Display */}
        {activeTab === 'matrix' && (
          <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 bg-[#050505]">
            {cells.map((cell) => {
              const voltPct = ((cell.voltage - 3.0) / (4.2 - 3.0)) * 100;
              const isCellImbalanced = cell.id === 4 && injectFault;

              return (
                <div 
                  key={cell.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                    isCellImbalanced 
                      ? 'bg-amber-950/20 border-amber-500/50' 
                      : cell.balancing 
                      ? 'bg-cyan-950/20 border-cyan-500/40' 
                      : 'bg-[#0a0a0a] border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-2">
                    <span className="font-bold text-slate-300">C{cell.id.toString().padStart(2, '0')}</span>
                    {cell.balancing ? (
                      <span className="text-cyan-400 flex items-center gap-0.5 animate-pulse">
                        <Activity className="w-2.5 h-2.5" /> BAL
                      </span>
                    ) : (
                      <span className="text-emerald-400">OK</span>
                    )}
                  </div>

                  <div className="w-full h-14 bg-[#050505] rounded p-0.5 flex flex-col justify-end my-2 border border-white/5">
                    <div 
                      className={`w-full rounded-sm transition-all duration-500 ${
                        isCellImbalanced 
                          ? 'bg-amber-400' 
                          : 'bg-cyan-400'
                      }`}
                      style={{ height: `${Math.max(10, Math.min(100, voltPct))}%` }}
                    />
                  </div>

                  <div className="text-center font-mono">
                    <span className={`text-xs font-bold ${isCellImbalanced ? 'text-amber-300' : 'text-slate-100'}`}>
                      {cell.voltage.toFixed(3)}V
                    </span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">
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
          <div className="p-4 sm:p-6 font-mono text-xs bg-[#050505] space-y-1.5 text-slate-300">
            {canLogs.map((log, idx) => (
              <div key={idx} className="p-2 rounded bg-[#0a0a0a] border border-white/[0.06] text-slate-300">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                {log}
              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
};
