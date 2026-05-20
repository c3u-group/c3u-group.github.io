#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const headerMap = {
  "Item Type": "item_type",
  "Publication Year": "publication_year",
  "Author": "author",
  "Title": "title",
  "Publication Title": "publication_title",
  "DOI": "doi",
  "Abstract Note": "abstract_note",
  "Date": "date",
  "Manual Tags": "keywords",
};

const { stringify } = require("csv-stringify/sync");

function preprocess(srcPath, dstPath) {
  const text = fs.readFileSync(srcPath, "utf-8");
  if (!text.trim()) return [];

  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    relax_column_count: true,
  });

  const records = rows.map((row) => {
    const r = {};
    for (const [oldKey, newKey] of Object.entries(headerMap)) {
      r[newKey] = row[oldKey] || "";
    }
    return r;
  });

  records.sort((a, b) => {
    const yearDiff = (parseInt(b.publication_year, 10) || 0) - (parseInt(a.publication_year, 10) || 0);
    if (yearDiff !== 0) return yearDiff;

    const parseDate = (d) => {
      const parts = (d || "").split("/");
      if (parts.length === 3) return new Date(+parts[0], +parts[1] - 1, +parts[2]);
      return new Date(0);
    };
    return parseDate(b.date) - parseDate(a.date);
  });

  // Drop date — not used on page
  for (const r of records) delete r.date;

  const cleanHeaders = Object.values(headerMap).filter((h) => h !== "date");
  const csvOut = stringify(records, { header: true, columns: cleanHeaders });

  const dir = path.dirname(dstPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dstPath, csvOut, "utf-8");
  return records;
}

function main() {
  const rawDir = path.join(__dirname, "..", "data", "raw");
  const processedDir = path.join(__dirname, "..", "data", "processed");
  const src = path.join(rawDir, "journal.csv");
  const dst = path.join(processedDir, "journal.csv");
  const records = preprocess(src, dst);
  console.log(`Preprocessed journal: ${records.length} records → ${dst}`);
}

if (require.main === module) {
  main();
}

module.exports = { preprocess };
