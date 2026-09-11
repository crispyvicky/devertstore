# Devert Store — Hackathon Explanation Guide

**Project:** Devert Store (luxury maison e‑commerce + admin)  
**Live:** https://devertstore-v7lc.vercel.app/  
**Repo:** https://github.com/crispyvicky/devertstore  

Use this document to explain the project **inch by inch** to judges / officials.

---

## 1. What is Devert Store? (one-minute pitch)

Devert Store is a **single full-stack web application** that acts as a **luxury shopping salon** online.

| Who | What they can do |
|-----|------------------|
| **Customers (shoppers)** | Browse brand pages (Chanel, Gucci, Dior…), see **live prices & stock**, add to bag, place orders, chat with **May** (help desk) |
| **Admin (store staff)** | Login, manage **inventory**, view **orders**, adjust stock, see **AI recommendations** |

**Key idea for judges:**  
There is **one codebase**, **one deploy**, **one database**. The shop and the admin are not two disconnected demos — when a customer buys something, **stock goes down in the same database** the admin manages.

---

## 2. Problem we solved

Typical student demos have problems:

1. Frontend shows **fake / mock prices** that never match a real inventory.
2. “Checkout” only sends an email — **stock never updates**.
3. Deploying **two apps** (Vite frontend + separate backend) is hard for judges to run.
4. AI chat needs an API key — demos break if the key is missing.

**Our solution:**

1. **No mock pricing** on purchasable items — prices come from the database.
2. Checkout calls a real API → creates an order → **deducts stock** in a transaction.
3. **One Next.js app** on Vercel — shop + admin + APIs together.
4. **May** help desk works **with or without** an OpenAI key (FAQ fallback with ~1000 Q&As).

---

## 3. Tech stack (what tools & why)

### 3.1 Core stack

| Layer | Tool | Why we chose it |
|-------|------|-----------------|
| **Framework** | **Next.js 16** (App Router) | One app for UI + API routes + auth. Perfect for Vercel. Shop pages + `/admin` + `/api/*` in one deploy. |
| **Language** | **TypeScript** (+ some React JSX for the storefront) | Safer APIs, clearer models for products/orders. |
| **UI (admin)** | **React + Tailwind CSS** | Fast, clean admin dashboard. |
| **UI (shop)** | **React + custom CSS + GSAP + Lenis** | Premium scrolling / image-reveal luxury look (hackathon “wow” factor). |
| **Auth** | **NextAuth (Auth.js) v5** — Credentials | Simple admin login (email + password). No need for Google OAuth for a store admin. |
| **Database** | **PostgreSQL on Supabase** | Free hosted Postgres; survives Vercel serverless (SQLite does **not** — disk is temporary on Vercel). |
| **ORM** | **Prisma** | Type-safe queries, easy schema, `db push` + seed for 900+ products. |
| **Hosting** | **Vercel** | Built for Next.js; HTTPS, env vars, auto deploy from GitHub. |
| **Code host** | **GitHub** | Version control + Vercel Git integration. |
| **Help desk AI** | **May** = OpenAI API **or** local FAQ JSON | Always works in a demo room even without Wi‑Fi to OpenAI. |

### 3.2 Why *this* stack (judge-friendly answer)

> “We picked **Next.js + Prisma + Supabase + Vercel** because it is the industry pattern for a production-ready full-stack app: SSR/static shop pages, Route Handlers as APIs, a real Postgres database, and one-click deploy. We avoided mock data so inventory and orders stay synchronized — that is the omnichannel story.”

### 3.3 What we deliberately did *not* use (and why)

| Avoided | Reason |
|---------|--------|
| Separate Vite app in production | Harder to deploy; CORS + two URLs; sync breaks easily. |
| SQLite on Vercel | Ephemeral filesystem — inventory would reset. |
| Only mock cart (localStorage prices) | Judges can catch fake stock. We use DB prices + stock checks. |
| AI-only chatbot | Demo fails without API key — we added FAQ fallback. |

---

## 4. Architecture (how the pieces connect)

```
┌─────────────────────────────────────────────────────────┐
│                 Vercel: Next.js App                     │
│         https://devertstore-v7lc.vercel.app             │
│                                                         │
│  Shop UI (/)     Admin UI (/admin)     May chat widget  │
│       │                │                      │         │
│       ▼                ▼                      ▼         │
│  /api/products    Prisma + Auth         /api/may        │
│  /api/orders      /admin/*              FAQ or OpenAI   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Supabase Postgres│
              │ products, orders │
              │ users, stock log │
              └──────────────────┘
```

### 4.1 Main folders (in the repo)

