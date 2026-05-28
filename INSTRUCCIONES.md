# Instrucciones para publicar el juego con Google Apps Script y GitHub Pages

Esta guía te ayudará a configurar la base de datos (Google Sheets + Apps Script) y conectar el frontend para poder alojar el juego en GitHub Pages.

## Paso 1: Configurar el Backend (Base de Datos)

1. Abre [Google Sheets](https://docs.google.com/spreadsheets/) y crea una **hoja de cálculo en blanco**. El nombre no importa (ej. "Base de Datos Juego").
2. En el menú superior, haz clic en **Extensiones** > **Apps Script**.
3. Borra cualquier código que haya y **copia y pega todo el contenido** del archivo `appscript/Codigo.gs` que está en esta carpeta.
4. Ponle un nombre al proyecto (ej. "API Juego") arriba a la izquierda y presiona **Guardar** (Ctrl+S / Cmd+S).

## Paso 2: Publicar la API de Apps Script

1. En el editor de Apps Script, arriba a la derecha, haz clic en el botón azul **Implementar** y selecciona **Nueva implementación**.
2. Haz clic en el icono de la rueda dentada (⚙️) junto a "Seleccione el tipo" y elige **Aplicación web**.
3. En la configuración que aparece, debes poner exactamente:
   - **Descripción**: API Juego
   - **Ejecutar como**: Selecciona **Yo** (tu correo de Google).
   - **Quién tiene acceso**: Selecciona **Cualquier persona** (o "Cualquier usuario"). *(Esto es vital para que tus amigos puedan jugar sin tener cuenta de Google).*
4. Haz clic en el botón **Implementar**.
5. Te pedirá **autorizar el acceso** (para que el código pueda leer y escribir en tu hoja de cálculo). Dale a "Revisar permisos", elige tu cuenta, pulsa en "Configuración avanzada" e "Ir a API Juego (no seguro)" y finalmente "Permitir".
6. Una vez terminado, te dará una **URL de la aplicación web** (suele terminar en `/exec`). **Copia esa URL**.

## Paso 3: Conectar el Frontend con el Backend

1. Abre el archivo `app.js` que está en la carpeta `xogo` usando cualquier editor de texto o código.
2. En la **línea 6**, verás esta constante:
   ```javascript
   const API_URL = 'URL_DE_TU_WEB_APP';
   ```
3. Reemplaza `'URL_DE_TU_WEB_APP'` por la **URL que copiaste en el paso anterior**. Mantén las comillas simples.
   Debería quedar algo así:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Guarda el archivo `app.js`.

## Paso 4: Subir a GitHub Pages

1. Sube todos los archivos de la carpeta `xogo` (es decir: `index.html`, `styles.css`, `app.js` y `preguntas.txt`) a tu repositorio de GitHub.
2. Ve a los **Settings** (Configuración) de tu repositorio en GitHub.
3. En el menú de la izquierda, entra en **Pages**.
4. En "Source", selecciona **Deploy from a branch** y luego elige la rama `main` (o `master`) y la carpeta `/ (root)`.
5. Dale a Save. Tras un par de minutos, GitHub te dará el enlace web donde está publicado el juego.

¡Y listo! Al entrar, el anfitrión creará la partida, el juego escribirá automáticamente en tu Google Sheet en tiempo real para organizar los turnos y guardar las puntuaciones, y todo será visible a través de internet usando la conexión `fetch` que hemos implementado.
