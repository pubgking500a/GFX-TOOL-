import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { soundFx } from '../utils/audio';
import {
  Globe,
  Moon,
  Volume2,
  ShieldCheck,
  Info,
  Check,
} from 'lucide-react';

interface SettingsTabProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  oledMode: boolean;
  onToggleOledMode: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentLanguage,
  onSelectLanguage,
  soundEnabled,
  onToggleSound,
  oledMode,
  onToggleOledMode,
}) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const languages: { code: LanguageCode; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English (US)' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-[#00ff80]" />
            Application Settings &amp; Preferences
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize language, display theme, audio feedback, and inspect security certifications
          </p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
          <Globe className="w-4 h-4 text-[#00e5ff]" />
          <span>Language (भाषा / Idioma)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  soundFx.playClick(900);
                  onSelectLanguage(lang.code);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff80] ${
                  isSelected
                    ? 'bg-[#00ff80]/15 border-[#00ff80] text-[#00ff80]'
                    : 'bg-[#090c13] border-[#1e293b] text-slate-300 hover:border-slate-500'
                }`}
              >
                <div>
                  <div className="text-xs md:text-sm font-bold">{lang.nativeName}</div>
                  <div className="text-[10px] text-slate-400">{lang.name}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#00ff80]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appearance & Sound Preferences */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Experience &amp; Theme
        </h3>

        {/* OLED Mode Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#16202e] text-[#00e5ff]">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Pure OLED Black Mode</div>
              <div className="text-xs text-slate-400">Deep pitch-black canvas for battery savings on AMOLED screens</div>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playToggle(!oledMode);
              onToggleOledMode();
            }}
            className={`w-12 h-6 rounded-full transition-colors relative focus-visible:outline-none p-0.5 ${
              oledMode ? 'bg-[#00ff80]' : 'bg-[#1e293b]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                oledMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Cyber Sounds Toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1e293b]/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#16202e] text-[#00ff80]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Cybernetic Audio Synthesizer</div>
              <div className="text-xs text-slate-400">Tactile Web Audio feedback on clicks and boosts</div>
            </div>
          </div>
          <button
            onClick={() => {
              onToggleSound();
              soundFx.setSoundEnabled(!soundEnabled);
              soundFx.playToggle(!soundEnabled);
            }}
            className={`w-12 h-6 rounded-full transition-colors relative focus-visible:outline-none p-0.5 ${
              soundEnabled ? 'bg-[#00ff80]' : 'bg-[#1e293b]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* App Info & Fair Play Certification */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00ff80]" />
          Security &amp; Legal Compliance
        </h3>

        <div className="p-3.5 bg-[#090c13] rounded-xl border border-[#1e293b] text-xs text-slate-400 space-y-2">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00ff80]" />
            Anti-Cheat Compliance Policy (Fair Play)
          </div>
          <p className="leading-relaxed">
            AK GFX Tool is designed strictly as a performance and rendering profile utility. It does NOT bypass game security, alter game runtime memory, crack in-app items, or inject illegal hacks. All generated settings rely strictly on standard Unreal Engine 4 configuration parameters provided for hardware scaling.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <button
              onClick={() => {
                soundFx.playClick(900);
                setShowPrivacyModal(true);
              }}
              className="text-[#00e5ff] hover:underline font-medium"
            >
              Read Full Privacy Policy &gt;
            </button>
          </div>
        </div>

        {/* App Meta Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="bg-[#090c13] p-3 rounded-xl border border-[#1e293b]">
            <span className="text-slate-400 text-[10px] block">App Version</span>
            <span className="text-white font-mono font-bold mt-0.5 block">v3.4.0 Pro</span>
          </div>
          <div className="bg-[#090c13] p-3 rounded-xl border border-[#1e293b]">
            <span className="text-slate-400 text-[10px] block">Android Framework</span>
            <span className="text-[#00ff80] font-mono font-bold mt-0.5 block">Jetpack Compose</span>
          </div>
          <div className="bg-[#090c13] p-3 rounded-xl border border-[#1e293b]">
            <span className="text-slate-400 text-[10px] block">Material Design</span>
            <span className="text-slate-200 font-mono font-bold mt-0.5 block">Material 3</span>
          </div>
          <div className="bg-[#090c13] p-3 rounded-xl border border-[#1e293b]">
            <span className="text-slate-400 text-[10px] block">Developer</span>
            <span className="text-white font-bold mt-0.5 block">AK Studio</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#090c13] border border-[#1e293b] rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Privacy Policy &amp; Terms of Service</h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Data Collection:</strong> AK GFX Tool runs 100% offline and locally on your device. We do not collect, transmit, or store personal identifiers, device telemetry, or game account credentials on external servers.
              </p>
              <p>
                <strong>2. Permissions:</strong> Storage Access Framework (SAF) permissions requested by the Android app are utilized solely to read and write UserCustom.ini configuration files within the specified game directory.
              </p>
              <p>
                <strong>3. Fair Play Disclaimer:</strong> AK GFX Tool is not affiliated with, endorsed by, or associated with KRAFTON, Tencent Games, PUBG Corporation, or Level Infinite. All trademarks belong to their respective copyright holders.
              </p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl font-bold bg-[#00ff80] text-black text-xs hover:bg-[#00e572] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
