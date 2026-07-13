// guppy-preflight — audit an HTML artifact for layout overflow BEFORE it reaches the
// reviewer's device. Mirrors artifact-sdk's layout-audit thresholds (epsilon 1px,
// error > 4px, intentional scrollers exempt) at real device viewports, using the
// headless Chromium that already lives on Guppy for the browser agent.
//
// Usage: node guppy-preflight.mjs <file.html> [--json]
// Exit codes: 0 clean · 1 error-severity findings (printed) · 0 with a note if
// Playwright is unavailable (pre-flight must never block opens on missing deps).
import { resolve } from "node:path";

const PLAYWRIGHT_DIR = process.env.GUPPY_PLAYWRIGHT_DIR || "/home/ubuntu/guppy-browser-agent/node_modules/playwright";
const file = process.argv[2];
const asJson = process.argv.includes("--json");
if (!file) {
  console.error("usage: guppy-preflight.mjs <file.html> [--json]");
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import(`${PLAYWRIGHT_DIR}/index.mjs`));
} catch {
  console.error(`preflight skipped: playwright not found at ${PLAYWRIGHT_DIR} (set GUPPY_PLAYWRIGHT_DIR)`);
  process.exit(0);
}

const VIEWPORTS = [
  { name: "phone", width: 402, height: 874 },
  { name: "ipad-portrait", width: 810, height: 1080 },
  { name: "ipad-landscape", width: 1080, height: 810 },
];

// Same classes and thresholds as artifact-sdk's auditLayout (minus the sampling-based
// overlapping-text heuristic, which stays warning-severity in the browser anyway).
const AUDIT = `(() => {
  const EPS = 1, ERR = 4;
  const vw = window.innerWidth;
  const findings = [];
  const isScroller = (el) => {
    const ox = getComputedStyle(el).overflowX;
    return ox === "auto" || ox === "scroll";
  };
  const inScroller = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) if (isScroller(n)) return true;
    return false;
  };
  const short = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.className && typeof el.className === "string") {
      const cls = el.className.split(/\\s+/).filter(Boolean).slice(0, 2).join(".");
      if (cls) s += "." + cls;
    }
    const text = String(el.innerText || "").trim().replace(/\\s+/g, " ").slice(0, 40);
    return text ? s + " \\u201C" + text + "\\u201D" : s;
  };
  const pageOver = document.documentElement.scrollWidth - vw;
  if (pageOver > EPS)
    findings.push({ kind: "page-horizontal-overflow", el: "html", overflowPx: Math.round(pageOver), severity: pageOver > ERR ? "error" : "warning" });
  for (const el of document.body.querySelectorAll("*")) {
    if (isScroller(el) || inScroller(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    const st = getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden") continue;
    const hOver = el.scrollWidth - el.clientWidth;
    if (hOver > EPS && st.overflowX !== "visible")
      findings.push({ kind: "element-scroll-overflow", el: short(el), overflowPx: Math.round(hOver), severity: hOver > ERR ? "error" : "warning" });
    const p = el.parentElement;
    if (p && p !== document.body && st.position === "static") {
      const pr = p.getBoundingClientRect();
      const ps = getComputedStyle(p);
      const pRight = pr.right - parseFloat(ps.borderRightWidth) - parseFloat(ps.paddingRight);
      const over = r.right - pRight;
      if (over > EPS && r.width * r.height > 1)
        findings.push({ kind: "element-parent-overflow", el: short(el), overflowPx: Math.round(over * 10) / 10, severity: over > ERR ? "error" : "warning" });
    }
  }
  return findings.slice(0, 20);
})()`;

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  const page = await browser.newPage();
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`file://${resolve(file)}`, { waitUntil: "load", timeout: 15000 });
    await page.waitForTimeout(250);
    const findings = await page.evaluate(AUDIT);
    for (const f of findings) results.push({ viewport: `${vp.name} (${vp.width}px)`, ...f });
  }
} finally {
  await browser.close();
}

const errors = results.filter((f) => f.severity === "error");
if (asJson) {
  console.log(JSON.stringify({ errors, warnings: results.filter((f) => f.severity === "warning") }, null, 2));
} else if (errors.length) {
  console.error(`preflight FAILED: ${errors.length} error-severity overflow finding(s) — fix before opening:`);
  for (const f of errors) console.error(`  [${f.viewport}] ${f.kind} +${f.overflowPx}px  ${f.el}`);
} else {
  console.error("preflight clean: no error-severity overflow at phone/iPad widths");
}
process.exit(errors.length ? 1 : 0);
