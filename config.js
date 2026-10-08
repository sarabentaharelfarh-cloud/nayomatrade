/* Configuración de NayomaTrade. Edita este archivo y vuelve a subir la carpeta. */
window.APP_CONFIG = {
  // true  = todo gratis (fase de lanzamiento).
  // false = las funciones Pro se bloquean ya.
  freeForAll: true,

  // Opcional. Fecha en la que se acaba lo gratis, con formato 'AAAA-MM-DD'. Ejemplo: '2026-12-01'.
  // Si la dejas vacía y freeForAll es true, todo sigue gratis hasta que lo cambies tú.
  freeUntil: '',

  // Texto del precio que se enseña en la ventana de NayomaTrade Pro.
  price: '7 € al mes',

  // Días de prueba gratis del plan Pro (0 = sin prueba).
  trialDays: 7,

  // Enlace de pago de Stripe (Payment Link). Déjalo vacío hasta que lo crees.
  checkoutUrl: '',

  // Clave de Twelve Data, para forex y oro/plata en tiempo real (twelvedata.com).
  // OJO: esta clave queda visible en el código de la página. Con pocos usuarios no pasa nada;
  // si la app crece, muévela a un servidor propio para que nadie pueda copiarla y gastar tu límite.
  twelveDataKey: '512ddf12449840cbb9ce8015a5744a98',

  // Códigos para dar Pro a amigos o probadores. OJO: cualquiera que abra el código de la página puede verlos.
  // Sirven para pruebas, no como protección real. Ejemplo: ['AMIGA2026']
  licenseCodes: [],

  supportEmail: 'sara.bentaharelfarh@gmail.com'
};
