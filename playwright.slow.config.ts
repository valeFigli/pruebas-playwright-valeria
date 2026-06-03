import { defineConfig, devices } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  // Heredamos toda la configuración que ya tenés en tu archivo base
  ...baseConfig,
  
  // Sobrescribimos específicamente las opciones de lanzamiento para agregar la pausa
  use: {
    ...baseConfig.use,
    
    // 🎭 Cámara lenta de 1.5 segundos (1500ms) entre cada acción
    launchOptions: {
      slowMo: 1500,
    },
  },

  // Forzamos que siempre use un solo "worker" para que no abra múltiples navegadores a la vez y sea fácil de seguir con la mirada
  workers: 1,
});