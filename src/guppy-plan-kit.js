/**
 * Guppy Plan Kit — the default design system for Guppy's Lavish artifacts.
 *
 * A single self-contained, light-themed, coral-branded component set, extracted from
 * the patterns proven in the Guppy × Lavish plan reviews. No CDN, no build step: it
 * inlines as one <style> block, so it renders identically anywhere and never depends
 * on the network. Every component is overflow-hardened BY CONSTRUCTION (min-width:0,
 * auto-fit tracks with real px floors so grids WRAP on phones instead of crushing —
 * minmax(0,1fr) never wraps — overflow-wrap everywhere, in-flow controls, opt-in
 * scrollers) so Lavish's layout audit stays quiet without per-artifact fixups.
 *
 * All classes are namespaced `gk-` so the Kit can be dropped into any artifact.
 */

export const GUPPY_PLAN_KIT_CSS = `<style>
/* ── Guppy Plan Kit ─────────────────────────────────────────── light · coral ── */
:root{
  --gk-ink:#1c1a17; --gk-sub:#6b6259; --gk-faint:#9a9086; --gk-line:#ece4d8;
  --gk-paper:#faf6f0; --gk-card:#ffffff; --gk-coral:#e8734a; --gk-coral-soft:#fbe6dc;
  --gk-coral-deep:#dc6238; --gk-sea:#3a7d7b; --gk-sea-soft:#dcefee; --gk-gold:#b8862f;
  --gk-gold-soft:#f6ecd4; --gk-danger:#c0392b; --gk-danger-soft:#fbe3df;
  --gk-shadow:0 1px 2px rgba(40,30,20,.04),0 8px 24px rgba(40,30,20,.06);
  --gk-mono:"SF Mono",ui-monospace,Menlo,monospace;
  --gk-sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
}
*{box-sizing:border-box; min-width:0}
html,body{margin:0}
body{background:var(--gk-paper); color:var(--gk-ink); font:16px/1.55 var(--gk-sans);
  -webkit-font-smoothing:antialiased; overflow-wrap:break-word}
.gk-wrap{max-width:820px; margin:0 auto; padding:40px 22px 80px}
.gk-wrap.narrow{max-width:680px}

/* inline bits */
code,.gk-kbd{background:#f3ede4; border:1px solid var(--gk-line); border-radius:5px;
  padding:1px 6px; font:13px/1.4 var(--gk-mono); overflow-wrap:anywhere}
a{color:var(--gk-coral-deep)}
b,strong{font-weight:640}

/* masthead */
.gk-masthead{display:flex; align-items:center; gap:14px}
.gk-dot{width:32px; height:32px; border-radius:10px; flex:none; box-shadow:var(--gk-shadow);
  background:radial-gradient(circle at 32% 30%, #ff9d78, var(--gk-coral) 70%)}
.gk-title{font-size:27px; letter-spacing:-.02em; margin:0; font-weight:660}
.gk-lede{color:var(--gk-sub); font-size:16.5px; margin:16px 0 6px}
.gk-lede b{color:var(--gk-ink)}

/* section label */
.gk-h2{font-size:12.5px; text-transform:uppercase; letter-spacing:.1em;
  color:var(--gk-coral); margin:38px 0 14px; font-weight:680}

/* generic card + phase/step card */
.gk-card,.gk-phase{background:var(--gk-card); border:1px solid var(--gk-line);
  border-radius:14px; padding:16px 18px 15px; box-shadow:var(--gk-shadow); margin-bottom:13px}
.gk-card h3{margin:0 0 6px; font-size:16px; font-weight:640}
.gk-card p{margin:0; color:var(--gk-sub); font-size:14.5px}
.gk-phead{display:flex; align-items:baseline; gap:11px; margin-bottom:9px}
.gk-pnum{flex:none; width:25px; height:25px; border-radius:8px; background:var(--gk-coral-soft);
  color:var(--gk-coral-deep); font-size:13px; font-weight:700; display:grid; place-items:center}
.gk-ptitle{font-size:16px; font-weight:640; margin:0}
.gk-lead{margin:0 0 3px; padding-left:36px; color:var(--gk-sub); font-size:13.5px}
.gk-steps{margin:9px 0 0; padding-left:36px; list-style:none}
.gk-steps li{position:relative; padding:3px 0 3px 17px; font-size:14px}
.gk-steps li::before{content:"\\203A"; position:absolute; left:0; color:var(--gk-coral); font-weight:700}
.gk-dod{margin:11px 0 0 36px; padding:8px 11px; background:var(--gk-sea-soft);
  border-radius:8px; font-size:12.5px; color:var(--gk-sea)}
.gk-dod b{text-transform:uppercase; letter-spacing:.05em; font-size:11px}

/* callout variants */
.gk-callout{border-radius:13px; padding:13px 16px; font-size:13.5px; margin-bottom:13px;
  border:1px solid var(--gk-line); background:var(--gk-card)}
.gk-callout .gk-ch{margin:0 0 5px; font-weight:660; font-size:13.5px}
.gk-callout.info{background:var(--gk-sea-soft); border-color:#bfe0dd}
.gk-callout.info .gk-ch{color:#286663}
.gk-callout.warn{background:var(--gk-gold-soft); border-color:#ecdcb6}
.gk-callout.warn .gk-ch{color:#8a6415}
.gk-callout.risk{background:var(--gk-danger-soft); border-color:#f0c5bd}
.gk-callout.risk .gk-ch{color:var(--gk-danger)}

/* status tags */
.gk-tag{display:inline-block; background:var(--gk-coral-soft); color:var(--gk-coral-deep);
  border-radius:6px; padding:2px 8px; font-size:12px; font-weight:600; white-space:nowrap}
.gk-tag.ok{background:var(--gk-sea-soft); color:var(--gk-sea)}
.gk-tag.warn{background:var(--gk-gold-soft); color:var(--gk-gold)}
.gk-tag.risk{background:var(--gk-danger-soft); color:var(--gk-danger)}

/* comparison / data table — always inside its own horizontal scroller */
.gk-scroll{overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:12px}
.gk-table{width:100%; border-collapse:collapse; font-size:14px}
.gk-table th,.gk-table td{text-align:left; padding:9px 11px; border-bottom:1px solid var(--gk-line);
  vertical-align:top}
.gk-table th{color:var(--gk-sub); font-weight:560; font-size:11.5px; text-transform:uppercase;
  letter-spacing:.05em}

/* KPI / status tiles */
.gk-tiles{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr)); gap:10px}
.gk-tile{background:var(--gk-card); border:1px solid var(--gk-line); border-radius:12px;
  padding:13px 15px; box-shadow:var(--gk-shadow)}
.gk-tile .gk-val{font-size:22px; font-weight:680; letter-spacing:-.01em; font-variant-numeric:tabular-nums}
.gk-tile .gk-lbl{font-size:12px; color:var(--gk-sub); margin-top:2px}

/* chips grid */
.gk-chips{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr)); gap:9px}
.gk-chip{background:var(--gk-card); border:1px solid var(--gk-line); border-radius:11px;
  padding:11px 13px; box-shadow:var(--gk-shadow)}
.gk-chip b{display:block; font-size:13.5px; font-weight:640; margin-bottom:2px}
.gk-chip span{font-size:12px; color:var(--gk-sub)}

/* two-column list (e.g. add / remove) */
.gk-cols{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr)); gap:12px}

/* figure + caption (embed real screenshots — show, don't tell) */
.gk-figure{margin:0 0 14px; border:1px solid var(--gk-line); border-radius:13px; overflow:hidden;
  background:var(--gk-card); box-shadow:var(--gk-shadow)}
.gk-figure img{display:block; width:100%; height:auto; max-width:100%}
.gk-cap{padding:8px 13px; font-size:12.5px; color:var(--gk-sub); border-top:1px solid var(--gk-line)}

/* code block */
.gk-code{background:#faf5ee; border:1px solid var(--gk-line); border-radius:11px; padding:12px 14px;
  overflow-x:auto; font:13px/1.55 var(--gk-mono); color:var(--gk-ink); margin:0 0 13px}
.gk-code pre{margin:0}

/* decision widget — in-flow radio (never absolute), explain-this, none / add-your-own */
.gk-decide{background:var(--gk-card); border:1.5px solid var(--gk-coral-soft); border-radius:14px;
  padding:16px 18px; box-shadow:var(--gk-shadow); margin-bottom:13px}
.gk-q{font-size:15px; font-weight:640; margin:0 0 12px}
.gk-q .gk-rec{font-size:11.5px; font-weight:700; color:var(--gk-sea); background:var(--gk-sea-soft);
  border-radius:5px; padding:1px 7px; margin-left:7px}
.gk-choices{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr)); gap:9px}
.gk-choice{border:1.5px solid var(--gk-line); border-radius:11px; padding:11px 12px;
  transition:border-color .12s, box-shadow .12s}
.gk-choice:has(input:checked){border-color:var(--gk-coral); box-shadow:0 0 0 3px var(--gk-coral-soft)}
.gk-choice.none{border-style:dashed}
.gk-pick{display:grid; grid-template-columns:auto minmax(0,1fr); column-gap:9px; cursor:pointer}
.gk-pick input{grid-column:1; grid-row:1 / span 2; align-self:start; margin-top:2px;
  accent-color:var(--gk-coral); width:16px; height:16px}
.gk-pick .gk-ct{grid-column:2; font-size:13.5px; font-weight:640; margin-bottom:4px}
.gk-pick .gk-cd{grid-column:2; font-size:12px; color:var(--gk-sub)}
details.gk-explain{margin-top:8px; border-top:1px dashed var(--gk-line); padding-top:7px}
details.gk-explain summary{font-size:11.5px; font-weight:640; color:var(--gk-coral-deep);
  cursor:pointer; list-style:none; display:inline-flex; align-items:center; gap:5px}
details.gk-explain summary::-webkit-details-marker{display:none}
details.gk-explain summary::before{content:"?"; display:inline-grid; place-items:center;
  width:14px; height:14px; border-radius:50%; background:var(--gk-coral-soft);
  color:var(--gk-coral-deep); font-size:10px; font-weight:800}
details.gk-explain[open] summary::before{content:"\\D7"}
details.gk-explain p{margin:7px 0 0; font-size:12px; color:var(--gk-sub); line-height:1.5}
.gk-custom{width:100%; margin-top:11px; border:1.5px solid var(--gk-line); border-radius:9px;
  padding:9px 11px; font:13.5px var(--gk-sans); color:var(--gk-ink); background:var(--gk-paper)}
.gk-custom:focus{outline:none; border-color:var(--gk-coral); background:#fff}
.gk-qbar{display:flex; align-items:center; gap:12px; margin-top:13px; flex-wrap:wrap}
.gk-send{background:var(--gk-coral); color:#fff; border:0; border-radius:9px; font-size:13.5px;
  font-weight:600; padding:9px 15px; cursor:pointer; box-shadow:var(--gk-shadow)}
.gk-send:hover{background:var(--gk-coral-deep)}
.gk-hint{font-size:12px; color:var(--gk-sub)}

/* footer */
.gk-footer{margin-top:44px; padding-top:16px; border-top:1px solid var(--gk-line);
  color:var(--gk-faint); font-size:12.5px; text-align:center}
</style>`;

