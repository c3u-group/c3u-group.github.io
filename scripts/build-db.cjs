#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const rawDir = path.join(__dirname, "..", "data", "raw");
const dataDir = path.join(__dirname, "..", "data");

const files = fs.readdirSync(rawDir).filter((f) => f.endsWith(".jsonl"));

for (const file of files) {
  const src = path.join(rawDir, file);
  const dst = path.join(dataDir, file.replace(/\.jsonl$/, ".json"));

  const text = fs.readFileSync(src, "utf-8").trim();
  if (!text) {
    console.log(`Skipping ${file} (empty)`);
    continue;
  }

  const lines = text.split("\n").filter(Boolean);
  const records = lines.map((line, i) => {
    try {
      return JSON.parse(line);
    } catch {
      console.error(`Invalid JSONL in ${file} at line ${i + 1}: ${line.slice(0, 80)}...`);
      process.exit(1);
    }
  });

  fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
  console.log(`Built ${path.basename(dst)} from ${records.length} JSONL records`);
}
