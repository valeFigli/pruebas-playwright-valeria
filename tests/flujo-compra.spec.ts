import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Flujo completo de compra exitosa', async ({ page }) => {
  // Inicializamos todas las páginas que intervienen en el patrón POM
  const login = new LoginPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // 1. Ir al login e iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  await login.iniciarSesion('standard_user', 'secret_sauce');

  // 2. Agregar un producto directo por su ID de botón de SauceDemo e ir al carrito
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.goto('https://www.saucedemo.com/cart.html');

  // 3. Ir al Checkout usando el POM del carrito
  await cart.irAlCheckout();

  // 4. Completar datos usando el POM del checkout
  await checkout.completarDatosEnvio('Valeria', 'Figliolo', '1846');

  // 5. Aserción final: verificar que avanzamos al resumen
  await expect(page).toHaveURL(/checkout-step-two/);
});