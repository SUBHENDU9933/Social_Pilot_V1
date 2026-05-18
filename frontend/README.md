# PostPilot AI

> Fly your social media on autopilot. One pilot. Every platform. One click.

A Buffer.com–equivalent multi-tenant social media SaaS built on **Next.js 15 + Supabase + Vercel**.

## Tech Stack

| Layer            | Tech                                          |
| ---------------- | --------------------------------------------- |
| Frontend & API   | Next.js 15 App Router (TypeScript)            |
| Styling          | Tailwind CSS + ShadCN UI components           |
| Animation        | Framer Motion                                  |
| Auth / DB        | Supabase Auth + Postgres (RLS)                |
| Storage          | Supabase Storage                              |
| Scheduler        | cron-job.org → `/api/cron/publish`            |
| Payments         | Stripe (Phase 1.5 — scaffolded)               |
| Emails           | Resend (Phase 1.5)                            |
| Deployment       | Vercel                                        |

## Repository Layout

```
src/
├── app/
│   ├── (dash)/              # Authenticated dashboard area (dark theme)
│   │   ├── dashboard/
│   │   ├── composer/
│   │   ├── queue/
│   │   ├── calendar/
│   │   ├── analytics/
│   │   ├── channels/
│   │   ├── team/
│   │   └── settings/
│   ├── api/                 # All backend routes (run on Vercel serverless)
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── channels/
│   │   ├── cron/publish/    # cron-job.org → secure scheduled publisher
│   │   └── contact/
│   ├── auth/                # Login / Signup / Reset
│   ├── pricing/
│   ├── about/
│   ├── contact/
│   └── page.tsx             # Marketing landing page
├── components/
│   ├── ui/                  # ShadCN-style primitives
│   ├── marketing/           # Public site sections
│   └── dashboard/           # Authenticated views
├── lib/
│   ├── supabase/            # client / server / middleware Supabase clients
│   ├── publishers/          # Facebook + Instagram (real) + mock connectors
│   ├── security/crypto.ts   # AES-256-GCM for OAuth tokens
│   └── platforms.ts         # Platform metadata (char limits, icons, etc.)
└── middleware.ts            # Route protection + session refresh
supabase/
└── migrations/0001_init.sql # Full schema with RLS + auto-profile trigger
```

## Quick Start

1. **Clone & install**
   ```bash
   yarn install
   ```

2. **Wire Supabase** — create a new project at supabase.com, then:
   - Copy your URL + anon key into `.env.local` (replace the placeholders)
   - Run the migration in the SQL Editor: `supabase/migrations/0001_init.sql`
   - Enable Google OAuth provider (Auth → Providers → Google)

3. **Dev**
   ```bash
   yarn dev
   ```
   App runs at <http://localhost:3000>. Marketing pages render without Supabase configured; auth / dashboard data require Supabase.

## Environment Variables

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Meta (real OAuth — Facebook + Instagram)
META_APP_ID=...
META_APP_SECRET=...

# Other platforms (currently mocked — fill to enable real publishing)
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
PINTEREST_APP_ID=
PINTEREST_APP_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=

# Cron-job.org
CRON_SECRET=...                # Random string, also used in cron-job.org header

# Encryption
ENCRYPTION_KEY=...             # 32+ char random secret used to encrypt OAuth tokens

# Optional integrations
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Scheduling via cron-job.org

Once deployed:

1. Create a cron-job.org job
2. URL: `https://yourdomain.com/api/cron/publish`
3. Schedule: every 1 minute
4. Add header: `Authorization: Bearer <CRON_SECRET>`

The endpoint queries every scheduled post that is due, dispatches each variant
to the right publisher (`/lib/publishers`), and updates the database with the
platform post ID or the error message.

## Publisher Architecture

`lib/publishers/index.ts` is a registry mapping each platform to a publisher
function. Today:

- ✅ **Facebook** — real Meta Graph API
- ✅ **Instagram** — real Instagram Graph API
- 🛠 **LinkedIn / Pinterest / Google Business / YouTube / X** — mock connectors with
  the exact same interface. Replace the body of each file in `lib/publishers/` to
  go live; no other code needs to change.

## Security Highlights

- AES-256-GCM at-rest encryption for all OAuth tokens (`lib/security/crypto.ts`)
- Row Level Security on every workspace-scoped table
- Workspace isolation enforced via membership joins
- CRON endpoint guarded by `CRON_SECRET`
- Service-role key never exposed to the browser (server-only)

## License

Proprietary © 2026 PostPilot AI.
