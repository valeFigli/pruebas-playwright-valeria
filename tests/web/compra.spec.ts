import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Debe permitir completar el flujo de envío de forma exitosa', async ({ page }) => {
const checkout = new CheckoutPage(page);

// 1. Ir a la página de inicio e iniciar sesión (Requisito de SauceDemo)
await page.goto('https://www.saucedemo.com/');
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();

// 2. Ahora que estamos logueados, navegamos al checkout con la URL limpia
await page.goto('https://www.saucedemo.com/checkout-step-one.html');

// 3. Ejecución de la acción del POM con datos de prueba
await checkout.completarDatosEnvio('Valeria', 'Figliolo', '1846');

// 4. Aserción (Verificamos que avanzamos al paso dos)
await expect(page).toHaveURL(/checkout-step-two/);
});