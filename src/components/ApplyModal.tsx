import React, { useState } from 'react';
import { GfxConfigState, GameEdition } from '../types';
import { generateUserCustomIni, getConfigFilePath } from '../utils/configGenerator';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  Copy,
  Download,
  ShieldCheck,
  FolderTree,
  AlertCircle,
  Play,
} from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GfxConfigState;
  selectedGame: GameEdition;
  onLaunchGame: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  config,
  selectedGame,
  onLaunchGame,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const iniContent = generateUserCustomIni(config);
  const filePath = getConfigFilePath(selectedGame.packageName);

  const handleCopy = () => {
    soundFx.playClick(1000);
    navigator.clipboard.writeText(iniContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    soundFx.playSuccess();
    const blob = new Blob([iniContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UserCustom.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#00ff80', '#00e5ff'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#090c13] border border-[#1e293b] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-[#1e293b] flex items-center justify-between bg-[#0d121c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00ff80]/15 border border-[#00ff80]/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#00ff80]" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white">
                Apply Settings &amp; Configuration Guide
              </h3>
              <p className="text-xs text-slate-400">Target: {selectedGame.name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick(600);
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#16202e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 overflow-y-auto space-y-4 text-xs md:text-sm">
          {/* Truthful Transparent Disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#0d1624] border border-[#00e5ff]/30 text-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#00e5ff] font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Android 11+ Scoped Storage &amp; Anti-Cheat Compliance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google introduced Scoped Storage in modern Android (Android 11, 12, 13, 14, 15) to block apps from silently writing to the protected <code className="text-[#00ff80]">Android/data</code> folder without user permission.
            </p>
            <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
              <li>
                <strong className="text-slate-200">100% Ban-Free:</strong> We only generate clean, standard UE4 configuration parameters. No memory hooks, no binary modifications.
              </li>
              <li>
                <strong className="text-slate-200">FPS Limits:</strong> If your physical phone screen is 60Hz, 90/120 FPS will render at the display limit.
              </li>
            </ul>
          </div>

          {/* Quick Actions: Download & Copy */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-black bg-[#00ff80] hover:bg-[#00e572] transition-colors flex items-center justify-center gap-2 text-xs md:text-sm shadow-md shadow-[#00ff80]/15"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Downloaded UserCustom.ini' : 'Download UserCustom.ini'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl font-semibold text-white bg-[#131b26] border border-[#1e293b] hover:border-slate-500 transition-colors flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-[#00ff80]" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Config'}</span>
            </button>
          </div>

          {/* File Placement Path */}
          <div className="bg-[#07090e] border border-[#1e293b] rounded-xl p-3">
            <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs mb-1.5">
              <FolderTree className="w-3.5 h-3.5 text-[#00ff80]" />
              <span>Target File Location on Android Phone:</span>
            </div>
            <div className="font-mono text-[11px] text-[#00e5ff] break-all select-all bg-[#0d121c] p-2 rounded border border-[#1e293b]">
              {filePath}
            </div>
          </div>

          {/* Code Preview */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Generated UE4 Config Preview:</span>
              <span className="text-[10px] text-slate-400 font-mono">UTF-8 INI</span>
            </div>
            <pre className="p-3 bg-[#07090e] border border-[#1e293b] rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto max-h-36 leading-relaxed">
              {iniContent}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1e293b] bg-[#0d121c] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Done
          </button>
          <button
            onClick={() => {
              onClose();
              onLaunchGame();
            }}
            className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 transition-opacity flex items-center gap-2 shadow-md shadow-[#00ff80]/20"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Launch {selectedGame.name.split(' ')[0]} Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
