# Ristorante Template

A production-ready, mobile-first restaurant web app built with **Next.js 16**,
**TypeScript (strict)**, **Tailwind v4** and **Framer Motion**. Shipped as the
Italian "Curry & Spice" (Roma) brand — a single-language (Italian) template
designed to be rebranded per client.

## Routes

| Path       | Page                                                        |
| ---------- | ----------------------------------------------------------- |
| `/`        | Landing — masthead, hero, full menu, reviews, story, gallery, location, newsletter |
| `/menu`    | Full menu browser with categories and Bella's suggestions   |
| `/order`   | Order flow — dine-in / pickup / delivery + cart & checkout   |
| `/reserve` | Table reservation flow                                       |
| `/review`  | Post-dining review experience (QR-linked, `noindex`)         |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # lint
```

## Rebranding for a new client

- **Contact / WhatsApp** — `lib/constants.ts`
- **Brand identity, hours, address, all UI copy** — `components/restaurant/data/curryContent.ts`
- **Menu** — `components/restaurant/data/menuData.ts` (structure) + `menuData.it.ts` (Italian text & euro prices)
- **Reviews** — `components/restaurant/data/reviewsData.it.ts`
- **Bella (AI assistant) script** — `components/restaurant/data/curryBellaContent.ts`
- **Design tokens (colors, fonts)** — the `@theme` block in `app/globals.css`

The whole site is Italian; copy lives in the data layer above (no translation
runtime).

## Deploy

Deploys to [Vercel](https://vercel.com) with zero configuration.
