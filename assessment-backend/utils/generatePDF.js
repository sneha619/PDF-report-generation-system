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
  
  // Set viewport to ensure proper rendering
  await page.setViewport({ width: 1200, height: 1600 });
  
  // Set content with proper waiting for network and rendering
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(reportsDir, filename);
  
  // Enhanced PDF options to prevent content splitting across pages
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px"
    },
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  return pdfPath;
};
