import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { LoginPage } from '../pages/LoginPage';
import type { InventoryPage } from '../pages/InventoryPage';
import type { CartPage } from '../pages/CartPage';
import type { CheckoutPage } from '../pages/CheckoutPage';
import type { ProductDetailPage } from '../pages/ProductDetailPage';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;
  inventoryPage?: InventoryPage;
  cartPage?: CartPage;
  checkoutPage?: CheckoutPage;
  productDetailPage?: ProductDetailPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
