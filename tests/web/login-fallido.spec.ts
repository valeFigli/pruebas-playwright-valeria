import { test, expect } from '@playwright/test';

test.describe('Suite de Pruebas: Escenarios Negativos y Evidencias', () => {

  // 🟢 TEST 1: Queda en VERDE (Prueba negativa real y correcta)
  test('Debe mostrar error de credenciales incorrectas y quedar en VERDE', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await page.locator('[data-test="username"]').fill('usuario_falso');
    await page.locator('[data-test="password"]').fill('clave_falsa');
    await page.locator('[data-test="login-button"]').click();
    
    const mensajeError = page.locator('[data-test="error"]');
    await expect(mensajeError).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    console.log('✅ El sistema rechazó correctamente las credenciales falsas.');
  });

  // 🔴 TEST 2: Solo falla en tu Mac (Se saltea automáticamente en GitHub)
  test('FORZAR FALLO: Debe fallar para obligar a Playwright a grabar video', async ({ page }) => {
    // 🧠 MAGIA DE QA: Si estamos en GitHub (CI), este test se saltea para que el pipeline no falle
    test.skip(!!process.env.CI, 'Saltando test de error forzado para mantener el pipeline de GitHub en verde');

    await page.goto('https://www.saucedemo.com/');
    
    await page.locator('[data-test="username"]').fill('usuario_inexistente_adrede');
    await page.locator('[data-test="password"]').fill('clave_incorrecta_adrede');
    await page.locator('[data-test="login-button"]').click();
    
    // Forzamos el fallo
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

});