import React from 'react';
import { GameEdition, GfxConfigState, DeviceTelemetry, ActiveTab } from '../types';
import { GameSelector } from './GameSelector';
import { soundFx } from '../utils/audio';
import {
  Zap,
  Sliders,
  Cpu,
  Play,
  ShieldCheck,
  CheckCircle,
  Flame,
  Code2,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface HomeDashboardProps {
  config: GfxConfigState;
  selectedGame: GameEdition;
  onSelectGame: (id: any) => void;
  telemetry: DeviceTelemetry;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenApply: () => void;
  onLaunchGame: () => void;
  onOpenDownload: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  config,
  selectedGame,
  onSelectGame,
  telemetry,
  onNavigateTab,
  onOpenApply,
  onLaunchGame,
  onOpenDownload,
}) => {
  const isPubg = selectedGame.id.startsWith('pubg');

  return (
    <div className="space-y-6">
      {/* Hero Showcase Card with AK Logo */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#090e18] to-[#07090e] border border-[#1e293b] p-5 md:p-7 shadow-2xl">
        {/* Background glow & subtle mesh */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00ff80]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          {/* Logo Badge */}
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00ff80] to-[#00e5ff] opacity-40 blur group-hover:opacity-75 transition duration-300" />
            <img
              src="/src/assets/images/ak_gfx_logo_1793235029287.jpg"
              alt="AK GFX Tool Official Logo"
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border border-[#00ff80]/60 shadow-xl"
            />
          </div>

          {/* Hero Text & Quick Action */}
          <div className="text-center md:text-left flex-1 space-y-2.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-xs font-semibold text-[#00e5ff]">
                <Flame className="w-3.5 h-3.5" />
                <span>PUBG Mobile Global &amp; BGMI Ready</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00ff80]/10 border border-[#00ff80]/30 text-[11px] font-semibold text-[#00ff80]">
                3.4 / 3.5 Update
              </span>
            </div>

            <h1 className="font-gaming text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              AK GFX <span className="text-[#00ff80]">TOOL</span>
            </h1>

            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
              Full graphics optimization for <strong className="text-[#00e5ff]">PUBG Mobile</strong> and <strong className="text-[#ff9900]">BGMI</strong>. Unlock 90 &amp; 120 FPS, potato textures for low-end phones, iPad view, and 3D spatial footstep audio.
            </p>

            {/* Quick Dual Switcher buttons right inside hero */}
            <div className="pt-1 flex items-center justify-center md:justify-start gap-2">
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  onSelectGame('pubg_global');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedGame.id === 'pubg_global'
                    ? 'bg-[#00e5ff] text-black shadow-md shadow-[#00e5ff]/20'
                    : 'bg-[#131b26] text-slate-300 hover:text-white border border-[#1e293b]'
                }`}
              >
                <span>PUBG Mobile (Global)</span>
              </button>
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  onSelectGame('bgmi');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedGame.id === 'bgmi'
                    ? 'bg-[#ff9900] text-black shadow-md shadow-[#ff9900]/20'
                    : 'bg-[#131b26] text-slate-300 hover:text-white border border-[#1e293b]'
                }`}
              >
                <span>BGMI (India)</span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  onOpenDownload();
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 transition-all shadow-lg shadow-[#00ff80]/20 flex items-center gap-2 text-xs md:text-sm active:scale-95"
              >
                <Smartphone className="w-4 h-4 fill-black" />
                <span>Download App / APK</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(900);
                  onNavigateTab('graphics');
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#131d2b] border border-[#1e293b] hover:border-[#00ff80] transition-colors flex items-center gap-2 text-xs md:text-sm active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Configure Graphics</span>
              </button>

              <button
                onClick={onLaunchGame}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-300 bg-[#0d1520] border border-[#1e293b] hover:border-[#00e5ff] hover:text-white transition-colors flex items-center gap-2 text-xs md:text-sm active:scale-95"
              >
                <Play className="w-4 h-4" />
                <span>Launch {selectedGame.id === 'pubg_global' ? 'PUBG' : selectedGame.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Profile Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Selected Game</span>
          <span className="text-xs md:text-sm font-bold text-white mt-1 block truncate">
            {selectedGame.name}
          </span>
        </div>

        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Frame Rate</span>
          <span className="text-xs md:text-sm font-bold text-[#00ff80] mt-1 block font-mono">
            {config.fps} FPS ({config.fps >= 90 ? 'Extreme+' : 'Standard'})
          </span>
        </div>

        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Graphics &amp; Res</span>
          <span className="text-xs md:text-sm font-bold text-[#00e5ff] mt-1 block">
            {config.graphics.toUpperCase()} · {config.resolution}
          </span>
        </div>

        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Anti-Cheat Safety</span>
          <span className="text-xs md:text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Ban-Free</span>
          </span>
        </div>
      </div>

      {/* Target Game Selector Component with PUBG Mobile & BGMI */}
      <GameSelector
        selectedGameId={selectedGame.id}
        onSelectGame={onSelectGame}
      />

      {/* Quick 1-Tap Esports Presets */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00ff80]" />
            Quick 1-Tap Presets for {selectedGame.id === 'pubg_global' ? 'PUBG Mobile' : selectedGame.name.split(' (')[0]}
          </h3>
          <span className="text-[11px] text-slate-400">Tap to load preset</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => {
              soundFx.playClick(900);
              onNavigateTab('graphics');
            }}
            className="p-3 bg-[#090c13] hover:bg-[#131b26] border border-[#1e293b] hover:border-[#00ff80] rounded-xl text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs md:text-sm text-white group-hover:text-[#00ff80]">
                ⚡ 90 FPS Esports
              </span>
              <span className="text-[10px] font-mono text-[#00ff80] bg-[#00ff80]/10 px-1.5 py-0.5 rounded">
                Smooth
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Zero lag for competitive tournaments &amp; scrims. Colorful style for spotting enemies.
            </p>
          </button>

          <button
            onClick={() => {
              soundFx.playClick(900);
              onNavigateTab('graphics');
            }}
            className="p-3 bg-[#090c13] hover:bg-[#131b26] border border-[#1e293b] hover:border-[#00e5ff] rounded-xl text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs md:text-sm text-white group-hover:text-[#00e5ff]">
                🥔 Potato Graphics (Anti-Lag)
              </span>
              <span className="text-[10px] font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-1.5 py-0.5 rounded">
                540p Low
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              For 2GB/3GB/4GB RAM phones. Removes stutter in hotdrops (Pochinki, Bootcamp, Georgopol).
            </p>
          </button>

          <button
            onClick={() => {
              soundFx.playClick(900);
              onNavigateTab('graphics');
            }}
            className="p-3 bg-[#090c13] hover:bg-[#131b26] border border-[#1e293b] hover:border-[#a855f7] rounded-xl text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs md:text-sm text-white group-hover:text-[#a855f7]">
                📱 iPad View / 2K FOV
              </span>
              <span className="text-[10px] font-mono text-[#a855f7] bg-[#a855f7]/10 px-1.5 py-0.5 rounded">
                Wide Angle
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Expanded field of view to see enemies around corners and vehicle chases.
            </p>
          </button>
        </div>
      </div>

      {/* Tactical Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Graphics & FPS */}
        <div
          onClick={() => {
            soundFx.playClick(900);
            onNavigateTab('graphics');
          }}
          className="bg-[#0d121c] border border-[#1e293b] hover:border-[#00ff80] rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00ff80]/15 border border-[#00ff80]/30 flex items-center justify-center text-[#00ff80] group-hover:scale-110 transition-transform">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mt-3 group-hover:text-[#00ff80] transition-colors">
            Graphics &amp; FPS Engine
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Configure Smooth, Balanced, HD, HDR, and 30 to 120 FPS frame caps with resolution scaling.
          </p>
        </div>

        {/* Card 2: Hardware Monitor */}
        <div
          onClick={() => {
            soundFx.playClick(900);
            onNavigateTab('device');
          }}
          className="bg-[#0d121c] border border-[#1e293b] hover:border-[#00e5ff] rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mt-3 group-hover:text-[#00e5ff] transition-colors">
            Device Hardware Profiler
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Live display refresh rate ({telemetry.displayRefreshHz}Hz), GPU renderer, available RAM, and server ping test.
          </p>
        </div>

        {/* Card 3: Kotlin Jetpack Compose Code */}
        <div
          onClick={() => {
            soundFx.playClick(900);
            onNavigateTab('android_code');
          }}
          className="bg-[#0d121c] border border-[#1e293b] hover:border-[#a855f7] rounded-2xl p-5 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7] group-hover:scale-110 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mt-3 group-hover:text-[#a855f7] transition-colors">
            Kotlin Source &amp; APK
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            View full Android Studio source code, SAF Scoped Storage implementation, and download project ZIP.
          </p>
        </div>
      </div>

      {/* Banner Artwork Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-[#1e293b] shadow-xl">
        <img
          src="/src/assets/images/pubg_bgmi_banner_1793235044441.jpg"
          alt="PUBG Mobile & BGMI Tactical Esports Artwork"
          className="w-full h-44 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent flex flex-col justify-end p-5 md:p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00ff80]">
            <ShieldCheck className="w-4 h-4" />
            <span>Fair Play Engine · Zero Ban Risk</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white mt-1">
            Engineered for PUBG Mobile &amp; BGMI Competitive Play
          </h4>
        </div>
      </div>
    </div>
  );
};
