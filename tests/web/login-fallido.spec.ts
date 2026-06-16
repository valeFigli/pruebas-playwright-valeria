import { test, expect } from '@playwright/test';

test.describe('Suite de Pruebas de Evidencias Visuales', () => {

  test('Forzar error para generar captura y video de debugging', async ({ page }) => {
    // 1. Navegamos a la web
    await page.goto('https://www.saucedemo.com/');
    
    // 2. Metemos credenciales incorrectas adrede
    await page.locator('[data-test="username"]').fill('usuario_que_no_existe');
    await page.locator('[data-test="password"]').fill('clave_incorrecta');
    await page.locator('[data-test="login-button"]').click();
    
    // 3. Forzamos el fallo: Le exigimos a Playwright que la URL sea la del inventario.
    // Como las credenciales son falsas, nunca va a cambiar de URL, va a fallar por timeout o aserción,
    // y te va a grabar el video y la foto de manera obligatoria.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

});