/**
 * The small script that wires the decision widget's Send button to Lavish's
 * queuePrompt (reads a checked radio OR the free-text "add your own" box).
 * Guarded so the artifact still opens fine when not served through Lavish.
 */
export const GUPPY_PLAN_KIT_DECISION_JS = `<script>
(function () {
  document.querySelectorAll("input[type=radio]").forEach(function (r) {
    r.addEventListener("change", function () {
      var box = r.closest(".gk-decide"); if (!box) return;
      var hint = box.querySelector(".gk-hint");
      if (hint) hint.textContent = "Selected: " + (r.getAttribute("data-label") || r.value);
    });
  });
  document.querySelectorAll(".gk-send").forEach(function (btn) {
    var grp = btn.getAttribute("data-q");
    var box = btn.closest(".gk-decide");
    var hint = box ? box.querySelector(".gk-hint") : null;
    btn.addEventListener("click", function () {
      var custom = box ? box.querySelector(".gk-custom") : null;
      var customVal = custom && custom.value.trim();
      var label;
      if (customVal) { label = "Custom \\u2014 " + customVal; }
      else {
        var sel = box ? box.querySelector('input[name="' + grp + '"]:checked') : null;
        if (!sel) { if (hint) hint.textContent = "Pick one, or type your own first."; return; }
        label = sel.getAttribute("data-label") || sel.value;
      }
      var q = btn.getAttribute("data-label") || grp || "Decision";
      if (window.lavish && typeof window.lavish.queuePrompt === "function") {
        window.lavish.queuePrompt("Decision [" + q + "]: " + label, { queueKey: grp });
        // Fire it straight to chat. postMessage delivery is ordered, so the queued pick
        // lands in the composer before the send flushes it — one tap = sent, no separate
        // "hit Send in the composer" step (which is unreachable on the iPad handoff).
        if (typeof window.lavish.sendQueuedPrompts === "function") window.lavish.sendQueuedPrompts();
        if (hint) hint.textContent = "Sent \\u2713";
      } else if (hint) { hint.textContent = "Picked: " + label + " (open through Lavish to send)."; }
    });
  });
})();
</script>`;

