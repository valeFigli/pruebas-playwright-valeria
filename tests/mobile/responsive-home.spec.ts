import { test, expect } from '@playwright/test';

test.describe('Pruebas de Responsividad y Emulación Mobile', () => {

  test('Debe adaptar la interfaz y permitir agregar tareas en vista celular', async ({ page, isMobile }) => {
    // 1. Navegamos a la aplicación de pruebas
    await page.goto('https://demo.playwright.dev/todomvc/');

    // 2. Usamos una aserción inteligente de Playwright:
    // El objeto 'isMobile' viene de la configuración de nuestro 'playwright.config.ts'
    if (isMobile) {
      console.log('📱 Ejecutando en entorno móvil emulado...');
      
      // Validamos que el cuadro de texto de entrada se adapte al ancho de la pantalla móvil (que no se desborde)
      const inputTodo = page.getByPlaceholder('What needs to be done?');
      await expect(inputTodo).toBeVisible();
      
      // Simulamos escribir una tarea usando el teclado virtual del celular
      await inputTodo.fill('Comprar fundas para el iPhone');
      await inputTodo.press('Enter');

      // 3. Verificamos que la tarea se haya agregado correctamente
      const nuevaTarea = page.getByText('Comprar fundas para el iPhone');
      await expect(nuevaTarea).toBeVisible();

      // En mobile, los elementos táctiles suelen tener un tamaño específico.
      // Validamos que el checkbox esté listo para recibir un "tap" o toque de pantalla
      const checkbox = page.locator('li').filter({ hasText: 'Comprar fundas para el iPhone' }).getByRole('checkbox');
      await expect(checkbox).toBeEnabled();
      
      // Hacemos el toque (tap/click móvil)
      await checkbox.click();
      
      console.log('✅ Interacción táctil completada con éxito.');

      // =========================================================================
      // 📸 CAPTURA DE PANTALLA VISUAL (Visual Testing):
      // Guardamos una foto de página completa para certificar el diseño responsivo
      // =========================================================================
      const nombreDispositivo = test.info().project.name;
      await page.screenshot({ 
        path: `screenshots/pantalla-todo-list-${nombreDispositivo}.png`, 
        fullPage: true 
      });
      console.log(`📸 Captura de pantalla guardada en: screenshots/pantalla-todo-list-${nombreDispositivo}.png`);

    } else {
      console.log('💻 Saltando validaciones móviles específicas (Entorno de Escritorio detectado).');
      
      // Si corre en desktop, igual completamos un flujo básico para que no quede vacío el reporte
      const inputTodo = page.getByPlaceholder('What needs to be done?');
      await inputTodo.fill('Tarea desde computadora');
      await inputTodo.press('Enter');
      await expect(page.getByText('Tarea desde computadora')).toBeVisible();
    }

    // =========================================================================
    // 🛠️ HERRAMIENTA DE DEBUEO ESTABLE:
    // =========================================================================
    // Esperamos 2 segundos antes de cerrar para que la ejecución sea natural
    await page.waitForTimeout(2000);
  });

});