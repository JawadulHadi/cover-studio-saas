<div align="center">

# Qeloma Cover Studio

**Design high-end, minimalist LinkedIn cover banners for any profession — with an AI copywriting assistant, safe-zone guides, and one-click high-res export.**

React 19 · Vite · Express · Google Gemini · Supabase

</div>

---

## What it is

Qeloma Cover Studio is a browser-based design tool for creating the 1584×396 banner
image that sits at the top of a LinkedIn profile. You fill in your details, pick a
theme, and the app renders a pixel-perfect banner on an HTML canvas that you can
download as a high-resolution PNG. An optional AI assistant (Google Gemini) drafts
taglines, skill badges, and sub-specialties tailored to whatever role you type in.

Everything renders **client-side** — the banner never leaves your browser — so the
app stays fast and cheap to host.

## Features

- **Live canvas editor** — name, title, tagline, subtitle, contact, skills, and
  three "bento" highlight cells, all rendered in real time at export resolution.
- **AI Personal Brand Writer** — describe your background and role (free text, any
  profession); Gemini returns tagline / skill / subtitle suggestions you can apply
  with one click.
- **Bring-your-own Gemini key** — paste your own API key (kept in your browser
  session only) so generation runs on your quota, not a shared one.
- **Themes & layout** — curated color presets, background patterns (grid, circuit,
  waves…), fonts, and accent color.
- **Images by URL** — set an avatar (preview), a logo (rendered on the banner), and
  a full background image, all via public URLs.
- **Safe-zone guides** — overlays showing where LinkedIn's avatar covers the banner
  on desktop and mobile, so your text never gets hidden.
- **Accounts** — email/password auth via Supabase, with an opt-in marketing consent
  captured at signup.

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript, Tailwind CSS v4, lucide-react icons |
| Build / dev server | Vite 6 (with an Express middleware server for the AI proxy) |
| AI | Google Gemini via `@google/genai` (server-side proxy + optional BYO key) |
| Auth & data | Supabase (`@supabase/supabase-js`, publishable-key client) |
| Rendering | HTML `<canvas>` → PNG (no server-side image processing) |

## Architecture

```
Browser (React)
  ├─ BannerCanvas    → draws the 1584×396 banner, exports PNG client-side
  ├─ EditorPanel     → Identity / Theme / Skills / Highlights / Images tabs
  ├─ AIHelper        → calls POST /api/gemini/generate (optional X-Gemini-Api-Key)
  └─ AuthPanel       → Supabase sign-up / sign-in / sign-out

server.ts (Express, dev via `tsx`, prod via bundled cjs)
  └─ POST /api/gemini/generate
        → uses the caller's key (header) if present, else the shared server key
        → returns { taglines, skills, subtitles }

Supabase
  ├─ Auth (email/password)
  └─ public.leads  → marketing opt-in, populated by a trigger on auth.users
```

## Getting started

**Prerequisites:** Node.js 20+ (22+ recommended).

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create your `.env`** (copy the template and fill in values):
   ```bash
   cp .env.example .env
   ```

   | Variable | Required | Notes |
   |----------|----------|-------|
   | `GEMINI_API_KEY` | optional | Shared server-side key. If omitted, users must bring their own key in the UI. Get one at <https://aistudio.google.com/apikey>. |
   | `VITE_SUPABASE_URL` | for auth | Your Supabase project URL. |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | for auth | The `sb_publishable_…` key. Safe to expose client-side. |
   | `SUPABASE_DB_URL` | for migrations | Server-side only. **Never** prefix with `VITE_`. |

   > `.env` is git-ignored. Only `.env.example` (placeholders) is committed.
   > Never commit real keys, the DB connection string, or personal data.

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000>.

## Supabase setup

1. Create a project at <https://supabase.com> and copy the **Project URL** and
   **publishable key** into `.env`.
2. Apply the leads migration. Because Supabase direct connections are IPv6-only,
   the simplest path is the dashboard:
   **SQL Editor → New query → paste the contents of
   [`supabase/migrations/0001_leads_marketing.sql`](supabase/migrations/0001_leads_marketing.sql)
   → Run.**
3. (Optional) In **Authentication → Providers**, keep "Confirm email" on for real
   launches, or turn it off for quick local testing.

The migration creates `public.leads` with Row Level Security (users can read only
their own row) and a `SECURITY DEFINER` trigger that copies each new signup —
including the marketing-consent flag — into the table.

## How the AI generation works

- The client sends the role, bio, title, current tagline, and tone to
  `POST /api/gemini/generate`.
- If the request includes an `X-Gemini-Api-Key` header (the user pasted their own
  key), the server uses that key for **that request only** — it is never logged or
  stored. Otherwise it falls back to the server's `GEMINI_API_KEY`.
- The role is free text and length-capped server-side; the prompt is built
  generically so the tool works for any profession, not just engineers.

## Scripts

| Script | Does |
|--------|------|
| `npm run dev` | Start the Express + Vite dev server on :3000 |
| `npm run build` | Build the client (`vite build`) and bundle the server |
| `npm run start` | Run the production server from `dist/` |
| `npm run lint` | `tsc --noEmit` type-check |

## Deployment (planned)

The client is fully static and the only backend is one AI proxy route, so the
intended zero-cost target is: static hosting (Cloudflare Pages / Vercel) + a
serverless function for `/api/gemini/generate`. Most generation cost stays at $0
because users can bring their own Gemini key.

## Privacy & security notes

- No banner data is sent to a server — rendering and PNG export are client-side.
- Secrets come from environment variables only; `.env` is git-ignored.
- Marketing consent is explicit opt-in (unchecked by default) per GDPR / PDPA.
- Demo data in the app is fictional — no real personal information is committed.

---

<div align="center">
Built by <strong>Qeloma</strong> · Powered by Google Gemini
</div>
