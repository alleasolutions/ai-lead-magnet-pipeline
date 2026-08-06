const puppeteer = require('puppeteer');
const path = require('path');

async function generatePdf(inputHtmlPath, outputPdfPath) {
  const absoluteInput = path.resolve(inputHtmlPath);
  const absoluteOutput = path.resolve(outputPdfPath);

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${absoluteInput}`, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: absoluteOutput,
      format: 'A4',
      printBackground: true,
      margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
    });
  } finally {
    await browser.close();
  }

  console.log(`PDF written to ${absoluteOutput}`);
}

const [, , inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error('Usage: node generate-pdf.js <input.html> <output.pdf>');
  process.exit(1);
}

generatePdf(inputArg, outputArg).catch((err) => {
  console.error(err);
  process.exit(1);
});
