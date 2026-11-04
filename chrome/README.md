# Atacama Theme · Chrome

**Los dos sabores de Atacama Theme para Chrome, Edge, Brave y Arc: Atacama Noche y Atacama Día.**

| Sabor | Marco | Barra | Acento |
|---|---|---|---|
| **Atacama Noche** | azul `#005278` | `#0F1F29` | `#FFBD38` |
| **Atacama Día** | papel gris `#F4F6F7` | blanco `#FFFFFF` | `#005278` |

Chrome usa un tema a la vez y no lo cambia solo con el modo del sistema. Por eso son dos temas: instala el que quieras usar y, para cambiar, instala el otro.

## Instalación

Mientras no estén en la Chrome Web Store, se cargan desde esta carpeta:

1. Descarga el repositorio y abre `chrome://extensions` (en Edge, `edge://extensions`).
2. Activa **Modo de desarrollador**.
3. **Cargar descomprimida** y elige `chrome/noche` o `chrome/dia`.

## Que incluye

- `noche/` y `dia/`: cada uno con su `manifest.json`, el ícono de 128 y la imagen de la nueva pestaña con el ladrillo de commente.me.
- `build.mjs`: genera los dos `manifest.json` desde el `palette.json` de la raíz, la fuente única de Atacama Theme. Nunca edites un `manifest.json` a mano: cambia la paleta y corre `node chrome/build.mjs`. `node chrome/build.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me)
