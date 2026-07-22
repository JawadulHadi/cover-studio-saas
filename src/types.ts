export interface BannerConfig {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  skills: string[];
  templateId: string;
  themeColor: string;
  accentColor: string;
  textColor: string;
  bgPattern: string;
  customLogoUrl: string;
  customAvatarUrl: string;
  showProfileSafeZone: boolean;
  safeZoneDevice: "desktop" | "mobile";
  gridOverlay: boolean;
  fontWeight: string;
  fontFamily: string;
  customBgUrl: string;
  aiStyleMode: string;
  subTitle: string;
  highlights: { label: string; value: string }[];
}

export interface BannerTemplate {
  id: string;
  name: string;
  description: string;
  previewBg: string;
  defaultConfig: Partial<BannerConfig>;
}

export interface PresetTheme {
  id: string;
  name: string;
  themeColor: string;
  accentColor: string;
  textColor: string;
  bgPattern: string;
  description: string;
}

export interface AISuggestions {
  taglines: string[];
  skills: string[];
  subtitles: string[];
}
