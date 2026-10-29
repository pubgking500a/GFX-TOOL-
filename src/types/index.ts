export type GameEditionId =
  | 'bgmi'
  | 'pubg_global'
  | 'pubg_kr'
  | 'pubg_vn'
  | 'pubg_tw'
  | 'pubg_lite';

export interface GameEdition {
  id: GameEditionId;
  name: string;
  region: string;
  packageName: string;
  version: string;
  iconColor: string;
  popular: boolean;
}

export type GraphicsPreset = 'potato' | 'smooth' | 'balanced' | 'hd' | 'hdr' | 'ultra_hd';

export type FpsTarget = 30 | 40 | 60 | 90 | 120;

export type ResolutionOption = '540p' | '720p' | '1080p' | '2k' | 'native';

export type ColorStyle = 'classic' | 'colorful' | 'realistic' | 'soft' | 'movie';

export type AntiAliasing = 'disabled' | '2x' | '4x';

export type AudioQuality = 'low' | 'high' | 'ultra';

export interface GfxConfigState {
  gameEdition: GameEditionId;
  graphics: GraphicsPreset;
  fps: FpsTarget;
  resolution: ResolutionOption;
  style: ColorStyle;
  shadows: boolean;
  antiAliasing: AntiAliasing;
  audioQuality: AudioQuality;
  renderingApi: 'vulkan' | 'opengl' | 'default';
  lightEffects: boolean;
  gpuOptimization: boolean;
}

export interface DeviceTelemetry {
  model: string;
  androidVersion: string;
  apiLevel: number;
  gpuRenderer: string;
  gpuVendor: string;
  totalRamGb: number;
  usedRamGb: number;
  displayRefreshHz: number;
  screenResolution: string;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
  batteryTempC: number;
  pingMs: number | null;
  cores: number;
}

export type LanguageCode = 'en' | 'hi' | 'id' | 'es' | 'tr' | 'ru';

export type ActiveTab = 'home' | 'graphics' | 'device' | 'optimize' | 'android_code' | 'settings';