/**
 * The ~25-line class vocabulary — everything an author needs to BUILD with the Kit
 * without ever reading the CSS. `guppy-lavish classes` prints this; agents should
 * consult it instead of `guppy-lavish kit` (10KB the author never needs in context).
 */
export const GUPPY_PLAN_KIT_CHEATSHEET = `Guppy Plan Kit — class vocabulary (the CSS/JS already ships inside a scaffolded page; never read it)

layout    .gk-wrap page container (add .narrow for 680px)
masthead  .gk-masthead > .gk-dot + h1.gk-title ; then p.gk-lede (intro; <b> for emphasis)
section   .gk-h2 — uppercase section label
card      .gk-card > h3 + p
phase     .gk-phase > .gk-phead (.gk-pnum + h3.gk-ptitle) + p.gk-lead + ul.gk-steps > li + .gk-dod (<b>DoD</b> …)
callout   .gk-callout.info|.warn|.risk > p.gk-ch (its heading) + text
tag       span.gk-tag [.ok|.warn|.risk]
table     .gk-scroll > table.gk-table — ALWAYS wrap tables in .gk-scroll, never let the page scroll sideways
tiles     .gk-tiles > .gk-tile > .gk-val + .gk-lbl (KPI row)
chips     .gk-chips > .gk-chip > b + span
columns   .gk-cols — auto 2-col grid (e.g. add/remove lists)
figure    .gk-figure > img + .gk-cap — embed real screenshots, don't describe UI in prose
code      .gk-code > pre (block) ; inline <code> (long URLs/paths go here — wraps anywhere)
footer    .gk-footer

decision  .gk-decide > p.gk-q ("Question" [+ span.gk-rec "recommended"]) + .gk-choices
            each option: label.gk-choice > span.gk-pick > input[type=radio name=qN value=… data-label="…"]
                         + span.gk-ct (title) + span.gk-cd (desc), then details.gk-explain > summary "explain" + p
            plus: a dashed label.gk-choice.none variant, an input.gk-custom (add-your-own box),
            and one .gk-qbar > button.gk-send[data-q="qN"] "Send" + span.gk-hint per question
          The scaffold's JS wires .gk-send to Lavish chat automatically.

rules     radios/controls stay in normal flow (never position:absolute); light theme only; no CDN.`;

