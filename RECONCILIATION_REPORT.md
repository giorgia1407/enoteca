# Il Tempio di Vino — Full Inventory Reconciliation

Generated: 2026-07-11
Read-only audit: **nothing was modified** (only this report + `/audit-scratch/` notes were written).
Method: cryptographic (MD5) 1:1 mapping of every shipped image back to a client photo, **plus** a human-style visual pass in which **all 100 raw photos were individually viewed** and every label + price tag was read.

---

## Executive Summary

| Metric | Count |
|---|---|
| Raw client photos | **100** |
| Site products (`WINES[]`) | **99** |
| Public product images (`/public/products/`) | **99** |
| Matched (raw photo → live product) | **99** |
| Merged duplicates (correctly consolidated) | **0** |
| **Missing** (product visible in photos, absent from site) | **3** |
| Unidentifiable raw photos | **0** |
| No-source products (in code, no raw photo) | **0** |
| Broken image paths | **0** |
| Duplicate slugs / IDs | **0** |
| Orphan public images (unused files) | **0** |

**Verdict: 🟡 GAPS FOUND** — the catalogue is structurally clean and 1:1 with the photos, but **one raw photo is a group shot of the Meera liqueur line revealing three flavours that were never turned into products.**

### Top 3 findings that need attention

1. **3 missing Meera liqueurs.** Photo `…20.58.13 (13).jpeg` shows the full Meera line — **Rose, Alphonso Mango, Cardamom, Ginger** — netted side-by-side. Only **Meera Ginger** (€18.50) exists in the catalogue. **Rose, Mango and Cardamom are not on the site.** They share the Ginger's branding, format (0.7 L, ~20–25% vol) and almost certainly its €18.50 price.
2. **Discount tags ("con sconto") are inconsistently applied.** ~18 bottles carry a two-tier handwritten tag (list price → discounted price). Only **one** product (`savian-prosecco-brut`) records this as `originalPrice`. The rest either silently use the discounted number or silently use the list number, with no strike-through shown to customers. See §7.
3. **Everything else reconciles perfectly.** 99/100 photos are byte-identical to their shipped hero image; no broken paths, no orphaned files, no duplicate slugs, no miscategorised bottles, no unreadable photos. The single "extra" photo is fully explained (item 1).

**Full report continues below. Scratch data: `/audit-scratch/` (manifest.json, products.json, md5 maps).**

---

## 1. Missing Products (highest priority — action needed)

All three come from the single group photo `WhatsApp Image 2026-07-09 at 20.58.13 (13).jpeg`. Left-to-right in frame, the line reads **Rose → Mango → Cardamom → Ginger**; only Ginger was catalogued.

