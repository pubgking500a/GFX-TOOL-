import React from 'react';
import { ActiveTab } from '../types';
import { soundFx } from '../utils/audio';
import { Play, Download, Smartphone } from 'lucide-react';

import { GameEditionId, GameEdition } from '../types';
import { GAME_EDITIONS } from '../utils/configGenerator';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  phoneMode: boolean;
  onTogglePhoneMode: () => void;
  onQuickLaunch: () => void;
  selectedGame: GameEdition;
  onSelectGame: (gameId: GameEditionId) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  phoneMode,
  onTogglePhoneMode,
  onQuickLaunch,
  selectedGame,
  onSelectGame,
  onOpenDownload,
}) => {
  const handleNav = (tab: ActiveTab) => {
    soundFx.playClick(900);
    onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090c13]/95 backdrop-blur-md border-b border-[#1e293b] px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text wordmark with subtle gaming glow */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] rounded-lg"
        >
          <img
            src="/src/assets/images/ak_gfx_logo_1793235029287.jpg"
            alt="AK GFX Tool Logo"
            className="w-8 h-8 rounded-lg object-cover border border-[#00ff80]/40 shadow-sm"
          />
          <span className="font-gaming text-lg md:text-xl font-bold tracking-wider text-white whitespace-nowrap shrink-0">
            AK <span className="text-[#00ff80]">GFX</span> TOOL
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => handleNav('home')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'home' ? 'text-[#00ff80] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNav('graphics')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'graphics' ? 'text-[#00ff80] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Graphics &amp; FPS
          </button>
          <button
            onClick={() => handleNav('device')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'device' ? 'text-[#00ff80] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hardware Specs
          </button>
          <button
            onClick={() => handleNav('optimize')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'optimize' ? 'text-[#00ff80] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Optimizer
          </button>
          <button
            onClick={() => handleNav('android_code')}
            className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
              activeTab === 'android_code' ? 'text-[#00e5ff] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#00e5ff]" />
            Kotlin Source &amp; APK
          </button>
          <button
            onClick={() => handleNav('settings')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'settings' ? 'text-[#00ff80] font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </nav>

        {/* Zone 3: Primary action + Game selector + Phone simulator view toggle */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Quick Game Switcher Pill */}
          <div className="relative flex items-center">
            <select
              value={selectedGame.id}
              onChange={(e) => {
                soundFx.playClick(850);
                onSelectGame(e.target.value as GameEditionId);
              }}
              className="bg-[#131c28] hover:bg-[#1a2536] border border-[#00ff80]/40 text-[#00ff80] text-xs font-bold rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00ff80] transition-colors appearance-none pr-6"
            >
              {GAME_EDITIONS.map((g) => (
                <option key={g.id} value={g.id} className="bg-[#090c13] text-white">
                  🎮 {g.name.split(' (')[0]}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          <button
            onClick={onTogglePhoneMode}
            title={phoneMode ? 'Switch to Full-Width Workspace' : 'Switch to Android Smartphone View'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              phoneMode
                ? 'bg-[#10b981]/15 text-[#00ff80] border-[#00ff80]/40'
                : 'bg-[#131b26] text-slate-300 border-[#1e293b] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{phoneMode ? 'Phone: ON' : 'Phone: OFF'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick(900);
              onOpenDownload();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#00ff80]/15 text-[#00ff80] border border-[#00ff80]/40 hover:bg-[#00ff80]/25 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download App</span>
          </button>

          <button
            onClick={onQuickLaunch}
            className="flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 text-xs md:text-sm font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 rounded-lg active:scale-95 transition-transform shadow-md shadow-[#00ff80]/20 whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Launch {selectedGame.id === 'pubg_global' ? 'PUBG' : selectedGame.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
