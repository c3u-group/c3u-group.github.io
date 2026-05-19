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

Content is stored as JSONL in `data/` for easy editing. Appending a record is just adding a line:

- `data/news.jsonl` — news items
- `data/aminodb.jsonl` — amino absorbent database

The `build:db` script converts all `.jsonl` files to `.json` before each build. The generated `.json` files are gitignored.
