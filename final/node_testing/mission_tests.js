const {Actions, Builder, By, ExpectedConditions, Key, until, WebDriver} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 
const assert = require('assert');
const testEmail = 'ProfileTest@Gmail.Test'
const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches("enable-logging");
let driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
runMissionTests();

async function runMissionTests(){
    // Open app and login
    await openApp();
    await verifyNoPermissionRedirectTest();
    await login();
    await refreshPage();
    await userVerificationTest();
  
    // Load More missions and select the first loaded trip
    await loadMore();
    await selectLoadedTrip();
    
    // Check add to cart and remove from cart 
    await addToCart();
    await removeFromCart();
    await navigateToCart();
    await verifyCartIsEmpty();
    
    // Logout and exit app
    await navigateToLogout();
    await verifyNoPermissionRedirectTest();
    await closeApp();
}

async function openApp() {
    //Make sure both client and server are running prior to exectuing this script.
    await driver.get('http://localhost:3000/');
    //driver.manage().setTimeouts({ implicit: 1000});
}

async function verifyNoPermissionRedirectTest() {
    var userFormField = await driver.findElement(By.name('email'));
    assert.ok(userFormField)
    console.log('Pass: User is not logged in.')
}

async function login() {
    await driver.findElement(By.name('email')).sendKeys(testEmail, Key.ENTER);
}

async function refreshPage() {
    await driver.navigate().refresh();
}

async function userVerificationTest() {
    await driver.wait(until.elementLocated(By.id('username')), 5000).then(async() => {
        //Verify that the SeleniumTest user is logged in.
        var actualUsername = await driver.wait(until.elementLocated(By.id('username'), 5000)).getText();

        //the css puts this in upper case.
        assert.equal(actualUsername, testEmail.toUpperCase());
        console.log('Pass: User authenticated on page.')
    });
}

async function navigateToCart() {
    await driver.findElement(By.id('cart')).click();
}

async function loadMore() {
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.wait(until.elementLocated(By.id('load-more')), 5000));
    await driver.wait(until.elementLocated(By.id('load-more')), 5000).click();
    console.log('Pass: User loads more missions.');
}

async function selectLoadedTrip() {
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.wait(until.elementLocated(By.id('89')), 5000));
    await driver.wait(until.elementLocated(By.id('89')), 5000).click();
}

async function addToCart() {
    await driver.wait(until.elementLocated(By.id('add-to-cart')), 5000).click();
    console.log('Pass: User added the loaded mission to the cart.');
}

async function removeFromCart() {
    await driver.wait(until.elementLocated(By.id('add-to-cart')), 5000).click();
    console.log('Pass: User removed mission from the cart.');
}

async function verifyCartIsEmpty() {
    var message = await driver.findElement(By.id('empty-cart')).getText();
    assert.equal(message, 'No items in your cart');
    console.log('Pass: Verified that the cart is empty.');
}

async function navigateToLogout() {
    await driver.wait(until.elementLocated(By.id('logout-button')), 5000).click();
}

async function closeApp() {
    await driver.quit();
}
