import { useState, useEffect } from 'react';
import {
  ActiveTab,
  GfxConfigState,
  GameEdition,
  DeviceTelemetry,
  LanguageCode,
} from './types';
import { GAME_EDITIONS } from './utils/configGenerator';
import { detectDeviceTelemetry } from './utils/deviceInfo';
import { soundFx } from './utils/audio';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { PhoneFrame } from './components/PhoneFrame';
import { HomeDashboard } from './components/HomeDashboard';
import { GraphicsSettingsTab } from './components/GraphicsSettingsTab';
import { DeviceInfoTab } from './components/DeviceInfoTab';
import { OptimizationTab } from './components/OptimizationTab';
import { AndroidCodeTab } from './components/AndroidCodeTab';
import { SettingsTab } from './components/SettingsTab';
import { ApplyModal } from './components/ApplyModal';
import { LaunchGameModal } from './components/LaunchGameModal';
import { DownloadAppModal } from './components/DownloadAppModal';

const DEFAULT_CONFIG: GfxConfigState = {
  gameEdition: 'pubg_global',
  graphics: 'smooth',
  fps: 90,
  resolution: '1080p',
  style: 'colorful',
  shadows: false,
  antiAliasing: 'disabled',
  audioQuality: 'ultra',
  renderingApi: 'vulkan',
  lightEffects: false,
  gpuOptimization: true,
};

const DEFAULT_TELEMETRY: DeviceTelemetry = {
  model: 'Qualcomm Snapdragon Gaming Device',
  androidVersion: 'Android 14 (UpsideDownCake)',
  apiLevel: 34,
  gpuRenderer: 'Adreno (TM) 740 / Immortalis-G715',
  gpuVendor: 'Qualcomm / ARM',
  totalRamGb: 8,
  usedRamGb: 4.6,
  displayRefreshHz: 90,
  screenResolution: '1080 × 2400 px',
  batteryLevel: 85,
  batteryCharging: false,
  batteryTempC: 33.2,
  pingMs: 28,
  cores: 8,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [config, setConfig] = useState<GfxConfigState>(() => {
    try {
      const saved = localStorage.getItem('ak_gfx_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [telemetry, setTelemetry] = useState<DeviceTelemetry>(DEFAULT_TELEMETRY);
  const [phoneMode, setPhoneMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return false; // native mobile screen already behaves as phone
    }
    return true; // show phone simulator frame by default on desktop for authenticity
  });

  const [oledMode, setOledMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(true);

  // Load real device telemetry on mount
  useEffect(() => {
    detectDeviceTelemetry().then((t) => {
      setTelemetry(t);
    });
  }, []);

  // Save config on changes
  useEffect(() => {
    try {
      localStorage.setItem('ak_gfx_config', JSON.stringify(config));
    } catch {
      // storage quota or private browsing
    }
  }, [config]);

  const selectedGame: GameEdition =
    GAME_EDITIONS.find((g) => g.id === config.gameEdition) || GAME_EDITIONS[0];

  const handleSelectGame = (gameId: any) => {
    setConfig((prev) => ({
      ...prev,
      gameEdition: gameId,
    }));
  };

  const handleTogglePhoneMode = () => {
    soundFx.playClick(900);
    setPhoneMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen text-slate-100 flex flex-col transition-colors ${
        oledMode ? 'bg-[#000000]' : 'bg-[#07090e]'
      }`}
    >
      {/* Top Bar following Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        phoneMode={phoneMode}
        onTogglePhoneMode={handleTogglePhoneMode}
        onQuickLaunch={() => setIsLaunchModalOpen(true)}
        selectedGame={selectedGame}
        onSelectGame={handleSelectGame}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area: Phone Frame or Responsive Full-Width */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        <PhoneFrame enabled={phoneMode}>
          <div className="p-3 sm:p-5">
            {activeTab === 'home' && (
              <HomeDashboard
                config={config}
                selectedGame={selectedGame}
                onSelectGame={handleSelectGame}
                telemetry={telemetry}
                onNavigateTab={setActiveTab}
                onOpenApply={() => setIsApplyModalOpen(true)}
                onLaunchGame={() => setIsLaunchModalOpen(true)}
                onOpenDownload={() => setIsDownloadModalOpen(true)}
              />
            )}

            {activeTab === 'graphics' && (
              <GraphicsSettingsTab
                config={config}
                onChangeConfig={setConfig}
                onOpenApply={() => setIsApplyModalOpen(true)}
                detectedHz={telemetry.displayRefreshHz}
                selectedGame={selectedGame}
                onSelectGame={handleSelectGame}
              />
            )}

            {activeTab === 'device' && (
              <DeviceInfoTab
                telemetry={telemetry}
                onRefreshTelemetry={() => {
                  detectDeviceTelemetry().then(setTelemetry);
                }}
              />
            )}

            {activeTab === 'optimize' && <OptimizationTab />}

            {activeTab === 'android_code' && <AndroidCodeTab />}

            {activeTab === 'settings' && (
              <SettingsTab
                currentLanguage={language}
                onSelectLanguage={setLanguage}
                soundEnabled={soundEnabled}
                onToggleSound={() => setSoundEnabled((prev) => !prev)}
                oledMode={oledMode}
                onToggleOledMode={() => setOledMode((prev) => !prev)}
              />
            )}
          </div>
        </PhoneFrame>
      </main>

      {/* Mobile Tab Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        config={config}
        selectedGame={selectedGame}
        onLaunchGame={() => setIsLaunchModalOpen(true)}
      />

      <LaunchGameModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        game={selectedGame}
      />

      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        config={config}
        selectedGame={selectedGame}
      />
    </div>
  );
}
