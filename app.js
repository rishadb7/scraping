const express = require('express'); // Adding Express
const app = express(); // Initializing Express
//const puppeteer = require('puppeteer'); // Adding Puppeteer

const puppeteer = require('puppeteer-extra')
const {executablePath} = require('puppeteer')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


 
const puppeteerLogin = async (props) => {


    console.log("starting")

    // let result = null;
    // let browser = null;
   
    // try {
    //     browser = await puppeteer.launch({
    //         args: chromium.args,
    //         defaultViewport: chromium.defaultViewport,
    //         executablePath: await chromium.executablePath,
    //         headless: chromium.headless,
    //     });


    //     let page = await browser.newPage();
    //     await page.goto('http://quotes.toscrape.com/');
    //     await page.waitForSelector('.col-md-4 a');
    //     await page.click('.col-md-4 a');

    //     await page.waitForSelector('#username');
    //     await page.type('#username', 'PedroTech', { delay: 100 });
    //     await page.type('#password', 'Password', { delay: 100 });
    //     await page.click('.btn.btn-primary')

    //     await page.waitForNavigation();
    //     // Navigate to the target page where the data is
    //     await page.goto('http://quotes.toscrape.com/'); // Replace with the actual URL if different

    //     // Wait for the data to be available
    //     await page.waitForSelector('.quote');

    //     // Extract the content of the entire page
    //     const pageContent = await page.content();

    //     // Output the content
    //     console.log(pageContent);


    //     result = pageContent;
    // } catch (error) {
    //     return error;
    // } finally {
    //     if (browser !== null) {
    //         await browser.close();
    //     }
    // }


    // return result;


   



}



app.get('/',async function(req, res) {


        var resData = ''

        await  puppeteer.launch().then(async function (browser) {

        const page = await browser.newPage();
        await page.goto('http://quotes.toscrape.com/');
        console.log("page1",page)
        await page.waitForSelector('.col-md-4 a');
        console.log("page2",page)
        await page.click('.col-md-4 a');
        console.log("page3",page)
        await page.waitForSelector('#username');
        console.log("page4",page)
        await page.type('#username', 'PedroTech', { delay: 100 });
        console.log("page5",page)
        await page.type('#password', 'Password', { delay: 100 });
        console.log("page6",page)
        await page.click('.btn.btn-primary')
        console.log("page7",page)
       // await page.waitForNavigation();
        console.log("page8",page)
        await page.goto('http://quotes.toscrape.com/');
        console.log("page9",page)
        await page.waitForSelector('.quote');
        console.log("page10",page.waitForSelector('.quote'))
        const pageContent = await page.content();
        console.log(pageContent);
        resData = pageContent
         
       
    });
    res.send(resData);
    // puppeteer.launch().then(async function (browser) {
    //     const page = await browser.newPage();
    //     await page.goto('http://quotes.toscrape.com/');

    //     // Targeting the DOM Nodes that contain the Digimon names
    //     const digimonNames = await page.$$eval('#digiList tbody tr td:nth-child(2) a', function (digimons) {
    //         // Mapping each Digimon name to an array
    //         return digimons.map(function (digimon) {
    //             return digimon.innerText;
    //         });
    //     });

    //     // Closing the Puppeteer controlled headless browser
    //     await browser.close();

    //     // Sending the Digimon names to Postman
    //     res.send(digimonNames);
    // });



});

