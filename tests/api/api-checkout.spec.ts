import { test, expect } from '@playwright/test';

test.describe('Pruebas de API - Backend de E-commerce', () => {

  // 🟢 Caso 1: Éxito (POST - 201 Created)
  test('Debe procesar una orden de compra exitosamente (POST)', async ({ request }) => {
    const datosCompra = {
      idCarrito: 12345,
      items: [
        { productoId: 101, cantidad: 2 },
        { productoId: 202, cantidad: 1 }
      ],
      metodoPago: 'tarjeta_credito',
      montoTotal: 5400
    };

    const respuesta = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: datosCompra
    });

    // Verificamos que el servidor simule la creación exitosa (201)
    expect(respuesta.status()).toBe(201);

    const cuerpoRespuesta = await respuesta.json();
    expect(cuerpoRespuesta).toHaveProperty('id');
    expect(cuerpoRespuesta.idCarrito).toBe(12345);
  });

  // 🔴 Caso 2: Error 400 Bad Request (Petición con datos inválidos o faltantes)
  test('Debe devolver 400 Bad Request cuando faltan campos obligatorios', async ({ request }) => {
    // Simulamos un intento de compra enviando un cuerpo vacío (provocando un fallo del cliente)
    const datosInvalidos = {};

    // Usamos un endpoint de Httpbin diseñado específicamente para responder con 400
    const respuesta = await request.post('https://httpbin.org/status/400', {
      data: datosInvalidos
    });

    // Validamos que el sistema responda con el código de error correspondiente del cliente
    expect(respuesta.status()).toBe(400);
  });

  // 🔴 Caso 3: Error 401 Unauthorized (Falta de credenciales o credenciales inválidas)
  test('Debe devolver 401 Unauthorized si no se envían credenciales de autorización', async ({ request }) => {
    // Usamos un endpoint de Httpbin diseñado para verificar autenticación básica
    // Intentamos entrar sin enviar las cabeceras de autorización requeridas
    const respuesta = await request.get('https://httpbin.org/basic-auth/usuario/clave');

    // Validamos que el servidor nos rebote con un código 401
    expect(respuesta.status()).toBe(401);
  });

  // 🔴 Caso 4: Error 404 Not Found (Ruta inexistente)
  test('Debe devolver 404 Not Found al intentar acceder a un endpoint inexistente', async ({ request }) => {
    // Intentamos golpear una ruta que simplemente no existe en el servidor
    const respuesta = await request.get('https://jsonplaceholder.typicode.com/checkout-inexistente-error-404');

    // El servidor debe responder que no encontró el recurso
    expect(respuesta.status()).toBe(404);
  });

});