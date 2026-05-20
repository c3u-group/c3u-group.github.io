#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const rawDir = path.join(__dirname, "..", "data", "raw");
const dataDir = path.join(__dirname, "..", "data");

const entries = fs.readdirSync(rawDir);

for (const file of entries) {
  const src = path.join(rawDir, file);
  const ext = path.extname(file);

  if (ext === ".jsonl") {
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
  } else if (ext === ".csv") {
    const dst = path.join(dataDir, file.replace(/\.csv$/, ".json"));
    const text = fs.readFileSync(src, "utf-8");
    if (!text.trim()) {
      console.log(`Skipping ${file} (empty)`);
      continue;
    }

    const rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
      relax_column_count: true,
    });

    const cols = Object.keys(rows[0] || {});

    if (cols.includes("extern_url")) {
      // news CSV
      const records = rows.map((row) => ({
        id: parseInt(row.id, 10) || 0,
        title: row.title || "",
        description: row.description || "",
        author: row.author || "",
        image: row.image || "",
        date: row.date || "",
        categories: (() => {
          try { return JSON.parse(row.categories || "[]"); } catch { return []; }
        })(),
        extern_url: row.extern_url || "",
      }));

      fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
      console.log(`Built ${path.basename(dst)} from ${records.length} news CSV records`);
    } else {
      // journal CSV
      const records = rows.map((row) => {
        const title = row["Title"] || "";
        const author = row["Author"] || "";
        const publicationTitle = row["Publication Title"] || "";
        const abstract = row["Abstract Note"] || "";
        const itemType = row["Item Type"] || "";
        const doi = row["DOI"] || "";
        const publicationYear = row["Publication Year"] || "";
        const date = row["Date"] || "";
        const manualTags = row["Manual Tags"] || "";

        return {
          item_type: itemType,
          publication_year: publicationYear,
          author,
          title,
          publication_title: publicationTitle,
          doi,
          abstract_note: abstract,
          date,
          keywords: manualTags,
          // backward-compatible aliases
          type: itemType,
          journal: publicationTitle,
          abstract,
          doi_link: doi,
        };
      });

      records.sort((a, b) => {
        const yearDiff = (parseInt(b.publication_year, 10) || 0) - (parseInt(a.publication_year, 10) || 0);
        if (yearDiff !== 0) return yearDiff;

        const parseDate = (d) => {
          const parts = d.split("/");
          if (parts.length === 3) return new Date(+parts[0], +parts[1] - 1, +parts[2]);
          return new Date(0);
        };
        return parseDate(b.date) - parseDate(a.date);
      });

      fs.writeFileSync(dst, JSON.stringify(records, null, 2), "utf-8");
      console.log(`Built ${path.basename(dst)} from ${records.length} journal CSV records`);
    }
  }
}
