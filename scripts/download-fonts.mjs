import { mkdir, writeFile } from "node:fs/promises";

const fonts = {
  "manrope-regular.ttf":
    "https://fonts.gstatic.com/s/manrope/v23/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf",
  "manrope-semibold.ttf":
    "https://fonts.gstatic.com/s/manrope/v23/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F.ttf",
  "manrope-bold.ttf":
    "https://fonts.gstatic.com/s/manrope/v23/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf",
  "instrument-serif-italic.ttf":
    "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf",
};
await mkdir("public/fonts", { recursive: true });
for (const [filename, url] of Object.entries(fonts)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${filename}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(`public/fonts/${filename}`, bytes);
  console.log(`${filename}: ${bytes.length} bytes`);
}
