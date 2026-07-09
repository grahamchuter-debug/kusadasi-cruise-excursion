#!/usr/bin/env node
/**
 * Download Kuşadası / Ephesus imagery from verified Wikimedia Commons URLs.
 * Each site image is distinct and location-appropriate — no Kotor leftovers.
 * Run: node scripts/download-kusadasi-images.mjs
 */
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "..", "public/images");
const UA = "KusadasiCruiseExcursions/1.0 (https://kusadasicruiseexcursion.com; image setup)";

/** Verified direct upload.wikimedia.org URLs — preferred when available. */
const DIRECT_IMAGES = {
  // Ephesus — ancient sites
  "ephesus.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ephesus_Library_of_Celsus.jpg",
  "hero-home.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Ephesus_Celsus_Library_Fa%C3%A7ade.jpg",
  "photography.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Ephesus_Library_of_Celsus.jpg",
  "og-default.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Looking_down_the_Street_of_Curetes_%2816314212482%29.jpg/1920px-Looking_down_the_Street_of_Curetes_%2816314212482%29.jpg",
  "marble-streets.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Looking_down_the_Street_of_Curetes_%2816314212482%29.jpg/1920px-Looking_down_the_Street_of_Curetes_%2816314212482%29.jpg",
  "private.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Curetes_Street_in_Ephesus_%281%29.jpg",
  "theatre.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ephesus_Theater.jpg",
  "highlights.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ephesus_Marble_Street_in_1992_012.jpg/1920px-Ephesus_Marble_Street_in_1992_012.jpg",
  "history.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Temple_of_Hadrian%2C_Ephesus%2C_Turkey_%2813283467693%29.jpg/1920px-Temple_of_Hadrian%2C_Ephesus%2C_Turkey_%2813283467693%29.jpg",
  "hadrian.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Temple_of_Hadrian%2C_Ephesus%2C_Turkey_%2813283467693%29.jpg/1920px-Temple_of_Hadrian%2C_Ephesus%2C_Turkey_%2813283467693%29.jpg",
  "terrace-houses.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/c/c8/Ephesus_Terrace_Houses.jpg",
  "luxury.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ephesus_terrace_houses3.jpg/1920px-Ephesus_terrace_houses3.jpg",
  "virgin-mary.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/House_of_the_Virgin_Mary.jpg",
  "compare.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/20180113_EphesusRuin_6748_%2825273914807%29.jpg/1920px-20180113_EphesusRuin_6748_%2825273914807%29.jpg",
  "family.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/2/25/Great_Theatre_of_Ephesus_2024.jpg",
  "mountains.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Turkey-2801_%282217172440%29.jpg/1920px-Turkey-2801_%282217172440%29.jpg",

  "sirince.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/%C5%9Eirince.jpg/1920px-%C5%9Eirince.jpg",

  // Kuşadası — port, town, coast
  "cruise-port.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Cruise_Ships_in_the_Port_of_Ku%C5%9Fadas%C4%B1%2C_T%C3%BCrkiye%2C_2024.jpg/1920px-Cruise_Ships_in_the_Port_of_Ku%C5%9Fadas%C4%B1%2C_T%C3%BCrkiye%2C_2024.jpg",
  "coast.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/KU%C5%9EADASI_HARBOUR_-_panoramio.jpg/1920px-KU%C5%9EADASI_HARBOUR_-_panoramio.jpg",
  "beach.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kad%C4%B1nlar_Denizi_-_Ku%C5%9Fadas%C4%B1_02.jpg/1920px-Kad%C4%B1nlar_Denizi_-_Ku%C5%9Fadas%C4%B1_02.jpg",
  "bazaar.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ku%C5%9Fadas%C4%B1_%C3%A7ar%C5%9F%C4%B1.JPG/1920px-Ku%C5%9Fadas%C4%B1_%C3%A7ar%C5%9F%C4%B1.JPG",
  "food.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Starter_dish_in_Turkey.jpg/1920px-Starter_dish_in_Turkey.jpg",
};

