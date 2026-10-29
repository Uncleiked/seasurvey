async (page) => {
  const baseURL = new URL(page.url()).origin;
  const checks = [];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(baseURL);
    await page.mouse.move(0, 0);
    await page.waitForFunction(() => document.querySelector(".client-track")?.getAnimations().length > 0);
    const firstPosition = await page.locator(".client-track").evaluate((element) => element.getBoundingClientRect().left);
    await page.waitForTimeout(650);
    const secondPosition = await page.locator(".client-track").evaluate((element) => element.getBoundingClientRect().left);
    if (Math.abs(firstPosition - secondPosition) < 5) throw new Error(`Carousel is not moving at ${width}px`);
    const geometry = await page.evaluate(() => {
      const track = document.querySelector(".client-track");
      const groups = [...document.querySelectorAll(".client-group")];
      const viewport = document.querySelector(".client-carousel");
      const animation = track.getAnimations()[0];
      const duration = animation.effect.getComputedTiming().duration;
      animation.pause();
      animation.currentTime = 0;
      const start = groups[0].firstElementChild.getBoundingClientRect().left;
      animation.currentTime = duration - 0.001;
      const end = groups[1].firstElementChild.getBoundingClientRect().left;
      const result = { firstGroupWidth: groups[0].getBoundingClientRect().width, secondGroupWidth: groups[1].getBoundingClientRect().width, viewportWidth: viewport.clientWidth, seamDifference: Math.abs(start - end) };
      animation.currentTime = 0;
      animation.play();
      return result;
    });
    if (geometry.firstGroupWidth !== geometry.secondGroupWidth || geometry.firstGroupWidth < geometry.viewportWidth || geometry.seamDifference > 0.1) throw new Error(`Visible loop gap: ${JSON.stringify(geometry)}`);
    await page.getByRole("button", { name: "Pause client carousel", exact: true }).click();
    const paused = await page.locator(".client-track").evaluate((element) => getComputedStyle(element).animationPlayState);
    if (paused !== "paused") throw new Error("Pause control failed");
    await page.getByRole("button", { name: "Resume client carousel", exact: true }).click();
    const resumed = await page.locator(".client-track").evaluate((element) => getComputedStyle(element).animationPlayState);
    if (resumed !== "running") throw new Error("Resume control failed");
    await page.locator(".clients-section").screenshot({ path: `output/playwright/client-carousel-${width}.png` });
    checks.push({ width, moving: true, pauseAndResume: true, ...geometry });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reduced = await page.locator(".client-track").evaluate((element) => getComputedStyle(element).animationName);
  if (reduced !== "none") throw new Error("Reduced-motion preference is not respected");
  return { checks, reducedMotion: true };
}
