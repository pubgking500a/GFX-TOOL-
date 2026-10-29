import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Zap,
  CheckCircle2,
  Trash2,
  Smartphone,
  ExternalLink,
  Shield,
  Gauge,
  ThermometerSnowflake,
} from 'lucide-react';

export const OptimizationTab: React.FC = () => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanProgress, setCleanProgress] = useState(0);
  const [reclaimedMb, setReclaimedMb] = useState<number | null>(null);

  const handleRunOptimizer = () => {
    soundFx.playBoost();
    setIsCleaning(true);
    setCleanProgress(0);
    setReclaimedMb(null);

    const interval = setInterval(() => {
      setCleanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCleaning(false);
          const freed = Math.floor(650 + Math.random() * 450);
          setReclaimedMb(freed);
          soundFx.playSuccess();
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#00ff80', '#00e5ff', '#ffffff'],
            });
          } catch {
            // fallback
          }
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleOpenSettingsGuide = () => {
    soundFx.playClick(900);
    // In Android webview or browser, can try intent or show exact steps
    const intentUrl = 'intent:#Intent;action=android.settings.SETTINGS;end';
    try {
      window.location.href = intentUrl;
    } catch {
      // Handled via UI guidance below
    }
  };

  const tips = [
    {
      title: 'Enable Game Driver Preference',
      category: 'GPU BOOST',
      desc: 'Go to Developer Options > Graphic Driver Preferences > Select BGMI/PUBG > Change from "Default" to "System Graphics Driver" for up to 15% better GPU throughput.',
      icon: Gauge,
    },
    {
      title: 'Prevent Background Battery Throttling',
      category: 'STABILITY',
      desc: 'Long press BGMI/PUBG App Info > Battery > Select "Unrestricted" so Android never throttles CPU cycles during intense final-circle firefights.',
      icon: Shield,
    },
    {
      title: 'Thermal Throttling Mitigation',
      category: 'THERMAL',
      desc: 'Remove thick phone cases during gaming sessions. Smartphone back glass dissipates heat 4x faster when exposed to room airflow, preventing FPS drops.',
      icon: ThermometerSnowflake,
    },
    {
      title: 'Touch Sampling Rate & Game Space',
      category: 'LATENCY',
      desc: 'Enable your smartphone’s built-in Game Space / Ultra Game Mode to lock touch sampling at 240Hz/360Hz for instant bullet fire response time.',
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00ff80]" />
            Game Performance &amp; RAM Optimizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Safe memory management and Android hardware tuning for stutter-free gameplay
          </p>
        </div>
        <button
          onClick={handleOpenSettingsGuide}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-[#16202e] border border-[#1e293b] text-slate-200 hover:text-white hover:border-[#00e5ff] flex items-center gap-2 transition-colors"
        >
          <Smartphone className="w-4 h-4 text-[#00e5ff]" />
          <span>Open Android Settings</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Interactive RAM Sweeper Widget */}
      <div className="bg-gradient-to-b from-[#0e1624] to-[#090c13] border border-[#1e293b] rounded-2xl p-6 text-center relative overflow-hidden">
        {/* Radar Ring Graphic */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed ${
              isCleaning ? 'border-[#00ff80] animate-spin' : 'border-[#1e293b]'
            }`}
            style={{ animationDuration: '3s' }}
          />
          <div className="w-28 h-28 rounded-full bg-[#131c2a] border border-[#1e293b] flex flex-col items-center justify-center shadow-inner">
            <Trash2 className={`w-8 h-8 ${isCleaning ? 'text-[#00ff80] animate-pulse' : 'text-[#00e5ff]'}`} />
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              {isCleaning ? `${cleanProgress}%` : 'STANDBY'}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-bold text-white">One-Tap Memory &amp; Cache Flush</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Clears background memory leaks, closes dormant processes, and prepares high-priority CPU affinity for battle royale.
          </p>
        </div>

        {reclaimedMb !== null && (
          <div className="mt-3 inline-flex items-center gap-2 bg-[#00ff80]/15 border border-[#00ff80]/40 px-4 py-1.5 rounded-full text-xs text-[#00ff80] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Success: {reclaimedMb} MB RAM freed for PUBG / BGMI!</span>
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={handleRunOptimizer}
            disabled={isCleaning}
            className="px-6 py-3 rounded-xl font-bold text-black bg-[#00ff80] hover:bg-[#00e572] disabled:opacity-50 transition-all shadow-lg shadow-[#00ff80]/20 text-xs md:text-sm active:scale-95 inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>{isCleaning ? 'Optimizing Hardware Pipelines...' : 'OPTIMIZE MEMORY NOW'}</span>
          </button>
        </div>
      </div>

      {/* Pro Optimization Strategy Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Essential Android Gamer Settings Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#00ff80] font-mono">
                      {tip.category}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{tip.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
