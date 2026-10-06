# HDAdvisors website

Hugo site with Sveltia CMS, replacing the Wix site. This is an early scaffold: the content and editing workflow function, but there's no real design yet.

## Quick start

1. Install Hugo Extended (one time): `winget install Hugo.Hugo.Extended`
2. From this folder, run `hugo server`
3. Open http://localhost:1313 for the site, or http://localhost:1313/admin/ for the CMS

**Editing in the CMS locally:** open `/admin/` in Chrome or Edge, click **Work with Local Repository**, and choose this project folder. Edits save directly to the files in `content/`, and the running `hugo server` refreshes the site. No GitHub login needed. Commit the changes with git afterward.

## Where content lives

| Page | File(s) | Notes |
|---|---|---|
| Home | `content/_index.md` | Headline, subhead, track record in front matter; intro in the body. "Services at a glance" pulls each category's `summary`; contact block pulls from the Contact page. |
| About | `content/about.md` | Placeholder text |
| Staff | `content/staff/_index.md`, one file per person in `content/staff/` | Fields: `title` (name), `position`, `photo`, `weight` (sort order); body is the bio. Placeholder text. |
| Services | `content/services/_index.md` (intro + closing section), one file per category | Category fields: `summary` (used on Home), `offerings` list, `weight`. Categories render inline on /services/ only, not as their own pages. |
| Blog | `content/blog/` | One placeholder post |
| Contact | `content/contact.md` | `address`, `email`, `phone` in front matter. Single source for the site's contact info. |

Templates are in `themes/hda/layouts/` (a lightly modified `hugo new theme` skeleton). CMS config is `static/admin/config.yml`.

`home.txt` and `services.txt` are the original draft copy the content files were built from.

## What works and what's stubbed

**Works:** all six pages build and render with real Home and Services copy. The CMS loads at `/admin/`, has collections for pages, service categories, staff, and blog posts, and can edit local files.

**Stubbed or missing:**

- **Design.** Unstyled HTML from Hugo's default theme skeleton.
- **Hosting.** Not deployed anywhere. `baseURL` in `hugo.yaml` is set to the production domain but nothing serves it.
- **Old GitHub Pages site.** This repo previously held an unfinished Quarto site, and GitHub Pages still serves it from `/docs` on `main` at https://hdadvisors.github.io/hda-website/. This branch deletes `/docs`, so merging into `main` breaks that URL. Before merging, turn Pages off in the repo settings or switch its source to a GitHub Actions workflow that builds Hugo.
- **CMS auth.** `backend.repo` in `config.yml` points at `hdadvisors/hda-website`, but GitHub sign-in won't work until there's an OAuth app. Local-repository mode is the only working path.
- **Images.** No photos or image processing. Staff pages show a "Photo coming soon" placeholder; CMS uploads go to `static/images/uploads/` unprocessed.
- **Placeholder copy.** About, Staff bios and job titles, the Staff intro, and the blog post.

## Next steps

1. Decide what happens to the old GitHub Pages site (see above) before merging `hugo-sveltia` into `main`
2. Set up hosting (Netlify or Cloudflare Pages) and a GitHub OAuth app for CMS sign-in
3. Visual design: build out the `hda` theme's CSS and templates
4. Real About and Staff content, staff photos, and an image pipeline (Hugo image processing)
5. Migrate Wix content and set redirects for old URLs
