import { test, expect } from '@playwright/test';
import { calcularPrecioFinal } from '../../src/calculadora-descuentos';

test.describe('Pruebas Unitarias - Calculadora de Descuentos', () => {

  test('Debe calcular correctamente un descuento del 20%', () => {
    // Escenario feliz: $1000 con 20% de descuento debe dar exactamente $800
    const resultado = calcularPrecioFinal(1000, 20);
    expect(resultado).toBe(800); 
  });

  test('Debe retornar el mismo precio si el descuento es del 0%', () => {
    const resultado = calcularPrecioFinal(500, 0);
    expect(resultado).toBe(500);
  });

  test('Debe lanzar un error controlado si el porcentaje de descuento supera el 100%', () => {
    // Verificamos que la función explote correctamente de forma controlada ante datos abusivos
    expect(() => calcularPrecioFinal(100, 150)).toThrow("Valores de entrada inválidos");
  });

  test('Debe lanzar un error controlado si el precio es negativo', () => {
    expect(() => calcularPrecioFinal(-50, 10)).toThrow("Valores de entrada inválidos");
  });

});