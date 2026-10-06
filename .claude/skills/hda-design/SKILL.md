---
name: hda-design
description: Design system for HDAdvisors (HDA), a Virginia housing & community-development consultancy. Use when building or editing any HDA web page, Hugo template, or HTML/CSS component — it defines tokens, hda-* components, type, color and accessibility rules.
---

# Designing for HDAdvisors (web)

HDA is a Virginia housing consultancy. Content is **document-shaped and data-rich** (briefs, assessments, fact sheets). Design must read as **credible, civic, useful** — not flashy.

## Files in this repo
Paths are relative to `themes/hda/`. The design system was exported from Claude Design; `assets/css/hda/` is that export's CSS, copied unedited.

| What | Where | Notes |
|---|---|---|
| Design-system CSS | `assets/css/hda/` (`tokens.css`, `base.css`, `layout.css`, `components/*.css`, `main.css`) | **Never edit.** To update, re-export from Claude Design and overwrite the folder. |
| Site CSS | `assets/css/site.css` | All site-specific styles. Imported after `hda/`. |
| CSS entry | `assets/css/main.css` | `@import "hda/main.css"; @import "site.css";` Built with `css.Build` in `layouts/_partials/head/css.html`. |
| Fonts | `static/css/fonts.css`, `static/fonts/` | Self-hosted TTF. Linked separately in `head/css.html` so `../fonts/` paths resolve. Lato Thin/Light aren't shipped. |
| Mobile menu | `assets/js/header.js` | Loaded with `defer` in `head/js.html`. |
| Logos | `static/images/logos/` | `logo-primary.png`, `logo-white.png`, `icon-{blue,white,yellow}.png` |
| Map patterns | `assets/images/patterns/map-{blue,coral,green,yellow}.jpg` | ~1 MB, 1501px wide. Always resize through Hugo (below); never link the JPG directly or upscale. |
| Reference | `design-system/` (repo root) | Export README, component previews, brand PDFs. Preview HTML doesn't render from this folder. |

Pattern hero (Hugo resizes to WebP):
```go-html-template
{{ with resources.Get "images/patterns/map-blue.jpg" }}
  {{ $sm := .Resize "800x webp q70" }}{{ $lg := .Resize "1500x webp q70" }}
  <img class="hda-hero__bg" alt="" src="{{ $lg.RelPermalink }}" srcset="{{ $sm.RelPermalink }} 800w, {{ $lg.RelPermalink }} 1500w" sizes="100vw" fetchpriority="high">
{{ end }}
```

## Rules
- **Never invent hex values.** Use tokens from `assets/css/hda/tokens.css`; derive with `color-mix()` if truly needed.
- **All classes are prefixed `hda-`**, BEM-style: `hda-card`, `hda-card__title`, `hda-card--link`. Site-specific classes in `site.css` follow the same pattern.

## Components (`assets/css/hda/components/`)
| Class | Use |
|---|---|
| `hda-btn` + `--primary \| --secondary \| --accent \| --ghost \| --outline-light`, `--sm \| --lg` | `<a>` or `<button>`. Yellow `--accent` = one CTA per page. Never solid coral. |
| `hda-chip` + `--blue \| --green \| --yellow \| --coral`, `--dot` | Tags. Text stays dark; hue is in the tint/dot. |
| `hda-card` (`__icon __title __body __meta __more`) + `--raised \| --link \| --compact` | Services, clients, posts. `--link` makes the whole card clickable via `__more`. |
| `hda-stat` (`__value __suffix __label __delta`) + `--coral \| --green \| --yellow` | Big-number cards. Use `hda-eyebrow` for the label. |
| `hda-callout` (`__title __body`) + `--info \| --success \| --warning \| --danger` | Notes, methodology, status messages. |
| `hda-pullquote`, `hda-quote-band` | Inline quote / full-width dark quote section. |
| `hda-facts` | `<dl>` key/value metrics. |
| `hda-table-wrap` > `hda-table` (`__num`) | Data tables; `<caption>` becomes the blue band. |
| `hda-field` (`__label __control __hint __error`) + `--error` | Forms. Always pair label `for`/`id`; errors via `aria-describedby`. |
| `hda-header`, `hda-footer` | Site chrome. Mobile menu: `<button class="hda-header__toggle" aria-controls="site-nav">` + `assets/js/header.js` (without JS, nav renders open). CTA moves into the menu on mobile. |
| `hda-hero` (`__bg __inner __title __lead __actions`) + `--paper` | Pattern hero. Put the map JPG in `<img class="hda-hero__bg" alt="">`. |
| `hda-prose` (+ `--lg`) | Wrap Markdown `{{ .Content }}` — styles headings, lists, quotes, tables, figures, code, footnotes. |

