import { After, Before } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.context?.close();
  await this.browser?.close();
});
