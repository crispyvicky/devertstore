# Devert Store (shop + admin)

One **Next.js** app: luxury storefront + admin inventory/orders + public APIs.  
Database: **Supabase Postgres** (required for Vercel).

## Local setup

1. Create a Supabase project → **Project Settings → Database**.
2. Copy `.env.example` → `.env` and fill:

```env
DATABASE_URL="postgresql://postgres.YOUR_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.YOUR_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres"
AUTH_SECRET="long-random-secret"
AUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@devert.store"
ADMIN_PASSWORD="change-me"
ADMIN_NAME="Devert Admin"
```

| Variable | From Supabase |
|----------|----------------|
| `DATABASE_URL` | Connect → URI → **Transaction** pooler (`:6543`) + `?pgbouncer=true` |
| `DIRECT_URL` | Connect → URI → **Session** or Direct (`:5432`) |
| `AUTH_SECRET` | You generate (`openssl rand -base64 32`) — not from Supabase |
| `AUTH_URL` | Local `http://localhost:3000` or your Vercel URL |
| `ADMIN_*` | Your chosen admin login (seed creates the user) |

No Supabase anon/service keys needed — Prisma uses Postgres directly.

3. Install & seed:

```bash
cd devert-store-admin
npm install --legacy-peer-deps
npx prisma db push
npm run db:seed
npm run dev
```

### URLs (single server)

| Path | What |
|------|------|
| http://localhost:3000/ | Storefront home |
| http://localhost:3000/chanel | Brand pages (same UI as before) |
| http://localhost:3000/login | Admin login |
| http://localhost:3000/admin | Inventory / orders / AI recs |
| `/api/products` | Live catalog |
| `/api/orders` | Storefront checkout (deducts stock) |

Default admin after seed: `admin@devert.store` / password from `ADMIN_PASSWORD`.

## Deploy on Vercel (one project)

1. Import this repo (or folder) → set **Root Directory** to `devert-store-admin`.
2. Framework: Next.js.
3. Add the same env vars as above, with:
   - `AUTH_URL=https://YOUR-APP.vercel.app`
   - Supabase `DATABASE_URL` + `DIRECT_URL`
4. Deploy.
5. From your machine (with production env), run seed once:

```bash
# with production DATABASE_URL / DIRECT_URL in .env
npx prisma db push
npm run db:seed
```

Shoppers and admin share one domain. No `VITE_API_URL` — the bag calls `/api/*` on the same origin.

## May help desk

Floating **May** button (bottom-right on shop pages).

- Without `OPENAI_API_KEY` → answers from **1000** curated FAQs (`src/lib/may-faq.json`)
- With `OPENAI_API_KEY` → OpenAI chat; falls back to FAQ if the API fails

```env
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

Regenerate FAQs: `node scripts/generate-may-faq.js`

## Architecture

- Storefront React pages live in `src/storefront/` (ported from the Vite mall).
- Shop routes: `src/app/(shop)/…`
- Admin routes: `src/app/admin/…`
- Cartier: Next route `/cartier` (+ redirect at `/cartier/index.html`).

The old `image-reveal-project` Vite app is an archive; this app is the source of truth for production.
