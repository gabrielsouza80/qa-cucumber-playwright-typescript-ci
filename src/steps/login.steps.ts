import { Given, Then, When } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';

function getLoginPage(world: CustomWorld): LoginPage {
  if (!world.loginPage) {
    throw new Error('LoginPage was not initialized.');
  }

  return world.loginPage;
}

Given('I am on the SauceDemo login page', async function (this: CustomWorld) {
  await getLoginPage(this).goto();
});

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await getLoginPage(this).login(username, password);
  }
);

Then('I should see the products page', async function (this: CustomWorld) {
  await getLoginPage(this).expectProductsPageVisible();
});

Then('I should see a login error message', async function (this: CustomWorld) {
  await getLoginPage(this).expectErrorMessageVisible();
});
