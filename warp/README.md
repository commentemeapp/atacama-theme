# Atacama Theme · Warp

**Los tres sabores de Atacama Theme para el terminal Warp: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | azul `#005278` → `#0B1820` | `#FFBD38` | Demos y grabaciones |

## Instalación

Copia los `.yaml` a la carpeta de temas de Warp.

macOS:

```bash
mkdir -p ~/.warp/themes
curl -fsSL -o ~/.warp/themes/atacama_noche.yaml https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/warp/atacama_noche.yaml
curl -fsSL -o ~/.warp/themes/atacama_dia.yaml https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/warp/atacama_dia.yaml
curl -fsSL -o ~/.warp/themes/atacama_azul.yaml https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/warp/atacama_azul.yaml
```

Linux: la carpeta es `${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes/`. Windows: `%APPDATA%\warp\Warp\data\themes\`.

## Uso rápido

En Warp, **Settings › Appearance › Themes** y elige **Atacama Noche**, **Atacama Día** o **Atacama Azul**. Para seguir el modo del sistema, activa **Sync with OS** y elige Atacama Día para claro y Atacama Noche para oscuro.

## Que incluye

- `atacama_noche.yaml`, `atacama_dia.yaml` y `atacama_azul.yaml`: fondo, texto, acento, cursor y los 16 colores ANSI.
- `build.mjs`: genera los tres desde el `palette.json` de la raíz, la fuente única de Atacama Theme. Nunca edites un `.yaml` a mano: cambia la paleta y corre `node warp/build.mjs`. `node warp/build.mjs --check` confirma que los archivos están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me)
