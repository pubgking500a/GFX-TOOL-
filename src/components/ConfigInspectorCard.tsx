import React, { useState } from 'react';
import { GfxConfigState, GameEdition } from '../types';
import { analyzeCvars, parseUserCustomIni, getConfigFilePath } from '../utils/configGenerator';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  FileCode2,
  Download,
  Copy,
  Check,
  Zap,
  FolderTree,
  Upload,
} from 'lucide-react';

interface ConfigInspectorCardProps {
  currentIni: string;
  onApplyParsedConfig: (parsed: Partial<GfxConfigState>) => void;
  selectedGame: GameEdition;
}

export const ConfigInspectorCard: React.FC<ConfigInspectorCardProps> = ({
  currentIni,
  onApplyParsedConfig,
  selectedGame,
}) => {
  const [customText, setCustomText] = useState(currentIni);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const analyses = analyzeCvars(customText);
  const filePath = getConfigFilePath(selectedGame.packageName);

  const handleCopy = () => {
    soundFx.playClick(1000);
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundFx.playSuccess();
    const blob = new Blob([customText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UserCustom.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00ff80', '#00e5ff'],
      });
    } catch {
      // fallback
    }
  };

  const handleImportToApp = () => {
    soundFx.playBoost();
    const parsed = parseUserCustomIni(customText);
    onApplyParsedConfig(parsed);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#00ff80]/15 text-[#00ff80] border border-[#00ff80]/30">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-white">
              UserCustom.ini Config Inspector &amp; Importer
            </h3>
            <p className="text-xs text-slate-400">
              Paste or edit custom UE4 CVars to inspect frame policies, audio, and graphics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#131b26] border border-[#1e293b] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00ff80]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-[#00ff80] hover:bg-[#00e572] transition-colors flex items-center gap-1.5 shadow-sm shadow-[#00ff80]/20"
          >
            <Download className="w-3.5 h-3.5 fill-black" />
            <span>{downloaded ? 'Downloaded' : 'Download INI'}</span>
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div>
        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
          UserCustom.ini Code:
        </label>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          rows={7}
          spellCheck={false}
          className="w-full bg-[#07090e] border border-[#1e293b] rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-[#00ff80] transition-colors leading-relaxed selection:bg-[#00ff80]/30"
          placeholder="Paste [UserCustom DeviceProfile] +CVars=... here"
        />
      </div>

      {/* Action Buttons & Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          onClick={handleImportToApp}
          className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 transition-all flex items-center gap-2 shadow-md shadow-[#00ff80]/15"
        >
          <Upload className="w-3.5 h-3.5 fill-black" />
          <span>Load &amp; Sync Config with App Toggles</span>
        </button>

        {appliedNotice && (
          <span className="text-xs font-bold text-[#00ff80] flex items-center gap-1">
            <Check className="w-4 h-4" />
            <span>Settings synchronized with app UI!</span>
          </span>
        )}
      </div>

      {/* Live CVar Breakdown Table */}
      {analyses.length > 0 && (
        <div className="pt-2 border-t border-[#1e293b]/70 space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#00ff80]" />
            <span>Detected Profile Optimizations:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {analyses.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#090c13] border border-[#1e293b] p-3 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate-400 truncate">{item.cvar}</span>
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ color: item.badgeColor, backgroundColor: `${item.badgeColor}20` }}
                    >
                      ={item.value}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{item.meaning}</div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Path Reminder */}
      <div className="p-3 bg-[#07090e] border border-[#1e293b] rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
        <FolderTree className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-slate-300">Target File Path for {selectedGame.name}:</span>
          <div className="font-mono text-[11px] text-[#00e5ff] truncate mt-0.5 select-all">
            {filePath}
          </div>
        </div>
      </div>
    </div>
  );
};
