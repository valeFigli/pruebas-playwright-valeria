import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selectores específicos de SauceDemo para el formulario de login
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async iniciarSesion(usuario: string, clave: string): Promise<void> {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(clave);
    await this.loginButton.click();
  }
}