import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selector específico de SauceDemo para avanzar al checkout
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async irAlCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

