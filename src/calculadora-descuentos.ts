/**
 * Función pura de TypeScript que calcula el precio final aplicando un cupón.
 * Esta es la lógica real del negocio que escribiría un desarrollador.
 */
export function calcularPrecioFinal(precioBase: number, porcentajeDescuento: number): number {
  // Reglas de validación básicas para evitar bugs lógicos
  if (precioBase < 0 || porcentajeDescuento < 0 || porcentajeDescuento > 100) {
    throw new Error("Valores de entrada inválidos");
  }
  
  const descuento = (precioBase * porcentajeDescuento) / 100;
  return precioBase - descuento;
}