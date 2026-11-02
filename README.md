# Elite Body Fitness Pros

Dark, sleek fitness website with scroll animations, admin CMS, and **MongoDB**.

## Quick start

1. Make sure **MongoDB** is running (MongoDB Compass / local service).
2. Copy env file:

```bash
copy env.example .env.local
```

Fill in MongoDB and Stripe values (see **Stripe checkout** below).

3. Install & seed database:

```bash
npm install
npm run seed
```

4. Start app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

- Username: `admin`
- Password: `elite2026`

## MongoDB Compass

Connect with this URI:

```
mongodb://127.0.0.1:27017/elite_body_fitness
```

Database name: **`elite_body_fitness`**

### Collections

| Collection | Content |
|---|---|
| `pages` | All page sections + images |
| `products` | Shop products |
| `galleries` | Gallery images |
| `faqs` | FAQ items |
| `pricingplans` | Pricing packages |
| `services` | Training services |
| `orders` | Contact / booking / inquiries / **Stripe package purchases** |
| `settings` | Site email, phone, headline |

## Features

- Public pages: Home, Services, About, Contact, Gallery, Testimonials, Pricing, Shop, Booking, FAQ
- Intro animation wrapper on first visit
- Neon green / black / white dark aesthetic with Framer Motion scroll reveals
- Admin panel to manage page sections + images, products, gallery, FAQs, and orders
- **Pricing packages** use Stripe Checkout (details page → Pay now → Stripe). **8.75% sales tax** is added at checkout. Optional promo code `GETFITNOW` (10% off) on the checkout page.
- Products show **Inquire for Price** and route to the contact form
- Testimonials are static on the public site (not managed in admin)

## Stripe checkout

Set these in `.env.local` and on Vercel:

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-side session creation |
| `STRIPE_WEBHOOK_SECRET` | Verifies `checkout.session.completed` webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional (hosted Checkout redirect) |
| `NEXT_PUBLIC_APP_URL` | e.g. `https://elite-henna.vercel.app` for success/cancel URLs |

Webhook endpoint: `POST /api/webhooks/stripe` — subscribe to **checkout.session.completed** in the Stripe Dashboard.

## Purchase emails (SMTP)

On successful Stripe payment, the webhook sends:

- **Owner** — package name, amount, discount, customer name/email/phone
- **Customer** — thank-you confirmation with package summary

Configure Gmail App Password in `.env.local` and Vercel:

| Variable | Example |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `elitebodyfitnesspros7@gmail.com` |
| `SMTP_PASS` | Gmail **App Password** (16 chars, no spaces) |
| `SMTP_FROM` | same as `SMTP_USER` |
| `OWNER_EMAIL` | inbox for new-purchase alerts |

Checkout flow uses **Redux Toolkit + redux-saga** (`src/store/checkout/`).

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, **MongoDB + Mongoose**, **Stripe**, **Redux Saga**
