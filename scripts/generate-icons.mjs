// Генератор SVG-иконок Simple Icons → src/components/icons/*.astro (T023).
// Источник: simple-icons (лицензия CC0). Не редактировать файлы вручную.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as si from "simple-icons";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "src/content/profile");
const outDir = join(root, "src/components/icons");
mkdirSync(outDir, { recursive: true });

const toExportName = (slug) =>
  "si" + slug.replace(/(^|-)([a-z0-9])/g, (_, __, ch) => ch.toUpperCase());

const slugs = new Set();
for (const file of readdirSync(contentDir)) {
  const data = JSON.parse(readFileSync(join(contentDir, file), "utf8"));
  for (const skill of data.hardSkills ?? []) {
    if (skill.icon) slugs.add(skill.icon);
  }
}

let generated = 0;
for (const slug of slugs) {
  const icon = si[toExportName(slug)];
  if (!icon) {
    console.warn(`пропуск: слага "${slug}" нет в simple-icons — навык рендерится без иконки`);
    continue;
  }
  const component = `---
// АВТОГЕНЕРАЦИЯ (scripts/generate-icons.mjs) — не редактировать вручную.
// Источник: simple-icons (CC0) — ${icon.title}
interface Props {
  size?: number;
}
const { size = 16 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
  focusable="false"
>
  <path d="${icon.path}"></path>
</svg>
`;
  writeFileSync(join(outDir, `${slug}.astro`), component);
  generated += 1;
}

console.log(`сгенерировано иконок: ${generated} (слагов в контенте: ${slugs.size})`);
