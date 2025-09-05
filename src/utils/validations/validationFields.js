import React from "react";


/**
 * Valida que un nombre sea no vacío y contenga solo caracteres permitidos.
 * @param {string} value - Valor del nombre a validar.
 * @param {string} [fieldName='Este campo'] - Nombre del campo para personalizar el mensaje.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validateName = (value, fieldName = 'Este campo') => {
    if (!value.trim()) return `${fieldName} es requerido`;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-.,'()&]+$/.test(value)) {
        return `${fieldName} contiene caracteres no válidos`;
    }
    return null;
};


/**
 * Valida que un correo electrónico tenga el formato correcto.
 * @param {string} value - Email a validar.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validateEmail = (value) => {
    if (!value.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email no válido';
    return null;
};


/**
 * Valida que una dirección no esté vacía y solo contenga caracteres permitidos.
 * @param {string} value - Dirección a validar.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validateAddress = (value) => {
    if (!value.trim()) return 'La dirección es requerida';
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,#°()&/]+$/.test(value)) {
        return 'La dirección contiene caracteres no válidos';
    }
    return null;
};

/**
 * Valida que un teléfono sea no vacío y cumpla con el formato permitido.
 * @param {string} value - Teléfono a validar.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validatePhone = (value) => {
    if (!value) return 'El teléfono es requerido';
    if (!/^[\d\s+()\-]{7,20}$/.test(value)) {
        return 'Teléfono no válido (solo números, espacios, +, - y paréntesis)';
    }
    return null;
};


/**
 * Valida que una cantidad sea un número entero de hasta 5 dígitos.
 * @param {string|number} value - Cantidad a validar.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validateQuantity = (value) => {
    if (!value) return 'La cantidad es requerida';

    if (!/^[0-9]{1,5}$/.test(value)) {
        return 'Solo se permiten números enteros del 0 al 9, sin espacios ni símbolos, máximo 5 dígitos';
    }

    return null;
};


/**
 * Valida que un precio tenga el formato permitido (máximo 7 caracteres con coma opcional).
 * @param {string|number} value - Precio a validar.
 * @returns {string|null} Mensaje de error o null si es válido.
 */
export const validatePrice = (value) => {
  if (!value) return 'El precio es requerido';

  // Hasta 7 enteros, opcionalmente punto y 1–2 decimales
  if (!/^\d{1,7}(\.\d{1,3})?$/.test(value)) {
    return 'Formato inválido. Máx. 7 enteros y opcionalmente 1–3 decimales';
  }

  return null;
};
