import React from 'react';
import { ActiveTab } from '../types';
import { soundFx } from '../utils/audio';
import {
  Flame,
  Sliders,
  Cpu,
  Zap,
  Code2,
  Settings as SettingsIcon,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const handleSelect = (tab: ActiveTab) => {
    soundFx.playClick(1000);
    onTabChange(tab);
  };

  const navItems: { tab: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Flame },
    { tab: 'graphics', label: 'GFX', icon: Sliders },
    { tab: 'device', label: 'Device', icon: Cpu },
    { tab: 'optimize', label: 'Boost', icon: Zap },
    { tab: 'android_code', label: 'Source', icon: Code2 },
    { tab: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090c13]/95 backdrop-blur-md border-t border-[#1e293b] lg:hidden">
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => handleSelect(item.tab)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors focus-visible:outline-none"
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'text-[#00ff80] scale-110' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'text-[#00ff80] font-semibold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
