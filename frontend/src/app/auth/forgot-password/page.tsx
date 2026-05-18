"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Reset email sent if the address exists.");
    } catch (err: any) {
      toast.error(err?.message || "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md" data-testid="forgot-password-page">
      <h1 className="font-sora text-3xl font-black tracking-tight text-[#0F2D52]">
        Forgot your password?
      </h1>
      <p className="mt-2 text-[#0F2D52]/65">
        No problem. Enter your email and we'll send a reset link.
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
            placeholder="you@brand.com"
            data-testid="forgot-email-input"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || sent} data-testid="forgot-submit">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {sent ? "Email sent ✓" : "Send reset link"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-[#0F2D52]/65 text-center">
        Back to{" "}
        <Link href="/auth/login" className="text-[#FF7A1A] font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
