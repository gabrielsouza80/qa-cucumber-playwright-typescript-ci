import { Given, Then, When } from '@cucumber/cucumber';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CustomWorld } from '../support/world';
import { config } from '../support/config';

function getDetailPage(world: CustomWorld): ProductDetailPage {
  if (!world.productDetailPage) throw new Error('ProductDetailPage was not initialized.');
  return world.productDetailPage;
}

// ─── Given ────────────────────────────────────────────────────────────────────

Given(
  'I navigate to product detail page for item {int}',
  async function (this: CustomWorld, itemId: number) {
    if (!this.page) throw new Error('Page was not initialized.');
    await this.page.goto(`${config.baseUrl}inventory-item.html?id=${itemId}`);
    await getDetailPage(this).expectOnDetailPage(itemId);
  }
);

// ─── When ─────────────────────────────────────────────────────────────────────

When('I add the product to the cart from the detail page', async function (this: CustomWorld) {
  await getDetailPage(this).addToCart();
});

When(
  'I remove the product from the cart on the detail page',
  async function (this: CustomWorld) {
    await getDetailPage(this).removeFromCart();
  }
);

When('I click back to products', async function (this: CustomWorld) {
  await getDetailPage(this).goBackToProducts();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then(
  'the product name should be {string}',
  async function (this: CustomWorld, name: string) {
    await getDetailPage(this).expectItemName(name);
  }
);

Then(
  'the product price should be {string}',
  async function (this: CustomWorld, price: string) {
    await getDetailPage(this).expectItemPrice(price);
  }
);

Then('the product description should be visible', async function (this: CustomWorld) {
  await getDetailPage(this).expectItemDescVisible();
});

Then('the product image should be visible', async function (this: CustomWorld) {
  await getDetailPage(this).expectItemImageVisible();
});

Then('the add to cart button should be visible', async function (this: CustomWorld) {
  await getDetailPage(this).expectAddToCartButtonVisible();
});

Then('the remove button should be visible', async function (this: CustomWorld) {
  await getDetailPage(this).expectRemoveButtonVisible();
});

Then('the back to products button should be visible', async function (this: CustomWorld) {
  await getDetailPage(this).expectBackButtonVisible();
});

