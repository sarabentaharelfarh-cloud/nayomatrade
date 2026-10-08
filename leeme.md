# NayomaTrade: guía para lanzarla paso a paso

Tienes en esta carpeta la app completa. Ve en orden y no te saltes nada. Ninguna parte necesita programar.

Contenido: `index.html` (la app), `config.js` (tus ajustes: gratis, Pro, precio, enlace de pago, clave de Twelve Data), `legal/` (borradores legales), `icons/`, `manifest.webmanifest` y `sw.js` (para instalarla), `robots.txt` y `sitemap.xml` (para Google).

## Cripto, Forex y Oro/Plata

Arriba de la app hay tres botones: **Cripto**, **Forex** y **Oro y plata**.
- **Cripto** usa Binance, que es gratis y no necesita clave.
- **Forex** y **Oro y plata** usan **Twelve Data**. Ya te dejé tu clave puesta en `config.js` (variable `twelveDataKey`).

El plan gratuito de Twelve Data permite 8 peticiones por minuto y 800 al día. La app está ajustada para respetarlo (actualiza el precio del par que estás mirando cada 20 segundos, y la lista de favoritos cada 60). Con eso te alcanza para probarla tú y que la prueben algunos usuarios. Si la app crece mucho, tendrás que pasar a un plan de pago de Twelve Data o mover la clave a un servidor propio (ahora mismo cualquiera que mire el código de la página podría copiar tu clave).

**Importante para cuando la subas:** hasta que no esté en tu propio hosting con https, Forex y Oro y plata se van a ver en "Demo simulada", igual que Cripto. Es normal, es la misma limitación que ya conoces. En tu dominio real, deberían pasar a "En vivo" solas.

---

## PARTE 1. Ponerla en internet (gratis, unos 10 minutos)

1. Entra en https://app.netlify.com/drop y arrastra **esta carpeta entera**.
2. Netlify te da una dirección con https. Ábrela: arriba tiene que poner **"En vivo"** (precios reales de Binance).
3. Cómprate un dominio propio (unos 10 a 15 € al año) en Porkbun, Namecheap o Cloudflare. Antes de comprarlo mira que "NayomaTrade" no esté registrado como marca (ver Parte 6).
4. En Netlify: **Domain management > Add a domain** y sigue los pasos. El https es automático.
5. Abre `robots.txt` y `sitemap.xml` y cambia `TU-DOMINIO.com` por tu dominio real. Vuelve a subir la carpeta.

Para actualizar la app, cambia lo que quieras y vuelve a arrastrar la carpeta. Si cambias `index.html`, abre `sw.js` y cambia `const VERSION = 'v1'` por `'v2'`, `'v3'`... para que los usuarios reciban la versión nueva.

## PARTE 2. Que te encuentren en Google (buscador)

1. Entra en https://search.google.com/search-console y añade tu dominio (**Propiedad de dominio**).
2. Verifícalo con el registro DNS que te pide (lo pegas en el panel de tu dominio).
3. En **Sitemaps** envía `https://tu-dominio.com/sitemap.xml`.
4. En **Inspección de URLs** pega tu dirección principal y pulsa **Solicitar indexación**.
5. Google tarda de días a semanas en mostrarte. No se puede acelerar pagando.

Para salir en las búsquedas hace falta contenido. NayomaTrade es una sola pantalla, así que escribe páginas de ayuda en español (qué son las velas japonesas, cómo se lee el RSI, qué es una media móvil, cómo usar un simulador). Son páginas HTML sencillas que subes junto a la app y añades al `sitemap.xml`. Y crea perfiles en YouTube, TikTok o Instagram con ese contenido educativo.

Sobre Google Ads: los anuncios de finanzas y criptomonedas tienen normas estrictas y a menudo piden verificación. Léelas antes de gastar dinero.

## PARTE 3. Google Play (app de Android)

La forma más fácil es **PWABuilder**:
1. Publica primero la web (Parte 1) con tu dominio.
2. Entra en https://www.pwabuilder.com, pega tu dirección y pulsa **Package for stores > Android**. Te descarga el paquete para subir a Google Play.
3. Crea tu cuenta en https://play.google.com/console (25 USD, pago único). Te pedirán verificar tu identidad.
4. Las cuentas personales nuevas suelen tener que hacer una fase de **pruebas cerradas** con varios testers durante unas dos semanas antes de publicar. Mira los requisitos actuales en la Play Console.
5. Prepara la ficha: nombre, descripción, capturas de pantalla, icono de 512 px (`icons/icon-512.png`), categoría **Finanzas**, la dirección de tu política de privacidad (`https://tu-dominio.com/legal/privacidad.html`) y los formularios de seguridad de datos y de servicios financieros.
6. Las suscripciones dentro de una app de Google Play deben usar el sistema de pago de Google, que se queda una comisión. Por eso al principio deja la app de Play **gratis** y cobra desde tu web.

