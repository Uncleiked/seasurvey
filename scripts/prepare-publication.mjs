import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";

// Keep the user's original Git repository separate from the private demo source.
const destination = path.resolve("artifacts/site-source");
mkdirSync(destination, { recursive: true });
const entries = [
  ".gitignore", ".prettierignore", ".openai", "README.md", "docs",
  "next-env.d.ts", "next.config.ts", "package-lock.json", "package.json",
  "postcss.config.mjs", "public", "scripts", "src", "tooling", "tsconfig.json", "out",
];
for (const entry of entries) {
  cpSync(path.resolve(entry), path.join(destination, entry), { recursive: true });
}
console.log(`Prepared private demo source: ${destination}`);
