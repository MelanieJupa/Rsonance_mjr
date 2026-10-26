# RESONANCE · STAY México

Micrositio de tres pantallas sobre el streaming de Stray Kids, la participación de STAY México y el proceso de diseño de Melanie Juárez.

La experiencia final está realizada con **HTML, CSS y JavaScript**, con partículas en Canvas 2D. No necesita Three.js, un backend ni una instalación de paquetes.

## Ejecutar en tu computadora

Con Node.js 20 o superior, abre una terminal en esta carpeta y ejecuta:

```sh
npm.cmd run dev
```

En macOS o Linux, usa `npm run dev` (sin `.cmd`).

Abre **http://127.0.0.1:4173**. Para detener el servidor, pulsa `Ctrl+C`.

Puedes usar otro puerto con `node scripts/serve.mjs 8080`. También funciona con un servidor estático como Live Server. Para comprobar YouTube, usa un servidor HTTP en lugar de abrir los HTML mediante `file://`.

## Archivos

```text
resonance-github/
├── index.html                  Bienvenida
├── experiencia.html            Experiencia audiovisual
├── reflexion.html              Proceso y reflexión crítica
├── welcome.css                 Diseño de la bienvenida
├── styles.css                  Diseño de la experiencia
├── reflection.css              Diseño del proceso
├── welcome.js                  Partículas y transición de entrada
├── script.js                   Canciones, reproductor, fades y rótulos
├── resonance.js                Órbitas, ondas y luz en Canvas 2D
├── reflection.js               Animación de entrada del contenido
├── assets/stay-logo.png         Logo proporcionado para el proyecto
├── fonts/                      Tipografías necesarias y su licencia
├── scripts/serve.mjs            Servidor local sin dependencias
├── scripts/check.mjs            Verificación de sintaxis y rutas
├── package.json
├── FONT-NOTICES.txt
├── ASSETS.md
├── .gitattributes
├── .gitignore
└── .nojekyll                    Publicación estática en GitHub Pages
```

Las rutas son relativas, por lo que el proyecto puede alojarse en la subcarpeta de un repositorio de GitHub Pages.

## Subir a GitHub

1. Crea un repositorio vacío en tu cuenta, por ejemplo `resonance`.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio. No subas el ZIP como único archivo: GitHub Pages necesita encontrar `index.html` en la raíz.
3. Incluye también los archivos que comienzan con punto, especialmente `.nojekyll`.

Si usas Git desde la terminal, reemplaza `TU_USUARIO` y el nombre del repositorio:

```sh
git init
git add .
git commit -m "Agregar RESONANCE"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/resonance.git
git push -u origin main
```

Estos comandos están pensados para esta copia limpia, no para el repositorio de publicación de Sites.

## Publicar con GitHub Pages

Después de subir los archivos:

1. En el repositorio, abre **Settings → Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta **/(root)**.
4. Guarda. GitHub mostrará la dirección publicada al completar el despliegue.

No hay un paso de compilación. La configuración sigue la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Comprobar los archivos

```sh
npm.cmd run check
```

En macOS o Linux, usa `npm run check`.

Comprueba la sintaxis JavaScript y que los enlaces, hojas de estilo, imágenes y tipografías referenciados existan, respetando mayúsculas y minúsculas. No requiere conexión a Internet. No sustituye una revisión visual ni comprueba disponibilidad de YouTube.

## Personalizar el proyecto

- **Textos:** modifica los tres archivos `.html`.
- **Estilos:** modifica el `.css` de cada pantalla.
- **Canciones y cifras por canción:** arreglo `songs` en `script.js`; cada fila contiene título, identificador de YouTube y millones de vistas de muestra.
- **Trayectorias, colores, velocidad y cantidad de partículas:** `resonance.js`.
- **Fades, rótulos y contador:** `script.js`.
- **Ilustración animada de bienvenida:** `welcome.js`.

## Música, cifras y funcionamiento

YouTube se carga desde Internet mediante su API de reproductor. Este proyecto **no incluye archivos de música ni descarga canciones**. Los videos pueden estar sujetos a restricciones del navegador, de región o de inserción establecidas por YouTube o sus titulares.

El primer clic habilita el sonido; después, pasar el cursor por una órbita reproduce su canción con entrada y salida gradual de volumen. La vibración es una animación visual activada por el estado de reproducción y el volumen del reproductor; no es un análisis de frecuencias del audio.

Las cifras de vistas son **datos de muestra** y el contador de oyentes mensuales es una **simulación local** que cambia automáticamente. No están conectados a estadísticas oficiales en tiempo real. No se necesita ninguna clave de API para el reproductor actual.

La experiencia respeta la preferencia del sistema para reducir movimiento y dispone de controles de pausa y teclado. Las teclas `1` a `8` seleccionan canciones y `Enter` activa la luz del núcleo cuando el canvas tiene el foco.

## Autoría y recursos

Investigación, concepto y textos del proyecto: **Melanie Juárez**. Revisa `ASSETS.md` y la licencia de las fuentes en `fonts/OFL.txt` antes de redistribuir recursos. Esta copia no añade una licencia general al trabajo de la autora.
