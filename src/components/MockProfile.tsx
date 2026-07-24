import React, { useEffect, useState } from "react";
import { BannerConfig } from "../types";
import BannerCanvas from "./BannerCanvas";
import { MapPin, Mail, ExternalLink, ShieldCheck, Award } from "lucide-react";

interface MockProfileProps {
  config: BannerConfig;
}

export default function MockProfile({ config }: MockProfileProps) {
  // Compute safe-zone overlap positions for preview avatar
  const isMobile = config.safeZoneDevice === "mobile";

  // A dead avatar URL should fall back to the initials badge instead of a
  // broken-image icon. Reset whenever the URL changes so a corrected URL
  // gets a fresh attempt.
  const [avatarFailed, setAvatarFailed] = useState(false);
  useEffect(() => setAvatarFailed(false), [config.customAvatarUrl]);
  const showAvatarImage = Boolean(config.customAvatarUrl) && !avatarFailed;

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm transition-colors" id="mock-profile-preview">
      {/* Simulation Header bar */}
      <div className="bg-raised px-4 py-2.5 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          <span className="text-xs font-mono text-muted ml-2">LinkedIn Profile Preview Simulator</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand/10 text-brand uppercase tracking-widest text-[10px]">
            {config.safeZoneDevice} Mockup
          </span>
        </div>
      </div>

      {/* Main mockup card container */}
      <div className="bg-surface text-ink p-0 relative">

        {/* Banner: the REAL live banner canvas embedded (same design as the
            workspace above), instead of a hand-drawn schematic that drifted
            out of sync with the actual banner. Safe-zone guide is hidden here
            because the mockup's own avatar circle plays that role. */}
        <div className="relative w-full select-none">
          {/* customAvatarUrl is blanked because the mockup's own overlapping
              photo circle below plays LinkedIn's profile-photo role — leaving
              it would double-draw the headshot in the same zone. */}
          <BannerCanvas
            config={{ ...config, showProfileSafeZone: false, customAvatarUrl: "" }}
            embedded
          />

          {/* LinkedIn profile photo, overlapping the banner's bottom edge like
              the real LinkedIn layout. Sized as a percentage of the banner's
              HEIGHT (aspect-square keeps it circular) so it scales with the
              card instead of the browser viewport. */}
          <div
            className={`absolute z-10 aspect-square rounded-full border-4 border-surface bg-raised transition-all duration-300 shadow-xl overflow-hidden flex items-center justify-center ${
              isMobile
                ? "left-[6%] bottom-0 translate-y-1/3 h-[70%]"
                : "left-[4%] bottom-0 translate-y-1/3 h-[80%]"
            }`}
          >
            {showAvatarImage ? (
              <img
                src={config.customAvatarUrl}
                alt={config.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-1">
                <span className="text-ink font-bold text-xl tracking-wider uppercase">
                  {config.name.split(" ").map(n => n[0]).join("")}
                </span>
                <span className="text-faint text-[8px] font-mono leading-none hidden md:inline">AVATAR AREA</span>
              </div>
            )}
          </div>
        </div>

        {/* LinkedIn metadata detail block */}
        {/* pt is a % of card width so it scales with the avatar overhang
            (avatar height is 80% of the banner's height = 20% of card width;
            a third of it hangs below the banner ≈ 6.7% of card width). */}
        <div className="p-6 pt-[9%] bg-surface relative">

          {/* Verification Badge */}
          <div className="absolute right-6 top-4 flex items-center gap-1.5 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest">AI Optimized</span>
          </div>

          {/* Personal Metadata */}
          <div className="space-y-1.5 mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-bold text-ink tracking-tight">{config.name}</h2>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold">
                <Award className="w-3 h-3" />
                <span>GOLD CREATOR</span>
              </div>
            </div>

            <p className="text-sm font-medium text-muted max-w-2xl">{config.title}</p>

            <p className="text-xs text-muted flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-faint" />
                {config.location}
              </span>
              <span className="text-line">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-faint" />
                {config.email}
              </span>
              <span className="text-line">•</span>
              <span className="text-brand hover:underline cursor-pointer flex items-center gap-1">
                Contact info
                <ExternalLink className="w-3 h-3" />
              </span>
            </p>

            <p className="text-xs text-muted font-semibold pt-1">
              <span className="text-ink font-bold">892</span> followers <span className="text-line">•</span> <span className="text-ink font-bold">500+</span> connections
            </p>
          </div>

          {/* Action buttons (Open To work, Add Section) */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button className="px-5 py-1.5 rounded-full bg-brand hover:opacity-90 text-on-brand text-xs font-bold transition-all shadow-md shadow-brand/10">
              Open to work
            </button>
            <button className="px-5 py-1.5 rounded-full border border-line hover:bg-raised text-muted text-xs font-bold transition-all">
              Add profile section
            </button>
            <button className="px-5 py-1.5 rounded-full border border-line hover:bg-raised text-muted text-xs font-bold transition-all">
              More
            </button>

            <div className="ml-auto flex items-center gap-2 text-[11px] text-faint bg-raised px-3 py-1.5 rounded border border-line">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Actively looking for {config.title} roles</span>
            </div>
          </div>

          {/* Profile Bio / About Excerpt */}
          <div className="mt-6 pt-5 border-t border-line">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-2.5">About Focus Summary</h3>
            <p className="text-xs text-muted leading-relaxed max-w-3xl">
              {config.tagline}
              {config.subTitle ? ` ${config.subTitle}.` : ""}
              {config.skills.length > 0 ? ` Core strengths: ${config.skills.slice(0, 6).join(", ")}.` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
