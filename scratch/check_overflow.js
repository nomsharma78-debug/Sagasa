const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to local server
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });

  // Evaluate script to find overflowing elements
  const overflowElements = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const elements = document.querySelectorAll('*');
    const overflowing = [];
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth) {
        overflowing.push({
          tagName: el.tagName,
          className: el.className,
          right: rect.right,
          docWidth: docWidth
        });
      }
    });
    return overflowing;
  });

  console.log(JSON.stringify(overflowElements, null, 2));
  await browser.close();
})();