| Path | Role |
|------|------|
| `src/app/(shop)/` | Customer pages: home, Chanel, Gucci, Cartier… |
| `src/app/admin/` | Dashboard, inventory, orders, AI recommendations |
| `src/app/login/` | Admin sign-in |
| `src/app/api/products` | Public catalog API (prices + stock) |
| `src/app/api/orders` | Create order + deduct stock |
| `src/app/api/may` | May help desk (AI or FAQ) |
| `src/app/api/auth/` | NextAuth handlers |
| `src/storefront/` | Shop React components (bag, product grid, May UI, GSAP pages) |
| `src/lib/may-faq.json` | ~1000 fallback Q&As for May |
| `prisma/schema.prisma` | Database models |
| `prisma/seed.ts` | Seeds admin user + product catalog |
| `public/storefront/` | Product / look images |

---

## 5. Database models (what is stored)

Defined in Prisma:

| Model | Purpose |
|-------|---------|
| **User** | Admin accounts (email + hashed password) |
| **Product** | SKU, brand, name, **price**, **stock**, category, active flag |
| **Order** | Customer name/email, status, total, order number (`DRV-….`) |
| **OrderItem** | Lines on an order (product, qty, unit price snapshot) |
| **StockMovement** | Audit log when stock changes (e.g. “Storefront order DRV-1003”) |
| **RecommendationEvent** | Optional events for AI affinity recommendations |

**Source of truth for price & stock = `Product` table.**  
The shop never invents prices for checkout — it reads the API, then orders validate stock again on the server.

---

## 6. How shopping works (customer flow)

### Step by step

1. Customer opens **https://devertstore-v7lc.vercel.app/**
2. Shop pages call **`GET /api/products`** → list of live products from Supabase.
3. `ProductGrid` / Selected Looks **match** each UI line to a DB product by brand + name.
4. If matched and `stock > 0` → show **live price** + **Add to Bag**.
5. If not matched → button shows **“Sync admin”** (SKU missing in inventory — honest empty state, not fake buy).
6. Bag is stored in **browser localStorage** (cart only), but each line has a real **`productId`**.
7. Checkout → **`POST /api/orders`** with name, email, and `{ productId, quantity }[]`.
8. Server (in a **transaction**):
   - Checks each product exists and has enough stock  
   - Decrements stock  
   - Writes `StockMovement`  
   - Creates `Order` + `OrderItem` with status **confirmed**  
   - Returns order number like `DRV-1003`
9. Admin → **Orders** sees the order; **Inventory** shows lower stock.

### Why this impresses judges

- **Same pricing** on shop and admin.  
- **Cannot oversell** — server rejects insufficient stock.  
- **Audit trail** — stock movements explain *why* stock changed.

---

## 7. How inventory management works (admin flow)

### Login

- URL: `/login`  
- Staff-only accounts (credentials are **not** shown on the login page — shared privately with the team).  
- Auth: NextAuth Credentials + bcrypt password hash in DB  

### Admin sections

| Page | What it does |
|------|----------------|
| **Dashboard** `/admin` | Counts: active SKUs, low stock, orders, revenue snapshot |
| **Inventory** `/admin/inventory` | List/search products; open a product to edit |
| **Product detail** | Change price, stock, name; record stock adjustments |
| **Orders** `/admin/orders` | List orders; open detail; move status (pending → confirmed → packed → shipped → delivered) |
| **AI Recs** `/admin/recommendations` | Affinity / popularity style recommendations from catalog + events |

### Day-to-day inventory story for judges

1. Admin adds or updates a SKU (brand, name, price, stock).  
2. Customer refreshes shop → **`/api/products`** returns new data.  
3. Add to Bag uses that price/stock.  
4. After checkout, stock drops automatically — admin does not manually subtract for storefront sales.

---

## 8. May — help desk (AI + fallback) explained carefully

### What judges see

- Floating button **bottom-right**: **“May”**  
- Opens a chat panel: greeting, quick chips (“Do you sell Chanel?”, “How does the bag work?”), text box  

### Dual mode (important talking point)

| Mode | When | How |
|------|------|-----|
| **AI mode** | Env var `OPENAI_API_KEY` is set on Vercel | `/api/may` calls OpenAI Chat Completions with a system prompt: May is Devert’s help desk (brands, bag, appointments, Hyderabad, etc.) |
| **Fallback mode** | No API key, or OpenAI fails | Matches the user question against **`may-faq.json` (~1000 Q&As)** using normalized text + token overlap scoring |

### API

- **`GET /api/may`** → `{ name: "May", mode: "ai"|"fallback", faqCount: 1000 }`  
- **`POST /api/may`** → `{ message, history }` → `{ reply, mode, assistant: "May" }`  

### Why fallback exists

Hackathon demos often lose API keys or hit rate limits. **May still answers** from curated FAQs about:

