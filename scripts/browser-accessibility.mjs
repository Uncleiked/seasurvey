async (page) => {
  const baseURL = new URL(page.url()).origin;
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/`);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const result = await page.evaluate(async () => {
    const report = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return { violations: report.violations.map((item) => ({ id: item.id, impact: item.impact, description: item.description, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), passes: report.passes.length };
  });
  const reports = [{ state: "desktop", ...result }];
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  const mobile = await page.evaluate(async () => {
    const report = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return { violations: report.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), passes: report.passes.length };
  });
  reports.push({ state: "mobile navigation open", ...mobile });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Residential", exact: true }).click();
  await page.getByRole("link", { name: "View A private address in Ikoyi" }).click();
  await page.waitForURL("**/projects/ikoyi-residence/");
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const projectPage = await page.evaluate(async () => {
    const report = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return { violations: report.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), passes: report.passes.length };
  });
  reports.push({ state: "mobile project page", ...projectPage });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const desktopProject = await page.evaluate(async () => {
    const report = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
    return { violations: report.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), passes: report.passes.length };
  });
  reports.push({ state: "desktop project page", ...desktopProject });
  return reports;
}
