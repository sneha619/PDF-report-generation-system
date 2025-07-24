const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

module.exports = async function generatePDF(htmlContent, filename) {
  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const executablePath = await chromium.executablePath || '/usr/bin/chromium-browser';

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: executablePath,
    headless: chromium.headless,
    defaultViewport: { width: 1200, height: 1600 },
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(reportsDir, filename);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
    preferCSSPageSize: true,
  });

  await browser.close();
  return pdfPath;
};
