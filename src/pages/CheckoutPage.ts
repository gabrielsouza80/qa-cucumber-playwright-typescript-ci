import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;

  // Step 1
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly backToCartButton: Locator;
  readonly summaryItems: Locator;

  // Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');

    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backToCartButton = page.locator('[data-test="back-to-cart"]');
    this.summaryItems = page.locator('[data-test="inventory-item"]');

    // Complete
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  // ─── Assertions: Step 1 ────────────────────────────────────────────────────

  async expectOnStepOne(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  // ─── Assertions: Step 2 ────────────────────────────────────────────────────

  async expectOnStepTwo(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async expectPaymentInfo(value: string): Promise<void> {
    await expect(this.paymentInfoValue).toHaveText(value);
  }

  async expectShippingInfo(value: string): Promise<void> {
    await expect(this.shippingInfoValue).toHaveText(value);
  }

  async expectSubtotal(value: string): Promise<void> {
    await expect(this.subtotalLabel).toContainText(value);
  }

  async expectTax(value: string): Promise<void> {
    await expect(this.taxLabel).toContainText(value);
  }

  async expectTotal(value: string): Promise<void> {
    await expect(this.totalLabel).toContainText(value);
  }

  async expectSummaryItemCount(count: number): Promise<void> {
    await expect(this.summaryItems).toHaveCount(count);
  }

  // ─── Assertions: Complete ──────────────────────────────────────────────────

  async expectOnCompletePage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
  }

  async expectCompleteHeader(text: string): Promise<void> {
    await expect(this.completeHeader).toHaveText(text);
  }

  async expectCompleteText(text: string): Promise<void> {
    await expect(this.completeText).toHaveText(text);
  }

  async expectPonyExpressImageVisible(): Promise<void> {
    await expect(this.ponyExpressImage).toBeVisible();
  }

  async expectBackHomeButtonVisible(): Promise<void> {
    await expect(this.backHomeButton).toBeVisible();
  }
}