/** Fallback via Commons API when direct URL fails. */
const COMMONS_CANDIDATES = {
  "sirince.jpg": [
    "File:Şirince.jpg",
    "File:Şirince 01.jpg",
    "File:Sirince village.jpg",
  ],
  "photography.jpg": [
    "File:Celsus Library in Ephesos 2024.jpg",
    "File:Ephesus Celsus Library Façade.jpg",
  ],
  "theatre.jpg": [
    "File:Great Theatre of Ephesus 2024.jpg",
    "File:Ephesus Theatre.jpg",
  ],
  "cruise-port.jpg": [
    "File:Cruise Ships in the Port of Kuşadası, Türkiye, 2024.jpg",
    "File:Kusadasi Cruise Port, Turkey.jpg",
  ],
  "coast.jpg": [
    "File:KUŞADASI HARBOUR - panoramio.jpg",
    "File:Kuşadası - harbour.jpg",
  ],
  "beach.jpg": [
    "File:Kadınlar Denizi - Kuşadası 02.jpg",
    "File:Ladies beach kusadasi (doyler79).jpg",
  ],
  "bazaar.jpg": [
    "File:Kuşadası çarşı.JPG",
    "File:KUŞADASI HARBOUR - panoramio.jpg",
  ],
};

const ALLOWED = new Set([
  ...Object.keys(DIRECT_IMAGES),
  ...Object.keys(COMMONS_CANDIDATES),
  "logo-mark.svg",
  "sources.json",
]);

mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resolveCommonsUrl(fileName) {
  const title = encodeURIComponent(fileName.replace(/ /g, "_"));
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${title}&prop=imageinfo&iiprop=url&iiurlwidth=1920&format=json`;
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined) return null;
  const info = page.imageinfo?.[0];
  return info?.thumburl ?? info?.url ?? null;
}

async function downloadUrl(url, attempts = 4) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 8000) throw new Error("file too small");
      return buf;
    } catch (e) {
      if (i === attempts - 1) throw e;
      await sleep(1500 + i * 1000);
    }
  }
}

async function downloadDirect(filename, url) {
  const buf = await downloadUrl(url);
  writeFileSync(join(OUT, filename), buf);
  console.log(`✓ ${filename} ← direct`);
}

async function downloadFromCommons(filename, candidates) {
  for (const candidate of candidates) {
    await sleep(1200);
    const url = await resolveCommonsUrl(candidate);
    if (!url) continue;
    try {
      const buf = await downloadUrl(url);
      writeFileSync(join(OUT, filename), buf);
      console.log(`✓ ${filename} ← ${candidate}`);
      return true;
    } catch (e) {
      console.warn(`  failed ${candidate}: ${e.message}`);
    }
  }
  return false;
}

async function main() {
  // Remove leftover Kotor / Dubrovnik orphans
  for (const name of readdirSync(OUT)) {
    if (!ALLOWED.has(name)) {
      unlinkSync(join(OUT, name));
      console.log(`removed orphan ${name}`);
    }
  }

  let failed = 0;

  for (const [file, url] of Object.entries(DIRECT_IMAGES)) {
    try {
      await downloadDirect(file, url);
      await sleep(800);
    } catch (e) {
      console.warn(`direct failed ${file}: ${e.message}`);
      const candidates = COMMONS_CANDIDATES[file];
      if (candidates) {
        const ok = await downloadFromCommons(file, candidates);
        if (!ok) failed++;
      } else {
        failed++;
      }
    }
  }

  for (const [file, candidates] of Object.entries(COMMONS_CANDIDATES)) {
    if (DIRECT_IMAGES[file]) continue; // already handled
    const ok = await downloadFromCommons(file, candidates);
    if (!ok) failed++;
  }

  // Write sources manifest
  const sources = {
    platform: "Wikimedia Commons",
    license: "Various CC licenses — see source URLs on Commons",
    images: Object.entries({ ...DIRECT_IMAGES }).map(([file, url]) => ({
      file,
      url,
    })),
  };
  writeFileSync(join(OUT, "sources.json"), JSON.stringify(sources, null, 2) + "\n");

  if (failed) {
    console.error(`\n${failed} image(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${ALLOWED.size - 2} Kuşadası/Ephesus images ready.`);
}

main();
