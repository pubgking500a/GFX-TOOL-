import React, { useState, useEffect } from 'react';
import { GameEdition } from '../types';
import { soundFx } from '../utils/audio';
import {
  X,
  Play,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

interface LaunchGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameEdition;
}

export const LaunchGameModal: React.FC<LaunchGameModalProps> = ({
  isOpen,
  onClose,
  game,
}) => {
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLaunched(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLaunchPackage = () => {
    soundFx.playBoost();
    setLaunched(true);

    // Try Android intent URI
    const androidIntent = `intent:#Intent;package=${game.packageName};action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end`;

    try {
      window.location.href = androidIntent;
    } catch {
      // Browser might restrict direct intent redirection
    }
  };

  const playStoreUrl = `https://play.google.com/store/apps/details?id=${game.packageName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#090c13] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#00ff80]/15 border border-[#00ff80]/30 flex items-center justify-center text-[#00ff80]">
              <Play className="w-5 h-5 fill-[#00ff80]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Launch {game.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{game.packageName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1624] border border-[#00ff80]/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00ff80]">
            <ShieldCheck className="w-4 h-4" />
            <span>Optimal Launch Ready</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All GFX configuration parameters and hardware boost triggers are primed. Tapping launch will invoke the package intent for <strong className="text-white">{game.packageName}</strong>.
          </p>
        </div>

        {launched && (
          <div className="p-3 bg-[#00ff80]/10 border border-[#00ff80]/30 rounded-xl flex items-center gap-2 text-xs text-[#00ff80] font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Intent triggered! If running on an Android phone, the game is launching now.</span>
          </div>
        )}

        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleLaunchPackage}
            className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[#00ff80]/20 flex items-center justify-center gap-2 text-sm"
          >
            <Smartphone className="w-4 h-4" />
            <span>START GAME NOW</span>
          </button>

          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl font-semibold text-slate-300 bg-[#131b26] border border-[#1e293b] hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2 text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View on Google Play Store</span>
          </a>
        </div>
      </div>
    </div>
  );
};
