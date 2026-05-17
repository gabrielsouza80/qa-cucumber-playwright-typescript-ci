import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailPage {
  private readonly page: Page;

  readonly itemName: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;
  readonly itemImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async goBackToProducts(): Promise<void> {
    await this.backButton.click();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async expectOnDetailPage(itemId: number): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`inventory-item\\.html\\?id=${itemId}`));
  }

  async expectItemName(name: string): Promise<void> {
    await expect(this.itemName).toHaveText(name);
  }

  async expectItemPrice(price: string): Promise<void> {
    await expect(this.itemPrice).toHaveText(price);
  }

  async expectItemDescVisible(): Promise<void> {
    await expect(this.itemDesc).toBeVisible();
  }

  async expectItemImageVisible(): Promise<void> {
    await expect(this.itemImage).toBeVisible();
  }

  async expectAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectRemoveButtonVisible(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }

  async expectBackButtonVisible(): Promise<void> {
    await expect(this.backButton).toBeVisible();
  }

  async expectCartBadge(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  async expectCartBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }
}