| Raw photo | Product (from label) | Price tag | Suggested category | Suggested slug |
|---|---|---|---|---|
| `…20.58.13 (13).jpeg` | **Meera Rose** (Liqueur, Premium Quality, ~0.7 L) | €18.50 (inferred — line shares Ginger's tag) | `liquori` | `meera-rose` |
| `…20.58.13 (13).jpeg` | **Meera Alphonso Mango** (Liqueur, Premium Quality) | €18.50 (inferred) | `liquori` | `meera-alphonso-mango` |
| `…20.58.13 (13).jpeg` | **Meera Cardamom** (Liqueur, Premium Quality) | €18.50 (inferred) | `liquori` | `meera-cardamom` |

Notes for whoever creates these:
- The **Ginger** flavour (`meera-ginger`, €18.50) already exists and has its own clean solo packshot (`…20.58.13 (12).jpeg`) — leave it as-is.
- There is **no solo photo** of Rose, Mango or Cardamom in the client set — only the group shot. The client would need to supply individual packshots, or the group image can be cropped per-flavour as a stopgap hero.
- Price €18.50 is **inferred** from the single tag hanging on the Ginger in the line-up; confirm with the client before go-live (treat as PROVISIONAL).

---

## 2. Broken Image Paths

**None.** Every one of the 99 `product.image` paths was tested with `fs.existsSync` against `/public/products/` — all resolve. Conversely, all 99 files in `/public/products/` are referenced by exactly one product (no orphan files).

---

## 3. Duplicate Product Entries

**None.** No duplicate `slug` or `id` values. The audit script grouped products by `(category + identical price)` to surface possible accidental splits — 11 such clusters exist, but **every one is a set of genuinely different wines** that happen to share a price. In particular the €10.90 white-wine cluster is an artifact of the **PROVISIONAL category-median price** assigned to bottles photographed without a visible tag (Bisanzio Chardonnay, Chardonnay Venezia, Cri Pecorino, Pinot Grigio Venezia, Estrosa Viognier, Kamasutra Sauvignon Blanc) — not duplicates.

No **over-merged** entries either: no single product hides multiple vintages/formats. (The only multi-variant situation in the whole shoot is the Meera line, handled in §1.)

---

## 4. Better Hero Photo Suggestions

**None needed.** Every shipped hero is already a clean, well-lit, single-bottle foreground packshot with a readable label. No lifestyle/blurry heroes were found that a raw photo could improve. (The Meera Ginger hero is the solo shot, correctly chosen over the group shot.)

---

## 5. Unidentifiable Raw Photos

**None.** All 100 photos were legible; every foreground bottle label was readable. A handful of bottles had no price tag in frame (already handled in the data as PROVISIONAL — see §7).

---

## 6. Category Distribution

| Category | Products | Sample (name — price) |
|---|---|---|
| `vini-rossi` | 21 | Montepulciano d'Abruzzo €7.50 · Langhe Nebbiolo €18 · Cartagho €17.20 |
| `vini-bianchi` | 22 | Falanghina €4 · Ferzo Pecorino €8.50 · Lighea €14.50 |
| `rosati` | 2 | Lumera €12.80 · Sul Vulcano Etna Rosato €20.70 |
| `bollicine` | 8 | Sensi Prosecco €13.30 · Moscato Spumante Dolce €7.90 · Mionetto Valdobbiadene €11 |
| `distillati` | 32 | Gin Puro The One €47 · Xibal Gin €39.50 · Kozak Vodka €7.90 |
| `liquori` | 14 (→17 after §1) | Limoncello €13 · Fernet-Branca €16.60 · Amaro del Capo €16.90 |
| `vini-dolci` | 0 | — (defined but intentionally empty) |
| `accessori` | 0 | — (defined but intentionally empty) |
| **Total** | **99** | |

Anomalies flagged:
- **`vini-dolci` and `accessori` are empty by design.** The code already guards this: `generateStaticParams` (`app/categoria/[slug]/page.tsx`), the nav builder (`SiteChrome.tsx` via `catalogFacets.ts`), and `CategoriesCarousel` all filter out zero-product categories, so **no empty category is ever linked or renders a dead page.** ✅ Not a bug.
- **`rosati` has only 2 products** — and that is exactly what the photos show (Lumera + Sul Vulcano Etna Rosato). No additional rosé bottles were missed. ✅
- After adding the 3 Meera flavours (§1), `liquori` becomes 17 and the total becomes 102.

---

## 7. Featured Products Review + Price/Discount Notes

**Featured: 12 products** (`featured: true`) — a healthy spread across categories:

| Category | Featured |
|---|---|
| vini-rossi | Montepulciano d'Abruzzo €7.50 · Venturone Appassimento Rosso €8.80 · Savian Bio Merlot €8 |
| vini-bianchi | Aragosta Vermentino €6.30 · Falanghina €4 · Ferzo Pecorino €8.50 |
| rosati | Lumera €12.80 |
| bollicine | Savian Anticaterra Prosecco Rosé €10.50 · Sensi Prosecco €13.30 |
| liquori | Limoncello (Benvenuti) €13 |
| distillati | Raffles Gin €10 · Gin Puro The One €47 |

Assessment: 12 is within the ideal 8–12 band and every wine category except the two empty ones is represented. **No change required.** (Optional: once the Meera flavours are added you may want to feature one, and `vini-dolci`/`accessori` remain unfeaturable because empty.)

**Price sanity:**
- Zero/missing prices: **none**.
- PROVISIONAL prices (photographed without a visible tag, flagged inline in the data): **11** — `bisanzio-chardonnay`, `ferzo-montepulciano-d-abruzzo-teate`, `savian-chardonnay-venezia`, `clementina-fabi-cri-pecorino`, `savian-pinot-grigio-venezia`, `pico-maccario-estrosa-viognier`, `kamasutra-red-wine-shiraz`, `kamasutra-white-wine-sauvignon-blanc`, `caffo-vecchio-amaro-del-capo`, `aristocrat-premium`, `mohan-meakin-old-monk-20-amber`. Confirm all 11 before go-live.

**⚠️ Discount-tag inconsistency (new finding from the visual pass).** ~18 bottles carry a handwritten **two-tier tag** ("list price … con sconto … discounted price"). Only **`savian-prosecco-brut`** records this as `originalPrice: 15` (shows €13.50 struck from €15). Every other discounted bottle stores a **single** number with no strike-through, and the choice of which number was stored is inconsistent — some kept the list price, some the discounted price:

| Product | Tag on photo (list → sconto) | Price stored | Stored value is… |
|---|---|---|---|
| savian-prosecco-brut | 15.00 → 13.50 | 13.50 (`originalPrice 15`) | ✅ discount modelled |
| savian-bio-merlot | 10.00 → 8.00 | 8.00 | discounted, no `originalPrice` |
| aldo-marenco-langhe-nebbiolo | 20.00 → 18.00 | 18.00 | discounted, no `originalPrice` |
| mybrid | 16.50 → 15.00 | 15.00 | discounted, no `originalPrice` |
| cobalto-17 | 45.00 → 38.00 | 38.00 | discounted, no `originalPrice` |
| pastis-51 | 24.80 → 23.80 | 23.80 | discounted, no `originalPrice` |
| bickens…grapefruit | 15.20 → 13.30 | 13.30 | discounted, no `originalPrice` |
| savian…prosecco-rose | 12.50 → 10.50 | 10.50 | discounted, no `originalPrice` |
| silvio-carta pig-skin | 27.65 → 24.90 | 24.90 | discounted, no `originalPrice` |
| five-rivers white rum | 39.90 → 35.90 | 35.90 | discounted, no `originalPrice` |
| bacardi-reserva-ocho | 43.90 → 39.90 | 39.90 | discounted, no `originalPrice` |
| martini-fiero | 12.80 → 11.20 | 12.80 | **list price kept** |
| fernet-branca | 16.60 → 15.50 | 16.60 | **list price kept** |
| kozak-vodka-classic | 7.90 → 6.90 | 7.90 | **list price kept** |
| drambuie | 36.40 → 34.40 | 36.40 | **list price kept** |
| vecchia-romagna-classica | 19.90 → 16.90 | 19.90 | **list price kept** |
| malibu-original | 16.80 → 15.80 | 16.80 | **list price kept** |
| old-monk-coffee-xo | 20.90 → 17.90 | 20.90 | **list price kept** |

This is a **pricing-consistency** issue, not a reconciliation gap — the products all exist and map correctly — but it means some shelf discounts aren't shown online and some are baked in silently. Tag reads are from photos; **confirm with the client** and decide one convention (recommend: store `price` = discounted, `originalPrice` = list, so the strike-through renders everywhere).

**Volume note (minor):** several spirits are actually 500 ml or 1 L on the label but stored as `700ml` (e.g. Kozak Vodka & Celsius appear 500 ml; Martini Fiero & Bacardi Carta Blanca appear 1 L; Pastis 51 appears 100 cl). Worth a spot-check but out of scope for this reconciliation.

---

## 8. Full Match Manifest

Status legend: ✅ MATCHED (photo is the byte-identical source of a live product) · ❌ MISSING (product visible, not catalogued).

**99 photos = ✅ MATCHED, 1:1 with a shipped product** (each raw photo is byte-for-byte identical to its `/products/<slug>.jpeg` hero — verified by MD5). The complete per-photo mapping is saved at `audit-scratch/manifest.json`. Every product's hero label was also visually re-read and confirmed to match its data entry.

The single non-matching photo:

| Raw photo | Status | Detail |
|---|---|---|
| `…20.58.13 (13).jpeg` | ❌ Group shot | Meera line: Rose ❌, Alphonso Mango ❌, Cardamom ❌ (missing) + Ginger ✅ (= existing `meera-ginger`, its own solo shot is `…(12).jpeg`) |

Reconciliation identity check: **100 raw photos = 99 matched + 0 merged + 0 unidentifiable + 1 group-shot-revealing-3-missing.** The 99 shipped products all trace to a photo; the 1 "extra" photo accounts for the 100th and simultaneously exposes the 3 uncatalogued flavours. Numbers balance.

---

## 9. Recommended Next Actions

1. **Add the 3 missing Meera liqueurs** (`meera-rose`, `meera-alphonso-mango`, `meera-cardamom`) to `data/productData.ts` under `liquori`, mirroring the existing `meera-ginger` entry. Price €18.50 PROVISIONAL until confirmed. Request individual packshots from the client, or crop the group photo `…20.58.13 (13).jpeg` per flavour as interim heroes. *(This is the only change that closes the reconciliation gap.)*
2. **Confirm the 11 PROVISIONAL prices** with the client and clear the inline flags.
3. **Standardise discount handling** (§7): pick one convention and apply `originalPrice` consistently to all ~18 "con sconto" bottles so shelf discounts render as strike-through online (currently only `savian-prosecco-brut` does).
4. *(Optional, out of scope)* Spot-check the handful of 500 ml / 1 L bottles stored as `700ml`.

Once step 1 is done the catalogue moves from 🟡 to 🟢 (100% of photographed products represented).
