#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const { stringify } = require("csv-stringify/sync");

const headers = ["id", "title", "description", "author", "image", "date", "categories", "extern_url"];

function preprocess(srcPath, dstPath) {
  const text = fs.readFileSync(srcPath, "utf-8").trim();
  if (!text) return [];

  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    relax_column_count: true,
  });

  const records = rows.map((row) => {
    const r = {};
    for (const h of headers) {
      r[h] = row[h] || "";
    }
    return r;
  });

  const csvOut = stringify(records, { header: true, columns: headers });

  const dir = path.dirname(dstPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dstPath, csvOut, "utf-8");
  return records;
}

function main() {
  const rawDir = path.join(__dirname, "..", "data", "raw");
  const processedDir = path.join(__dirname, "..", "data", "processed");
  const src = path.join(rawDir, "news.csv");
  const dst = path.join(processedDir, "news.csv");
  const records = preprocess(src, dst);
  console.log(`Preprocessed news: ${records.length} records → ${dst}`);
}

if (require.main === module) {
  main();
}

module.exports = { preprocess };
