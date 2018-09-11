const Apify = require('apify');
const bodyParser = require('body-parser');
const puppeteer = require('./node_modules/puppeteer/lib/Puppeteer');
const express = require('express');
var base64Img = require('base64-img');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//url of cpanel

const url = 'https://jsonip.com/'
app.get('/main', async (req, res) => {

    try{



    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.setViewport({ width: 600, height: 600 })
    await page.goto(url)
    console.log(url)
    const title = await page.title()
    console.log(title)
    await page.screenshot({ path: title + '.png' });
    res.json(base64Img.base64Sync(title+'.png'))
    browser.close()

    }

    catch(e){
        throw err
    }

})


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listen on port 8080')
})
