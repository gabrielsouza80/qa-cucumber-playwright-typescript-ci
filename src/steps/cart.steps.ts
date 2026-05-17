import { Then, When } from '@cucumber/cucumber';
import { CartPage } from '../pages/CartPage';
import { CustomWorld } from '../support/world';

function getCartPage(world: CustomWorld): CartPage {
  if (!world.cartPage) throw new Error('CartPage was not initialized.');
  return world.cartPage;
}

// ─── When ─────────────────────────────────────────────────────────────────────

When('I navigate to the cart page', async function (this: CustomWorld) {
  if (!this.inventoryPage) throw new Error('InventoryPage was not initialized.');
  await this.inventoryPage.goToCart();
});

When(
  'I remove {string} from the cart',
  async function (this: CustomWorld, itemSlug: string) {
    await getCartPage(this).removeItem(itemSlug);
  }
);

When('I click continue shopping', async function (this: CustomWorld) {
  await getCartPage(this).continueShopping();
});

When('I proceed to checkout', async function (this: CustomWorld) {
  await getCartPage(this).proceedToCheckout();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then('I should be on the cart page', async function (this: CustomWorld) {
  await getCartPage(this).expectOnCartPage();
});

Then('the continue shopping button should be visible', async function (this: CustomWorld) {
  await getCartPage(this).expectContinueShoppingButtonVisible();
});

Then('the checkout button should be visible', async function (this: CustomWorld) {
  await getCartPage(this).expectCheckoutButtonVisible();
});

Then('the cart should be empty', async function (this: CustomWorld) {
  await getCartPage(this).expectCartEmpty();
});

Then(
  'the cart should contain {int} item',
  async function (this: CustomWorld, count: number) {
    await getCartPage(this).expectItemCount(count);
  }
);

Then(
  'the cart should contain {int} items',
  async function (this: CustomWorld, count: number) {
    await getCartPage(this).expectItemCount(count);
  }
);

Then(
  'the cart should contain {string}',
  async function (this: CustomWorld, name: string) {
    await getCartPage(this).expectItemPresent(name);
  }
);

Then(
  'the cart should not contain {string}',
  async function (this: CustomWorld, name: string) {
    await getCartPage(this).expectItemNotPresent(name);
  }
);

Then(
  'the quantity for {string} should be {string}',
  async function (this: CustomWorld, itemSlug: string, qty: string) {
    await getCartPage(this).expectItemQuantity(itemSlug, qty);
  }
);

