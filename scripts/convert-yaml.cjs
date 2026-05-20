#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function yamlFileToJson(srcPath) {
  const text = fs.readFileSync(srcPath, "utf-8");
  const doc = yaml.load(text);
  if (!Array.isArray(doc)) {
    console.error(`Expected a YAML array in ${srcPath}`);
    process.exit(1);
  }
  return doc;
}

function buildAll() {
  const rawDir = path.join(__dirname, "..", "data", "raw");
  const dataDir = path.join(__dirname, "..", "data");

  for (const file of fs.readdirSync(rawDir)) {
    if (!file.endsWith(".yaml") && !file.endsWith(".yml")) continue;
    const src = path.join(rawDir, file);
    const dst = path.join(dataDir, file.replace(/\.ya?ml$/, ".json"));
    const records = yamlFileToJson(src);
    fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
    console.log(`Built ${path.basename(dst)} from ${records.length} YAML records`);
  }
}

// Standalone: run conversion when executed directly
if (require.main === module) {
  buildAll();
}

module.exports = { yamlFileToJson, buildAll };
