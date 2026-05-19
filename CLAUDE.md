# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on port 13000
npm run build    # prebuild (jsonl→json) then static export to ./out
npm run build:db # jsonl→json conversion only
npm run lint     # ESLint (next/core-web-vitals + typescript)
```

## Architecture

Next.js 16 App Router site for the C³U research group (清洁燃烧与碳循环利用). Configured for **static export** (`output: "export"`) and deployed to GitHub Pages via `.github/workflows/nextjs.yml` (triggers on push to `master`).

**Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`. Font Awesome Free 7.1 for icons. Geist sans/mono via `next/font/google`.

### Directory structure

```
app/                    # Next.js App Router pages
components/
  ui/                   # Shared primitives: Section, SectionHeader
  sections/             # Homepage section components (one per nav item)
  cards/                # Reusable card components (NewsCard, TeacherCard, MemberMarquee, TeacherDetail)
  Header.tsx            # Fixed nav bar with scroll-aware section highlighting
  AppShell.tsx           # Layout shell: Header + main content
data/
  raw/                  # JSONL source files (news, aminodb) — hand-edited
  *.json                # Generated JSON (via prebuild) + hand-edited (members, links, about, research)
public/
  res/                  # Images and runtime assets
  data/                 # Runtime-accessed JSON (aminodb.json)
  index_photo/          # Hero slideshow images
types.ts               # Shared TypeScript types (NewsItem, Member, etc.)
```

### Component pattern

**Server/client split** for routes:
- `page.tsx` — server component, exports metadata, renders the sibling client component
- `*Client.tsx` — `"use client"` component with interactive logic

**Section components** use shared `<Section>` and `<SectionHeader>` primitives from `components/ui/`. Static sections (About, Contact, Links, Research) are server components. Interactive sections (General, NewsPreview, Members) are client components.

### Data flow

All content is static JSON in `data/`:
- `news.json` — news items (generated from `data/raw/news.jsonl`); displayed newest-first via `.slice().reverse()` in consumers
- `aminodb.json` — amino acid database (generated from `data/raw/aminodb.jsonl`)
- `members.json` — teacher/doctor/master/alumni arrays
- `about.json` — research areas, quick facts, progress items, roadmap
- `links.json`, `research.json` — link lists

`prebuild` hook runs `scripts/build-db.cjs` which converts all `.jsonl` files in `data/raw/` to `.json` in `data/`.

API: `/api/index-photos` returns the list of filenames in `public/index_photo/` for the hero slideshow.

### Routes

- `/` — single-page scroll homepage with 7 sections
- `/news/` — filtered news listing (tag, date range, text search)
- `/research/databases/` — amino acid database with search/detail panels
- `/games/weigh/` and `/games/drumming/` — interactive games

### Key patterns

- `@/*` path alias maps to repo root
- `next/image` is unoptimized (static export requirement)
- Dark mode via `prefers-color-scheme` media query + Tailwind `dark:` variants
- Header scroll tracking uses `requestAnimationFrame` throttling and section `offsetTop` comparison
