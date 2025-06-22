const {test, expect} = require('@playwright/test');

test('Browser context playwright test', async ({browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractise/');
});

test('Page playwright test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the page
    console.log('Page title:', await page.title()); // Log the page title
    // You can add more interactions or assertions here if needed
});

test('Portal launch playwright test', async ({page}) => {
    await page.goto('https://www1.bgo.bgdigitaltest.co.uk/identity/');
    await page.waitForTimeout(5000);
    expect(await page.title()).toBe('Log in to your account');
    expect(page.url()).toBe('https://www1.bgo.bgdigitaltest.co.uk/identity/');
    expect(page).toHaveURL('https://www1.bgo.bgdigitaltest.co.uk/identity/');
    expect(page).toHaveTitle('Log in to your account');
    console.log('Portal title:', await page.title());
});

test('Successful Login page practice', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.fill('input[name="username"]', 'rahulshettyacademy');
    await page.fill('input[name="password"]', 'learning');
    await page.click('input[type="submit"]');
    await page.waitForTimeout(5000); // Wait for 5 seconds to observe the result
    expect(page.url()).toContain('https://rahulshettyacademy.com/angularpractice/shop');
    expect(await page.title()).toBe('ProtoCommerce');
    console.log('Login page title:', await page.title());
});

test.only('Failed Login page practice', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('input[type="submit"]');
    const errorMessage = page.locator('div[style*="block"]');
    await errorMessage.waitFor({ state: 'visible' }); // Wait for error message to appear
    const errorText = await errorMessage.textContent();
    console.log("error message received: ", errorText);
    await expect(errorMessage).toBeVisible();
    await expect(errorText).toContain('username/password.'); // Check substring instead of exact match
    await expect(errorMessage).toHaveCount(1);
});