/**
 * A complete, ready-to-open Kit page with the body left empty between
 * `gk-body` markers. `guppy-lavish new <file>` writes this to disk so the
 * CSS/JS never has to pass through the authoring agent's context — the agent
 * only ever writes/edits the body between the markers.
 */
export function guppyPlanKitScaffold({ title = "Plan", lede = "", footer = "" } = {}) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${GUPPY_PLAN_KIT_CSS}
</head>
<body>
<div class="gk-wrap">
<header class="gk-masthead"><div class="gk-dot"></div><h1 class="gk-title">${esc(title)}</h1></header>
${lede ? `<p class="gk-lede">${esc(lede)}</p>` : ""}
<!-- gk-body:start (write the plan between these markers; leave everything outside them alone) -->

<!-- gk-body:end -->
${footer ? `<footer class="gk-footer">${esc(footer)}</footer>` : ""}
</div>
${GUPPY_PLAN_KIT_DECISION_JS}
</body>
</html>
`;
}

/** One-line reminders that encode the overflow lessons the audit taught us. */
export const GUPPY_PLAN_KIT_RULES = [
  "Inline GUPPY_PLAN_KIT_CSS once at the top of <head>; use gk- classes, no CDN, no network.",
  "Light theme only — the Kit has no dark mode by design (Guppy's house rule).",
  'Put any wide table inside <div class="gk-scroll">; never let the page itself scroll sideways.',
  "Radios/controls stay in normal flow (.gk-pick grid) — never position:absolute into a card corner.",
  "Long URLs/paths go in <code> (overflow-wrap:anywhere); don't rely on ellipsis clipping.",
  'Decisions: give each option a <details class="gk-explain">, plus a dashed .none choice and a .gk-custom box.',
  "Embed real screenshots in .gk-figure instead of describing current UI in prose.",
];
