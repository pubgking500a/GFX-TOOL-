import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, enabled }) => {
  const [currentTime, setCurrentTime] = useState('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="py-6 px-2 flex justify-center items-start min-h-[calc(100vh-60px)]">
      <div className="relative w-full max-w-[430px] min-h-[850px] bg-[#07090e] border-[8px] border-[#1f2937] rounded-[48px] shadow-2xl shadow-[#00ff80]/10 overflow-hidden flex flex-col ring-1 ring-[#374151]">
        {/* Android Punch Hole Camera & Speaker */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-black border border-[#374151] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0d1620]" />
          </div>
        </div>

        {/* Android Status Bar */}
        <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs text-slate-400 select-none bg-[#090c13] shrink-0 border-b border-[#1e293b]/50">
          <span className="font-mono-nums font-semibold text-slate-200 text-[11px]">{currentTime}</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-tight">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-3.5 h-3.5 text-[#00ff80]" />
          </div>
        </div>

        {/* Phone screen content area */}
        <div className="flex-1 overflow-y-auto pb-20 relative bg-carbon">
          {children}
        </div>

        {/* Android Gesture Bar / Home Pill at bottom */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full pointer-events-none z-50 opacity-60" />
      </div>
    </div>
  );
};
