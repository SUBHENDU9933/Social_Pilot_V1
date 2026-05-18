# PostPilot AI — Product Requirements Document

## Original Problem Statement
Build a Buffer.com-equivalent multi-tenant SaaS social media platform — "POSTPILOT AI · Fly Your Social Media on Autopilot. One Pilot. Every Platform. One Click."

Users connect social accounts via OAuth, compose multi-channel posts with per-platform variants, schedule via queue/calendar, track analytics, and collaborate as teams.

## Tech Stack (per user choice)
- Next.js 15 App Router + TypeScript
- Tailwind + ShadCN UI + Framer Motion
- Supabase (Auth + Postgres + Storage)
- Vercel deployment
- cron-job.org → /api/cron/publish

## User Personas
- Solo creators (Free / Essentials plan)
- Small business marketers (Essentials)
- In-house marketing teams (Team plan)
- Agencies operating multiple brands (Agency plan)

## Core Requirements (static)
1. OAuth-based channel connection (no API keys for users)
2. Multi-channel post composer with per-platform variants
3. Queue + Calendar (drag-drop)
4. Unified analytics
5. Team/RBAC (Owner / Admin / Editor / Viewer)
6. Workspace isolation + RLS

## What's Implemented (2026-02-18)
- Marketing site: Landing (hero, integrations, features, dashboard preview, pricing, testimonials, FAQ, CTA, footer), Pricing, About, Contact pages
- Auth: signup, login, forgot/reset password, Google OAuth, OAuth callback route
- Dashboard shell with sidebar + topbar (dark "control room" theme)
- Dashboard pages: Today (KPIs + queue widget + channels widget + 7-day chart), Composer (multi-account picker + tabbed per-platform variants + schedule/queue/draft/publish actions), Queue (drag-drop reorder, pause/resume), Calendar (month view, events, color-coded), Analytics (Recharts line + bar + top posts), Channels (connect/disconnect/reconnect, real Meta OAuth + mocked others), Team (invite, role management, dialog), Settings (profile/workspace/security/notifications/billing tabs)
- API routes: /api/auth/* (callback, logout), /api/posts (list, create), /api/channels/connect/[platform], /api/channels/callback/[platform], /api/cron/publish (CRON_SECRET-protected), /api/contact
- Publishers: real Facebook + Instagram Meta Graph API, pluggable mock connectors for LinkedIn/Pinterest/Google Business/YouTube/X
- AES-256-GCM token encryption (`lib/security/crypto.ts`)
- Supabase migration SQL (full schema + RLS + auto-profile/workspace trigger) at `supabase/migrations/0001_init.sql`
- FastAPI thin proxy at port 8001 forwarding /api/* → localhost:3000 (preview-env only; Vercel handles natively)

## Prioritized Backlog

### P0 (next iteration)
- Wire real Supabase project (user provides URL + keys)
- Wire LinkedIn / Pinterest / Google Business / YouTube real OAuth credentials
- Stripe billing integration (currently UI placeholder)
- Real media upload to Supabase Storage
- Onboarding wizard (post-signup)

### P1
- Full email flows via Resend (invitations, publish failures, weekly digest)
- Token refresh / reconnect automation
- Real analytics sync from each platform API
- Calendar drag-to-reschedule wiring to DB
- Public scheduled posts API

### P2
- X / Twitter integration (Phase 2)
- AI caption / hashtag generation
- Workspace switcher (multi-workspace UI)
- SSO / SAML for Agency tier

## Architecture Notes
- The Next.js app lives at /app/frontend; Vercel-deployable as-is
- FastAPI proxy exists only to bridge the preview env's ingress (which sends /api/* to port 8001) to Next.js (port 3000). Remove for production.
- All env vars documented in `frontend/.env.local`
- Cron-job.org integration: GET https://yourdomain/api/cron/publish + header `Authorization: Bearer ${CRON_SECRET}`
