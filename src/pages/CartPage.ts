import { expect, type Locator, type Page } from '@playwright/test';
import { config } from '../support/config';

export class CartPage {
  private readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.page.goto(`${config.baseUrl}cart.html`);
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async removeItem(itemSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async expectOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectItemPresent(name: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: name })).toBeVisible();
  }

  async expectItemNotPresent(name: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: name })).not.toBeVisible();
  }

  async expectItemQuantity(itemSlug: string, qty: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator(`[data-test="remove-${itemSlug}"]`),
    });
    await expect(item.locator('[data-test="item-quantity"]')).toHaveText(qty);
  }

  async expectContinueShoppingButtonVisible(): Promise<void> {
    await expect(this.continueShoppingButton).toBeVisible();
  }

  async expectCheckoutButtonVisible(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
  }

  async expectCartBadge(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  async expectCartBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