Layout: `hda-container` (`--narrow` 880 / `--wide` 1320), `hda-section` (`--paper \| --dark \| --flush-top`, `__head`), `hda-grid` (`--2 \| --3 \| --4`, auto-fit, no breakpoints needed), `hda-split`, `hda-stack`, `hda-cluster`. Utilities: `hda-eyebrow`, `hda-lead`, `hda-on-dark`, `hda-visually-hidden`, `hda-skip-link`.

## Color
- **Blue is the anchor** (`--hda-blue`; `--hda-blue-dk` for hover and headings). Coral/yellow = emphasis; green = cool support. A page = blue + 1–2 accents + creams/grays.
- **Paper** (`--hda-cream-lt`, `#faf6ec`) is the long-form surface; white for cards. Alternate Paper/white sections only.
- **Dark sections:** add `hda-section--dark` / `hda-on-dark`. It re-points `--color-ink`, `--color-heading`, `--color-eyebrow`, `--color-link`, `--color-border`, `--color-action`, so headings, links, eyebrows and `--secondary`/`--ghost` buttons adapt automatically.
- **Light surfaces inside dark scopes** (card, stat, callout, pullquote, facts, table-wrap, field, form-grid, `hero--paper`) reset those roles to light values. For any other white box inside a dark section, add `hda-on-light`.
- **Components use role tokens** (`--color-link`, `--color-heading`, `--color-eyebrow`, `--color-action`), not raw `--hda-blue`, for anything that should flip.
- **Status:** `--color-{info,success,warning,danger}-{bg,border}`. Text on those tints is always `--color-ink`.
- Overlays on map patterns: `--overlay-blue-from/to`, `--overlay-paper-from/to`.

## Type
- Headings: Roboto Slab (fluid sizes `--text-fluid-*`); subheads/leads/quotes: Gelasio italic (`--font-subhead`); body/UI: Lato, min 16px (14px metadata, 12px only for eyebrows/legal).
- Weights: `--weight-regular` 400, `--weight-semibold` 600 (serifs only), `--weight-bold` 700, `--weight-black` 900. No 500 — Lato doesn't have it.
- Data viz: `--viz-1…7` are safe for lines/points on white; `--viz-8` is fills only.
- **Museo 500 is logo-only.** Never in UI.
- `text-wrap: balance` on headings and `pretty` on paragraphs are in base.

## Accessibility (verified ratios on white, approx.)
- ✓ text: `--hda-blue` 6.3, `--hda-coral-dk` 5.2, `--hda-green-dk` 4.9, `--color-ink-muted` 4.9 (4.6 on Paper).
- ✗ never as text: `--hda-yellow`, `--hda-yellow-dk` (3.7), `--hda-green`, `--hda-coral` (3.1, large only), `--color-ink-subtle` / `--hda-gray-md` (2.3 — decorative only).
- White text on coral or yellow-dk fails — use `--hda-blue-dk` on yellow.
- Focus = 2px outline (`--focus-ring`), yellow on dark. Never remove it. Targets ≥ 44px (`min-height: 2.75rem`).
- Respect `prefers-reduced-motion` (handled in base) and provide `hda-skip-link`.
- Field borders use `--color-field-border` (3:1+).

## Imagery
No stock library. Use real Virginia housing/community photos, the Richmond map patterns (full-bleed with overlay, **never behind body text**), and data tables/figures. Avoid generic stock, AI illustrations and decorative emoji.

## Content-model hints (Sveltia/Hugo)
Keep CMS fields to what components render: card = icon, title, 1–2 sentence body, link; stat = label, value, suffix, caption, optional delta; hero = eyebrow, title (one `<em>` span allowed), lead, ≤2 CTAs. Long-form body goes in Markdown → `hda-prose`.

## Reference
Richmond Regional Housing Framework (hdadvisors.github.io/rrh-framework) — clearest example of HDA voice and rhythm. `design-system/ui-kit.html` shows the markup for every component in context (read its source; it doesn't render from that folder).
