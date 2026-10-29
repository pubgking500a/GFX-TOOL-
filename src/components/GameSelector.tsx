import React from 'react';
import { GameEdition, GameEditionId } from '../types';
import { GAME_EDITIONS } from '../utils/configGenerator';
import { soundFx } from '../utils/audio';
import { CheckCircle2, ChevronRight, ShieldCheck, Flame, Globe2 } from 'lucide-react';

interface GameSelectorProps {
  selectedGameId: GameEditionId;
  onSelectGame: (gameId: GameEditionId) => void;
}

export const GameSelector: React.FC<GameSelectorProps> = ({
  selectedGameId,
  onSelectGame,
}) => {
  const selectedGame = GAME_EDITIONS.find((g) => g.id === selectedGameId) || GAME_EDITIONS[0];

  const handleChoose = (id: GameEditionId) => {
    soundFx.playClick(850);
    onSelectGame(id);
  };

  // Primary top 2 games: PUBG Mobile Global & BGMI India
  const isPubgGlobal = selectedGameId === 'pubg_global';
  const isBgmi = selectedGameId === 'bgmi';

  return (
    <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
      {/* Header with Title and Fair Play verification badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#00e5ff]" />
            Game Edition Selection (PUBG Mobile &amp; BGMI)
          </h2>
          <p className="text-xs text-slate-400">
            Switch between PUBG Mobile (Global, KR, VN, Lite) and BGMI with one tap
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#00ff80] font-medium bg-[#00ff80]/10 border border-[#00ff80]/30 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fair Play Guaranteed</span>
        </div>
      </div>

      {/* Prominent High-Visibility Dual Hero Switcher: PUBG Mobile vs BGMI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* PUBG Mobile Global Hero Button */}
        <button
          onClick={() => handleChoose('pubg_global')}
          className={`relative p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
            isPubgGlobal
              ? 'bg-gradient-to-r from-[#00e5ff]/20 via-[#00e5ff]/10 to-[#090c13] border-[#00e5ff] shadow-md shadow-[#00e5ff]/15'
              : 'bg-[#090c13] border-[#1e293b] hover:border-slate-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-gaming font-extrabold text-sm ${
                isPubgGlobal
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-[#00e5ff]/30'
                  : 'bg-[#16202e] text-[#00e5ff] border border-[#1e293b]'
              }`}
            >
              PUBG
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">PUBG Mobile (Global)</span>
                <span className="text-[10px] bg-[#00e5ff]/20 text-[#00e5ff] px-1.5 py-0.2 rounded font-semibold">
                  Global
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                com.tencent.ig · 3.4 / 3.5
              </div>
            </div>
          </div>
          {isPubgGlobal && <CheckCircle2 className="w-5 h-5 text-[#00e5ff] shrink-0" />}
        </button>

        {/* BGMI India Hero Button */}
        <button
          onClick={() => handleChoose('bgmi')}
          className={`relative p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
            isBgmi
              ? 'bg-gradient-to-r from-[#ff9900]/20 via-[#ff9900]/10 to-[#090c13] border-[#ff9900] shadow-md shadow-[#ff9900]/15'
              : 'bg-[#090c13] border-[#1e293b] hover:border-slate-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-gaming font-extrabold text-sm ${
                isBgmi
                  ? 'bg-[#ff9900] text-black shadow-lg shadow-[#ff9900]/30'
                  : 'bg-[#16202e] text-[#ff9900] border border-[#1e293b]'
              }`}
            >
              BGMI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">BGMI (Battlegrounds)</span>
                <span className="text-[10px] bg-[#ff9900]/20 text-[#ff9900] px-1.5 py-0.2 rounded font-semibold">
                  India
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                com.pubg.imobile · 3.4 / 3.5
              </div>
            </div>
          </div>
          {isBgmi && <CheckCircle2 className="w-5 h-5 text-[#ff9900] shrink-0" />}
        </button>
      </div>

      {/* Other PUBG Mobile Editions (KR/JP, VN, TW, Lite) */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>Other PUBG Mobile Regional &amp; Lite Versions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {GAME_EDITIONS.filter((g) => g.id !== 'pubg_global' && g.id !== 'bgmi').map((game) => {
            const isSelected = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                onClick={() => handleChoose(game.id)}
                className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-[#16232e] border-[#00ff80] text-white shadow-sm'
                    : 'bg-[#090c13] border-[#1e293b] text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-xs truncate text-white">{game.name}</div>
                  <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                    {game.packageName}
                  </div>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00ff80] shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Game Active Summary Bar */}
      <div className="pt-3 border-t border-[#1e293b]/70 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#00ff80]" />
          <span className="text-slate-300 font-medium">Currently Configuring:</span>
          <span className="font-bold text-white bg-[#16202e] px-2.5 py-0.5 rounded-lg border border-[#1e293b] text-xs">
            {selectedGame.name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-[#00e5ff]">{selectedGame.packageName}</span>
          <span aria-hidden="true">·</span>
          <span>{selectedGame.version}</span>
        </div>
      </div>
    </div>
  );
};
