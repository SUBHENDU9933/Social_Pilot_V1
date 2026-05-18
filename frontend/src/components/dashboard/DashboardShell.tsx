"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PenLine,
  ListOrdered,
  Calendar,
  BarChart3,
  Network,
  Users,
  Settings,
  Plane,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NAV = [
  { href: "/dashboard", label: "Today", icon: LayoutDashboard, testid: "nav-today" },
  { href: "/composer", label: "Compose", icon: PenLine, testid: "nav-compose" },
  { href: "/queue", label: "Queue", icon: ListOrdered, testid: "nav-queue" },
  { href: "/calendar", label: "Calendar", icon: Calendar, testid: "nav-calendar" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, testid: "nav-analytics" },
  { href: "/channels", label: "Channels", icon: Network, testid: "nav-channels" },
  { href: "/team", label: "Team", icon: Users, testid: "nav-team" },
  { href: "/settings", label: "Settings", icon: Settings, testid: "nav-settings" },
];

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { email: string; name?: string | null; avatar?: string | null } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Signed out");
      router.push("/auth/login");
      router.refresh();
    } catch {
      toast.error("Could not sign out");
    }
  }

  const initials = (user?.name || user?.email || "P P")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen flex bg-[#081826] text-[#DDEBFF]" data-testid="dashboard-shell">
      {/* Sidebar */}
      <aside
        className={cn(
          "shrink-0 border-r border-[#4DA8FF]/10 bg-[#081826] transition-[width] duration-300",
          collapsed ? "w-16" : "w-64",
        )}
        data-testid="sidebar"
      >
        <div className="h-16 flex items-center px-4 border-b border-[#4DA8FF]/10">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#FF7A1A] grid place-items-center shrink-0">
              <Plane className="w-4 h-4 text-white -rotate-45" />
            </div>
            {!collapsed && (
              <span className="font-sora font-extrabold text-sm whitespace-nowrap">
                PostPilot<span className="text-[#FF7A1A]">.</span>AI
              </span>
            )}
          </Link>
        </div>

        <nav className="p-3 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={item.testid}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-[#12283D] text-[#FF7A1A]"
                    : "text-[#DDEBFF]/70 hover:bg-[#12283D]/60 hover:text-[#DDEBFF]",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {active && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-3 right-3" style={{ position: "absolute" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs text-[#DDEBFF]/50 hover:text-[#DDEBFF] hover:bg-[#12283D]/60"
            data-testid="sidebar-collapse"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <><ChevronLeft className="w-3.5 h-3.5" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 border-b border-[#4DA8FF]/10 px-6 flex items-center gap-4 sticky top-0 z-30 bg-[#081826]/90 backdrop-blur-md"
          data-testid="dashboard-topbar"
        >
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4DA8FF]" />
            <input
              type="text"
              placeholder="Search posts, channels, members…"
              className="w-full h-10 pl-9 pr-3 rounded-md bg-[#12283D] border border-[#4DA8FF]/10 text-sm text-[#DDEBFF] placeholder:text-[#DDEBFF]/40 focus:outline-none focus:border-[#4DA8FF]/40"
              data-testid="topbar-search"
            />
          </div>

          <Link href="/composer">
            <button
              className="hidden md:inline-flex h-10 px-4 rounded-md bg-[#FF7A1A] text-white text-sm font-semibold items-center gap-2 hover:bg-[#FF7A1A]/90"
              data-testid="topbar-new-post"
            >
              <PenLine className="w-4 h-4" /> New post
            </button>
          </Link>

          <button
            className="w-10 h-10 rounded-md border border-[#4DA8FF]/15 grid place-items-center text-[#DDEBFF]/70 hover:text-[#DDEBFF] hover:bg-[#12283D]"
            data-testid="topbar-notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2" data-testid="topbar-user-menu">
                <Avatar className="w-9 h-9">
                  {user?.avatar && <AvatarImage src={user.avatar} alt={user?.name || ""} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="text-sm text-[#DDEBFF]">{user?.name || "Pilot"}</p>
                <p className="text-xs text-[#DDEBFF]/50 normal-case tracking-normal">
                  {user?.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")} data-testid="usermenu-settings">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} data-testid="usermenu-logout">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-6 lg:p-8" data-testid="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
