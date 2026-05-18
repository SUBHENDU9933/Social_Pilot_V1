import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  const userPayload = user
    ? {
        email: user.email || "",
        name: (user.user_metadata as { full_name?: string })?.full_name || null,
        avatar: (user.user_metadata as { avatar_url?: string })?.avatar_url || null,
      }
    : { email: "preview@postpilot.ai", name: "Preview Pilot", avatar: null };

  return <DashboardShell user={userPayload}>{children}</DashboardShell>;
}
