#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { preprocess: preNews } = require("./preprocess-news.cjs");
const { preprocess: preJournal } = require("./preprocess-journal.cjs");
const { csvFileToJson } = require("./convert-csv.cjs");
const { jsonlFileToJson } = require("./convert-jsonl.cjs");
const { yamlFileToJson } = require("./convert-yaml.cjs");

const rawDir = path.join(__dirname, "..", "data", "raw");
const processedDir = path.join(__dirname, "..", "data", "processed");
const dataDir = path.join(__dirname, "..", "data");

// Step 1: Preprocess — data-specific header renaming, sorting, filtering
const preprocessors = {
  "news.csv": preNews,
  "journal.csv": preJournal,
};

for (const [file, fn] of Object.entries(preprocessors)) {
  const src = path.join(rawDir, file);
  const dst = path.join(processedDir, file);
  if (!fs.existsSync(src)) {
    console.log(`Skipping ${file} (not found in raw/)`);
    continue;
  }
  fn(src, dst);
}

// Step 2: Convert — general format-to-format, no data knowledge
const converters = {
  ".csv": { fn: csvFileToJson, dir: processedDir },
  ".jsonl": { fn: jsonlFileToJson, dir: rawDir },
  ".yaml": { fn: yamlFileToJson, dir: rawDir },
  ".yml": { fn: yamlFileToJson, dir: rawDir },
};

for (const [ext, { fn, dir: srcDir }] of Object.entries(converters)) {
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.endsWith(ext)) continue;
    const src = path.join(srcDir, file);
    const dst = path.join(dataDir, file.replace(ext, ".json"));
    const records = fn(src);
    if (!records.length) {
      console.log(`Skipping ${file} (empty)`);
      continue;
    }
    fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
    console.log(`Built ${path.basename(dst)} from ${records.length} records`);
  }
}
