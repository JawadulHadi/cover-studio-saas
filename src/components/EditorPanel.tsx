import React, { useState } from "react";
import { BannerConfig } from "../types";
import {
  User, Palette, BadgePlus, BarChart3, Plus, X, Laptop, Smartphone,
  Info, Sparkles, Layout, Type as FontIcon, Grid, Mail, MapPin,
  Image as ImageIcon, Link as LinkIcon, UserCircle2, Sticker
} from "lucide-react";

interface EditorPanelProps {
  config: BannerConfig;
  onChangeConfig: (updates: Partial<BannerConfig>) => void;
}

export default function EditorPanel({ config, onChangeConfig }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState<"text" | "style" | "skills" | "highlights" | "images">("text");
  const [newSkill, setNewSkill] = useState("");

  const presets = [
    {
      id: "sophisticated-dark",
      name: "Sophisticated Dark",
      themeColor: "sophisticated-dark",
      accentColor: "#3b82f6",
      textColor: "#ffffff",
      bgPattern: "grid"
    },
    {
      id: "tech-navy",
      name: "Tech Navy (AI)",
      themeColor: "tech-navy",
      accentColor: "#38bdf8",
      textColor: "#ffffff",
      bgPattern: "circuit"
    },
    {
      id: "deep-space",
      name: "Deep Space",
      themeColor: "deep-space",
      accentColor: "#10b981",
      textColor: "#f3f4f6",
      bgPattern: "grid"
    },
    {
      id: "warm-sunset",
      name: "Sunset Cyber",
      themeColor: "warm-sunset",
      accentColor: "#f97316",
      textColor: "#fafaf9",
      bgPattern: "waves"
    },
    {
      id: "minimal-white",
      name: "Minimal Light",
      themeColor: "minimal-white",
      accentColor: "#1e293b",
      textColor: "#0f172a",
      bgPattern: "grid"
    },
    {
      id: "cyan-gradient",
      name: "Teal Wave",
      themeColor: "cyan-gradient",
      accentColor: "#2dd4bf",
      textColor: "#f0fdfa",
      bgPattern: "waves"
    }
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    onChangeConfig({
      templateId: preset.id,
      themeColor: preset.themeColor,
      accentColor: preset.accentColor,
      textColor: preset.textColor,
      bgPattern: preset.bgPattern
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (config.skills.includes(newSkill.trim())) {
      setNewSkill("");
      return;
    }
    onChangeConfig({
      skills: [...config.skills, newSkill.trim()]
    });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChangeConfig({
      skills: config.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleHighlightChange = (index: number, field: "label" | "value", newValue: string) => {
    const updated = [...config.highlights];
    updated[index] = { ...updated[index], [field]: newValue };
    onChangeConfig({ highlights: updated });
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl" id="editor-control-panel">
      {/* Editor Tab Navigation */}
      <div className="flex border-b border-[#111] bg-[#050505]/60 p-1">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "text" 
              ? "bg-[#111] text-blue-400 border border-[#222]/50 shadow-md" 
              : "text-[#666] hover:text-[#c5c5c5]"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Identity</span>
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "style" 
              ? "bg-[#111] text-blue-400 border border-[#222]/50 shadow-md" 
              : "text-[#666] hover:text-[#c5c5c5]"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Theme & Style</span>
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "skills" 
              ? "bg-[#111] text-blue-400 border border-[#222]/50 shadow-md" 
              : "text-[#666] hover:text-[#c5c5c5]"
          }`}
        >
          <BadgePlus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Skills Pills</span>
        </button>
        <button
          onClick={() => setActiveTab("highlights")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "highlights"
              ? "bg-[#111] text-blue-400 border border-[#222]/50 shadow-md"
              : "text-[#666] hover:text-[#c5c5c5]"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Highlights</span>
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "images"
              ? "bg-[#111] text-blue-400 border border-[#222]/50 shadow-md"
              : "text-[#666] hover:text-[#c5c5c5]"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Images</span>
        </button>
      </div>

      <div className="p-6">
        {/* TAB 1: IDENTITY & COPY */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Personal Identity & Position details</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Full Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => onChangeConfig({ name: e.target.value })}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Professional Title</label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => onChangeConfig({ title: e.target.value })}
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Main Scaling Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => onChangeConfig({ tagline: e.target.value })}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                />
                <p className="text-[10px] text-[#555] mt-1 italic">Typically a punchy sentence summarizing your value prop.</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Secondary Subtitle / Stack Summary</label>
                <input
                  type="text"
                  value={config.subTitle}
                  onChange={(e) => onChangeConfig({ subTitle: e.target.value })}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#555]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="text"
                    value={config.email}
                    onChange={(e) => onChangeConfig({ email: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#555]" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => onChangeConfig({ location: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STYLE & THEME */}
        {activeTab === "style" && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Palette className="w-4 h-4" />
              <span>Choose a curated color preset</span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    config.templateId === preset.id 
                      ? "border-blue-500 bg-blue-950/10 shadow-md" 
                      : "border-[#1a1a1a] bg-[#050505]/40 hover:border-[#222]"
                  }`}
                >
                  <span className="text-xs font-bold text-white mb-1.5">{preset.name}</span>
                  <div className="flex gap-1.5 items-center w-full">
                    {/* Circle indicators */}
                    <div className="w-3.5 h-3.5 rounded-full border border-[#1a1a1a] shadow-sm" style={{ backgroundColor: preset.accentColor }} />
                    <div className="w-3.5 h-3.5 rounded-full border border-[#1a1a1a] shadow-sm" style={{ backgroundColor: preset.themeColor === "minimal-white" ? "#ffffff" : "#0f172a" }} />
                    <span className="text-[10px] text-[#666] capitalize ml-auto">{preset.bgPattern}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-[#111] pt-4 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Layout className="w-4 h-4" />
                <span>Layout & Fine-tuning</span>
              </div>

              {/* Background Graphics */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Background Pattern style</label>
                <select
                  value={config.bgPattern}
                  onChange={(e) => onChangeConfig({ bgPattern: e.target.value })}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all cursor-pointer outline-none"
                >
                  <option value="grid">Bento Grid Lines (Clean Layout)</option>
                  <option value="circuit">Circuit Traces (AI / Hardware Vibe)</option>
                  <option value="waves">Smooth waves (SaaS Flows)</option>
                  <option value="polygons">Network Polygons (Mesh Nodes)</option>
                  <option value="solid">Minimal Solid Color</option>
                </select>
              </div>

              {/* Fonts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Primary Font Family</label>
                  <select
                    value={config.fontFamily}
                    onChange={(e) => onChangeConfig({ fontFamily: e.target.value })}
                    className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-[#e5e5e5] transition-all cursor-pointer outline-none"
                  >
                    <option value="Space Grotesk">Space Grotesk (Tech)</option>
                    <option value="Inter">Inter (Swiss Modern)</option>
                    <option value="JetBrains Mono">JetBrains Mono (Mono)</option>
                    <option value="editorial">Elegant Serif (Editorial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1">Color Palette Accent</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => onChangeConfig({ accentColor: e.target.value })}
                      className="w-8 h-8 rounded border border-[#1a1a1a] bg-transparent cursor-pointer outline-none"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => onChangeConfig({ accentColor: e.target.value })}
                      className="flex-1 bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-2 py-1.5 text-[10px] text-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Safe-Zone Overlay Configurations */}
              <div className="bg-[#050505]/40 border border-[#111] rounded-lg p-3 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-300">LinkedIn Profile Avatar Guide</label>
                    <span className="text-[10px] text-[#555]">Overlay safe zones to check layout coverage</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={config.showProfileSafeZone}
                      onChange={(e) => onChangeConfig({ showProfileSafeZone: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-[#111] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#888] after:border-[#888] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-[#050505]" />
                  </label>
                </div>

                {config.showProfileSafeZone && (
                  <div className="flex items-center justify-between border-t border-[#111] pt-2">
                    <span className="text-xs font-medium text-[#666]">Preview Layout Overlap:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onChangeConfig({ safeZoneDevice: "desktop" })}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          config.safeZoneDevice === "desktop"
                            ? "bg-[#111] text-blue-400 border border-[#222]"
                            : "bg-transparent text-[#666] hover:text-[#c5c5c5]"
                        }`}
                      >
                        <Laptop className="w-3.5 h-3.5" />
                        Desktop (Left)
                      </button>
                      <button
                        onClick={() => onChangeConfig({ safeZoneDevice: "mobile" })}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          config.safeZoneDevice === "mobile"
                            ? "bg-[#111] text-blue-400 border border-[#222]"
                            : "bg-transparent text-[#666] hover:text-[#c5c5c5]"
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        Mobile (Center)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS PILLS */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <BadgePlus className="w-4 h-4" />
              <span>Technology Badge Pills</span>
            </div>
            
            <p className="text-[11px] text-[#888] leading-relaxed bg-[#050505]/40 p-3 border border-[#111] rounded-lg">
              Add key technologies (e.g. <strong>Gemini 2.5 Flash</strong>, <strong>NestJS</strong>, <strong>PostgreSQL</strong>) to display on your cover. They will render as aligned pill badges.
            </p>

            {/* List skills */}
            <div className="flex flex-wrap gap-2 py-1 max-h-[140px] overflow-y-auto pr-1 border border-[#111] rounded-lg p-2 bg-[#050505]/20">
              {config.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-[#111] hover:bg-[#161616] border border-[#222] rounded-full text-xs text-[#c5c5c5] flex items-center gap-1.5 transition-all shadow-sm select-none"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#666] hover:text-red-400 focus:outline-none"
                    title="Remove badge"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {config.skills.length === 0 && (
                <span className="text-xs text-[#666] italic p-1">No technology badges added. Add some below!</span>
              )}
            </div>

            {/* Add skill form */}
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Kubernetes, Python, AWS"
                className="flex-1 bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] transition-all outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0 shadow-lg shadow-blue-500/10"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Add Badge</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BENTO HIGHLIGHT DETAILS */}
        {activeTab === "highlights" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" />
              <span>Engineering Highlights Box (Bento Panel)</span>
            </div>

            <p className="text-[11px] text-[#888] leading-relaxed bg-[#050505]/40 p-3 border border-[#111] rounded-lg">
              Customize the three highlight cells displayed on the far right of the cover banner. Use these to display concrete engineering metrics, certs, or specialties.
            </p>

            <div className="space-y-4">
              {config.highlights.map((highlight, index) => (
                <div key={index} className="p-4 bg-[#050505]/40 border border-[#111] rounded-lg space-y-2.5">
                  <div className="text-[10px] font-bold text-[#555] uppercase tracking-widest">
                    Bento highlight cell #{index + 1}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#888] mb-1">Label</label>
                      <input
                        type="text"
                        value={highlight.label}
                        onChange={(e) => handleHighlightChange(index, "label", e.target.value)}
                        placeholder="e.g. EXPERIENCE"
                        className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-[#e5e5e5] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#888] mb-1">Value / Metric</label>
                      <input
                        type="text"
                        value={highlight.value}
                        onChange={(e) => handleHighlightChange(index, "value", e.target.value)}
                        placeholder="e.g. 7+ Years"
                        className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-[#e5e5e5] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: IMAGES / MEDIA (URL-based, no upload) */}
        {activeTab === "images" && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-4 h-4" />
              <span>Media by Image URL</span>
            </div>

            <p className="text-[11px] text-[#888] leading-relaxed bg-[#050505]/40 p-3 border border-[#111] rounded-lg flex gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Paste a direct, public image URL (ending in .jpg / .png / .webp). There's no file upload yet.
                For the <strong>logo</strong> and <strong>background</strong> to appear in the downloaded PNG, the
                image host must allow cross-origin use (CORS) — otherwise they show in the live preview but are
                skipped from the export.
              </span>
            </p>

            {/* Avatar URL */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1 flex items-center gap-1.5">
                <UserCircle2 className="w-3.5 h-3.5 text-[#555]" />
                Profile Avatar URL
              </label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#050505] border border-[#1a1a1a] overflow-hidden shrink-0 flex items-center justify-center">
                  {config.customAvatarUrl ? (
                    <img src={config.customAvatarUrl} alt="Avatar preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <UserCircle2 className="w-6 h-6 text-[#333]" />
                  )}
                </div>
                <input
                  type="url"
                  value={config.customAvatarUrl}
                  onChange={(e) => onChangeConfig({ customAvatarUrl: e.target.value })}
                  placeholder="https://…/headshot.jpg"
                  className="flex-1 bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] placeholder-[#444] outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-[#555] mt-1">Shown in the LinkedIn preview mockup below.</p>
            </div>

            {/* Logo URL */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1 flex items-center gap-1.5">
                <Sticker className="w-3.5 h-3.5 text-[#555]" />
                Logo URL
              </label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#050505] border border-[#1a1a1a] overflow-hidden shrink-0 flex items-center justify-center p-1">
                  {config.customLogoUrl ? (
                    <img src={config.customLogoUrl} alt="Logo preview" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <Sticker className="w-6 h-6 text-[#333]" />
                  )}
                </div>
                <input
                  type="url"
                  value={config.customLogoUrl}
                  onChange={(e) => onChangeConfig({ customLogoUrl: e.target.value })}
                  placeholder="https://…/logo.png"
                  className="flex-1 bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] placeholder-[#444] outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-[#555] mt-1">Rendered in the banner's top-right corner.</p>
            </div>

            {/* Background image URL */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#888] mb-1 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#555]" />
                Background Image URL
              </label>
              <div className="flex items-center gap-3">
                <div className="w-20 h-12 rounded-lg bg-[#050505] border border-[#1a1a1a] overflow-hidden shrink-0 flex items-center justify-center">
                  {config.customBgUrl ? (
                    <img src={config.customBgUrl} alt="Background preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-[#333]" />
                  )}
                </div>
                <input
                  type="url"
                  value={config.customBgUrl}
                  onChange={(e) => onChangeConfig({ customBgUrl: e.target.value })}
                  placeholder="https://…/background.jpg"
                  className="flex-1 bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-[#e5e5e5] placeholder-[#444] outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-[#555] mt-1">
                Fills the whole banner with a readability overlay. Clear the field to return to the theme background.
              </p>
              {config.customBgUrl && (
                <button
                  onClick={() => onChangeConfig({ customBgUrl: "" })}
                  className="mt-2 text-[10px] font-bold text-red-400/80 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Remove background image
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
