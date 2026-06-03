import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly codigoPostalInput: Locator;
  readonly botonContinuar: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores usando buenas prácticas (IDs y Roles)
    this.nombreInput = page.locator('#first-name');
    this.apellidoInput = page.locator('#last-name');
    this.codigoPostalInput = page.locator('#postal-code');
    this.botonContinuar = page.getByRole('button', { name: 'Continue' });
  }

  // Acción tipada: los parámetros deben ser strings, y la función promete no devolver nada (void)
  async completarDatosEnvio(nombre: string, apellido: string, cp: string): Promise<void> {
    await this.nombreInput.fill(nombre);
    await this.apellidoInput.fill(apellido);
    await this.codigoPostalInput.fill(cp);
    await this.botonContinuar.click();
  }
}
