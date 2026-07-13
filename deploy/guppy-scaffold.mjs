#!/usr/bin/env node
// guppy-lavish new — assemble a complete Guppy Plan Kit page on disk from a small
// body fragment, so the 10KB of Kit CSS/JS never passes through the authoring
// agent's context. The agent writes/edits ONLY the fragment file and re-runs this
// to reassemble; a generated page (recognised by its gk-body markers) is always
// safe to regenerate, so iteration needs no --force.
//
// Usage: guppy-scaffold.mjs <file.html> [--title "…"] [--lede "…"] [--footer "…"]
//                           [--body <fragment.html>] [--force]

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { guppyPlanKitScaffold } from "../src/guppy-plan-kit.js";

const argv = process.argv.slice(2);
const opts = { title: "Plan", lede: "", footer: "", body: null, force: false };
let file = null;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--title") opts.title = argv[++i] ?? "";
  else if (a === "--lede") opts.lede = argv[++i] ?? "";
  else if (a === "--footer") opts.footer = argv[++i] ?? "";
  else if (a === "--body") opts.body = argv[++i] ?? null;
  else if (a === "--force") opts.force = true;
  else if (!file) file = a;
  else {
    console.error(`unexpected argument: ${a}`);
    process.exit(2);
  }
}
if (!file) {
  console.error(
    'usage: guppy-lavish new <file.html> [--title "…"] [--lede "…"] [--footer "…"] [--body <fragment.html>] [--force]',
  );
  process.exit(2);
}

const path = resolve(file);
const MARKERS = /<!-- gk-body:start[^>]*-->[\s\S]*<!-- gk-body:end -->/;
if (existsSync(path) && !opts.force) {
  // Regenerating a page this tool produced is the normal iteration loop; refusing
  // is only for files we didn't generate (no markers → hand-authored, don't clobber).
  if (!MARKERS.test(readFileSync(path, "utf8"))) {
    console.error(`${path} exists and has no gk-body markers (not a scaffolded page) — pass --force to overwrite`);
    process.exit(1);
  }
}
if (!opts.footer) {
  const now = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  opts.footer = `Guppy · ${now} AEST`;
}

let page = guppyPlanKitScaffold(opts);
if (opts.body) {
  const fragment = readFileSync(resolve(opts.body), "utf8").trim();
  page = page.replace(
    MARKERS,
    `<!-- gk-body:start (generated from ${opts.body} — edit that fragment and re-run guppy-lavish new) -->\n${fragment}\n<!-- gk-body:end -->`,
  );
}
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, page);
console.log(`assembled ${path}${opts.body ? ` (body: ${opts.body})` : " (empty body)"}`);
if (!opts.body)
  console.log(
    `next: write a body fragment file, then re-run with --body <fragment.html>; class vocab: guppy-lavish classes`,
  );
