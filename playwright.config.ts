import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecuta los tests en archivos en paralelo */
  fullyParallel: true,
  /* Falla la compilación si dejaste un test.only por error */
  forbidOnly: false,
  /* Reintentos en caso de fallo (0 para local) */
  retries: 0,
  /* Opt out of parallel tests on CI. undefined usa los recursos disponibles */
  workers: undefined,
  /* Reportero a utilizar */
  reporter: 'html',
  
  /* Configuración compartida para todos los proyectos */
  use: {
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },

  /* 🎭 CONFIGURACIÓN DE PROYECTOS (ESCRITORIO + MÓVILES) */
  projects: [
    // 💻 Tus navegadores de escritorio tradicionales:
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // 📱 NUEVOS DISPOSITIVOS MÓVILES ACTIVOS:
    {
      name: 'Mobile-iPhone-14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Mobile-Pixel-7',
      use: { ...devices['Pixel 7'] },
    },
  ],
});