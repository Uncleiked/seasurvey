import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

for (const file of await readdir("public/images")) {
  if (!/\.(jpe?g)$/i.test(file) || file === "original-banner.jpg") continue;
  const source = path.join("public/images", file);
  const destination = source.replace(/\.(jpe?g)$/i, ".webp");
  await sharp(source)
    .rotate()
    .resize({
      width: file.includes("hero") ? 1500 : 1000,
      withoutEnlargement: true,
    })
    .webp({ quality: 85 })
    .toFile(destination);
  console.log(`${file} → ${path.basename(destination)}`);
}
