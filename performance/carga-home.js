import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Métricas personalizadas para reportar como un profesional
const tiempoEsperaHome = new Trend('tiempo_espera_home');
const tasaExitoPeticiones = new Rate('tasa_exito_peticiones');

// Configuración avanzada: Simulación de rampa de usuarios (Stress Testing)
export const options = {
  stages: [
    { duration: '10s', target: 5 },  // Calentamiento: subimos a 5 usuarios virtuales.
    { duration: '20s', target: 20 }, // Carga Máxima: mantenemos 20 usuarios (Hot Sale simulado).
    { duration: '10s', target: 0 },  // Rampa de bajada: desconexión gradual de usuarios.
  ],
  thresholds: {
    // Definimos límites estrictos de calidad (SLA)
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones debe ser ultra rápido (menos de 500ms).
    tasa_exito_peticiones: ['rate>0.99'], // Exigimos más del 99% de éxito (cero tolerancia a caídas).
  },
};

// Flujo de usuario simulado
export default function () {
  // 1. El usuario entra a la Home
  const url = 'https://demo.playwright.dev/todomvc/';
  const response = http.get(url);

  // 2. Registramos las métricas de esta petición usando la propiedad correcta (.timings.duration)
  tiempoEsperaHome.add(response.timings.duration);
  
  const exito = response.status === 200;
  tasaExitoPeticiones.add(exito);

  // 3. Verificaciones de control de calidad (Assertions a nivel estático)
  check(response, {
    'El servidor respondió exitosamente (200 OK)': (r) => r.status === 200,
    'La página contiene el título de la aplicación': (r) => r.body.includes('TodoMVC'),
  });

  // Pausa realista entre acciones del usuario (pensar antes de hacer clic)
  sleep(Math.random() * 2 + 1); // Pausa aleatoria de entre 1 y 3 segundos.
}
