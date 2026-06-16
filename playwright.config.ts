import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  
  use: {
    /* 📸 CONFIGURACIÓN DE EVIDENCIAS AUTOMÁTICAS ANTE FALLOS */
    screenshot: 'only-on-failure', // Toma una foto si el test falla
    video: 'retain-on-failure',     // Graba un video si el test falla
    trace: 'retain-on-failure',     // Genera una traza técnica completa si el test falla
  },

  projects: [
    // 💻 Navegadores de escritorio
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // 📱 Dispositivos móviles
    {
      name: 'Mobile-iPhone-14',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