- Brands & authenticity  
- Bag / checkout / order numbers (`DRV-…`)  
- Stock / sold out / Sync admin  
- Appointments, Hyderabad contact  
- Returns, shipping (high-level)  

**Judge line:**  
> “May is AI-ready but demo-safe — production can use OpenAI; the room demo never depends on it.”

---

## 9. Environment variables (local vs production)

### Required on Vercel (Production)

| Variable | Meaning |
|----------|---------|
| `DATABASE_URL` | Supabase **transaction pooler** (`:6543`, `?pgbouncer=true`) — used by the app |
| `DIRECT_URL` | Supabase **session** URL (`:5432`) — used for migrations / Prisma |
| `AUTH_SECRET` | Random secret for session encryption |
| **`AUTH_URL`** | **Must be** `https://devertstore-v7lc.vercel.app` — if set to localhost, login redirects to localhost |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Seed / admin identity |

### Optional

| Variable | Meaning |
|----------|---------|
| `OPENAI_API_KEY` | Turns May into AI mode |
| `OPENAI_MODEL` | Default `gpt-4o-mini` |
| `NEXT_PUBLIC_SUPABASE_*` | Not required for Prisma (optional for future Supabase JS client) |

### Critical lesson we hit during deploy

Setting `AUTH_URL=http://localhost:3000` on Vercel caused **production login to redirect to local admin**.  
Fix: set `AUTH_URL` to the real Vercel URL and redeploy.

---

## 10. Deploy path (how it goes live)

1. Code on **GitHub** (`main` branch).  
2. **Vercel** imports the repo (Next.js detected).  
3. Env vars added in Vercel dashboard.  
4. Build: `npm run build` (Next compile + typecheck).  
5. Prisma talks to **Supabase** at runtime.  
6. Seed (run once from a laptop against Supabase): creates admin + ~900 products.  

**One URL** serves:

- Shop `/`  
- Brands `/chanel`, `/gucci`, `/cartier`, …  
- Admin `/login` → `/admin`  
- APIs `/api/*`  
- May widget on shop pages  

---

## 11. Demo script for officials (5–7 minutes)

1. **Open live site** — show luxury home + nav + May button.  
2. **Open Chanel / Cartier** — show live stock text and **Add to Bag** (not Sync admin).  
3. **Add item → Bag → checkout** with a test name/email → note `DRV-…` order number.  
4. **Open Admin** (`/login`) → Inventory → find that SKU → stock decreased.  
5. **Orders** → show the new order.  
6. **May** → ask “Do you sell Chanel?” and “How does the bag work?” (fallback or AI).  
7. **Architecture slide** — one Next.js app, Supabase Postgres, no mock prices.  

---

## 12. Challenges we solved (good Q&A for judges)

| Challenge | Solution |
|-----------|----------|
| SQLite dies on Vercel | Moved to **Supabase Postgres** |
| Two apps hard to sync | **Merged** shop into Next.js |
| Images broken after merge | Served images from **`/public/storefront`** |
| Mock vs live prices | All buys require **`productId`** from API |
| Overselling | Server-side stock check in a **transaction** |
| Chatbot needs key | **May FAQ fallback** (~1000 answers) |
| Prod login → localhost | Fixed **`AUTH_URL`** to Vercel domain + redirect hardening |

---

## 13. What “Sync admin” means (honest UX)

If a product name on a brand page is **not** in the database, the button says **Sync admin** and is disabled.

That means: *“This line is UI-only until inventory has a matching SKU.”*  

It is **better** than letting someone “buy” a fake item. After seeding / adding the SKU in admin, the same page shows price + Add to Bag.

---

## 14. Security notes (short)

- Admin passwords stored as **bcrypt hashes**.  
- Admin routes protected by **middleware** + session.  
- Public APIs only expose what the shop needs (`/api/products`, `/api/orders`, `/api/may`).  
- `.env` is **not** committed to GitHub — secrets live in Vercel.  
- Order API re-validates stock so clients cannot fake quantities.

---

## 15. One-page summary (print this)

**Name:** Devert Store  
**Type:** Full-stack luxury e-commerce + admin + AI help desk  
**Stack:** Next.js · React · Prisma · Supabase Postgres · NextAuth · Vercel · GSAP (shop UX) · OpenAI-optional May  
**Innovation:** Live inventory sync (no mock checkout) + dual-mode May (AI + 1000 FAQ fallback) in **one** deployable app  
**Live:** https://devertstore-v7lc.vercel.app/  
**Admin:** https://devertstore-v7lc.vercel.app/login  

---

## 16. Credits / team talking points

- Built for a **hackathon** as a complete omnichannel story: customer experience + operations backend.  
- Focus on **working sync**, not only UI.  
- Designed so a **brother / teammate** can explain every layer: UI → API → DB → deploy.

---

*End of guide — update live URL or admin password here if they change.*
