import puppeteer from 'puppeteer';

const getStockInfo = async () => {
    // start puppeteer session 
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null, 
    });

    //open a new page 
    const page =  await browser.newPage();

    // go to cnbc and wait until page loaded 
    await page.goto("https://www.cnbc.com/us-market-movers/",{
        waitUntil: "domcontentloaded", 
    });

    // switch to Nasdaq tab 
    const [nasdaq] = await page.$x("//div[@class = 'MarketMoversMenu-moverContainer']/button[contains(., 'NASDAQ')]");
    // found nasdaq tab 
    if (nasdaq){
        await nasdaq.click();
    }else{
        throw new Error("link not found");
    }

    //make sure has loaded 
    page.waitForFileChooser(3000);

    // find the second top gaining stock 
    const info = await page.$$eval('.MarketTop-topTable tbody tr:nth-child(2)', el => el.innerHTML);

    // get the name and percent info 
    const name = info?.querySelector(".MarketTop-name").innerText;
    const percent = info?.querySelector(".MarketTop-quoteGain MarketTop-quoteChange").innerText;
    //console.log({name, percent})
    // const name = "dollar tree"
    // const percentage = "90"
    const time = Date.now().toString();

    // open the new page 
    const page2 = await browser.newPage();
    await page2.goto("https://forms.zohopublic.in/developers/form/TestResponses/formperma/-gq-UT1RjqASnGgBsW-M8MmPm8e3YLhcyFam06v2piE")
    // fill out form 
    await page2.type('input[name = SingleLine]', name);
    await page2.type('input[name = SingleLine1]', percentage);
    await page2.type('input[name = SingleLine2]', time);

    // submit 
    await page2.click('button[name = submit');

    //close the browser
    //await browser.close();
};

// scrape 
getStockInfo();
