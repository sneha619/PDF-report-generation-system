const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports = async function generatePDF(htmlContent, filename) {
  // Ensure reports directory exists
  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfPath = path.join(reportsDir, filename);
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();
  
  return pdfPath;
};
