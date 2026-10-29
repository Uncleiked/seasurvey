import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Project-local copies of public guidance; no global configuration is changed.
const sources = [
  {
    repo: "anthropics/skills",
    base: "skills/frontend-design",
    name: "frontend-design",
  },
  {
    repo: "vercel-labs/agent-skills",
    base: "skills/react-best-practices",
    name: "react-best-practices",
  },
  {
    repo: "openai/skills",
    base: "skills/.curated/playwright",
    name: "playwright",
  },
];
for (const source of sources) {
  const response = await fetch(
    `https://api.github.com/repos/${source.repo}/git/trees/main?recursive=1`,
  );
  if (!response.ok) throw new Error(`${source.repo}: ${response.status}`);
  const tree = await response.json();
  const files = tree.tree.filter(
    (entry) =>
      entry.type === "blob" && entry.path.startsWith(`${source.base}/`),
  );
  if (!files.length) throw new Error(`No skill files found for ${source.name}`);
  await Promise.all(
    files.map(async (entry) => {
      const destination = path.join(
        "tooling",
        "skills",
        source.name,
        entry.path.slice(source.base.length + 1),
      );
      const file = await fetch(
        `https://raw.githubusercontent.com/${source.repo}/main/${entry.path}`,
      );
      if (!file.ok) throw new Error(`${entry.path}: ${file.status}`);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, Buffer.from(await file.arrayBuffer()));
    }),
  );
  console.log(`${source.name}: downloaded ${files.length} guidance files.`);
}
