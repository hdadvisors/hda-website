# CLAUDE.md

Hugo site (theme `themes/hda`, built from `hugo new theme`) with Sveltia CMS at `static/admin/`. See README.md for the content map.

- Run: `hugo server` (port 1313). Hugo Extended v0.146+ required (new template system: `layouts/home.html`, `page.html`, `section.html`, `<type>/page.html`).
- **Keep `static/admin/config.yml` in sync with front matter.** Any new or renamed front matter field needs a matching CMS field, or editors can't see it.
- Contact info has one source: `content/contact.md`. Service summaries on Home come from `content/services/*.md`.
- Service category pages have `build.render: never` (cascaded from `content/services/_index.md`); they exist only to feed /services/ and Home.
