# Photo Audit Report — Il Tempio di Vino

_Generated 2026-07-15. Read-only audit — no files were modified._

New photos live in `./Wine-Content-New/` (client's WhatsApp export). Existing catalogue photos live at `public/products/<slug>.jpeg`, one per product, referenced by the `image` field in `data/productData.ts`.

## Summary

| Metric | Count |
|---|---:|
| Total products in catalog | 102 |
| Products with an existing photo on disk | 102 |
| Broken image references (in data, missing on disk) | 0 |
| Total new photos provided | 154 |
| New photos matched to a catalog product | 84 |
| &nbsp;&nbsp;— high confidence | 81 |
| &nbsp;&nbsp;— medium confidence | 1 |
| &nbsp;&nbsp;— low confidence | 2 |
| Orphan photos (no catalog match) | 70 |
| Distinct catalog products receiving ≥1 new photo | 73 |

**Matching method:** New filenames are WhatsApp timestamps only (e.g. `WhatsApp Image 2026-07-13 at 16.31.37.jpeg`) — they carry no slug, SKU, or product name. Automated match methods A–D (folder/filename/SKU/name) were therefore impossible for every file; **all 154 photos were matched by visual label inspection** (method E) across 14 parallel vision passes. All new files are portrait `.jpeg`, flat at the top level of `Wine-Content-New/` (no subfolders).

## Products by State

### STATE 1 — REPLACE candidates (62)
Product already has a photo, and exactly one new photo matched. New photo likely replaces the current one.

| Product | Slug | Existing | New | New photo file |
|---|---|---:|---:|---|
| Montepulciano d'Abruzzo | `palio-montepulciano-d-abruzzo` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.41.01 (5).jpeg |
| Bisanzio Chardonnay | `bisanzio-chardonnay` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.59 (10).jpeg |
| Aragosta Vermentino di Sardegna | `cantina-santa-maria-la-palma-aragosta-vermentino-di-sardegna` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.26.40.jpeg |
| Falanghina | `falanghina` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.26.51.jpeg |
| Savian Bio Merlot | `savian-bio-merlot` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.25.39.jpeg |
| Saucha Sauvignon Chardonnay | `consoli-saucha-sauvignon-chardonnay` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.41.01 (1).jpeg |
| Pecorino | `consoli-pecorino` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.41.01 (3).jpeg |
| Oddoni Cesanese | `consoli-oddoni-cesanese` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.59 (11).jpeg |
| Ego Falanghina | `consoli-ego-falanghina` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.41.01 (4).jpeg |
| Chardonnay Venezia | `savian-chardonnay-venezia` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.24.22.jpeg |
| Cavadiserpe | `mandrarossa-cavadiserpe` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.21.45.jpeg |
| Cri Passerina | `clementina-fabi-cri-passerina` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.38.39.jpeg |
| Cri Pecorino | `clementina-fabi-cri-pecorino` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.39.07.jpeg |
| Pinot Grigio Venezia | `savian-pinot-grigio-venezia` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.24.41.jpeg |
| Kamasutra White Wine Sauvignon Blanc | `kamasutra-white-wine-sauvignon-blanc` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.22.31.jpeg |
| Rurè Barbera d'Asti | `marchesi-di-barolo-rure-barbera-d-asti` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.23.37.jpeg |
| Madonna del Dono Dolcetto d'Alba | `marchesi-di-barolo-madonna-del-dono-dolcetto-d-alba` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.23.21.jpeg |
| Mandrarossa Bertolino Soprano Grillo | `mandrarossa-bertolino-soprano-grillo` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.21.24.jpeg |
| Planeta Cerasuolo di Vittoria | `planeta-cerasuolo-di-vittoria` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.35.39.jpeg |
| Nocera | `planeta-nocera` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.35.52.jpeg |
| Lighea | `donnafugata-lighea` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.30.37.jpeg |
| Larcéra Vermentino | `mandrarossa-larcera-vermentino` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.21.07.jpeg |
| Cartagho | `mandrarossa-cartagho` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.20.48.jpeg |
| Alastro | `planeta-alastro` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.33.15.jpeg |
| Terebinto | `planeta-terebinto` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.31.37.jpeg |
| Plumbago | `planeta-plumbago` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.35.25.jpeg |
| Dorilli | `planeta-dorilli` | 1 | 1 | WhatsApp Image 2026-07-13 at 16.35.07.jpeg |
| La Segreta Bianco | `planeta-la-segreta-bianco` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.20.08.jpeg |
| Santannella | `mandrarossa-santannella` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.21.36.jpeg |
| Lumera | `donnafugata-lumera` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.33.27.jpeg |
| SurSur | `donnafugata-sursur` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.44.03.jpeg |
| Damarino | `donnafugata-damarino` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.43.21.jpeg |
| Gin Puro The One | `gin-puro-the-one` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.44.41.jpeg |
| Cobalto-17 | `cobalto-17` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.46.01.jpeg |
| Martini Fiero L'Aperitivo | `martini-e-rossi-martini-fiero-l-aperitivo` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.46.44.jpeg |
| Fernet-Branca | `fratelli-branca-distillerie-fernet-branca` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.49.01.jpeg |
| Acqua di Cedro Essenza Mediterranea | `nardini-acqua-di-cedro-essenza-mediterranea` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.47.33.jpeg |
| Celsius Original Vodka | `celsius-original-vodka` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (10).jpeg |
| Disaronno Velvet Liqueur | `disaronno-velvet-liqueur` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.58 (3).jpeg |
| Baileys The Original Irish Cream | `baileys-the-original-irish-cream` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (8).jpeg |
| Hacienda Calibio Ron | `hacienda-calibio-ron` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (3).jpeg |
| Xibal Gin | `xibal-gin` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.26 (6).jpeg |
| Bickens Premium Pink Distilled Gin Grapefruit | `bickens-premium-pink-distilled-gin-grapefruit` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.26 (7).jpeg |
| Savian Anticaterra Prosecco Rose Extra Dry | `savian-anticaterra-prosecco-rose-extra-dry` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (12).jpeg |
| Anticaterra Prosecco DOC Brut | `savian-anticaterra-prosecco-doc-brut` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (7).jpeg |
| Five Rivers Indian Spiced White Rum | `sandhera-rum-company-five-rivers-indian-spiced-white-rum` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.26 (2).jpeg |
| Bartavelle Gin Fraise de Provence et Rhubarbe | `bartavelle-gin-fraise-de-provence-et-rhubarbe` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.26 (1).jpeg |
| Gordon's London Dry Gin | `gordon-s-london-dry-gin` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.25.jpeg |
| Carta Blanca Superior White Rum | `bacardi-carta-blanca-superior-white-rum` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.25 (4).jpeg |
| Vecchio Amaro del Capo | `caffo-vecchio-amaro-del-capo` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.58 (2).jpeg |
| Bombay Sapphire London Dry Gin | `bombay-sapphire-london-dry-gin` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57.jpeg |
| Passerina Spumante Extra Brut | `clementina-fabi-passerina-spumante-extra-brut` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (2).jpeg |
| Moscato Spumante Dolce | `citra-moscato-spumante-dolce` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (3).jpeg |
| All Seasons Sir-E-Taj Reserve Spirit | `all-seasons-oasis-all-seasons-sir-e-taj-reserve-spirit` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (6).jpeg |
| Magic Moments Remix Orange Flavoured Vodka | `magic-moments-remix-orange-flavoured-vodka` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.55.50.jpeg |
| Seagram's Blenders Pride Ultra Premium | `seagram-s-blenders-pride-ultra-premium` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56 (1).jpeg |
| Magic Moments Premium Grain Vodka | `magic-moments-premium-grain-vodka` | 1 | 1 | WhatsApp Image 2026-07-13 at 17.53.13.jpeg |
| Aristocrat Premium | `aristocrat-premium` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (11).jpeg |
| Vecchia Romagna Classica | `vecchia-romagna-classica` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (7).jpeg |
| Savian Prosecco Brut | `savian-prosecco-brut` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.57 (2).jpeg |
| Old Monk Coffee XO | `mohan-meakin-old-monk-coffee-xo` | 1 | 1 | WhatsApp Image 2026-07-15 at 18.00.26 (3).jpeg |
| Royal Stag Blended Spirit | `seagram-s-royal-stag-blended-spirit` | 1 | 1 | WhatsApp Image 2026-07-15 at 12.40.56.jpeg |

### STATE 2 — ADD candidates (11)
Product already has a photo and **multiple** new photos matched (different angles / front+back) — candidates for gallery images rather than a straight replace.

| Product | Slug | Existing | New | New photo files |
|---|---|---:|---:|---|
| Bisanzio Montepulciano d'Abruzzo | `bisanzio-montepulciano-d-abruzzo` | 1 | 2 | WhatsApp Image 2026-07-13 at 17.26.17.jpeg<br>WhatsApp Image 2026-07-15 at 12.40.59 (8).jpeg |
| Ferzo Pecorino | `ferzo-pecorino` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.41.00 (8).jpeg<br>WhatsApp Image 2026-07-15 at 12.41.01 (6).jpeg |
| Ferzo Montepulciano d'Abruzzo Teate | `ferzo-montepulciano-d-abruzzo-teate` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.41.00 (10).jpeg<br>WhatsApp Image 2026-07-15 at 12.41.00 (3).jpeg |
| Ego | `consoli-ego` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.41.00 (11).jpeg<br>WhatsApp Image 2026-07-15 at 12.41.00 (7).jpeg |
| Caroso Montepulciano d'Abruzzo Riserva | `citra-caroso-montepulciano-d-abruzzo-riserva` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.41.00 (5).jpeg<br>WhatsApp Image 2026-07-15 at 12.41.00.jpeg |
| Michet Nebbiolo d'Alba | `marchesi-di-barolo-michet-nebbiolo-d-alba` | 1 | 2 | WhatsApp Image 2026-07-13 at 17.22.51.jpeg<br>WhatsApp Image 2026-07-13 at 17.23.04.jpeg |
| Estrosa Viognier | `pico-maccario-estrosa-viognier` | 1 | 2 | WhatsApp Image 2026-07-13 at 17.22.01.jpeg<br>WhatsApp Image 2026-07-13 at 17.22.11.jpeg |
| Mybrid | `mybrid` | 1 | 2 | WhatsApp Image 2026-07-13 at 17.23.54.jpeg<br>WhatsApp Image 2026-07-13 at 17.24.14.jpeg |
| La Segreta Rosso | `planeta-la-segreta-rosso` | 1 | 2 | WhatsApp Image 2026-07-13 at 17.20.27.jpeg<br>WhatsApp Image 2026-07-13 at 17.20.40.jpeg |
| Meera Ginger | `meera-ginger` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.40.57 (8).jpeg<br>WhatsApp Image 2026-07-15 at 12.40.59 (5).jpeg |
| Old Monk 20 Amber | `mohan-meakin-old-monk-20-amber` | 1 | 2 | WhatsApp Image 2026-07-15 at 12.40.58 (4).jpeg<br>WhatsApp Image 2026-07-15 at 18.00.26 (5).jpeg |

### STATE 3 — NEW COVERAGE (0)
_None._ Every catalog product already had a photo on disk, so no new photo represents first-time coverage.

### STATE 4 — NO CHANGE (29)
Product has an existing photo and no new photo matched. Keep as-is. (Summary only.)

`venturone-appassimento-rosso`, `aldo-marenco-langhe-nebbiolo`, `kamasutra-red-wine-shiraz`, `benvenuti-limoncello`, `raffles-gin`, `meera-rose`, `meera-alphonso-mango`, `meera-cardamom`, `limoncello-luce-di-limone`, `donnafugata-sul-vulcano-etna-rosato`, `national-alcohol-company-kozak-vodka-classic`, `malfy-gin-con-arancia-blood-orange`, `bulbash-green-line-fresh-infusion-raspberry-orange-thyme`, `malfy-gin-rosa-pink-grapefruit`, `kozatska-rada-originale`, `pernod-pastis-51`, `gingino-london-dry-gin`, `harvest-day-original-vodka`, `sensi-prosecco`, `beefeater-24-london-dry-gin`, `silvio-carta-pig-skin-london-dry-gin-silver`, `pilloni-grifu-gin`, `bacardi-reserva-ocho-rare-gold-rum`, `g-b-pezziol-vov-liquore-all-uovo`, `peruzzet-prosecco-extra-dry`, `drambuie`, `malibu-original`, `magic-moments-remix-green-apple`, `mionetto-valdobbiadene-prosecco-superiore`

### STATE 5 — MISSING, still no photo (0)
_None._ All 102 products have a photo.

## Matches Needing Manual Confirmation (low / medium confidence)
These matched to a catalog product but the vision pass was not certain — verify before acting.

| Confidence | New photo | Matched product | What the label said |
|---|---|---|---|
| medium | WhatsApp Image 2026-07-15 at 12.40.56 (7).jpeg | `savian-anticaterra-prosecco-doc-brut` (Anticaterra Prosecco DOC Brut) | SAVIAN WINEMAKER / ANTICATERRA / PROSECCO DOC / EXTRA DRY |
| low | WhatsApp Image 2026-07-15 at 12.40.58 (3).jpeg | `disaronno-velvet-liqueur` (Disaronno Velvet Liqueur) | DISARONNO Originale - Since 1525 - The World's Favourite Italian Liqueur - Illva Saronno |
| low | WhatsApp Image 2026-07-15 at 12.40.58 (4).jpeg | `mohan-meakin-old-monk-20-amber` (Old Monk 20 Amber) | Very Old Vatted - 7 Years Old Blended - OLD MONK RUM - 700ml - 40% v/v - For Overseas Export Only - Mohan Meakin |

## Orphan Photos (70) — no catalog match
Every new photo that could not be matched to one of the 102 catalog products, with the label text read during inspection and a best guess.

| New photo | What's on the label | Best guess / note |
|---|---|---|
| WhatsApp Image 2026-07-13 at 16.37.26.jpeg | Planeta Controdanza, Sicilia Noto DOC, 2021 red wine (Nero d'Avola/Merlot). Red label with heraldic crest. No matching Planeta Controdanza in catalog. | no catalog product |
| WhatsApp Image 2026-07-13 at 16.37.45.jpeg | Clementina Fabi 'Ceri Centolitri' Rosso Piceno Superiore, organic red wine. Producer Clementina Fabi is in catalog but only for Cri Passerina/Pecorino whites and Passerina spumante; this red Rosso Piceno has no catalog entry. | no catalog product |
| WhatsApp Image 2026-07-13 at 16.38.10.jpeg | Clementina Fabi 'Ceri' Rosso Piceno DOC red wine (cream label variant). Same orphan as above: no red Rosso Piceno product in catalog for this producer. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.25.09.jpeg | Savian Winemaker BIO Refosco dal Peduncolo Rosso, Lison Pramaggiore DOC. Same Savian range/packaging but this varietal is NOT in the catalog (catalog Savian reds are only Bio Merlot). No matching product. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.25.28.jpeg | Savian Winemaker BIO Classico Lison DOCG (Tai/Friulano white). Same Savian range but this wine is NOT in the catalog. No matching product. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.26.02.jpeg | Bisanzio Sangiovese, Italy, red wine, dark green bottle, cream label with copper/tan diagonal geometric motif. Catalog has Bisanzio Chardonnay and Bisanzio Montepulciano d'Abruzzo but no Bisanzio Sangiovese - different grape/product. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.27.10.jpeg | Consoli Nobilterra Chardonnay, white wine, gold/cream label with embossed vine leaf. Producer Consoli is in catalog but this Nobilterra Chardonnay line is not a catalog product (catalog Consoli whites are Saucha Sauvignon-Chardonnay, Pecorino, Ego Falanghina). | no catalog product |
| WhatsApp Image 2026-07-13 at 17.27.33.jpeg | Consoli Nobilterra Falanghina, white wine, light-blue/silver label with embossed vine leaf. Producer Consoli in catalog but Nobilterra Falanghina line differs from catalog's Consoli Ego Falanghina. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.29.05.jpeg | Donnafugata Sul Vulcano Etna Bianco DOC 2022, white wine, staged with wine glass and flowers. Catalog has Donnafugata Sul Vulcano Etna Rosato, not the Bianco - different wine (bianco vs rosato). | no catalog product |
| WhatsApp Image 2026-07-13 at 17.31.05.jpeg | Donnafugata Bell'Assai Vittoria DOC Frappato 2024, red wine, red capsule, illustrated woman label. Producer Donnafugata in catalog but Bell'Assai Frappato is not a catalog product. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.36.21.jpeg | Savian 'Ti Amo' Vino Rosso Biologico, Italy, red wine, red capsule, cream label with red heart and cherubs. Producer Savian is in catalog but 'Ti Amo' is not a catalog product (catalog Savian red is Savian Bio Merlot, a different named label). | no catalog product |
| WhatsApp Image 2026-07-13 at 17.36.54.jpeg | Pasetti 'Rachele' white wine, blue foil capsule, ornate blue/yellow majolica-style label. No Pasetti product in catalog. Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.38.35.jpeg | Pasetti 'Testarossa' Passerina white wine, white capsule, green illustrated label. No Pasetti product in catalog. Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.39.23.jpeg | Pasetti 'Madonnella' Montepulciano d'Abruzzo red wine, dark capsule, cream label. Pasetti not in catalog (catalog Montepulcianos are Palio/Bisanzio/Ferzo/Citra). Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.40.18.jpeg | 'Borghi ad Est' Ribolla Gialla white wine, yellow capsule, blue label with Tuscan farmhouse illustration. No match in catalog. Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.41.24.jpeg | Consoli 'Rubellio' Rosso red wine, red capsule, black label with illuminated 'R'. Producer Consoli is in catalog but 'Rubellio' is not among the Consoli products (Saucha, Pecorino, Ego, Oddoni Cesanese, Ego Falanghina). Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.41.31.jpeg | Back label of Consoli 'Rubellio' Vino Rosso (same product as 17.41.24). Not in catalog. Orphan. | no catalog product |
| WhatsApp Image 2026-07-13 at 17.58.59.jpeg | Ballantine's Finest Blended Scotch Whisky, dark bottle with cream label and crest. No matching catalog product. | no catalog product |
| WhatsApp Image 2026-07-13 at 18.01.58.jpeg | William Lawson's Blended Scotch Whisky, green bottle with kilted-Scotsman illustration. No matching catalog product. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (10).jpeg | Mr. Dowell's No.1 Original blended spirit (whisky), 1 litre amber bottle with crest and pink 'No1' badge. No matching catalog product. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (11).jpeg | Citra Trabocco Rosé Spumante DOC, salmon/rose sparkling wine with magenta foil, round seascape label. Producer Citra is in catalog but this specific Trabocco Rosé Spumante is not a catalog product (catalog Citra items: Caroso Montepulciano Riserva, Moscato Spumante Dolce). | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (4).jpeg | William Lawson's Blended Scotch Whisky, green bottle, white/black label with kilted highlander figure. Next to a wine glass filled with green grapes. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (5).jpeg | Absolut Vodka, clear glass bottle with blue lettering and L.O. Smith medallion. Pink anthurium plant behind. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (6).jpeg | Skyy Vodka, distinctive cobalt blue bottle with white lettering. Pink anthurium plant and street scene behind. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.56 (9).jpeg | Master Blender's Signature Rare aged blended spirit (Indian whisky), dark green bottle, green label, embossed 'Master Blender Signature'. Wine glass with grapes beside. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.57 (1).jpeg | Royal Challenge Finest Premium Blended Spirit (Indian whisky), amber square bottle, red label with gold lion crest. Outdoor street background. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.57 (4).jpeg | Jack Daniel's Tennessee Fire cinnamon liqueur, red label square bottle, next to a black Jack Daniel's cup, outdoors on wooden ledge. Not in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.57 (5).jpeg | Braulio Amaro dello Stelvio, Italian alpine amaro, dark bottle with mountain-scene label. Not in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.57 (9).jpeg | Zwack Unicum Hungarian herbal liqueur, round dark bottle with white UNICUM text and red/gold cross emblem. Not in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (1).jpeg | Avokado Vodka, clear flat oval bottle with a half-avocado image inside, 500ml 40%, beside a wine glass with fake grapes. Not in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (10).jpeg | Mammola Sapori Calabresi Cipolla in Agrodolce (sweet-and-sour onions), a food jar/preserve, not a wine or spirit. Not in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (11).jpeg | Orcio-shaped glass jar of mixed pickled vegetables (peppers, onions) in oil. Producer Mammola Funghi. Food product, not a wine/spirit; no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (12).jpeg | Glass jar of grilled artichokes in oil, Mammola Funghi. Food product, no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (5).jpeg | Two female-torso-shaped bottles: pink Kamasutra Ginseng & Passionfruit and gold Kamasutra Ginseng & Vodka liqueurs. Catalog Kamasutra entries are Red Wine Shiraz and White Wine Sauvignon Blanc (still wines) - these ginseng liqueurs do not match those products. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (6).jpeg | Jar of onion pate, Mammola Funghi. Food product, no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (7).jpeg | Jar of sun-dried tomato pate, Mammola Funghi. Food product, no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (8).jpeg | Glass jar of cut artichokes in oil, Mammola Funghi. Food product, no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58 (9).jpeg | Glass jar of pickled chiodini (honey) mushrooms with bay leaf, Mammola Funghi. Food product, no catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.58.jpeg | Jack Daniel's Gentleman Jack Tennessee whiskey, amber square bottle. No Jack Daniel's / Gentleman Jack entry in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (1).jpeg | Glass jar of preserved mushrooms (Funghi Chiodini / honey fungus) by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (12).jpeg | White wine bottle, Saraja 'Tarra Noa' Vermentino di Gallura DOCG 2025, shown beside a wine glass with green grapes. Producer Saraja not in catalog; distinct from the two catalog Vermentino entries. Orphan. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (2).jpeg | Glass jar of mixed forest mushrooms (Funghi Misti di Bosco) by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (3).jpeg | Glass jar of preserved porcini-type mushrooms (Fungo Porcinello) by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (4).jpeg | Small jar of spicy Calabrian spread 'Viagra's Calabrese' by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (6).jpeg | Small jar of bergamot marmalade (Marmellata di Bergamotto) by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (7).jpeg | Bottle of organic Calabrian tomato passata by Mammola Funghi. Food product, not wine or spirit. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59 (9).jpeg | Saraja 'Libaltai' red wine, Isola dei Nuraghi IGT Carignano, vintage 2023, dark bottle with beige label, cream capsule. Producer Saraja not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.40.59.jpeg | Food product, not a wine/spirit. Mammola brand chili pepper jam/confettura (Dolcezza di Peperoncino) in a glass jar with black lid. No catalog match. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (1).jpeg | Saraja 'Inkibi' Cannonau di Sardegna DOC red wine, vintage 2024, dark bottle with beige label and grey capsule. Producer Saraja not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (12).jpeg | Colle de' Conti 'Hopus' Edizione red wine, black-and-gold ornate label with crest, '96' medallion. Producer/product not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (2).jpeg | Saraja 'Istade' rosato (rose wine), Isola dei Nuraghi IGT, vintage 2024, salmon-pink wine, white label with mountain/wave illustration. Producer Saraja not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (4).jpeg | 'Borghi ad Est' Merlot red wine, red capsule, lavender/lilac label with Tuscan farmhouse and cypress illustration. Producer/product not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (6).jpeg | Colle de' Conti Sauvignon 'Edizione' white wine, cream/ivory embossed label with gold crest, '94' medallion. Producer/product not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.00 (9).jpeg | Saraja 'Kintari' Vermentino di Gallura DOCG Superiore 2024, white wine, cream/white label with mountain line drawing, cream capsule. Producer Saraja / Kintari not in catalog. The only catalog Vermentino is Cantina Santa Maria La Palma Aragosta (different producer, Sardegna not Gallura). Orphan. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.01 (2).jpeg | Castello Banfi Rosso di Montalcino DOC 2023, cream/gold label with vineyard illustration, brown capsule embossed CASTELLO BANFI. Producer Banfi not in catalog. Orphan. | no catalog product |
| WhatsApp Image 2026-07-15 at 12.41.01.jpeg | Consoli Nobilterra Negroamaro red wine, dark burgundy label with gold/purple grape-leaf illustration, black capsule. Producer Consoli is in catalog but this specific product (Nobilterra Negroamaro) is not among the listed Consoli entries (saucha, pecorino, ego, oddoni-cesanese, ego-falanghina). Orphan. | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.25 (1).jpeg | Chinaco Reposado tequila, teardrop-shaped clear glass bottle with amber liquid, red round label. Mexican tequila, not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.25 (2).jpeg | La Grappa 903 Barrique by Bonaventura Maschio, dark bottle with cream label and gold '903'. Italian grappa, not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.25 (3).jpeg | Chivas Regal 12 Year blended Scotch whisky, amber liquid, red/gold shield label. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.26 (4).jpeg | Seven Churches Irish Whiskey, amber liquid, black/gold label. Not in catalog. | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.26.jpeg | Johnnie Walker Double Black blended Scotch whisky, dark bottle, gold stridate label; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.00.27.jpeg | Prime Uve Nere grape distillate (distillato d'uva) by Distilleria Bonaventura Maschio, amber liquid, cork closure, 700ml; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45 (1).jpeg | San Filippo (azienda agricola San Filippo, Offida AP) Cosc'n Falerio Pecorino DOC, 3L bag-in-box, organic; no matching product in catalog (catalog Pecorinos are Consoli/Ferzo/Clementina Fabi) | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45 (2).jpeg | San Filippo Orange Wine Marche IGT Malvasia, 3L bag-in-box, organic; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45 (3).jpeg | San Filippo Marche IGT Chardonnay, 3L bag-in-box, organic; no matching product in catalog (Bisanzio/Savian Chardonnay are bottles, different producer) | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45 (4).jpeg | San Filippo Marche IGT Syrah aged in oak, 3L bag-in-box, organic; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45 (5).jpeg | San Filippo Marche IGT Rosato, 3L bag-in-box, organic; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.45.jpeg | San Filippo Marche IGT Sangiovese, 3L bag-in-box, organic; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.46 (1).jpeg | San Filippo Marche IGT Rosso, 3L bag-in-box, organic; no matching product in catalog | no catalog product |
| WhatsApp Image 2026-07-15 at 18.03.46.jpeg | San Filippo Marche IGT Bianco, 3L bag-in-box, organic; no matching product in catalog | no catalog product |

## Broken References
**None.** All 102 products reference an `image` file that exists on disk under `public/products/`.


## Orphan Breakdown (for triage)

The 70 orphans fall into three clearly different buckets:

**A. Additional Italian wines — 35 photos (likely NEW catalogue products).**
New SKUs/vintages from wineries and lines adjacent to what the shop already sells. These are the highest-value orphans — they look like inventory the client wants *added*, not photo swaps. Includes:
- New producers not yet in the catalogue: **Pasetti** (Rachele, Testarossa Passerina, Madonnella), **Saraja** (Tarra Noa, Libaltai, Inkibi, Istade, Kintari — Sardinian range), **Colle de' Conti** (Hopus, Sauvignon Edizione), **Borghi ad Est** (Ribolla Gialla, Merlot), **San Filippo** (8× 3-litre bag-in-box: Falerio Pecorino, Malvasia orange, Chardonnay, Syrah, Rosato, Sangiovese, Rosso, Bianco).
- New lines from producers already in the catalogue: **Consoli** Nobilterra (Chardonnay, Falanghina, Negroamaro) + Rubellio Rosso (front+back); **Savian** Refosco, Classico Lison DOCG, "Ti Amo" Rosso; **Donnafugata** Sul Vulcano Etna Bianco + Bell'Assai Frappato; **Bisanzio** Sangiovese; **Planeta** Controdanza; **Clementina Fabi** "Cerì" Rosso Piceno (×2); **Citra** Trabocco Rosé Spumante.

**B. Mainstream imported spirits & other bottles — 21 photos (client decision to add or ignore).**
Whisky/vodka/etc. not currently stocked in the catalogue: Ballantine's, William Lawson's (×2), Chivas Regal 12, Johnnie Walker Double Black, Jack Daniel's Tennessee Fire & Gentleman Jack, Seven Churches Irish, Mr. Dowell's No.1, Master Blender's Signature, Royal Challenge, Absolut, Skyy, Avokado Vodka, Braulio Amaro, Zwack Unicum, Kamasutra ginseng liqueur (torso bottles — distinct from the two Kamasutra *wines* in the catalogue), Castello Banfi Rosso di Montalcino, Chinaco Reposado tequila, plus Bonaventura Maschio grappa (La Grappa 903 Barrique, Prime Uve Nere).

**C. Mammola food preserves — 14 photos (not wine/spirits).**
Jars/bottles of mushrooms, artichokes, onion pâté, giardiniera, marmalade, chili jam, tomato passata under the "Mammola" Calabrian-foods brand. These are a food line, not part of the drinks catalogue (and not "accessori"). Park unless the client wants a deli section.

## Recommendations

1. **REPLACE (62 products) — safe to proceed, but spot-check.** Each has exactly one clean high-confidence new photo. These are almost certainly straight quality upgrades of the existing `public/products/<slug>.jpeg`. The current photos and the new ones both come from the same client WhatsApp source, so confirm the new shot is actually *better* (framing/lighting) before overwriting — a few may be lateral, not upgrades.

2. **ADD candidates (11 products) — manual decision, replace-vs-gallery.** These products matched *two* new photos (typically front + back label, or two angles). Decide per-product whether to (a) pick the best single shot as the new hero, or (b) extend the schema to a gallery. Note: `data/productData.ts` currently models a single `image: string` per product — supporting galleries needs a schema change (`images: string[]`) plus `<BottleImage>` updates. Flagged pairs include Planeta La Segreta Rosso, Pico Maccario Estrosa, Marchesi di Barolo Michet, Savian Mybrid, Ferzo Pecorino, Ferzo Montepulciano Teate.

3. **Confirm the 3 low/medium matches before acting:** Disaronno (new photo reads "Originale" vs catalogue's `disaronno-velvet-liqueur` — may be a *different* product, not a replacement); Old Monk (new "7yr" vs catalogue `old-monk-20-amber`); Savian Anticaterra "Extra Dry" vs the `savian-prosecco-brut`/`-rose` lines. Each could be an orphan/new-product rather than a swap.

4. **Bucket A orphans (35) are the real find — treat as a catalogue-expansion queue.** These aren't naming problems; they're bottles the shop stocks that have no catalogue entry. Recommend a follow-up task: create products for the new Italian wines (Pasetti, Saraja, Colle de' Conti, San Filippo bag-in-box, plus the new Consoli/Savian/Donnafugata/Bisanzio/Planeta/Citra lines), reading prices off the tags in the same photos where visible.

5. **Bucket B (21) is a business decision** — whether Il Tempio di Vino wants mainstream imported spirits in the online catalogue at all. No action until the client says so.

6. **Bucket C (14 Mammola food jars) — out of scope** for the drinks catalogue. Do not shoehorn into `accessori`. Ignore unless a deli/gastronomia section is planned.

7. **No renaming will help.** Because every new file is an undated WhatsApp export name, there is no filename convention to fix — matching will always require visual inspection. If the client can re-export with product names, future audits get far cheaper.

## Files produced by this audit (read-only)

- `/tmp/existing-photos-inventory.json` — 102 catalog products, image paths, on-disk check
- `/tmp/new-photos-inventory.json` — 154 new photos, size + dimensions
- `/tmp/photo-matching.json` — every new photo → matched product, confidence, label text
- `/tmp/product-categorization.json` — the 5-state classification
- `/PHOTO_AUDIT_REPORT.md` — this report

_Zero project files were modified. `productData.ts`, `public/products/`, and `Wine-Content-New/` were treated as read-only._
