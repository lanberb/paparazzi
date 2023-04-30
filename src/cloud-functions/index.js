const puppeteer = require("puppeteer");

exports.getSnapshot = async (_, res) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto("https://www.google.jp");

  const snapshot = await page.screenshot({ encoding: "base64" });

  await browser.close();
  await res.send(snapshot);
};
