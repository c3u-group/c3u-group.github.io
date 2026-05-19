# C³U Group — 清洁燃烧与碳循环利用团队

Website for the Clean Combustion & Carbon Cycle Utilization research group at Huazhong University of Science and Technology.

Built with Next.js 16, statically exported to GitHub Pages.

## Getting started

```bash
npm install
npm run dev      # http://localhost:13000
```

## Build

```bash
npm run build    # converts JSONL → JSON, then builds static export to ./out
```

## Data

Content authoring is done in JSONL under `data/raw/` — line-by-line diffs, append-only additions:

- `data/raw/news.jsonl` — news items
- `data/raw/aminodb.jsonl` — amino absorbent database

A `prebuild` hook runs `scripts/build-db.cjs` which converts all `.jsonl` in `data/raw/` to `.json` in `data/`. Run it standalone with `npm run build:db`. The generated `.json` files are gitignored.
