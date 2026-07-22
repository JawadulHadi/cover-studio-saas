import React, { useEffect, useRef } from "react";
import { BannerConfig } from "../types";

interface BannerCanvasProps {
  config: BannerConfig;
  className?: string;
  onExportRef?: (exportFn: () => void) => void;
}

export default function BannerCanvas({ config, className = "", onExportRef }: BannerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-res dimensions
  const WIDTH = 1584;
  const HEIGHT = 396;

  const drawCanvas = (ctx: CanvasRenderingContext2D, isExporting: boolean) => {
    // 1. Clear background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Set styling based on config.themeColor
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    
    // Choose theme colors
    let primaryBg = "#0b132b";
    let secondaryBg = "#1c2541";
    let accentColor = config.accentColor || "#38bdf8";
    let textColor = config.textColor || "#ffffff";
    let subtitleColor = "#94a3b8";
    let badgeBg = "rgba(56, 189, 248, 0.1)";
    let badgeBorder = "rgba(56, 189, 248, 0.2)";

    if (config.themeColor === "sophisticated-dark") {
      primaryBg = "#050505";
      secondaryBg = "#0a0a0a";
      subtitleColor = "#888888";
    } else if (config.themeColor === "tech-navy") {
      primaryBg = "#0a1128";
      secondaryBg = "#101f42";
      subtitleColor = "#94a3b8";
    } else if (config.themeColor === "deep-space") {
      primaryBg = "#030712";
      secondaryBg = "#111827";
      subtitleColor = "#9ca3af";
    } else if (config.themeColor === "warm-sunset") {
      primaryBg = "#0c0a09";
      secondaryBg = "#1c1917";
      subtitleColor = "#d6d3d1";
    } else if (config.themeColor === "minimal-white") {
      primaryBg = "#f8fafc";
      secondaryBg = "#e2e8f0";
      subtitleColor = "#475569";
    } else if (config.themeColor === "cyan-gradient") {
      primaryBg = "#022c22";
      secondaryBg = "#064e3b";
      subtitleColor = "#a7f3d0";
    }

    bgGrad.addColorStop(0, primaryBg);
    bgGrad.addColorStop(1, secondaryBg);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 2. Draw Decorative BG Patterns
    if (config.bgPattern === "grid" || config.bgPattern === "circuit") {
      // Dotted Grid
      ctx.strokeStyle = config.themeColor === "minimal-white" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 44;
      for (let x = 0; x < WIDTH; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
      }
    }

    // Circuit board traces (tech-forward aesthetic)
    if (config.bgPattern === "circuit" || config.bgPattern === "polygons") {
      ctx.strokeStyle = accentColor;
      ctx.fillStyle = accentColor;
      
      // We draw repeatable mock circuit traces on the right and center-right areas
      const traces = [
        // Trace 1
        {
          points: [
            { x: 1100, y: 50 },
            { x: 1250, y: 50 },
            { x: 1300, y: 100 },
            { x: 1450, y: 100 }
          ],
          nodeSize: 4
        },
        // Trace 2
        {
          points: [
            { x: 1050, y: 220 },
            { x: 1150, y: 220 },
            { x: 1200, y: 170 },
            { x: 1350, y: 170 },
            { x: 1380, y: 200 }
          ],
          nodeSize: 3
        },
        // Trace 3
        {
          points: [
            { x: 1200, y: 350 },
            { x: 1300, y: 350 },
            { x: 1350, y: 300 },
            { x: 1500, y: 300 }
          ],
          nodeSize: 5
        },
        // Left-side light tech traces (only high up to clear profile picture area)
        {
          points: [
            { x: 100, y: 40 },
            { x: 250, y: 40 },
            { x: 290, y: 80 }
          ],
          nodeSize: 3
        }
      ];

      traces.forEach((trace, idx) => {
        ctx.beginPath();
        ctx.lineWidth = idx === 0 ? 1.5 : 1;
        // Fade lines using alpha
        ctx.strokeStyle = `${accentColor}${idx === 3 ? "22" : "33"}`;
        ctx.fillStyle = `${accentColor}${idx === 3 ? "33" : "55"}`;
        
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        ctx.stroke();

        // Draw node circles at ends
        const lastPt = trace.points[trace.points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPt.x, lastPt.y, trace.nodeSize, 0, Math.PI * 2);
        ctx.fill();

        const firstPt = trace.points[0];
        ctx.beginPath();
        ctx.arc(firstPt.x, firstPt.y, trace.nodeSize - 1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Drawing modern square tech structures on the right side (AI chip vibe)
      ctx.fillStyle = `${accentColor}11`;
      ctx.strokeStyle = `${accentColor}44`;
      ctx.lineWidth = 1;
      
      // Simulated chip on far right
      const chipX = 1350;
      const chipY = 80;
      const chipW = 150;
      const chipH = 150;
      
      ctx.fillRect(chipX, chipY, chipW, chipH);
      ctx.strokeRect(chipX, chipY, chipW, chipH);
      
      // Draw inner lines for the chip
      ctx.strokeRect(chipX + 15, chipY + 15, chipW - 30, chipH - 30);
      ctx.fillStyle = `${accentColor}22`;
      ctx.font = 'bold 24px "Space Grotesk", "Inter", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("AI", chipX + chipW / 2, chipY + chipH / 2 + 8);
      
      // Chip connectors
      ctx.strokeStyle = `${accentColor}38`;
      const connLength = 20;
      for (let i = 25; i < chipW; i += 30) {
        // Top connections
        ctx.beginPath();
        ctx.moveTo(chipX + i, chipY);
        ctx.lineTo(chipX + i, chipY - connLength);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(chipX + i, chipY - connLength, 2, 0, Math.PI * 2);
        ctx.fill();

        // Bottom connections
        ctx.beginPath();
        ctx.moveTo(chipX + i, chipY + chipH);
        ctx.lineTo(chipX + i, chipY + chipH + connLength);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(chipX + i, chipY + chipH + connLength, 2, 0, Math.PI * 2);
        ctx.fill();

        // Left connections
        ctx.beginPath();
        ctx.moveTo(chipX, chipY + i);
        ctx.lineTo(chipX - connLength, chipY + i);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(chipX - connLength, chipY + i, 2, 0, Math.PI * 2);
        ctx.fill();

        // Right connections
        ctx.beginPath();
        ctx.moveTo(chipX + chipW, chipY + i);
        ctx.lineTo(chipX + chipW + connLength, chipY + i);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(chipX + chipW + connLength, chipY + i, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (config.bgPattern === "waves" || config.bgPattern === "polygons") {
      // Smooth gradient waves
      ctx.strokeStyle = `${accentColor}11`;
      ctx.fillStyle = `${accentColor}0a`;
      ctx.lineWidth = 1;

      for (let offset = 0; offset < 120; offset += 30) {
        ctx.beginPath();
        ctx.moveTo(700, HEIGHT);
        ctx.bezierCurveTo(900, HEIGHT - 180 - offset, 1100, 100 - offset, WIDTH, HEIGHT - 50);
        ctx.lineTo(WIDTH, HEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Bento line separators (elegant grid boxes)
    if (config.bgPattern === "grid" && config.gridOverlay) {
      ctx.strokeStyle = config.themeColor === "minimal-white" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1.5;
      // Drawing horizontal split
      ctx.beginPath();
      ctx.moveTo(400, 260);
      ctx.lineTo(1150, 260);
      ctx.stroke();

      // Vertical split on left text area border
      ctx.beginPath();
      ctx.moveTo(400, 40);
      ctx.lineTo(400, 350);
      ctx.stroke();

      // Vertical split on right side
      ctx.beginPath();
      ctx.moveTo(1150, 40);
      ctx.lineTo(1150, 350);
      ctx.stroke();
    }

    // 3. Render Texts & Content
    // Font styling
    const sansFamily = config.fontFamily === "Space Grotesk" ? '"Space Grotesk", "Inter", sans-serif' : 
                       config.fontFamily === "JetBrains Mono" ? '"JetBrains Mono", monospace' : '"Inter", sans-serif';
    const serifFamily = '"Playfair Display", "Georgia", serif';
    const primaryFont = config.fontFamily === "editorial" ? serifFamily : sansFamily;

    // LEFT OFFSET CONFIGURATION (IMPORTANT SAFE-ZONE RECONCILIATION)
    // To accommodate the profile picture fully (on left on desktop, and central on mobile),
    // we push the main layout to the right. 
    // Left border boundary for text content = x = 450 (comfortably clears the 170px wide profile picture + offsets).
    // If the layout is centered, x is computed differently.
    const startX = 450;

    // A. User Name & Title
    ctx.textAlign = "left";
    
    // Name
    ctx.fillStyle = textColor;
    ctx.font = `bold 42px ${primaryFont}`;
    ctx.fillText(config.name, startX, 85);

    // Title / Specialty
    ctx.fillStyle = subtitleColor;
    ctx.font = `500 21px ${sansFamily}`;
    ctx.fillText(config.title, startX, 125);

    // B. Core Scaling Tagline (The highlight sentence)
    // Draw a nice subtle glow or accent bar next to the tagline
    ctx.fillStyle = accentColor;
    ctx.fillRect(startX, 155, 4, 34); // Accent bar on the left of tagline

    ctx.fillStyle = textColor;
    ctx.font = `italic 500 20px ${sansFamily}`;
    
    // Word wrap tagline if too long
    const maxTaglineWidth = 660;
    const taglineY = 180;
    const words = config.tagline.split(" ");
    let line = "";
    let lines = [];
    
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxTaglineWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Render lines (max 2)
    lines.slice(0, 2).forEach((taglineLine, idx) => {
      ctx.fillText(taglineLine, startX + 16, taglineY + (idx * 28));
    });

    // C. Sub-specialties / subtitle
    if (config.subTitle) {
      ctx.fillStyle = `${textColor}dd`;
      ctx.font = `400 15px ${sansFamily}`;
      ctx.fillText(config.subTitle, startX + 16, taglineY + (lines.slice(0, 2).length * 28) + 8);
    }

    // D. Tech Badges / Skills Pills
    // Positioned horizontally below the tagline
    const badgeStartY = 285;
    let currentX = startX;
    
    ctx.font = `bold 13px ${sansFamily}`;
    
    config.skills.forEach((skill) => {
      const textWidth = ctx.measureText(skill).width;
      const padX = 14;
      const padY = 8;
      const bWidth = textWidth + padX * 2;
      const bHeight = 28;

      // Wrap check
      if (currentX + bWidth > 1120) {
        // Drop down or stop
        return;
      }

      // Draw rounded pill container
      ctx.fillStyle = config.themeColor === "minimal-white" ? "rgba(15, 23, 42, 0.05)" : "rgba(56, 189, 248, 0.08)";
      ctx.strokeStyle = config.themeColor === "minimal-white" ? "rgba(15, 23, 42, 0.12)" : `${accentColor}33`;
      ctx.lineWidth = 1;
      
      // Draw rounded rectangle manually for compatibility
      const radius = 14;
      ctx.beginPath();
      ctx.moveTo(currentX + radius, badgeStartY);
      ctx.lineTo(currentX + bWidth - radius, badgeStartY);
      ctx.quadraticCurveTo(currentX + bWidth, badgeStartY, currentX + bWidth, badgeStartY + radius);
      ctx.lineTo(currentX + bWidth, badgeStartY + bHeight - radius);
      ctx.quadraticCurveTo(currentX + bWidth, badgeStartY + bHeight, currentX + bWidth - radius, badgeStartY + bHeight);
      ctx.lineTo(currentX + radius, badgeStartY + bHeight);
      ctx.quadraticCurveTo(currentX, badgeStartY + bHeight, currentX, badgeStartY + bHeight - radius);
      ctx.lineTo(currentX, badgeStartY + radius);
      ctx.quadraticCurveTo(currentX, badgeStartY, currentX + radius, badgeStartY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw skill text
      ctx.fillStyle = config.themeColor === "minimal-white" ? "#0f172a" : accentColor;
      ctx.textAlign = "center";
      ctx.fillText(skill, currentX + bWidth / 2, badgeStartY + 18);

      currentX += bWidth + 10; // offset for next pill
    });

    // E. Highlights / Certifications Panel (Right side, bento block, nice and clean)
    // Draw 3 statistics/focus callouts
    const bentoX = 1150;
    const bentoStartY = 60;
    const bentoSpacing = 100;
    
    if (config.highlights && config.highlights.length > 0) {
      // Draw bounding container
      ctx.strokeStyle = config.themeColor === "minimal-white" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)";
      ctx.fillStyle = config.themeColor === "minimal-white" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.01)";
      ctx.lineWidth = 1;
      
      const boxW = 390;
      const boxH = 310;
      
      // Draw thin container box
      ctx.beginPath();
      const bRad = 12;
      ctx.moveTo(bentoX + bRad, bentoStartY);
      ctx.lineTo(bentoX + boxW - bRad, bentoStartY);
      ctx.quadraticCurveTo(bentoX + boxW, bentoStartY, bentoX + boxW, bentoStartY + bRad);
      ctx.lineTo(bentoX + boxW, bentoStartY + boxH - bRad);
      ctx.quadraticCurveTo(bentoX + boxW, bentoStartY + boxH, bentoX + boxW - bRad, bentoStartY + boxH);
      ctx.lineTo(bentoX + bRad, bentoStartY + boxH);
      ctx.quadraticCurveTo(bentoX, bentoStartY + boxH, bentoX, bentoStartY + boxH - bRad);
      ctx.lineTo(bentoX, bentoStartY + bRad);
      ctx.quadraticCurveTo(bentoX, bentoStartY, bentoX + bRad, bentoStartY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Heading inside bento
      ctx.fillStyle = subtitleColor;
      ctx.font = `bold 12px ${sansFamily}`;
      ctx.textAlign = "left";
      ctx.fillText("ENGINEERING PROFILE HIGHLIGHTS", bentoX + 24, bentoStartY + 30);

      // Render highlights list
      config.highlights.forEach((highlight, hIdx) => {
        const itemY = bentoStartY + 64 + (hIdx * 74);
        
        // Draw small accent dot or bullet icon
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(bentoX + 30, itemY + 22, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = subtitleColor;
        ctx.font = `500 13px ${sansFamily}`;
        ctx.textAlign = "left";
        ctx.fillText(highlight.label.toUpperCase(), bentoX + 46, itemY + 16);

        // Value
        ctx.fillStyle = textColor;
        ctx.font = `bold 19px ${sansFamily}`;
        ctx.fillText(highlight.value, bentoX + 46, itemY + 40);

        // Divider
        if (hIdx < config.highlights.length - 1) {
          ctx.strokeStyle = config.themeColor === "minimal-white" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)";
          ctx.beginPath();
          ctx.moveTo(bentoX + 24, itemY + 58);
          ctx.lineTo(bentoX + boxW - 24, itemY + 58);
          ctx.stroke();
        }
      });
    }

    // F. Footer Contact Details (Email / Location)
    const footerY = 360;
    ctx.textAlign = "left";
    ctx.font = `500 13px ${sansFamily}`;
    
    // Draw email
    if (config.email) {
      ctx.fillStyle = subtitleColor;
      ctx.fillText("CONTACT / RECRUITMENT:", startX, footerY);
      
      ctx.fillStyle = textColor;
      ctx.font = `bold 13px ${sansFamily}`;
      ctx.fillText(config.email, startX + 175, footerY);
    }

    // Draw location
    if (config.location) {
      ctx.fillStyle = subtitleColor;
      ctx.font = `500 13px ${sansFamily}`;
      const emailWidth = ctx.measureText(config.email).width;
      const locStartX = startX + 175 + emailWidth + 36;
      
      ctx.fillText("LOCATION:", locStartX, footerY);
      ctx.fillStyle = textColor;
      ctx.font = `bold 13px ${sansFamily}`;
      ctx.fillText(config.location, locStartX + 80, footerY);
    }

    // 4. Draw Safe Zone overlay IF enabled AND NOT exporting!
    // This highlights the circular area covered by LinkedIn profile picture.
    // It's exceptionally useful so they don't overlay texts here.
    if (config.showProfileSafeZone && !isExporting) {
      ctx.save();
      
      let centerX = 150;
      let centerY = 396; // Overlap bottom edge
      let radius = 100; // 200px diameter on high-res canvas

      if (config.safeZoneDevice === "mobile") {
        centerX = 200;
        centerY = 260; // Shifts higher and more centered
        radius = 90;
      }

      // Draw semi-transparent safe-zone backdrop
      ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 6]);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Add "Covered by Profile Photo" label
      ctx.fillStyle = "#ef4444";
      ctx.setLineDash([]); // Reset dash
      ctx.font = `bold 11px ${sansFamily}`;
      ctx.textAlign = "center";
      ctx.fillText("AVATAR OVERLAP", centerX, centerY - 10);
      ctx.fillText("SAFE ZONE", centerX, centerY + 8);

      ctx.restore();
    }
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create an offline high-res canvas specifically for drawing the export
    // to guarantee no overlay or visual grid elements are included in the downloaded PNG.
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = WIDTH;
    exportCanvas.height = HEIGHT;
    const exportCtx = exportCanvas.getContext("2d");

    if (exportCtx) {
      // Draw without safe-zones
      drawCanvas(exportCtx, true);

      // Create download link
      const imageURL = exportCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `linkedin_cover_${config.name.toLowerCase().replace(/\s+/g, "_")}.png`;
      link.href = imageURL;
      link.click();
    }
  };

  useEffect(() => {
    if (onExportRef) {
      onExportRef(handleExport);
    }
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the active state
    drawCanvas(ctx, false);
  }, [config]);

  return (
    <div className={`relative ${className}`} id="canvas-container">
      {/* Container wrapper that maintains the exact 4:1 LinkedIn Aspect Ratio */}
      <div className="w-full aspect-[4/1] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="w-full h-full object-cover block"
        />
      </div>
    </div>
  );
}
