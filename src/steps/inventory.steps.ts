import { Given, Then, When } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/InventoryPage';
import { CustomWorld } from '../support/world';

function getInventoryPage(world: CustomWorld): InventoryPage {
  if (!world.inventoryPage) throw new Error('InventoryPage was not initialized.');
  return world.inventoryPage;
}

// ─── Given ────────────────────────────────────────────────────────────────────

Given('I am logged in as {string}', async function (this: CustomWorld, username: string) {
  if (!this.loginPage) throw new Error('LoginPage was not initialized.');
  await this.loginPage.goto();
  await this.loginPage.login(username, 'secret_sauce');
  await getInventoryPage(this).expectOnInventoryPage();
});

// ─── When ─────────────────────────────────────────────────────────────────────

When(
  'I sort products by {string}',
  async function (this: CustomWorld, label: string) {
    const map: Record<string, 'az' | 'za' | 'lohi' | 'hilo'> = {
      'Name (A to Z)': 'az',
      'Name (Z to A)': 'za',
      'Price (low to high)': 'lohi',
      'Price (high to low)': 'hilo',
    };
    await getInventoryPage(this).sortBy(map[label]);
  }
);

When(
  'I add {string} to the cart',
  async function (this: CustomWorld, itemSlug: string) {
    await getInventoryPage(this).addItemToCart(itemSlug);
  }
);

When(
  'I remove {string} from the cart on inventory page',
  async function (this: CustomWorld, itemSlug: string) {
    await getInventoryPage(this).removeItemFromCart(itemSlug);
  }
);

When('I click the cart icon', async function (this: CustomWorld) {
  await getInventoryPage(this).goToCart();
});

When(
  'I click on product name with id {int}',
  async function (this: CustomWorld, itemId: number) {
    await getInventoryPage(this).clickProductName(itemId);
  }
);

When(
  'I click on product image with id {int}',
  async function (this: CustomWorld, itemId: number) {
    await getInventoryPage(this).clickProductImage(itemId);
  }
);

When('I open the burger menu', async function (this: CustomWorld) {
  await getInventoryPage(this).openBurgerMenu();
});

When('I click logout in the burger menu', async function (this: CustomWorld) {
  await getInventoryPage(this).menuLogout.click();
});

When('I reset the app state', async function (this: CustomWorld) {
  await getInventoryPage(this).resetAppState();
});

When('I reload the page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page was not initialized.');
  await this.page.reload();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then(
  'I should see the products page title {string}',
  async function (this: CustomWorld, title: string) {
    if (!this.page) throw new Error('Page was not initialized.');
    const { expect } = await import('@playwright/test');
    await expect(this.page.locator('[data-test="title"]')).toHaveText(title);
  }
);

Then('the inventory list should be visible', async function (this: CustomWorld) {
  await getInventoryPage(this).expectOnInventoryPage();
});

Then('the sort dropdown should be visible', async function (this: CustomWorld) {
  await getInventoryPage(this).expectSortDropdownVisible();
});

Then('the cart icon should be visible', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page was not initialized.');
  const { expect } = await import('@playwright/test');
  await expect(this.page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

Then('the burger menu button should be visible', async function (this: CustomWorld) {
  await getInventoryPage(this).expectBurgerMenuVisible();
});

Then(
  'the inventory should contain {int} products',
  async function (this: CustomWorld, count: number) {
    await getInventoryPage(this).expectItemCount(count);
  }
);

Then(
  'the first product name should be {string}',
  async function (this: CustomWorld, name: string) {
    await getInventoryPage(this).expectFirstItemName(name);
  }
);

Then(
  'the last product name should be {string}',
  async function (this: CustomWorld, name: string) {
    await getInventoryPage(this).expectLastItemName(name);
  }
);

Then(
  'the first product price should be {string}',
  async function (this: CustomWorld, price: string) {
    await getInventoryPage(this).expectFirstItemPrice(price);
  }
);

Then(
  'the last product price should be {string}',
  async function (this: CustomWorld, price: string) {
    await getInventoryPage(this).expectLastItemPrice(price);
  }
);

Then(
  'the cart badge should show {string}',
  async function (this: CustomWorld, count: string) {
    await getInventoryPage(this).expectCartBadge(count);
  }
);

Then('the cart badge should not be visible', async function (this: CustomWorld) {
  await getInventoryPage(this).expectCartBadgeNotVisible();
});

Then(
  'the {string} button should show {string}',
  async function (this: CustomWorld, itemSlug: string, text: string) {
    await getInventoryPage(this).expectItemButtonText(itemSlug, text);
  }
);

Then('the footer should be visible', async function (this: CustomWorld) {
  await getInventoryPage(this).expectFooterVisible();
});

Then('the footer should display the Twitter link', async function (this: CustomWorld) {
  await getInventoryPage(this).expectTwitterLinkVisible();
});

Then('the footer should display the Facebook link', async function (this: CustomWorld) {
  await getInventoryPage(this).expectFacebookLinkVisible();
});

Then('the footer should display the LinkedIn link', async function (this: CustomWorld) {
  await getInventoryPage(this).expectLinkedInLinkVisible();
});

Then(
  'I should be on the product detail page for item {int}',
  async function (this: CustomWorld, itemId: number) {
    if (!this.productDetailPage) throw new Error('ProductDetailPage was not initialized.');
    await this.productDetailPage.expectOnDetailPage(itemId);
  }
);

Then(
  'the burger menu should contain {string}',
  async function (this: CustomWorld, text: string) {
    if (!this.page) throw new Error('Page was not initialized.');
    const { expect } = await import('@playwright/test');
    await expect(this.page.locator('.bm-item', { hasText: text })).toBeVisible();
  }
);
