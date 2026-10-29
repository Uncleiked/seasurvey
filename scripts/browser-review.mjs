async (page) => {
  const results = [];
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("http://127.0.0.1:3000/");
    await page.waitForFunction(() => document.fonts.status === "loaded");
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) {
      await page.evaluate((position) => window.scrollTo({ top: position, behavior: "instant" }), y);
      await page.waitForTimeout(85);
    }
    await page.waitForTimeout(800);
    const layout = await page.evaluate(() => ({
      width: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      headingCount: document.querySelectorAll("h1").length,
      brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).map((image) => image.src),
      badLabels: [...document.querySelectorAll("[aria-labelledby]")].filter((element) => element.getAttribute("aria-labelledby").split(" ").some((id) => !document.getElementById(id))).map((element) => element.outerHTML.slice(0, 120)),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter((anchor) => !document.querySelector(anchor.getAttribute("href"))).map((anchor) => anchor.getAttribute("href")),
      headerPosition: getComputedStyle(document.querySelector("header")).position,
    }));
    if (layout.documentWidth > width || layout.brokenImages.length || layout.badLabels.length || layout.missingAnchors.length || layout.headingCount !== 1 || layout.headerPosition !== "sticky") throw new Error(JSON.stringify(layout));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `output/playwright/layout-${width}.png`, fullPage: true });
    await page.screenshot({ path: `output/playwright/hero-${width}.png` });
    results.push(layout);
  }
  return { responsiveChecks: results };
}
