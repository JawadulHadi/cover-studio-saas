import React from "react";

/*
  The Qeloma mark is the product itself in miniature: a 4:1 banner bar with
  the profile-photo circle overlapping its bottom edge — the exact layout
  problem the studio solves. Inline SVG so it stays crisp at any size and
  inherits no external requests.
*/
export default function QelomaMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Qeloma Cover Studio">
      <defs>
        <linearGradient id="qeloma-mark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b44e6" />
          <stop offset="1" stopColor="#e4562a" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#qeloma-mark-g)" />
      {/* the banner, 4:1 */}
      <rect x="10" y="15" width="28" height="13" rx="3" fill="#ffffff" opacity="0.94" />
      {/* the avatar circle overlapping the banner's bottom edge */}
      <circle cx="17.5" cy="28" r="6" fill="#ffffff" stroke="url(#qeloma-mark-g)" strokeWidth="2.5" />
    </svg>
  );
}