app.get('/itr',async function(req, res) {

    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Set viewport size to 1366x768
        await page.setViewport({ width: 1366, height: 768 });

        // Set default navigation timeout to 60 seconds
        await page.setDefaultNavigationTimeout(60000);
        await page.setDefaultTimeout(60000);
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');

        console.log("Navigating to home page...");
        await page.goto('https://www.incometax.gov.in/iec/foportal/', { waitUntil: 'domcontentloaded' });
        console.log("Home page loaded.");
        await page.screenshot({ path: 'home_page.png' });

        console.log("Waiting for login button...");
        await page.waitForSelector('li#login a.btn.login', { timeout: 60000 });
        console.log("Login button found.");

        console.log("Clicking login button...");
        await page.click('li#login a.btn.login');

        console.log("Waiting for navigation to login page...");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log("Login page loaded.");
        await page.screenshot({ path: 'login_page.png' });

        console.log("Waiting for selector: #panAdhaarUserId");
        await page.waitForSelector('#panAdhaarUserId', { timeout: 60000 });
        console.log("Selector found.");

        await page.type('#panAdhaarUserId', 'ETWPK8160C', { delay: 100 });
        console.log("PAN/Aadhaar typed.");

        console.log("Clicking login button...");
        await page.click('.large-button-primary.width.marTop16');

        console.log("Waiting for navigation to password entry page...");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'password_page.png' });

        console.log("Waiting for selector: #passwordCheckBox-input");
        await page.waitForSelector('#passwordCheckBox-input', { timeout: 60000 });
        console.log("Selector found.");

        const isCheckBoxChecked = await page.click('#passwordCheckBox-input');
        console.log("Checkbox clicked:", isCheckBoxChecked);

        await page.waitForSelector('#loginPasswordField', { timeout: 60000 });
        console.log("Password field selector found.");

        await page.type('#loginPasswordField', 'UMMu95@ck', { delay: 10 });
        console.log("Password typed.");

        

        console.log("Clicking login button...");
        await page.click('.large-button-primary.width.marTop26');

        console.log("Waiting for navigation to dashboard...");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'dashboard_page.png' });

        const pageContent = await page.content();
        console.log("Dashboard content retrieved.");

        await browser.close();

        // Assuming res is defined somewhere in your actual code
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(pageContent));
    } catch (error) {
        console.error("Error encountered:", error);

        // Close the browser if there was an error
        if (browser) {
            await browser.close();
        }

        // Assuming res is defined somewhere in your actual code
        res.status(500).send("An error occurred");
    }

});


app.get('/itr2',async function(req, res) {

     

    try {
        const browser = await puppeteer.launch({ headless: false, 
            executablePath:executablePath(),
            ignoreDefaultArgs: ['--enable-automation']

        });
        const page = await browser.newPage();
       
        // Set viewport size to 1366x768
        await page.setViewport({ width: 1366, height: 768 });
    
        // Set default navigation timeout to 60 seconds
        await page.setDefaultNavigationTimeout(60000);
        await page.setDefaultTimeout(60000);
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
        await page.setBypassCSP(true) 
 

        console.log("Navigating to home page...");
        await page.goto('https://www.incometax.gov.in/iec/foportal/', { waitUntil: 'domcontentloaded' });
        console.log("Home page loaded.");
        await page.screenshot({ path: 'home_page.png' });
    
        console.log("Waiting for login button...");
        await page.waitForSelector('li#login a.btn.login', { timeout: 60000 });
        console.log("Login button found.");
    
        console.log("Clicking login button...");
        await page.click('li#login a.btn.login');
    
        console.log("Waiting for navigation to login page...");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log("Login page loaded.");
        await page.screenshot({ path: 'login_page.png' });
    
        console.log("Waiting for selector: #panAdhaarUserId");
        await page.waitForSelector('#panAdhaarUserId', { timeout: 60000 });
        console.log("Selector found.");
    
        await page.type('#panAdhaarUserId', 'DSYPP0141J', { delay: 100 });
        console.log("PAN/Aadhaar typed.");
    
        console.log("Clicking login button...");
        await page.click('.large-button-primary.width.marTop16');
    
        console.log("Waiting for navigation to password entry page...");
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'password_page.png' });
    
        console.log("Waiting for selector: #passwordCheckBox-input");
        await page.waitForSelector('#passwordCheckBox-input', { timeout: 60000 });
        console.log("Selector found.");
    
        await page.click('#passwordCheckBox-input');
        console.log("Checkbox clicked.");
    
        await page.waitForSelector('#loginPasswordField', { timeout: 60000 });
        console.log("Password field selector found.");
    
        await page.type('#loginPasswordField', 'Pattanath7@', { delay: 10 });
        console.log("Password typed.");
        await page.screenshot({ path: 'loginPasswordField.png' });
        console.log("Clicking login button...");

       
       
        await page.waitForSelector('.large-button-primary.width.marTop26');
        await page.click('.large-button-primary.width.marTop26');  //.large-button-primary.width.marTop26
       
        
       
        await page.screenshot({ path: 'large-button-primary.width.marTop26.png' });
        console.log("Waiting for navigation to dashboard...");

       
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: 'dashboard_page.png' });
    
        const pageContent = await page.content();
        console.log("Dashboard content retrieved.");
    
        await browser.close();
    
        // Assuming res is defined somewhere in your actual code
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(pageContent));
    } catch (error) {
        console.error("Error encountered:", error);
    
        // Close the browser if there was an error
        if (browser) {
            await browser.close();
        }
    
        // Assuming res is defined somewhere in your actual code
        res.status(500).send("An error occurred");
    }

})

 

// Making Express listen on port 7000
app.listen(7000, function() {
  console.log('Running on port 7000.');
});



 