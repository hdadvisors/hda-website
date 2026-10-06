# HDAdvisors Design System

A design system for **HDAdvisors** (Housing & Development Advisors), a Virginia-based consulting firm serving affordable housing developers, non-profits, housing authorities, local governments, and lenders across the Mid-Atlantic.

The system is rooted in the firm's existing brand — logos, map patterns, and an expanded color palette authored by Jolinda (Shapes & Colors, 2022) — and extended here with tokens, type, components, and patterns suitable for research briefs, housing needs assessments, data-rich reports, and web surfaces.

---

## What's in here

| Path | Purpose |
|---|---|
| `css/tokens.css` | Tokens only (custom properties) — import first |
| `css/fonts.css` | Self-hosted @font-face (Lato, Roboto Slab) — link separately |
| `css/base.css`, `css/layout.css` | Reset/element defaults, dark scope, utilities; container/section/grid |
| `css/components/*.css` | `hda-*` components (button, chip, card, stat, callout, facts, table, form, header, footer, hero, prose) |
| `css/main.css` | Hugo entry — `@import`s everything except fonts |
| `js/header.js` | Mobile-menu toggle (progressive enhancement; ~10 lines) |
| `styles.css` | Design-system entry for previews (fonts + main) |
| `SKILL.md` | Usage rules, component vocabulary, accessibility |
| `ui-kit.html`, `preview/` | Full-page kit + component cards |
| `assets/`, `fonts/` | Logos, Richmond map patterns, original PDFs; TTFs |

## Hugo integration

```
themes/hda/assets/css/   ← copy css/* (main.css, tokens.css, base.css, layout.css, components/)
themes/hda/static/css/fonts.css   ← css/fonts.css
themes/hda/static/fonts/          ← fonts/*.ttf
themes/hda/assets/js/header.js    ← js/header.js
themes/hda/assets/images/patterns/ ← assets/patterns/*.jpg   (processed by Hugo — not static/)
themes/hda/static/images/logos/   ← assets/logos/*.png
```
```go-html-template
<link rel="stylesheet" href="/css/fonts.css">
{{ $css := resources.Get "css/main.css" | css.Build (dict "minify" true) | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
```
Pattern hero (Hugo resizes the 1MB JPG to WebP):
```go-html-template
{{ with resources.Get "images/patterns/map-blue.jpg" }}
  {{ $sm := .Resize "800x webp q70" }}{{ $lg := .Resize "1500x webp q70" }}
  <img class="hda-hero__bg" alt="" src="{{ $lg.RelPermalink }}" srcset="{{ $sm.RelPermalink }} 800w, {{ $lg.RelPermalink }} 1500w" sizes="100vw" fetchpriority="high">
{{ end }}
```
Source JPGs are 1501px wide; under the 82–94% overlay that's sufficient — don't upscale.

Header script:
```go-html-template
{{ with resources.Get "js/header.js" | minify | fingerprint }}<script src="{{ .RelPermalink }}" defer></script>{{ end }}
```

`fonts.css` uses `../fonts/` so it resolves to `/fonts/` from `/css/`. Roboto Slab, Lato and Gelasio (upright + italic variable fonts) are all self-hosted. Alternative: Google Fonts `<link>`. Open item: ship WOFF2 (currently TTF).

---

## Brand pillars

**Mission.** Turn complex housing policy, data, and development questions into clear, actionable guidance.

**Tone.** Grounded, civic-minded, evidence-led. Serious without being stuffy — reports often include scenario modeling and data visualization, so density is expected, but clarity is non-negotiable.

**Visual DNA.**
- Warm creams + paper surfaces (reports, fact sheets, policy briefs)
- Muted primary blue anchor + a four-color categorical palette (blue, green, yellow, coral)
- Map patterns used sparingly as atmospheric backgrounds
- Typography pairs a slab serif voice (Roboto Slab / Gelasio) with a friendly neo-grotesque (Lato)

---

## Color

**Four core brand colors** plus light/dark tints, three grays, and three creams. Use blue as the primary; coral and yellow for emphasis and data viz; green as a supporting cool. Creams are the preferred long-form-document background — softer than pure white, still print-safe.

Full ramp and semantic aliases live in `tokens.css`. A data-viz ramp (`--viz-1` through `--viz-8`) keeps categorical charts on-brand; 1–7 clear 3:1 on white, `--viz-8` is fills only.

## Type

- **Headings:** Roboto Slab
- **Subheads:** Gelasio italic (Georgia-metric serif) pairs with Roboto Slab heads
- **Body:** Lato — Corbel as a Windows-safe fallback. Weights 400 / 700 / 900 only (no 500).
- **Logo wordmark only:** Museo 500 (licensed; not used in UI)

## Patterns

Four Richmond-map JPGs (blue, coral, green, yellow). Use as full-bleed hero backgrounds with a cream or dark overlay — never behind body copy.

---

## Quick start

```html
<link rel="stylesheet" href="styles.css" />
<section class="hda-hero">…</section>
<div class="hda-grid hda-grid--3"><article class="hda-card">…</article></div>
```

See `ui-kit.html` for every component and `SKILL.md` for the rules.