Otra opción más técnica es Capacitor (comandos al final).

## PARTE 4. App Store de Apple (más adelante)

Cuesta 99 USD al año y para compilar necesitas un Mac (PWABuilder también genera el paquete de iOS). Apple puede rechazar apps que sean solo una web. Empieza por la web instalable y Google Play.

## PARTE 5. Pasar de gratis a suscripción

Todo se controla en `config.js`:
- `freeForAll: true` deja todo gratis. Es el modo de lanzamiento.
- `freeUntil: '2026-12-01'` deja todo gratis hasta esa fecha. Después se activa Pro solo.
- `freeForAll: false` activa Pro ya.
- `price`, `trialDays` (días de prueba) y `checkoutUrl` (enlace de pago).

Con Pro activo, lo gratis incluye gráficos, volumen, media 20, EMA 50, RSI, velas, barras, línea, área, los intervalos 15m, 1h, 4h y 1D, el simulador y 2 alertas. Lo Pro incluye NayomaTrade Algo y Consenso, los intervalos 1m, 5m, 30m y 1S, Bollinger, MACD, velas huecas, Heikin Ashi y alertas sin límite.

**Cobrar con Stripe (cuando quieras):**
1. Crea tu cuenta en https://stripe.com (pedirá los datos de tu empresa o actividad).
2. Crea el producto "NayomaTrade Pro" con precio mensual y prueba gratis.
3. Crea un **Payment Link** de ese producto y pégalo en `checkoutUrl`.
4. En el Payment Link puedes poner un mensaje tras el pago con un **código**. Pon ese código en `licenseCodes` de `config.js`. El usuario lo escribe en la app (botón **Tengo un código**) y se activa Pro.

Ojo, esto es un bloqueo **básico**. Cualquiera que sepa mirar el código de la página puede ver los códigos y usar Pro sin pagar. Sirve para empezar con pocos usuarios. El siguiente paso es tener cuentas de usuario y que Stripe avise a un servidor cuando alguien paga o cancela (por ejemplo con Supabase y Stripe). Es la fase siguiente y se puede construir contigo.

## PARTE 6. Lo legal, antes de anunciarte

Haz esto en este orden:
1. **Nombre:** busca "NayomaTrade" en TMview (https://www.tmdn.org/tmview), en la base de la OMPI (https://branddb.wipo.int) y en Google Play y App Store. Si está libre, plantéate registrarla como marca.
2. **Empresa e impuestos:** darte de alta como autónoma o empresa en Suecia y cobrar IVA por ventas digitales. Habla con un asesor fiscal (o con Skatteverket) antes de cobrar la primera suscripción.
3. **Textos legales:** tu nombre, tu dirección, el precio y la fecha ya están puestos. Solo faltan dos cosas entre corchetes: tu **correo electrónico** (en los tres archivos de `legal/`) y tu **número de organización** (en `terminos.html`, cuando te des de alta como autónoma). Después borra el recuadro amarillo de arriba y pide a un abogado que los revise. Son un punto de partida, no un texto definitivo. Ojo: al poner tu domicilio en la web, será público. Si prefieres no enseñar tu casa, usa una dirección de empresa o un apartado postal (box) en cuanto puedas.
4. **Cobrar por señales:** consulta con un abogado si en tu caso cuenta como servicio regulado. Mantén siempre el aviso de que es una herramienta educativa y no des recomendaciones personalizadas.
5. **Promoción:** no prometas ganancias ni enseñes el porcentaje de aciertos como reclamo. Si usas enlaces de afiliado, avisa claramente.
6. **Privacidad:** la app carga las tipografías de Google Fonts y la librería de gráficos desde jsDelivr, y eso envía la dirección IP del usuario a esos servicios. Para evitarlo, guarda la librería dentro de tu carpeta: baja el archivo con
   `curl -L -o lightweight-charts.js https://cdn.jsdelivr.net/npm/lightweight-charts@4.1.3/dist/lightweight-charts.standalone.production.js`
   y en `index.html` cambia la línea `<script src="https://cdn.jsdelivr.net/npm/lightweight-charts@...">` por `<script src="lightweight-charts.js"></script>`. Para las tipografías, borra las tres líneas de Google Fonts del `<head>`: la app usa una letra del sistema y sigue funcionando.
7. `NayomaTrade Algo` es un indicador propio. No lo llames GainzAlgo ni uses su nombre.

## Apéndice: Capacitor (app de tienda avanzada)

```
npm init -y
npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init NayomaTrade com.tuempresa.nayomatrade --web-dir=www
# copia dentro de la carpeta www: index.html, config.js, manifest.webmanifest, sw.js, icons y legal
npx cap add android
npx cap sync
npx cap open android
```
