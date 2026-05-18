"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. Signing you in…");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md" data-testid="reset-password-page">
      <h1 className="font-sora text-3xl font-black tracking-tight text-[#0F2D52]">
        Pick a new password
      </h1>
      <p className="mt-2 text-[#0F2D52]/65">Choose something strong (and memorable).</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            placeholder="At least 8 characters"
            data-testid="reset-password-input"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading} data-testid="reset-submit">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Update password
        </Button>
      </form>
    </div>
  );
}
