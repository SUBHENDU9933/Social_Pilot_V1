"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PenLine,
  ListOrdered,
  Calendar,
  Network,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Plus,
  LogOut,
  ChevronDown,
  Home,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: Home, testid: "nav-dashboard" },
  { href: "/composer", label: "Compose", icon: PenLine, testid: "nav-compose" },
  { href: "/queue", label: "Queue", icon: ListOrdered, testid: "nav-queue" },
  { href: "/calendar", label: "Calendar", icon: Calendar, testid: "nav-calendar" },
  { href: "/channels", label: "Channels", icon: Network, testid: "nav-channels" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, testid: "nav-analytics" },
  { href: "/team", label: "Team", icon: Users, testid: "nav-team" },
  { href: "/settings", label: "Settings", icon: Settings, testid: "nav-settings" },
];

const MOBILE_NAV = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/composer", label: "Compose", icon: PenLine },
  { href: "/queue", label: "Queue", icon: ListOrdered },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/settings", label: "More", icon: Settings },
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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Signed out");
    router.push("/auth/login");
    router.refresh();
  }

  const initials = (user?.name || user?.email || "P P")
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const displayName = user?.name || user?.email?.split("@")[0] || "Pilot";

  return (
    <div className="min-h-screen flex bg-background text-foreground" data-testid="dashboard-shell">
      {/* Sidebar — desktop */}
      <aside
        className="hidden lg:flex w-64 shrink-0 border-r border-border bg-card flex-col"
        data-testid="sidebar"
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand grid place-items-center shadow-glow">
              <svg className="w-5 h-5 text-white -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L4 20 L12 16 L20 20 Z" />
              </svg>
            </div>
            <span className="font-sora font-extrabold text-base text-foreground">PostPilot AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={item.testid}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-brand-50 text-brand"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0", active && "text-brand")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Upgrade card + Profile */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Crown className="w-4 h-4 text-warning" />
              Your trial ends in 14 days
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Upgrade to unlock more powerful features.
            </p>
            <Button size="sm" className="w-full mt-3" data-testid="sidebar-upgrade">
              Upgrade Now
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition-colors"
                data-testid="sidebar-profile"
              >
                <Avatar className="w-9 h-9">
                  {user?.avatar && <AvatarImage src={user.avatar} alt={displayName} />}
                  <AvatarFallback className="bg-brand text-white text-xs">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} data-testid="usermenu-logout">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8">
          <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand grid place-items-center">
              <svg className="w-4 h-4 text-white -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L4 20 L12 16 L20 20 Z" />
              </svg>
            </div>
            <span className="font-sora font-extrabold text-sm">PostPilot AI</span>
          </Link>

          <div className="flex-1 max-w-xl hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts, channels, analytics..."
              className="w-full h-10 pl-9 pr-12 rounded-lg bg-secondary/50 border border-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card focus:border-border transition"
              data-testid="topbar-search"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center h-6 px-2 rounded text-xs text-muted-foreground bg-card border border-border font-mono">
              ⌘K
            </kbd>
          </div>

          <div className="flex-1 md:hidden" />

          <Link href="/composer">
            <Button size="sm" className="h-10 px-4" data-testid="topbar-new-post">
              <Plus className="w-4 h-4 mr-1.5" /> New Post
            </Button>
          </Link>

          <button
            className="relative w-10 h-10 rounded-lg border border-border bg-card hover:bg-secondary grid place-items-center"
            data-testid="topbar-notifications"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand text-[10px] text-white font-bold grid place-items-center">3</span>
          </button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 lg:hidden" data-testid="topbar-user-menu">
                <Avatar className="w-9 h-9">
                  {user?.avatar && <AvatarImage src={user.avatar} alt={displayName} />}
                  <AvatarFallback className="bg-brand text-white text-xs">{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden" data-testid="dashboard-main">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-card/95 backdrop-blur-md grid grid-cols-5 h-16">
          {MOBILE_NAV.map((it) => {
            const active = pathname === it.href || (it.href !== "/dashboard" && pathname.startsWith(it.href));
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-[10px] font-medium",
                  active ? "text-brand" : "text-muted-foreground",
                )}
              >
                <it.icon className="w-5 h-5" />
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
