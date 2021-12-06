const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const testEmail = 'ProfileTest@Gmail.Test';
const chromeOptions = new chrome.Options();
const chromedriver =  require('chromedriver');
chromeOptions.excludeSwitches('enable-logging');
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

runProfileTests();

const findElementBy = (driver, locator) => {
    if (!driver) {
        return;
    }
    const webElement = driver.wait(until.elementLocated(locator), 20000);
    return driver.wait(until.elementIsVisible(webElement), 20000);
};

async function runProfileTests() {
    // Open app and login
    await openApp();
    await verifyNoPermissionRedirectTest();
    await login();
    //   await refreshPage();

    await testPageContainer();
    await testFooterMenuItems();
    await testAddToCart();
    await testMoveToCart();
    await testRemoveFromCart();
    await closeApp();
}

async function openApp() {
    //Make sure both client and server are running prior to exectuing this script.
    await driver.get('http://localhost:3000/');
    //driver.manage().setTimeouts({ implicit: 1000});
}

async function verifyNoPermissionRedirectTest() {
    var userFormField = await driver.findElement(By.name('email'));
    assert.ok(userFormField);
    console.log('Pass: User is not logged in.');
}

async function login() {
    await driver.findElement(By.name('email')).sendKeys(testEmail, Key.ENTER);
}

async function refreshPage() {
    await driver.navigate().refresh();
}

async function testPageContainer() {
    let searchInputLocator = By.id('page-container');
    let ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());

    const divEle = await findElementBy(
        driver,
        By.xpath(`//div[contains(@id, 'page-container')]/div`)
    );
    const eleList = await ele.findElements(By.xpath('.//a'));
    assert.ok(await divEle.isDisplayed());
    for (let i = 0; i < 20; i++) {
        assert.ok(await eleList[i].isDisplayed());
        console.log('Pass: Page container');
    }
}

async function testFooterMenuItems() {
    let searchInputLocator = By.id('footer-menu');
    let ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());
    const eleList = await ele.findElements(By.xpath('.//a'));

    assert.equal(await eleList[0].getText(), 'HOME');
    assert.equal(await eleList[1].getText(), 'CART');
    assert.equal(await eleList[2].getText(), 'PROFILE');

    const logoutBtn = await ele.findElement(By.xpath('.//button'));
    assert.equal(await logoutBtn.getText(), 'LOGOUT');
    console.log('Pass: Footer menu-item.');
}

async function testAddToCart() {
    await driver.navigate().to('http://localhost:3000/launch/109');
    const addtoCartBtn = await findElementBy(
        driver,
        By.xpath(`//button[contains(@data-testid, 'action-button')] `)
    );
    await addtoCartBtn.click();
    let searchInputLocator = By.id('footer-menu');
    let ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());
    let eleList = await ele.findElements(By.xpath('.//a'));
    await eleList[1].click();
    assert.equal(await driver.getCurrentUrl(), 'http://localhost:3000/cart');

    searchInputLocator = By.id('page-container');
    ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());

    const divEle = await findElementBy(
        driver,
        By.xpath(`//div[contains(@id, 'page-container')]/div`)
    );
    assert.ok(await divEle.isDisplayed());
    eleList = await ele.findElements(By.xpath('.//a'));

    assert.ok(await eleList[0].isDisplayed());
    console.log('Pass: Add to cart.');
}

async function testMoveToCart() {
    let searchInputLocator = By.id('footer-menu');
    let ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());
    let eleList = await ele.findElements(By.xpath('.//a'));
    await eleList[1].click();
    assert.equal(await driver.getCurrentUrl(), 'http://localhost:3000/cart');

    searchInputLocator = By.id('page-container');
    ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());

    const divEle = await findElementBy(
        driver,
        By.xpath(`//div[contains(@id, 'page-container')]/div`)
    );
    assert.ok(await divEle.isDisplayed());
    eleList = await ele.findElements(By.xpath('.//a'));

    assert.ok(await eleList[0].isDisplayed());
    console.log('Pass: Move to cart.');
}

async function testRemoveFromCart() {
    const addtoCartBtn = await findElementBy(
        driver,
        By.xpath(`//button[contains(@data-testid, 'book-button')] `)
    );
    await addtoCartBtn.click();

    assert.equal(await driver.getCurrentUrl(), 'http://localhost:3000/cart');

    const searchInputLocator = By.id('page-container');
    const ele = await findElementBy(driver, searchInputLocator);
    assert.ok(await ele.isDisplayed());

    const divEle = await findElementBy(
        driver,
        By.xpath(`//div[contains(@id, 'page-container')]/div`)
    );
    assert.ok(await divEle.isDisplayed());
    try {
        await ele.findElement(By.xpath('.//a'));
    } catch (error) {
        assert.ok(true);
    }
    console.log('Pass: Remove from cart.');
}

async function closeApp() {
    await driver.quit();
}
