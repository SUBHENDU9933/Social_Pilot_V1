"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");
      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Sign-in failed. Check your credentials.");
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
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirect)}`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message || "Google sign-in failed.");
    }
  }

  return (
    <div className="w-full max-w-md" data-testid="login-page">
      <h1 className="font-sora text-3xl md:text-4xl font-black tracking-tight text-[#0F2D52]">
        Welcome back.
      </h1>
      <p className="mt-2 text-[#0F2D52]/65">
        Sign in to your cockpit and continue flying.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="captain@brand.com"
            data-testid="login-email-input"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-[#4DA8FF] hover:underline"
              data-testid="login-forgot-link"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            data-testid="login-password-input"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading} data-testid="login-submit">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6 text-xs text-[#0F2D52]/40 uppercase tracking-[0.2em]">
        <div className="flex-1 h-px bg-[#0F2D52]/10" /> or <div className="flex-1 h-px bg-[#0F2D52]/10" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogle} data-testid="login-google">
        <GoogleIcon className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>

      <p className="mt-6 text-sm text-[#0F2D52]/65 text-center">
        New pilot?{" "}
        <Link href="/auth/signup" className="text-[#FF7A1A] font-semibold" data-testid="login-to-signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.43-1.65 4.2-5.5 4.2-3.31 0-6-2.74-6-6.1S8.69 6.1 12 6.1c1.88 0 3.14.8 3.86 1.5l2.63-2.54C16.83 3.55 14.6 2.6 12 2.6 6.99 2.6 2.95 6.64 2.95 11.65S6.99 20.7 12 20.7c6.94 0 9.32-4.87 9.32-7.4 0-.5-.05-.89-.12-1.27H12z"
      />
    </svg>
  );
}
