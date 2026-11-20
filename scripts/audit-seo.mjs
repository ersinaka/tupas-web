// Audits the built HTML: title ≤ 60, description ≤ 155, nothing truncated, exactly one <h1>,
// no duplicate titles. Run after `pnpm build`: `node scripts/audit-seo.mjs`.
import fs from "node:fs";
import path from "node:path";

const root = ".next/server/app";
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(root);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

let bad = 0;
const titles = new Map();
for (const file of files) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  if (rel.startsWith("_")) continue;
  const html = fs.readFileSync(file, "utf8");
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  titles.set(title, [...(titles.get(title) ?? []), rel]);

  const issues = [];
  if (title.length > 60) issues.push(`title ${title.length}`);
  if (title.endsWith("…")) issues.push("title truncated");
  if (!desc) issues.push("no description");
  if (desc.length > 155) issues.push(`description ${desc.length}`);
  if (desc.endsWith("…")) issues.push("description truncated");
  if (h1 !== 1) issues.push(`h1 count ${h1}`);
  if (issues.length) {
    bad++;
    console.log(`${rel} | ${issues.join(", ")} | ${title}`);
  }
}
for (const [title, pages] of titles) if (pages.length > 1) console.log(`DUPLICATE TITLE "${title}": ${pages.join(" ")}`);
console.log(`${files.length} pages checked, ${bad} with issues`);
process.exitCode = bad ? 1 : 0;
