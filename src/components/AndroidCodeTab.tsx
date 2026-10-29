import React, { useState } from 'react';
import { ANDROID_PROJECT_FILES, downloadAndroidProjectZip, ProjectFile } from '../utils/androidProjectFiles';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Code2,
  Download,
  Copy,
  Check,
  FileCode,
  Terminal,
  BookOpen,
} from 'lucide-react';

export const AndroidCodeTab: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const activeFile: ProjectFile = ANDROID_PROJECT_FILES[selectedFileIndex];

  const handleCopy = () => {
    soundFx.playClick(1000);
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    soundFx.playBoost();
    setIsDownloading(true);
    try {
      await downloadAndroidProjectZip();
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
    } catch {
      // error handling
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0d121c] border border-[#1e293b] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#00ff80]/15 text-[#00ff80] border border-[#00ff80]/30">
              <Code2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                Kotlin &amp; Jetpack Compose Android Project
              </h2>
              <p className="text-xs text-slate-400">
                Production-grade Android Studio source code with Material 3, SAF Scoped Storage, and Gradle 8.5
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="px-5 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff80] to-[#00e5ff] hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[#00ff80]/20 flex items-center justify-center gap-2 text-xs md:text-sm shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Packaging Project ZIP...' : 'DOWNLOAD ANDROID PROJECT (.ZIP)'}</span>
        </button>
      </div>

      {/* 3-Step APK Build Guide Card */}
      <div className="bg-[#090c13] border border-[#1e293b] rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#00ff80]" />
          How to Build the APK in Android Studio (Zero Errors)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#0d121c] p-3.5 rounded-xl border border-[#1e293b]">
            <div className="font-mono text-[#00ff80] font-bold text-sm">01. Extract &amp; Open</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Download the ZIP above and extract it. Open <strong className="text-slate-200">Android Studio</strong>, click <code className="text-[#00e5ff]">File &gt; Open</code> and choose the project folder.
            </p>
          </div>

          <div className="bg-[#0d121c] p-3.5 rounded-xl border border-[#1e293b]">
            <div className="font-mono text-[#00e5ff] font-bold text-sm">02. Sync &amp; Build APK</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Allow Gradle to sync automatically. In the top menu, go to <code className="text-[#00e5ff]">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</code>.
            </p>
          </div>

          <div className="bg-[#0d121c] p-3.5 rounded-xl border border-[#1e293b]">
            <div className="font-mono text-[#a855f7] font-bold text-sm">03. Install &amp; Play</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Locate <code className="text-[#00e5ff]">app-debug.apk</code> inside <code className="text-slate-300">app/build/outputs/apk/debug/</code> and install it directly on your Android phone.
            </p>
          </div>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: File Tree List */}
        <div className="lg:col-span-4 bg-[#0d121c] border border-[#1e293b] rounded-2xl p-3 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
            <span>Project Explorer</span>
            <span className="text-[10px] text-[#00ff80] font-mono">{ANDROID_PROJECT_FILES.length} Files</span>
          </div>

          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {ANDROID_PROJECT_FILES.map((file, idx) => {
              const isSelected = selectedFileIndex === idx;
              const fileName = file.path.split('/').pop() || file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => {
                    soundFx.playClick(800);
                    setSelectedFileIndex(idx);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#16232e] text-[#00ff80] font-semibold border border-[#00ff80]/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111722]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00ff80]' : 'text-slate-500'}`} />
                    <span className="truncate font-mono">{fileName}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase shrink-0">
                    {file.language}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 bg-[#090c13] border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col">
          {/* File Toolbar */}
          <div className="p-3 bg-[#0d121c] border-b border-[#1e293b] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <Terminal className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span className="font-mono text-xs text-white truncate">{activeFile.path}</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#16202e] border border-[#1e293b] hover:border-slate-500 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00ff80]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy File'}</span>
            </button>
          </div>

          <div className="px-4 py-2 bg-[#0b0e14] border-b border-[#1e293b]/50 text-[11px] text-slate-400">
            {activeFile.description}
          </div>

          {/* Syntax block */}
          <pre className="p-4 font-mono text-xs text-slate-300 overflow-x-auto overflow-y-auto max-h-[460px] leading-relaxed bg-[#07090e] select-text">
            {activeFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
