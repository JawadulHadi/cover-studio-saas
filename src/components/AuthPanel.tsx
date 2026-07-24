import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { LogIn, LogOut, Loader2, Mail, Lock, X, UserCircle2 } from "lucide-react";

type Mode = "sign-in" | "sign-up";

const inputCls =
  "w-full bg-app border border-line focus:border-brand rounded-lg pl-9 pr-3 py-2 text-xs text-ink placeholder-faint focus:ring-1 focus:ring-brand transition-all outline-none";

export default function AuthPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: authError } =
      mode === "sign-up"
        ? await supabase!.auth.signUp({
            email,
            password,
            // Consent is stored in user metadata and copied into the leads
            // table by a DB trigger (see supabase/migrations/0001_leads_marketing.sql).
            options: { data: { marketing_consent: marketingConsent } },
          })
        : await supabase!.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    } else if (mode === "sign-up") {
      setMessage("Check your inbox to confirm your account.");
    } else {
      setPanelOpen(false);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase!.auth.signOut();
    setPanelOpen(false);
  };

  if (session) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised border border-line text-[10px] font-mono font-semibold text-muted">
          <UserCircle2 className="w-3.5 h-3.5 text-brand" />
          {session.user.email}
        </div>
        <button
          onClick={handleSignOut}
          className="px-3 py-1.5 rounded-lg border border-line hover:bg-raised text-xs text-muted hover:text-ink font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setPanelOpen((v) => !v)}
        className="px-3 py-1.5 rounded-lg border border-line hover:bg-raised text-xs text-muted hover:text-ink font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>

      {panelOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-72 bg-surface border border-line rounded-xl p-4 shadow-2xl z-50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
              {mode === "sign-in" ? "Sign In" : "Create Account"}
            </h4>
            <button onClick={() => setPanelOpen(false)} className="text-faint hover:text-ink cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputCls}
              />
            </div>

            {mode === "sign-up" && (
              <label className="flex items-start gap-2 cursor-pointer select-none pt-0.5">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 accent-brand cursor-pointer"
                />
                <span className="text-[10px] text-muted leading-snug">
                  I'd like to receive occasional product updates and tips from Qeloma. You can unsubscribe anytime.
                </span>
              </label>
            )}

            {error && <p className="text-[11px] text-mark">{error}</p>}
            {message && <p className="text-[11px] text-emerald-500">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand hover:opacity-90 text-on-brand font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : mode === "sign-in" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <button
            onClick={() => {
              setMode(mode === "sign-in" ? "sign-up" : "sign-in");
              setError(null);
              setMessage(null);
            }}
            className="w-full text-center text-[10px] text-faint hover:text-ink transition-all cursor-pointer"
          >
            {mode === "sign-in" ? "No account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      )}
    </div>
  );
}
