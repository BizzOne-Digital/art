# Elite Body Fitness Pros

Dark, sleek fitness website with scroll animations, admin CMS, and **MongoDB**.

## Quick start

1. Make sure **MongoDB** is running (MongoDB Compass / local service).
2. Copy env file:

```bash
copy .env.example .env.local
```

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
| `orders` | Contact / booking / product inquiries |
| `settings` | Site email, phone, headline |

## Features

- Public pages: Home, Services, About, Contact, Gallery, Testimonials, Pricing, Shop, Booking, FAQ
- Intro animation wrapper on first visit
- Neon green / black / white dark aesthetic with Framer Motion scroll reveals
- Admin panel to manage page sections + images, products, gallery, FAQs, and orders
- Products show **Inquire for Price** and route to the contact form
- Testimonials are static on the public site (not managed in admin)

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, **MongoDB + Mongoose**
