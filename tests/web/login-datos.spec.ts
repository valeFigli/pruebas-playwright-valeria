import { test, expect } from '@playwright/test';
import usuarios from '../data/usuarios.json';

test.describe('Pruebas Basadas en Datos (DDT) - SauceDemo', () => {

  for (const usuario of usuarios) {
    
    test(`Debe intentar login con perfil: ${usuario.tipo}`, async ({ page }) => {
      // 1. Navegación directa con URL 100% limpia
      await page.goto('https://www.saucedemo.com/');
      
      // 2. Llenar los campos
      await page.locator('[data-test="username"]').fill(usuario.nombre);
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      // 3. Decisión inteligente según el tipo de usuario
      if (usuario.debePasar) {
        // Si debe pasar, esperamos entrar al inventario
        await expect(page).toHaveURL(/.*inventory.html/);
        console.log(`✅ Login exitoso confirmado para: ${usuario.tipo}`);
      } else {
        // Si está bloqueado, esperamos ver el cartel de error y seguir en la misma web
        const contenedorError = page.locator('[data-test="error"]');
        await expect(contenedorError).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        console.log(`❌ Error de bloqueo validado con éxito para: ${usuario.tipo}`);
      }
    });

  }

});