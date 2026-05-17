import { Given, Then, When } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';

function getLoginPage(world: CustomWorld): LoginPage {
  if (!world.loginPage) throw new Error('LoginPage was not initialized.');
  return world.loginPage;
}

// ─── Given ────────────────────────────────────────────────────────────────────

Given('I am on the SauceDemo login page', async function (this: CustomWorld) {
  await getLoginPage(this).goto();
});

// ─── When ─────────────────────────────────────────────────────────────────────

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await getLoginPage(this).login(username, password);
  }
);

When(
  'I click the login button without entering credentials',
  async function (this: CustomWorld) {
    await getLoginPage(this).loginButton.click();
  }
);

When(
  'I type {string} into the password field',
  async function (this: CustomWorld, value: string) {
    await getLoginPage(this).typePassword(value);
  }
);

When('I close the login error message', async function (this: CustomWorld) {
  await getLoginPage(this).closeErrorMessage();
});

When('I log out from the application', async function (this: CustomWorld) {
  if (!this.inventoryPage) throw new Error('InventoryPage was not initialized.');
  await this.inventoryPage.logout();
});

When('I press the browser back button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page was not initialized.');
  await this.page.goBack();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then('I should see the products page', async function (this: CustomWorld) {
  if (!this.inventoryPage) throw new Error('InventoryPage was not initialized.');
  await this.inventoryPage.expectOnInventoryPage();
});

Then(
  'I should see the login error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    await getLoginPage(this).expectErrorMessageVisible(expectedMessage);
  }
);

Then('the login error message should not be visible', async function (this: CustomWorld) {
  await getLoginPage(this).expectErrorMessageNotVisible();
});

Then('the username input should have an error style', async function (this: CustomWorld) {
  const page = getLoginPage(this);
  await page.expectInputHasErrorStyle(page.usernameInput);
});

Then('the password input should have an error style', async function (this: CustomWorld) {
  const page = getLoginPage(this);
  await page.expectInputHasErrorStyle(page.passwordInput);
});

Then('the login page should display the username field', async function (this: CustomWorld) {
  await getLoginPage(this).expectUsernameFieldVisible();
});

Then('the login page should display the password field', async function (this: CustomWorld) {
  await getLoginPage(this).expectPasswordFieldVisible();
});

Then('the login page should display the login button', async function (this: CustomWorld) {
  await getLoginPage(this).expectLoginButtonVisible();
});

Then('the login page should display the Swag Labs logo', async function (this: CustomWorld) {
  await getLoginPage(this).expectLogoVisible();
});

Then(
  'the password field type should be {string}',
  async function (this: CustomWorld, expectedType: string) {
    await getLoginPage(this).expectPasswordFieldType(expectedType);
  }
);

Then('I should be on the login page', async function (this: CustomWorld) {
  await getLoginPage(this).expectOnLoginPage();
});

Then('the page URL should use HTTPS', async function (this: CustomWorld) {
  await getLoginPage(this).expectHttps();
});
