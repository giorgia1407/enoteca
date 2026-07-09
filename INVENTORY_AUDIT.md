# INVENTORY AUDIT — Il Tempio di Vino

> Source of truth for the internal-consistency audit. Computed directly from
> `data/productData.ts` (99 real client products). Every nav link, category
> tile and filter option must correspond to a fact in this document.
>
> Generated: 2026-07-10.

## A. Categories with product counts

| Category      | Count | In nav? | Notes |
|---------------|-------|---------|-------|
| vini-rossi    | 21    | YES     | |
| vini-bianchi  | 22    | YES     | |
| distillati    | 32    | YES     | largest category |
| liquori       | 14    | YES     | reached via the *Distillati* dropdown, col. 2 |
| bollicine     | 8     | YES     | simplified single-column dropdown |
| rosati        | 2     | YES     | small but real — kept |
| vini-dolci    | 0     | **NO**  | empty → omitted from nav + tiles + static routes |
| accessori     | 0     | **NO**  | empty → omitted from nav + tiles + static routes |

**Total: 99 products** (the brief said "100"; the real file contains 99 — the
computed data is treated as source of truth).

## C. Featured products (`featured: true`) — 12 total

Enough for both homepage carousels (target 8–12). Every populated category has
at least one featured product, so every mega-menu "In Evidenza" card and every
homepage tile resolves to a real featured (or in-stock) bottle.

| Category     | Featured slugs |
|--------------|----------------|
| vini-rossi   | palio-montepulciano-d-abruzzo, venturone-appassimento-rosso, savian-bio-merlot |
| vini-bianchi | cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna, falanghina, ferzo-pecorino |
| rosati       | donnafugata-lumera |
| bollicine    | savian-anticaterra-prosecco-rose-extra-dry, sensi-prosecco |
| distillati   | raffles-gin, gin-puro-the-one |
| liquori      | benvenuti-limoncello |

Offers: only **1** product carries a real `originalPrice`. The
"Le nostre offerte" carousel therefore tops up to 12 with display-only
discounts on featured wines (source objects never mutated).

## B. Real sub-facets per populated category

### vini-rossi (21)
- **Regions:** Sicilia (7), Abruzzo (5), Alba (2), Venezia (1), Lazio (1), Langhe (1), Asti (1), Sicilia Menfi (1)
- **Denomination tiers:** DOC (12), DOCG (3), IGT (1), IGP (1)
- **Grapes:** Montepulciano (5), Nebbiolo (2), Merlot (1), Cesanese (1), Shiraz (1), Barbera (1), Dolcetto (1), Nocera (1), Nero d'Avola (1)
- **Producers:** Planeta (5), Mandrarossa (3), Marchesi di Barolo (3), Consoli (2), + 8 singletons
- **Vintage present:** 8 · **Price:** €6.80–€18.00

### vini-bianchi (22)
- **Regions:** Sicilia (6), Venezia (2), Offida (2), Sicilia Menfi (2), Sardegna (1), Benevento (1), Abruzzo (1), Terre di Chieti (1), Piemonte (1)
- **Denomination tiers:** DOC (11), DOCG (2), IGT (2), IGP (1)
- **Grapes:** Chardonnay (3), Pecorino (3), Grillo (3), Vermentino (2), Falanghina (2), + 6 singletons
- **Producers:** Consoli (3), Donnafugata (3), Planeta (3), Savian (2), Clementina Fabi (2), Mandrarossa (2), + 7 singletons
- **Vintage present:** 4 · **Price:** €4.00–€15.00

### rosati (2)
- **Regions:** Sicilia (2)
- **Denomination tiers:** DOC (2)
- **Grapes:** none labelled
- **Producers:** Donnafugata (2)
- **Vintage present:** 2 · **Price:** €12.80–€20.70

### bollicine (8)
- **Regions:** Valdobbiadene (1); rest unlabelled
- **Denomination tiers:** DOC (7), DOCG (1)
- **Producers:** Savian (3), Sensi (1), Clementina Fabi (1), Peruzzet (1), Citra (1), Mionetto (1)
- **Vintage present:** 0 · **Price:** €7.90–€13.50

### distillati (32) — spirit type inferred from product name
- **Spirit types (confident from name):** Gin (13), Vodka (5), Rum (4); 10 unclassified (brandy/whisky/pastis with no type word in the name)
- **Regions:** mostly unlabelled (a handful: Italy, Sardegna, Guatemala, …)
- **Producers:** Malfy (2), Bacardi (2), Magic Moments (2), Seagram's (2), + singletons
- **Vintage present:** 0 · **Price:** €7.90–€47.00

### liquori (14) — type inferred from product name
- **Types (confident from name):** Limoncello (2), Amaro (2 — Amaro del Capo, Fernet-Branca); rest unclassified creams/aperitivi
- **Producers:** all singletons (Benvenuti, Martini & Rossi, Fratelli Branca, Nardini, Disaronno, Baileys, Caffo, …)
- **Vintage present:** 0 · **Price:** €8.00–€36.40

## Notes on classification (no product entries were modified)

- **Denomination tier** and **spirit/liquor type** are *derived at read time*
  from the existing `denomination` / `name` fields via pure helpers in
  `data/catalogFacets.ts`. The 100→99 real product objects are untouched.
- `denominationTier`: DOCG → DOC → IGT → IGP (checked in that order so "DOCG"
  isn't swallowed by "DOC").
- `productType`: keyword match with word boundaries so "Meera **Gin**ger" is
  NOT classified as Gin, while "Grifu **Gin**" is.
- **Badges:** no product carries any badge → the "Novità" sort option is hidden
  (re-appears automatically if the client tags products later).
