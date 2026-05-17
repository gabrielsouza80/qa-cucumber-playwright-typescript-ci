import { Given, Then, When } from '@cucumber/cucumber';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CustomWorld } from '../support/world';

function getCheckoutPage(world: CustomWorld): CheckoutPage {
  if (!world.checkoutPage) throw new Error('CheckoutPage was not initialized.');
  return world.checkoutPage;
}

// ─── Given ────────────────────────────────────────────────────────────────────

Given(
  'I have {string} in my cart',
  async function (this: CustomWorld, itemSlug: string) {
    if (!this.inventoryPage) throw new Error('InventoryPage was not initialized.');
    await this.inventoryPage.addItemToCart(itemSlug);
  }
);

Given('I am on checkout step 1', async function (this: CustomWorld) {
  if (!this.inventoryPage) throw new Error('InventoryPage was not initialized.');
  if (!this.cartPage) throw new Error('CartPage was not initialized.');
  await this.inventoryPage.goToCart();
  await this.cartPage.proceedToCheckout();
  await getCheckoutPage(this).expectOnStepOne();
});

// ─── When ─────────────────────────────────────────────────────────────────────

When(
  'I submit the checkout form without filling any fields',
  async function (this: CustomWorld) {
    await getCheckoutPage(this).continue();
  }
);

When(
  'I fill in first name {string} and submit',
  async function (this: CustomWorld, firstName: string) {
    await getCheckoutPage(this).firstNameInput.fill(firstName);
    await getCheckoutPage(this).continue();
  }
);

When(
  'I fill in first name {string} and last name {string} and submit',
  async function (this: CustomWorld, firstName: string, lastName: string) {
    await getCheckoutPage(this).firstNameInput.fill(firstName);
    await getCheckoutPage(this).lastNameInput.fill(lastName);
    await getCheckoutPage(this).continue();
  }
);

When(
  'I fill in checkout information {string} {string} {string}',
  async function (
    this: CustomWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await getCheckoutPage(this).fillCustomerInfo(firstName, lastName, postalCode);
    await getCheckoutPage(this).continue();
  }
);

When('I cancel checkout on step 1', async function (this: CustomWorld) {
  await getCheckoutPage(this).cancel();
});

When('I cancel checkout on step 2', async function (this: CustomWorld) {
  await getCheckoutPage(this).cancel();
});

When('I finish the order', async function (this: CustomWorld) {
  await getCheckoutPage(this).finish();
});

When('I click back home', async function (this: CustomWorld) {
  await getCheckoutPage(this).backHome();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then('I should be on checkout step 1', async function (this: CustomWorld) {
  await getCheckoutPage(this).expectOnStepOne();
});

Then('I should be on checkout step 2', async function (this: CustomWorld) {
  await getCheckoutPage(this).expectOnStepTwo();
});

Then('I should be on the checkout complete page', async function (this: CustomWorld) {
  await getCheckoutPage(this).expectOnCompletePage();
});

Then(
  'I should see the checkout error {string}',
  async function (this: CustomWorld, message: string) {
    await getCheckoutPage(this).expectErrorMessage(message);
  }
);

Then(
  'the payment info should be {string}',
  async function (this: CustomWorld, value: string) {
    await getCheckoutPage(this).expectPaymentInfo(value);
  }
);

Then(
  'the shipping info should be {string}',
  async function (this: CustomWorld, value: string) {
    await getCheckoutPage(this).expectShippingInfo(value);
  }
);

Then(
  'the subtotal should contain {string}',
  async function (this: CustomWorld, value: string) {
    await getCheckoutPage(this).expectSubtotal(value);
  }
);

Then(
  'the tax should contain {string}',
  async function (this: CustomWorld, value: string) {
    await getCheckoutPage(this).expectTax(value);
  }
);

Then(
  'the total should contain {string}',
  async function (this: CustomWorld, value: string) {
    await getCheckoutPage(this).expectTotal(value);
  }
);

Then(
  'the order summary should contain {int} item',
  async function (this: CustomWorld, count: number) {
    await getCheckoutPage(this).expectSummaryItemCount(count);
  }
);

Then(
  'the confirmation header should be {string}',
  async function (this: CustomWorld, text: string) {
    await getCheckoutPage(this).expectCompleteHeader(text);
  }
);

Then(
  'the confirmation text should be {string}',
  async function (this: CustomWorld, text: string) {
    await getCheckoutPage(this).expectCompleteText(text);
  }
);

Then('the pony express image should be visible', async function (this: CustomWorld) {
  await getCheckoutPage(this).expectPonyExpressImageVisible();
});

Then('the back home button should be visible', async function (this: CustomWorld) {
  await getCheckoutPage(this).expectBackHomeButtonVisible();
});
