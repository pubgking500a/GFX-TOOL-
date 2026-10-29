import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { downloadAndroidProjectZip } from '../utils/androidProjectFiles';
import { generateUserCustomIni } from '../utils/configGenerator';
import { GfxConfigState, GameEdition } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Download,
  Smartphone,
  Code2,
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GfxConfigState;
  selectedGame: GameEdition;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  config,
  selectedGame,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [downloadedConfig, setDownloadedConfig] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    soundFx.playBoost();
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledSuccess(true);
        soundFx.playSuccess();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00ff80', '#00e5ff', '#ffffff'],
          });
        } catch {
          // fallback
        }
      }
    } else {
      // Prompt user with native instructions
      soundFx.playClick(900);
    }
  };

  const handleDownloadZip = async () => {
    soundFx.playBoost();
    setIsDownloadingZip(true);
    try {
      await downloadAndroidProjectZip();
      soundFx.playSuccess();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00ff80', '#00e5ff'],
        });
      } catch {
        // fallback
      }
    } catch {
      // error
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleDownloadIni = () => {
    soundFx.playSuccess();
    const content = generateUserCustomIni(config);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UserCustom.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedConfig(true);
    setTimeout(() => setDownloadedConfig(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#090c13] border border-[#1e293b] rounded-3xl p-5 md:p-6 shadow-2xl max-h-[92vh] overflow-y-auto space-y-5">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/ak_gfx_logo_1793235029287.jpg"
              alt="AK GFX Tool Logo"
              className="w-12 h-12 rounded-xl object-cover border border-[#00ff80]/40 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-bold text-white">Download AK GFX Tool</h3>
                <span className="text-[10px] font-bold text-[#00ff80] bg-[#00ff80]/15 border border-[#00ff80]/30 px-2 py-0.5 rounded-full">
                  v3.4.0 Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official gaming utility for PUBG Mobile &amp; BGMI
              </p>
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

        {/* Option 1: Direct Smartphone App Install (PWA / Web APK) */}
        <div className="bg-gradient-to-br from-[#0c1a26] to-[#090e18] border border-[#00ff80]/40 rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-lg shadow-[#00ff80]/5">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00ff80] tracking-wider uppercase">
              <Smartphone className="w-4 h-4" />
              Direct Android Phone App (Instant)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">0 MB Download · Full Screen</span>
          </div>

          <h4 className="text-sm md:text-base font-bold text-white">
            Install AK GFX Tool on your Phone Launcher
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Installs directly onto your Android device home screen with the official AK icon, fullscreen gaming mode, and offline hardware telemetry.
          </p>

          {installedSuccess || isInstalled ? (
            <div className="mt-3.5 p-3 rounded-xl bg-[#00ff80]/15 border border-[#00ff80]/40 flex items-center gap-2 text-xs text-[#00ff80] font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>AK GFX Tool is installed on your device! You can launch it from your home screen.</span>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <button
                onClick={handleInstallPWA}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#00ff80]/20 flex items-center justify-center gap-2 text-xs md:text-sm"
              >
                <Download className="w-4 h-4 fill-black" />
                <span>{isInstallable ? 'INSTALL APP ON ANDROID PHONE NOW' : 'ADD APP TO ANDROID HOME SCREEN'}</span>
              </button>

              {/* Instructions if beforeinstallprompt is waiting or on iOS */}
              {!isInstallable && (
                <div className="p-3 bg-[#080d16] rounded-xl border border-[#1e293b] text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>How to install in Chrome on Android:</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    1. Tap the <strong className="text-white">three dots (⋮)</strong> menu at the top-right of Chrome.<br />
                    2. Tap <strong className="text-[#00ff80]">"Install app"</strong> or <strong className="text-[#00ff80]">"Add to Home screen"</strong>.<br />
                    3. Tap <strong className="text-white">Install</strong>. AK GFX Tool will appear in your app drawer!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Option 2: Download Full Android Studio Kotlin Project (.ZIP) */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a855f7] tracking-wider uppercase">
              <Code2 className="w-4 h-4" />
              Android Studio APK Project Source
            </span>
            <span className="text-[10px] text-slate-400 font-mono">ZIP · Kotlin 2.0 · Jetpack Compose</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">
              Download Complete APK Project (.ZIP)
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Complete source code with <code className="text-[#00e5ff]">build.gradle.kts</code>, <code className="text-[#00e5ff]">AndroidManifest.xml</code>, Material 3 Compose screens, and SAF Storage Access Framework. Ready to build <code className="text-white">app-debug.apk</code> or release APK in Android Studio.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isDownloadingZip}
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#131d2b] border border-[#1e293b] hover:border-[#a855f7] hover:bg-[#1a2536] transition-all flex items-center justify-center gap-2 text-xs md:text-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-[#a855f7]" />
            <span>{isDownloadingZip ? 'Zipping Kotlin Project...' : 'DOWNLOAD ANDROID STUDIO PROJECT (.ZIP)'}</span>
          </button>
        </div>

        {/* Option 3: Download Direct UserCustom.ini Configuration */}
        <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#16202e] text-[#00e5ff]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs md:text-sm font-bold text-white">
                Download {selectedGame.id === 'pubg_global' ? 'PUBG Mobile' : selectedGame.name.split(' (')[0]} Config
              </h5>
              <p className="text-[11px] text-slate-400">
                UserCustom.ini ({config.fps} FPS + {config.graphics.toUpperCase()})
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadIni}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#16202e] border border-[#1e293b] hover:border-[#00e5ff] text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            {downloadedConfig ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff80]" />
                <span className="text-[#00ff80]">Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Download INI</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#1e293b]/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Malware · 100% Offline Safe</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
