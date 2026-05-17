import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { config } from './config';
import { CustomWorld } from './world';

setDefaultTimeout(config.timeout);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: config.headless });
  this.context = await this.browser.newContext({ viewport: config.viewport });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.timeout);
  this.page.setDefaultNavigationTimeout(config.timeout);
  this.loginPage = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  this.productDetailPage = new ProductDetailPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.context?.close();
  await this.browser?.close();
});
