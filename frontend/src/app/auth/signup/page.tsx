"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan") || "free";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, signup_plan: plan },
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/onboarding`,
        },
      });
      if (error) throw error;
      setSuccess(true);
      toast.success("Account created! Check your email to confirm.");
    } catch (err: any) {
      toast.error(err?.message || "Sign-up failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/onboarding`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message || "Google sign-up failed.");
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center" data-testid="signup-success">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 grid place-items-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="font-sora text-2xl font-bold text-[#0F2D52] mt-4">
          Almost ready for takeoff
        </h1>
        <p className="text-[#0F2D52]/70 mt-2">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your cockpit.
        </p>
        <Link href="/auth/login" className="mt-6 inline-block text-[#FF7A1A] font-semibold">
          Back to sign-in →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md" data-testid="signup-page">
      <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
        Plan: {plan}
      </p>
      <h1 className="font-sora text-3xl md:text-4xl font-black tracking-tight text-[#0F2D52] mt-1">
        Create your cockpit.
      </h1>
      <p className="mt-2 text-[#0F2D52]/65">
        14-day free trial. No credit card required.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amelia Earhart"
            required
            data-testid="signup-name-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="captain@brand.com"
            required
            data-testid="signup-email-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            minLength={8}
            required
            data-testid="signup-password-input"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading} data-testid="signup-submit">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Create account
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6 text-xs text-[#0F2D52]/40 uppercase tracking-[0.2em]">
        <div className="flex-1 h-px bg-[#0F2D52]/10" /> or <div className="flex-1 h-px bg-[#0F2D52]/10" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogle} data-testid="signup-google">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.24 1.43-1.65 4.2-5.5 4.2-3.31 0-6-2.74-6-6.1S8.69 6.1 12 6.1c1.88 0 3.14.8 3.86 1.5l2.63-2.54C16.83 3.55 14.6 2.6 12 2.6 6.99 2.6 2.95 6.64 2.95 11.65S6.99 20.7 12 20.7c6.94 0 9.32-4.87 9.32-7.4 0-.5-.05-.89-.12-1.27H12z"
          />
        </svg>
        Continue with Google
      </Button>

      <p className="mt-6 text-sm text-[#0F2D52]/65 text-center">
        Already a pilot?{" "}
        <Link href="/auth/login" className="text-[#FF7A1A] font-semibold" data-testid="signup-to-login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
