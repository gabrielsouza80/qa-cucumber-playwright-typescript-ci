import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly productsTitle: Locator;
  private readonly inventoryList: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.productsTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectProductsPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.productsTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async expectErrorMessageVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(
      'Username and password do not match'
    );
  }
}
