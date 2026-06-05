# Framework de Automatización E2E con Playwright 🎭

Este proyecto es un framework robusto de automatización de pruebas End-to-End (E2E) construido con **Playwright** y **TypeScript**.

## 🎯 Objetivo del Proyecto

El proyecto está diseñado para realizar pruebas automatizadas sobre e-commerce, tomando como caso de estudio `saucedemo.com`. 
Aplica buenas prácticas de ingeniería de software para pruebas, destacando:
- **Patrón POM (Page Object Model)**: Separación clara entre la lógica de las pruebas (`/tests`) y los selectores/acciones de la interfaz (`/pages`), garantizando alta mantenibilidad.
- **Estructura Escalable**: Listo para crecer con soporte para pruebas web, mobile, y de rendimiento.
- **Trazabilidad total**: Manejo de reportes HTML integrados.

## 🚀 Cómo correr los tests en local

Para hacerte la vida más fácil, los comandos de ejecución están mapeados en el `package.json`. 

Primero, asegurate de instalar las dependencias y los navegadores internos de Playwright:
```bash
npm install
npx playwright install
```

Luego, elegí cómo querés correr las pruebas:

| Comando | Descripción |
|---------|-------------|
| `npm run test` | Ejecuta toda la suite en modo **Headless** (sin abrir el navegador). Ideal para correr masivamente. |
| `npm run test:ui` | Abre la **interfaz visual de Playwright**. Es una locura: te permite ver el DOM paso a paso, viajar en el tiempo, debugear y correr tests de a uno. **¡Usá este para desarrollar!** |
| `npm run test:headed` | Corre las pruebas abriendo la ventana del navegador en vivo. |
| `npm run test:debug` | Ejecuta en modo depuración (debugger) para inspeccionar el código paso a paso. |
| `npm run test:web` | Ejecuta únicamente las pruebas dentro del directorio `/tests/web`. |
| `npm run test:mobile` | Ejecuta únicamente las pruebas dentro del directorio `/tests/mobile`. |
| `npm run test:cross-browser` | Ejecuta únicamente las pruebas dentro del directorio `/tests/cross-browser`. |

## ⚙️ Integración Continua (CI/CD)

**¡Sí! Este proyecto ya tiene configurado GitHub Actions.** 

Si te fijás en `.github/workflows/playwright.yml`, tenés un *Pipeline de Calidad* armado. Funciona de la siguiente manera:

- **Triggers**: Se dispara automáticamente cada vez que hacés un `push` o abrís un `pull_request` hacia las ramas `main` o `master`.
- **Entorno**: Levanta un entorno limpio (`ubuntu-latest`), instala Node.js y se baja los navegadores de Playwright.
- **Ejecución**: Corre toda la suite automatizada (`npx playwright test`).
- **Artefactos (Reportes)**: Si algún test falla (¡o aunque pasen todos!), GitHub Actions comprime el reporte HTML (`playwright-report/`) y te lo guarda como artefacto en la pestaña de *Actions* por 30 días. Te bajás el `.zip`, lo abrís en tu navegador y ves exactamente dónde y por qué falló.
