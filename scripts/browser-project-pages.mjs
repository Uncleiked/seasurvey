async (page) => {
  const baseURL = new URL(page.url()).origin;
  const slugs = ["firs-headquarters", "scarsdale-offices", "ikoyi-residence", "cbn-learning-centre", "ctc-laboratory"];
  const checked = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const slug of slugs) {
      const response = await page.goto(`${baseURL}/projects/${slug}/`);
      await page.waitForFunction(() => document.fonts.status === "loaded");
      await page.locator(".case-image img").evaluate(async (image) => { if (!image.complete) await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); });
      const report = await page.evaluate(() => ({
        width: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headings: document.querySelectorAll("h1").length,
        title: document.querySelector("h1").textContent,
        brokenImages: [...document.querySelectorAll(".case-image img")].filter((image) => !image.complete || !image.naturalWidth).length,
        badHeadingReferences: [...document.querySelectorAll("[aria-labelledby]")].filter((element) => !document.getElementById(element.getAttribute("aria-labelledby"))).length,
        navLinks: [...document.querySelectorAll(".desktop-nav a")].every((link) => link.getAttribute("href").startsWith("/#")),
        relatedProjects: document.querySelectorAll(".case-related .project-card").length,
        headerActive: document.querySelector('.desktop-nav a[aria-current="location"]').textContent,
        bodyUnlocked: getComputedStyle(document.body).overflow !== "hidden",
      }));
      if (response.status() !== 200 || report.documentWidth !== width || report.headings !== 1 || report.brokenImages || report.badHeadingReferences || !report.navLinks || report.relatedProjects !== 2 || report.headerActive !== "Our work" || !report.bodyUnlocked) throw new Error(JSON.stringify({ slug, ...report }));
      if (!(await page.title()).includes(report.title)) throw new Error(`Project metadata is incorrect: ${slug}`);
      if (slug === "firs-headquarters" || slug === "ikoyi-residence") {
        for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) {
          await page.evaluate((position) => window.scrollTo({ top: position, behavior: "instant" }), y);
          await page.waitForTimeout(80);
        }
        await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `output/playwright/project-${slug}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `output/playwright/project-hero-${slug}-${width}.png` });
      }
      checked.push({ slug, width, status: response.status(), documentWidth: report.documentWidth });
    }
  }
  await page.goto(`${baseURL}/projects/firs-headquarters/`);
  await page.getByRole("link", { name: "View Scarsdale Properties", exact: true }).click();
  await page.waitForURL("**/projects/scarsdale-offices/");
  await page.goBack();
  await page.waitForURL("**/projects/firs-headquarters/");
  await page.reload();
  if (await page.getByRole("heading", { level: 1, name: "FIRS Corporate Headquarters" }).count() !== 1) throw new Error("Refresh did not preserve the project page");
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await page.getByRole("navigation", { name: "Mobile navigation", exact: true }).getByRole("link", { name: "Expertise", exact: true }).click();
  await page.waitForURL("**/#expertise");
  const missing = await page.goto(`${baseURL}/projects/project-does-not-exist/`);
  if (missing.status() !== 404) throw new Error("Unknown project route should return 404");
  return { checked, relatedNavigation: true, browserBack: true, directRefresh: true, mobileNavigation: true, unknownRoute404: true };
}
