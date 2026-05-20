#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

function coerceValue(val) {
  if (typeof val !== "string") return val;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed === "null" || trimmed === "NULL") return null;
  try { return JSON.parse(trimmed); } catch {}
  const n = Number(trimmed);
  if (!isNaN(n) && trimmed !== "") return n;
  return val;
}

function csvFileToJson(srcPath) {
  const text = fs.readFileSync(srcPath, "utf-8").trim();
  if (!text) return [];
  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    relax_column_count: true,
  });
  return rows.map((row) => {
    const out = {};
    for (const [k, v] of Object.entries(row)) {
      out[k] = coerceValue(v);
    }
    return out;
  });
}

function buildAll() {
  const rawDir = path.join(__dirname, "..", "data", "raw");
  const dataDir = path.join(__dirname, "..", "data");

  for (const file of fs.readdirSync(rawDir)) {
    if (!file.endsWith(".csv")) continue;
    const src = path.join(rawDir, file);
    const dst = path.join(dataDir, file.replace(/\.csv$/, ".json"));
    const records = csvFileToJson(src);
    fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
    console.log(`Built ${path.basename(dst)} from ${records.length} CSV records`);
  }
}

if (require.main === module) {
  buildAll();
}

module.exports = { csvFileToJson, buildAll };
