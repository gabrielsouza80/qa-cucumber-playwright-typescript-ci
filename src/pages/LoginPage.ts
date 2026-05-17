import { expect, type Locator, type Page } from '@playwright/test';
import { config } from '../support/config';

export class LoginPage {
  private readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error"] button');
    this.logo = page.locator('.login_logo');
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async typePassword(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async closeErrorMessage(): Promise<void> {
    await this.errorCloseButton.click();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.baseUrl);
    await expect(this.loginButton).toBeVisible();
  }

  async expectErrorMessageVisible(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async expectErrorMessageNotVisible(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible();
  }

  async expectInputHasErrorStyle(locator: Locator): Promise<void> {
    await expect(locator).toHaveClass(/error/);
  }

  async expectInputHasNoErrorStyle(locator: Locator): Promise<void> {
    await expect(locator).not.toHaveClass(/\berror\b/);
  }

  async expectUsernameFieldVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
  }

  async expectPasswordFieldVisible(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();
  }

  async expectLoginButtonVisible(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async expectLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async expectPasswordFieldType(expectedType: string): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', expectedType);
  }

  async expectHttps(): Promise<void> {
    expect(this.page.url().startsWith('https://')).toBeTruthy();
  }
}
