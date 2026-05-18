"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Mail, ShieldCheck, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";
type Member = { email: string; name: string; role: Role; status: "active" | "pending" };

const ROLES: Role[] = ["Owner", "Admin", "Editor", "Viewer"];

const INITIAL: Member[] = [
  { email: "amelia@northwind.com", name: "Amelia Earhart", role: "Owner", status: "active" },
  { email: "marcus@northwind.com", name: "Marcus Chen", role: "Admin", status: "active" },
  { email: "aisha@northwind.com", name: "Aisha Patel", role: "Editor", status: "active" },
  { email: "junior@northwind.com", name: "Junior Marketer", role: "Viewer", status: "pending" },
];

export function TeamView() {
  const [members, setMembers] = useState<Member[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Editor");

  function invite() {
    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    setMembers([
      ...members,
      { email, name: email.split("@")[0], role, status: "pending" },
    ]);
    setEmail("");
    setRole("Editor");
    setOpen(false);
    toast.success(`Invite sent to ${email}`);
  }

  function changeRole(emailKey: string, r: Role) {
    setMembers(members.map((m) => (m.email === emailKey ? { ...m, role: r } : m)));
    toast.success("Role updated");
  }

  function remove(emailKey: string) {
    setMembers(members.filter((m) => m.email !== emailKey));
    toast.success("Member removed");
  }

  return (
    <div className="space-y-6" data-testid="team-view">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">Flight Crew</p>
          <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">Team</h1>
          <p className="text-[#DDEBFF]/65 text-sm mt-1">
            Manage roles, draft approvals, and seats.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="team-invite-button">
              <Plus className="w-4 h-4 mr-1.5" /> Invite member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a teammate</DialogTitle>
              <DialogDescription>They'll get an email with a sign-up link.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="invite-email" className="text-[#DDEBFF]">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#081826] text-[#DDEBFF] border-[#4DA8FF]/20"
                  placeholder="teammate@brand.com"
                  data-testid="team-invite-email"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#DDEBFF]">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROLES.filter((r) => r !== "Owner").map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={invite} data-testid="team-invite-submit">
                <Mail className="w-4 h-4 mr-1.5" /> Send invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-[#4DA8FF]/15 bg-[#12283D]">
        <div className="px-6 py-4 border-b border-[#4DA8FF]/10 text-[10px] uppercase tracking-[0.25em] text-[#4DA8FF] font-bold grid grid-cols-12 gap-4">
          <span className="col-span-5">Member</span>
          <span className="col-span-3">Role</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>
        <div className="divide-y divide-[#4DA8FF]/10">
          {members.map((m) => (
            <div
              key={m.email}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center"
              data-testid={`team-row-${m.email}`}
            >
              <div className="col-span-5 flex items-center gap-3 min-w-0">
                <Avatar>
                  <AvatarFallback>
                    {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{m.name}</p>
                  <p className="text-xs text-[#DDEBFF]/50 truncate">{m.email}</p>
                </div>
              </div>
              <div className="col-span-3">
                {m.role === "Owner" ? (
                  <Badge variant="accent">
                    <Crown className="w-3 h-3 mr-1" /> Owner
                  </Badge>
                ) : (
                  <Select value={m.role} onValueChange={(v) => changeRole(m.email, v as Role)}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ROLES.filter((r) => r !== "Owner").map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="col-span-2">
                {m.status === "active" ? (
                  <Badge variant="success">Active</Badge>
                ) : (
                  <Badge variant="warning">Pending</Badge>
                )}
              </div>
              <div className="col-span-2 text-right">
                {m.role !== "Owner" && (
                  <button
                    onClick={() => remove(m.email)}
                    className="w-8 h-8 grid place-items-center rounded text-red-400 hover:bg-red-500/10 ml-auto"
                    data-testid={`team-remove-${m.email}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
