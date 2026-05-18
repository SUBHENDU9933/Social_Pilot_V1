"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save, User, Briefcase, ShieldCheck, Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PLANS } from "@/components/marketing/sections/PricingPreview";

export function SettingsView() {
  const [profile, setProfile] = useState({
    name: "Amelia Earhart",
    email: "amelia@northwind.com",
    title: "Head of Marketing",
    bio: "Marketing operator. PostPilot Captain.",
  });
  const [workspace, setWorkspace] = useState({
    name: "Northwind Co.",
    slug: "northwind",
    timezone: "Europe/Berlin",
  });
  const [notifications, setNotifications] = useState({
    publishSuccess: true,
    publishFailure: true,
    teamActivity: true,
    weeklyDigest: false,
  });

  return (
    <div className="space-y-6" data-testid="settings-view">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent-blue font-bold">Cockpit Config</p>
        <h1 className="font-sora text-3xl md:text-4xl font-black mt-1">Settings</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" data-testid="settings-tab-profile">
            <User className="w-3.5 h-3.5 mr-1.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="workspace" data-testid="settings-tab-workspace">
            <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Workspace
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="settings-tab-security">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="settings-tab-notifications">
            <Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" data-testid="settings-tab-billing">
            <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card title="Your profile">
            <Row>
              <Field label="Full name">
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-secondary/40 text-foreground border-border"
                  data-testid="profile-name"
                />
              </Field>
              <Field label="Title">
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="bg-secondary/40 text-foreground border-border"
                />
              </Field>
            </Row>
            <Field label="Email">
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-secondary/40 text-foreground border-border"
              />
            </Field>
            <Field label="Bio">
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-secondary/40 text-foreground border-border"
                rows={3}
              />
            </Field>
            <SaveBtn onClick={() => toast.success("Profile saved")} />
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card title="Workspace">
            <Row>
              <Field label="Workspace name">
                <Input
                  value={workspace.name}
                  onChange={(e) => setWorkspace({ ...workspace, name: e.target.value })}
                  className="bg-secondary/40 text-foreground border-border"
                  data-testid="workspace-name"
                />
              </Field>
              <Field label="URL slug">
                <Input
                  value={workspace.slug}
                  onChange={(e) => setWorkspace({ ...workspace, slug: e.target.value })}
                  className="bg-secondary/40 text-foreground border-border"
                />
              </Field>
            </Row>
            <Field label="Default timezone">
              <Input
                value={workspace.timezone}
                onChange={(e) => setWorkspace({ ...workspace, timezone: e.target.value })}
                className="bg-secondary/40 text-foreground border-border"
              />
            </Field>
            <SaveBtn onClick={() => toast.success("Workspace updated")} />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card title="Security">
            <Field label="Current password">
              <Input type="password" className="bg-secondary/40 text-foreground border-border" />
            </Field>
            <Field label="New password">
              <Input type="password" className="bg-secondary/40 text-foreground border-border" />
            </Field>
            <Separator />
            <ToggleRow
              label="Two-factor authentication"
              desc="Require an authenticator code when signing in."
              defaultChecked={false}
            />
            <ToggleRow
              label="Single Sign-On (SSO)"
              desc="Available on Agency plans. Reach out to enable SAML SSO."
              defaultChecked={false}
              disabled
            />
            <SaveBtn onClick={() => toast.success("Security settings updated")} />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card title="Notifications">
            {Object.entries(notifications).map(([key, value]) => (
              <ToggleRow
                key={key}
                label={key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                defaultChecked={value}
                onCheckedChange={(v) => setNotifications({ ...notifications, [key]: v })}
              />
            ))}
            <SaveBtn onClick={() => toast.success("Preferences saved")} />
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card title="Current plan">
            <p className="text-muted-foreground text-sm">
              You're on the <span className="text-brand font-semibold">Team</span> plan. Next invoice on Mar 12, 2026 for <span className="font-mono">$65.00</span>.
            </p>
            <Separator />
            <div className="grid md:grid-cols-4 gap-3 mt-2">
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-lg border p-4 ${
                    p.name === "Team" ? "border-brand bg-brand/5" : "border-border"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-blue">{p.name}</p>
                  <p className="font-sora text-2xl font-black mt-1">{p.price}<span className="text-sm text-muted-foreground">{p.period}</span></p>
                  <Button
                    size="sm"
                    variant={p.name === "Team" ? "default" : "darkOutline"}
                    className="w-full mt-3"
                  >
                    {p.name === "Team" ? "Current" : `Switch to ${p.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h2 className="font-sora font-bold">{title}</h2>
      <Separator />
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-foreground">{label}</Label>
      {children}
    </div>
  );
}
function ToggleRow({
  label,
  desc,
  defaultChecked,
  disabled,
  onCheckedChange,
}: {
  label: string;
  desc?: string;
  defaultChecked: boolean;
  disabled?: boolean;
  onCheckedChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium">{label}</p>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </div>
      <Switch
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} data-testid="settings-save">
        <Save className="w-4 h-4 mr-1.5" /> Save changes
      </Button>
    </div>
  );
}
