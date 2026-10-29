import React, { useState } from 'react';
import { DeviceTelemetry } from '../types';
import { measureNetworkPing } from '../utils/deviceInfo';
import { soundFx } from '../utils/audio';
import {
  Cpu,
  Monitor,
  BatteryMedium,
  Wifi,
  HardDrive,
  RefreshCw,
  Layers,
  Thermometer,
} from 'lucide-react';

interface DeviceInfoTabProps {
  telemetry: DeviceTelemetry;
  onRefreshTelemetry: () => void;
}

export const DeviceInfoTab: React.FC<DeviceInfoTabProps> = ({
  telemetry,
  onRefreshTelemetry,
}) => {
  const [isPinging, setIsPinging] = useState(false);
  const [currentPing, setCurrentPing] = useState<number | null>(telemetry.pingMs);

  const handleRunPing = async () => {
    soundFx.playClick(1100);
    setIsPinging(true);
    const p = await measureNetworkPing();
    setCurrentPing(p);
    setIsPinging(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00ff80]" />
            Hardware &amp; System Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time profiling of your device chipset, GPU capabilities, and thermal baseline
          </p>
        </div>
        <button
          onClick={() => {
            soundFx.playClick(800);
            onRefreshTelemetry();
          }}
          className="p-2.5 rounded-xl bg-[#16202e] border border-[#1e293b] hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
          title="Refresh hardware sensor readings"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Key Diagnostic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Metric 1: Display Refresh */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Display Refresh</span>
            <Monitor className="w-4 h-4 text-[#00ff80]" />
          </div>
          <div className="mt-3">
            <span className="font-gaming text-2xl md:text-3xl font-bold text-[#00ff80] tabular-nums">
              {telemetry.displayRefreshHz}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1">Hz</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {telemetry.displayRefreshHz >= 90 ? 'Ultra smooth gaming display' : 'Standard 60Hz panel'}
          </p>
        </div>

        {/* Metric 2: RAM Status */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">System Memory</span>
            <HardDrive className="w-4 h-4 text-[#00e5ff]" />
          </div>
          <div className="mt-3">
            <span className="font-gaming text-2xl md:text-3xl font-bold text-white tabular-nums">
              {telemetry.totalRamGb}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1">GB RAM</span>
          </div>
          <div className="w-full bg-[#16202e] rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-[#00e5ff] h-1.5 rounded-full"
              style={{ width: `${Math.round((telemetry.usedRamGb / telemetry.totalRamGb) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Ping Latency */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Game Ping Latency</span>
            <Wifi className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span
                className={`font-gaming text-2xl md:text-3xl font-bold tabular-nums ${
                  (currentPing ?? 30) < 50
                    ? 'text-[#00ff80]'
                    : (currentPing ?? 30) < 90
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {currentPing ?? '--'}
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1">ms</span>
            </div>
            <button
              onClick={handleRunPing}
              disabled={isPinging}
              className="text-[10px] bg-[#16202e] hover:bg-[#1e293b] text-slate-300 px-2 py-0.5 rounded border border-[#1e293b] transition-colors"
            >
              {isPinging ? '...' : 'Test'}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {(currentPing ?? 30) < 40 ? 'Excellent server connection' : 'Acceptable latency'}
          </p>
        </div>

        {/* Metric 4: Battery & Temp */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Battery &amp; Thermal</span>
            <BatteryMedium className="w-4 h-4 text-[#f59e0b]" />
          </div>
          <div className="mt-3">
            <span className="font-gaming text-2xl md:text-3xl font-bold text-white tabular-nums">
              {telemetry.batteryLevel}%
            </span>
            <span className="text-xs font-semibold text-amber-400 ml-1">
              {telemetry.batteryCharging ? '(Charging)' : ''}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
            <Thermometer className="w-3 h-3 text-emerald-400" />
            <span>Thermal: ~{telemetry.batteryTempC}°C (Optimal)</span>
          </div>
        </div>
      </div>

      {/* Detailed Specifications Table */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#1e293b] bg-[#090c13]">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00ff80]" />
            Hardware &amp; Software Audit
          </h3>
        </div>

        <div className="divide-y divide-[#1e293b]/70 text-xs md:text-sm">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">Device Model</span>
            <span className="text-white font-semibold">{telemetry.model}</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">Operating System</span>
            <span className="text-[#00ff80] font-mono font-medium">
              {telemetry.androidVersion} · API {telemetry.apiLevel}
            </span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">GPU Hardware Renderer</span>
            <span className="text-slate-200 font-mono text-xs max-w-md break-words sm:text-right">
              {telemetry.gpuRenderer}
            </span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">GPU Vendor / Driver</span>
            <span className="text-slate-200 font-mono text-xs">{telemetry.gpuVendor}</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">CPU Cores (Concurrency)</span>
            <span className="text-white font-mono tabular-nums">{telemetry.cores} Cores Active</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-slate-400 font-medium">Native Display Resolution</span>
            <span className="text-slate-200 font-mono tabular-nums">{telemetry.screenResolution}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
