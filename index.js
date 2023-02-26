import puppeteer from 'puppeteer';

const getStockInfo = async () => {
    // start puppeteer session 
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null, 
    });

    //open a new page 
    const page =  await browser.newPage();

    // go to cnbc 
    await page.goto("https://www.cnbc.com/us-market-movers/",{
        waitUntil: "domcontentloaded", 
    });
};

// scrape 
getStockInfo();
