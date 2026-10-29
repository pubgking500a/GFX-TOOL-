import React from 'react';
import {
  GfxConfigState,
  GraphicsPreset,
  FpsTarget,
  ResolutionOption,
  ColorStyle,
  AntiAliasing,
  AudioQuality,
} from '../types';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Zap,
  Monitor,
  Palette,
  Volume2,
  Cpu,
  Info,
  Check,
  AlertTriangle,
} from 'lucide-react';

import { GameEdition, GameEditionId } from '../types';
import { GAME_EDITIONS, generateUserCustomIni } from '../utils/configGenerator';
import { ConfigInspectorCard } from './ConfigInspectorCard';

interface GraphicsSettingsTabProps {
  config: GfxConfigState;
  onChangeConfig: (newConfig: GfxConfigState) => void;
  onOpenApply: () => void;
  detectedHz: number;
  selectedGame: GameEdition;
  onSelectGame: (id: GameEditionId) => void;
}

export const GraphicsSettingsTab: React.FC<GraphicsSettingsTabProps> = ({
  config,
  onChangeConfig,
  onOpenApply,
  detectedHz,
  selectedGame,
  onSelectGame,
}) => {
  const updateField = <K extends keyof GfxConfigState>(key: K, val: GfxConfigState[K]) => {
    soundFx.playClick(950);
    onChangeConfig({
      ...config,
      [key]: val,
    });
  };

  const graphicsOptions: {
    id: GraphicsPreset;
    label: string;
    badge: string;
    desc: string;
  }[] = [
    { id: 'potato', label: 'Potato', badge: 'Max FPS', desc: 'Ultra-low rendering for low-end 2GB/3GB RAM phones' },
    { id: 'smooth', label: 'Smooth', badge: 'Esports Standard', desc: 'Minimal textures, zero frame drops, maximum battery life' },
    { id: 'balanced', label: 'Balanced', badge: 'Balanced', desc: 'Good visual fidelity with stable frame rate' },
    { id: 'hd', label: 'HD', badge: 'High Res', desc: 'Sharp player models and environmental details' },
    { id: 'hdr', label: 'HDR', badge: 'High Dynamic', desc: 'Vibrant colors & lighting for high-end chipsets' },
    { id: 'ultra_hd', label: 'Ultra HD', badge: 'Flagship Only', desc: '4K mobile textures (requires Snapdragon 8 Gen 2/3/4)' },
  ];

  const fpsOptions: {
    fps: FpsTarget;
    label: string;
    tier: string;
    requiresHz: number;
  }[] = [
    { fps: 30, label: '30 FPS', tier: 'Low', requiresHz: 60 },
    { fps: 40, label: '40 FPS', tier: 'Medium', requiresHz: 60 },
    { fps: 60, label: '60 FPS', tier: 'Extreme', requiresHz: 60 },
    { fps: 90, label: '90 FPS', tier: 'Ultra Extreme', requiresHz: 90 },
    { fps: 120, label: '120 FPS', tier: 'Max Flagship', requiresHz: 120 },
  ];

  const resolutions: {
    id: ResolutionOption;
    label: string;
    desc: string;
  }[] = [
    { id: '540p', label: '540p Low', desc: 'Lowest load, maximum frame boost' },
    { id: '720p', label: '720p HD', desc: 'Recommended sweet spot for budget phones' },
    { id: '1080p', label: '1080p FHD', desc: 'Crystal clear standard smartphone resolution' },
    { id: '2k', label: '2K QHD', desc: 'iPad / Tablet widescreen view field' },
    { id: 'native', label: 'Native Display', desc: 'Match device panel physical pixel count' },
  ];

  const styles: { id: ColorStyle; label: string; desc: string; color: string }[] = [
    { id: 'colorful', label: 'Colorful', desc: 'Highest contrast (Recommended for spotting enemies)', color: '#00ff80' },
    { id: 'classic', label: 'Classic', desc: 'Original battle royale color palette', color: '#94a3b8' },
    { id: 'realistic', label: 'Realistic', desc: 'True-to-life lighting and shadows', color: '#38bdf8' },
    { id: 'soft', label: 'Soft', desc: 'Gentle pastel hues, reduces eye fatigue', color: '#f472b6' },
    { id: 'movie', label: 'Movie', desc: 'Cinematic color grading', color: '#fbbf24' },
  ];

  const needsHzWarning = config.fps > detectedHz;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#00ff80]/15 text-[#00ff80]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base md:text-lg font-bold text-white">
              Graphics &amp; Frame Rate Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Optimizing for <strong className="text-white">{selectedGame.name}</strong> ({selectedGame.packageName})
          </p>
        </div>
        <button
          onClick={onOpenApply}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl font-bold text-black bg-[#00ff80] hover:bg-[#00e572] transition-colors shadow-md shadow-[#00ff80]/20 flex items-center gap-2 text-xs md:text-sm shrink-0"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>APPLY CONFIGURATION</span>
        </button>
      </div>

      {/* Target Game Switcher Tabs in Graphics Screen */}
      <div className="bg-[#090c13] border border-[#1e293b] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Active Game:
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {GAME_EDITIONS.map((game) => {
            const isSelected = game.id === selectedGame.id;
            return (
              <button
                key={game.id}
                onClick={() => {
                  soundFx.playClick(850);
                  onSelectGame(game.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00e5ff] text-black shadow-md shadow-[#00e5ff]/20'
                    : 'bg-[#131b26] text-slate-400 hover:text-white border border-[#1e293b]'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: isSelected ? '#000000' : game.iconColor }}
                />
                <span>{game.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. GRAPHICS PRESET */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#00e5ff]" />
            Graphics Quality
          </label>
          <span className="text-xs font-mono text-[#00ff80] font-semibold">
            {config.graphics.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {graphicsOptions.map((opt) => {
            const isSelected = config.graphics === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateField('graphics', opt.id)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[82px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-[#00ff80]/10 border-[#00ff80] shadow-sm'
                    : 'bg-[#090c13] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-sm font-bold ${isSelected ? 'text-[#00ff80]' : 'text-white'}`}>
                    {opt.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#00ff80]" />}
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    {opt.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. FPS SELECTION */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00ff80]" />
            Target Frame Rate (FPS)
          </label>
          <span className="text-xs font-mono text-[#00ff80] font-bold">
            {config.fps} FPS TARGET
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {fpsOptions.map((item) => {
            const isSelected = config.fps === item.fps;
            return (
              <button
                key={item.fps}
                onClick={() => updateField('fps', item.fps)}
                className={`p-3 rounded-xl border text-center transition-all min-h-[72px] flex flex-col justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#00ff80]/20 to-[#00ff80]/5 border-[#00ff80] shadow-md shadow-[#00ff80]/10'
                    : 'bg-[#090c13] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <span className={`font-gaming text-base md:text-lg font-bold ${isSelected ? 'text-[#00ff80]' : 'text-white'}`}>
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                  {item.tier}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Refresh Rate Notice */}
        {needsHzWarning ? (
          <div className="mt-3.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Display Refresh Rate Notice:</span> Your device screen is running at{' '}
              <span className="font-mono text-white font-bold">{detectedHz}Hz</span>. To achieve full {config.fps}{' '}
              FPS rendering, ensure your Android phone has 90Hz/120Hz display refresh enabled under Android Settings &gt; Display.
            </div>
          </div>
        ) : (
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Screen detected at {detectedHz}Hz. Fully supports {config.fps} FPS gameplay.</span>
          </div>
        )}
      </div>

      {/* 3. RESOLUTION & RENDERING */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#38bdf8]" />
            Resolution &amp; Rendering Scale
          </label>
          <span className="text-xs font-mono text-slate-300">
            {config.resolution.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {resolutions.map((res) => {
            const isSelected = config.resolution === res.id;
            return (
              <button
                key={res.id}
                onClick={() => updateField('resolution', res.id)}
                className={`p-3 rounded-xl text-left border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-[#00e5ff]/10 border-[#00e5ff] shadow-sm'
                    : 'bg-[#090c13] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs md:text-sm font-bold ${isSelected ? 'text-[#00e5ff]' : 'text-white'}`}>
                    {res.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#00e5ff]" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-tight">{res.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. COLOR STYLE */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-[#f472b6]" />
          Visual Color Style
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {styles.map((st) => {
            const isSelected = config.style === st.id;
            return (
              <button
                key={st.id}
                onClick={() => updateField('style', st.id)}
                className={`p-3 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-[#1a2533] border-[#00ff80]'
                    : 'bg-[#090c13] border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.color }} />
                  <span className={`text-xs md:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {st.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">{st.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ADVANCED TOGGLES (Shadows, Anti-Aliasing, Audio Quality, Vulkan API) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dynamic Shadows */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">Dynamic Shadows</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Turn OFF for +12% FPS boost in smoke &amp; red zones
            </div>
          </div>
          <button
            onClick={() => updateField('shadows', !config.shadows)}
            className={`w-12 h-6 rounded-full transition-colors relative focus-visible:outline-none p-0.5 ${
              config.shadows ? 'bg-[#00ff80]' : 'bg-[#1e293b]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                config.shadows ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Anti-Aliasing */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">Anti-Aliasing (MSAA)</div>
            <div className="text-xs text-slate-400 mt-0.5">Smooths pixel jaggedness</div>
          </div>
          <div className="flex items-center gap-1 bg-[#090c13] p-1 rounded-lg border border-[#1e293b]">
            {(['disabled', '2x', '4x'] as AntiAliasing[]).map((val) => (
              <button
                key={val}
                onClick={() => updateField('antiAliasing', val)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  config.antiAliasing === val
                    ? 'bg-[#00ff80] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {val.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Quality */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#00e5ff]" />
              Sound Quality (3D Footsteps)
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Ultra SFX unlocks spatial 360° enemy footsteps
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#090c13] p-1 rounded-lg border border-[#1e293b]">
            {(['low', 'high', 'ultra'] as AudioQuality[]).map((val) => (
              <button
                key={val}
                onClick={() => updateField('audioQuality', val)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  config.audioQuality === val
                    ? 'bg-[#00e5ff] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {val.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Rendering API */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#a855f7]" />
              Graphics API
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Vulkan is 25% faster on Android 10+
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#090c13] p-1 rounded-lg border border-[#1e293b]">
            {(['default', 'vulkan', 'opengl'] as const).map((val) => (
              <button
                key={val}
                onClick={() => updateField('renderingApi', val)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  config.renderingApi === val
                    ? 'bg-[#a855f7] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {val.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* UserCustom.ini Inspector & Live Editor */}
      <ConfigInspectorCard
        currentIni={generateUserCustomIni(config)}
        selectedGame={selectedGame}
        onApplyParsedConfig={(parsed) => {
          onChangeConfig({
            ...config,
            ...parsed,
          });
        }}
      />

      {/* Floating Sticky CTA on mobile */}
      <div className="pt-2">
        <button
          onClick={onOpenApply}
          className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 active:scale-[0.98] transition-transform shadow-lg shadow-[#00ff80]/20 flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <Zap className="w-5 h-5 fill-black" />
          <span>SAVE &amp; APPLY SETTINGS SAFELY</span>
        </button>
      </div>
    </div>
  );
};
