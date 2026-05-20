#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function jsonlFileToJson(srcPath) {
  const text = fs.readFileSync(srcPath, "utf-8").trim();
  if (!text) return [];
  const lines = text.split("\n").filter(Boolean);
  return lines.map((line, i) => {
    try {
      return JSON.parse(line);
    } catch {
      console.error(`Invalid JSONL in ${srcPath} at line ${i + 1}: ${line.slice(0, 80)}...`);
      process.exit(1);
    }
  });
}

function buildAll() {
  const rawDir = path.join(__dirname, "..", "data", "raw");
  const dataDir = path.join(__dirname, "..", "data");

  for (const file of fs.readdirSync(rawDir)) {
    if (!file.endsWith(".jsonl")) continue;
    const src = path.join(rawDir, file);
    const dst = path.join(dataDir, file.replace(/\.jsonl$/, ".json"));
    const records = jsonlFileToJson(src);
    fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
    console.log(`Built ${path.basename(dst)} from ${records.length} JSONL records`);
  }
}

if (require.main === module) {
  buildAll();
}

module.exports = { jsonlFileToJson, buildAll };
