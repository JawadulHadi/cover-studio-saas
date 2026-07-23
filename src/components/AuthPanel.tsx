import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { LogIn, LogOut, Loader2, Mail, Lock, X, UserCircle2 } from "lucide-react";

type Mode = "sign-in" | "sign-up";

export default function AuthPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

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
    await supabase.auth.signOut();
    setPanelOpen(false);
  };

  if (session) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050505]/60 border border-[#111] text-[10px] font-mono font-semibold text-[#888]">
          <UserCircle2 className="w-3.5 h-3.5 text-blue-400" />
          {session.user.email}
        </div>
        <button
          onClick={handleSignOut}
          className="px-3 py-1.5 rounded-lg border border-[#1a1a1a] hover:bg-[#111] text-xs text-[#c5c5c5] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-[#888]" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setPanelOpen((v) => !v)}
        className="px-3 py-1.5 rounded-lg border border-[#1a1a1a] hover:bg-[#111] text-xs text-[#c5c5c5] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5 text-[#888]" />
        <span>Sign In</span>
      </button>

      {panelOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-72 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 shadow-2xl z-50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {mode === "sign-in" ? "Sign In" : "Create Account"}
            </h4>
            <button onClick={() => setPanelOpen(false)} className="text-[#555] hover:text-[#c5c5c5] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-[#e5e5e5] placeholder-[#444] focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-[#e5e5e5] placeholder-[#444] focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              />
            </div>

            {error && <p className="text-[11px] text-red-400">{error}</p>}
            {message && <p className="text-[11px] text-emerald-400">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
            className="w-full text-center text-[10px] text-[#666] hover:text-[#c5c5c5] transition-all cursor-pointer"
          >
            {mode === "sign-in" ? "No account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      )}
    </div>
  );
}
