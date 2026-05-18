-- =========================================================
-- PostPilot AI — Supabase migration (Phase 1)
--
-- Run inside Supabase SQL Editor or via the CLI:
--   supabase db push   (after linking project)
--
-- Structure:
--   PART 1  CREATE all tables (no policies yet)
--   PART 2  ENABLE row level security + ADD policies
--   PART 3  AUTO-PROVISION profile + workspace on signup
-- =========================================================

create extension if not exists "uuid-ossp";

-- =========================================================
-- PART 1 — TABLES
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  created_at timestamptz default now()
);

create table if not exists public.workspaces (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  slug text unique,
  subscription_plan text default 'free',
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'editor',  -- owner | admin | editor | viewer
  invite_status text default 'active',  -- pending | active
  created_at timestamptz default now()
);

create table if not exists public.social_channels (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  platform text not null,
  platform_account_id text,
  account_name text,
  access_token_encrypted text,
  refresh_token_encrypted text,
  token_expiry timestamptz,
  metadata jsonb default '{}'::jsonb,
  status text default 'connected',
  created_at timestamptz default now()
);

create table if not exists public.channel_assets (
  id uuid primary key default uuid_generate_v4(),
  social_channel_id uuid references public.social_channels(id) on delete cascade,
  asset_type text,
  asset_name text,
  asset_identifier text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  created_by uuid references auth.users(id),
  status text default 'draft',
  scheduled_at timestamptz,
  published_at timestamptz,
  timezone text default 'UTC',
  created_at timestamptz default now()
);
create index if not exists idx_posts_scheduled on public.posts (status, scheduled_at);

create table if not exists public.post_variants (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.posts(id) on delete cascade,
  channel_asset_id uuid references public.channel_assets(id) on delete set null,
  content text,
  hashtags text[] default '{}',
  media_urls text[] default '{}',
  platform_options jsonb default '{}'::jsonb,
  publish_status text default 'pending',
  platform_post_id text,
  error_message text,
  created_at timestamptz default now()
);

create table if not exists public.scheduled_queue (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  channel_asset_id uuid references public.channel_assets(id) on delete cascade,
  day_of_week int,
  time_slot time,
  timezone text default 'UTC',
  is_active boolean default true
);

create table if not exists public.analytics (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  channel_asset_id uuid references public.channel_assets(id) on delete cascade,
  metric_date date,
  impressions int default 0,
  reach int default 0,
  engagement int default 0,
  clicks int default 0,
  likes int default 0,
  comments int default 0,
  shares int default 0,
  follower_count int default 0
);

create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free',
  status text default 'active'
);

create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  type text,
  title text,
  message text,
  read_status boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  uploaded_by uuid references auth.users(id),
  file_name text,
  file_type text,
  storage_path text,
  public_url text,
  created_at timestamptz default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id),
  action text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- =========================================================
-- PART 2 — ROW LEVEL SECURITY + POLICIES
-- All tables exist now, so cross-table policies parse cleanly.
-- =========================================================

alter table public.profiles         enable row level security;
alter table public.workspaces       enable row level security;
alter table public.team_members     enable row level security;
alter table public.social_channels  enable row level security;
alter table public.channel_assets   enable row level security;
alter table public.posts            enable row level security;
alter table public.post_variants    enable row level security;
alter table public.scheduled_queue  enable row level security;
alter table public.analytics        enable row level security;
alter table public.subscriptions    enable row level security;
alter table public.notifications    enable row level security;
alter table public.media_assets     enable row level security;
alter table public.activity_logs    enable row level security;

-- Drop policies if they already exist (idempotent re-runs)
drop policy if exists "profiles_self_select"     on public.profiles;
drop policy if exists "profiles_self_update"     on public.profiles;
drop policy if exists "workspaces_member_select" on public.workspaces;
drop policy if exists "workspaces_owner_update"  on public.workspaces;
drop policy if exists "team_self_workspace"      on public.team_members;
drop policy if exists "channels_workspace"       on public.social_channels;
drop policy if exists "assets_via_channel"       on public.channel_assets;
drop policy if exists "posts_workspace"          on public.posts;
drop policy if exists "variants_via_post"        on public.post_variants;
drop policy if exists "queue_workspace"          on public.scheduled_queue;
drop policy if exists "analytics_workspace"      on public.analytics;
drop policy if exists "notif_self"               on public.notifications;
drop policy if exists "media_workspace"          on public.media_assets;
drop policy if exists "activity_workspace"       on public.activity_logs;

-- profiles
create policy "profiles_self_select" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_self_update" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- workspaces
create policy "workspaces_member_select" on public.workspaces
  for select to authenticated using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.team_members tm
      where tm.workspace_id = id and tm.user_id = auth.uid()
    )
  );
create policy "workspaces_owner_update" on public.workspaces
  for update to authenticated using (owner_id = auth.uid());

-- team_members
create policy "team_self_workspace" on public.team_members
  for select to authenticated using (
    user_id = auth.uid()
    or workspace_id in (select id from public.workspaces where owner_id = auth.uid())
  );

-- social_channels
create policy "channels_workspace" on public.social_channels
  for all to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- channel_assets (via their channel)
create policy "assets_via_channel" on public.channel_assets
  for all to authenticated using (
    social_channel_id in (select id from public.social_channels)
  );

-- posts
create policy "posts_workspace" on public.posts
  for all to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- post_variants
create policy "variants_via_post" on public.post_variants
  for all to authenticated using (post_id in (select id from public.posts));

-- scheduled_queue
create policy "queue_workspace" on public.scheduled_queue
  for all to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- analytics
create policy "analytics_workspace" on public.analytics
  for select to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- notifications
create policy "notif_self" on public.notifications
  for all to authenticated using (user_id = auth.uid());

-- media_assets
create policy "media_workspace" on public.media_assets
  for all to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- activity_logs
create policy "activity_workspace" on public.activity_logs
  for select to authenticated using (
    workspace_id in (
      select id from public.workspaces where owner_id = auth.uid()
      union
      select workspace_id from public.team_members where user_id = auth.uid()
    )
  );

-- =========================================================
-- PART 3 — AUTO-CREATE profile + workspace on new auth user
-- =========================================================

create or replace function public.handle_new_user()
returns trigger as $$
declare
  ws_id uuid;
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email)
  on conflict (id) do nothing;

  insert into public.workspaces (owner_id, name, slug)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)) || '''s Workspace',
    'ws-' || substr(new.id::text, 1, 8)
  )
  returning id into ws_id;

  insert into public.team_members (workspace_id, user_id, role, invite_status)
  values (ws_id, new.id, 'owner', 'active');

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- PART 4 — Backfill existing auth users (so the demo user
-- created via admin API also gets a profile + workspace)
-- =========================================================

do $$
declare
  u record;
  ws_id uuid;
begin
  for u in select id, email, raw_user_meta_data from auth.users loop
    insert into public.profiles (id, full_name, email)
    values (u.id, coalesce(u.raw_user_meta_data->>'full_name', ''), u.email)
    on conflict (id) do nothing;

    if not exists (select 1 from public.workspaces where owner_id = u.id) then
      insert into public.workspaces (owner_id, name, slug)
      values (
        u.id,
        coalesce(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)) || '''s Workspace',
        'ws-' || substr(u.id::text, 1, 8)
      )
      returning id into ws_id;

      insert into public.team_members (workspace_id, user_id, role, invite_status)
      values (ws_id, u.id, 'owner', 'active');
    end if;
  end loop;
end$$;
