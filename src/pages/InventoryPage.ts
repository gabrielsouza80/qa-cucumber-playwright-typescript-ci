import { expect, type Locator, type Page } from '@playwright/test';
import { config } from '../support/config';

export class InventoryPage {
  private readonly page: Page;

  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly burgerMenuClose: Locator;
  readonly menuAllItems: Locator;
  readonly menuAbout: Locator;
  readonly menuLogout: Locator;
  readonly menuReset: Locator;
  readonly footer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.burgerMenuClose = page.locator('#react-burger-cross-btn');
    this.menuAllItems = page.locator('[data-test="inventory-sidebar-link"]');
    this.menuAbout = page.locator('[data-test="about-sidebar-link"]');
    this.menuLogout = page.locator('[data-test="logout-sidebar-link"]');
    this.menuReset = page.locator('[data-test="reset-sidebar-link"]');
    this.footer = page.locator('[data-test="footer"]');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedInLink = page.locator('[data-test="social-linkedin"]');
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.page.goto(`${config.baseUrl}inventory.html`);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async addItemToCart(itemSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${itemSlug}"]`).click();
  }

  async removeItemFromCart(itemSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async openBurgerMenu(): Promise<void> {
    await this.burgerMenuButton.click();
  }

  async closeBurgerMenu(): Promise<void> {
    await this.burgerMenuClose.click();
  }

  async logout(): Promise<void> {
    await this.openBurgerMenu();
    await this.menuLogout.click();
  }

  async resetAppState(): Promise<void> {
    await this.openBurgerMenu();
    await this.menuReset.click();
  }

  async clickProductName(itemId: number): Promise<void> {
    await this.page.locator(`[data-test="item-${itemId}-title-link"]`).click();
  }

  async clickProductImage(itemId: number): Promise<void> {
    await this.page.locator(`[data-test="item-${itemId}-img-link"]`).click();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item"]')).toHaveCount(count);
  }

  async expectCartBadge(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  async expectCartBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async expectItemButtonText(itemSlug: string, text: string): Promise<void> {
    const btn = this.page.locator(`[data-test="add-to-cart-${itemSlug}"], [data-test="remove-${itemSlug}"]`).first();
    await expect(btn).toHaveText(text);
  }

  async expectFirstItemName(name: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]').first()).toHaveText(name);
  }

  async expectLastItemName(name: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]').last()).toHaveText(name);
  }

  async expectFirstItemPrice(price: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-price"]').first()).toHaveText(price);
  }

  async expectLastItemPrice(price: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-price"]').last()).toHaveText(price);
  }

  async expectBurgerMenuVisible(): Promise<void> {
    await expect(this.burgerMenuButton).toBeVisible();
  }

  async expectSortDropdownVisible(): Promise<void> {
    await expect(this.sortDropdown).toBeVisible();
  }

  async expectFooterVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async expectTwitterLinkVisible(): Promise<void> {
    await expect(this.twitterLink).toBeVisible();
    await expect(this.twitterLink).toHaveAttribute('href', 'https://twitter.com/saucelabs');
  }

  async expectFacebookLinkVisible(): Promise<void> {
    await expect(this.facebookLink).toBeVisible();
    await expect(this.facebookLink).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
  }

  async expectLinkedInLinkVisible(): Promise<void> {
    await expect(this.linkedInLink).toBeVisible();
    await expect(this.linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
  }
}
