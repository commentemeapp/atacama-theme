<p align="center">
  <img src="assets/banner.png" width="100%" alt="Atacama Theme · Tema oscuro y claro con la paleta del desierto de Atacama: azul profundo y amarillo de acento.">
</p>

# Atacama Theme

**Tema oscuro y claro con la paleta del desierto de Atacama: azul profundo y amarillo de acento.**

[![versión](https://img.shields.io/github/package-json/v/commentemeapp/atacama-theme/main?filename=vscode%2Fpackage.json&label=versi%C3%B3n&labelColor=005278&color=FFBD38)](https://marketplace.visualstudio.com/items?itemName=commenteme.atacama-theme)
[![licencia](https://img.shields.io/github/license/commentemeapp/atacama-theme?label=licencia&labelColor=005278&color=FFBD38)](./LICENSE)

## Instalación

VS Code, Cursor, Windsurf y VSCodium:

```bash
code --install-extension commenteme.atacama-theme
```

## Uso rápido

`Cmd/Ctrl + K`, `Cmd/Ctrl + T` y elige **Atacama Noche** o **Atacama Día**. Íconos y uso completo en [`vscode/`](./vscode).

## Que incluye

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0F1F29` | `#FFBD38` | Editor y terminal, oscuro |
| **Atacama Día** | `#FFFFFF` | `#005278` | Editor y terminal, claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Solo terminal y chat |

| App | Carpeta | Estado |
|---|---|---|
| VS Code · Cursor · Windsurf · VSCodium | [`vscode/`](./vscode) | Listo |
| Zed · Neovim | — | Próximamente |
| Warp | [`warp/`](./warp) | Listo |
| Ghostty | [`ghostty/`](./ghostty) | Listo |
| iTerm2 | [`iterm2/`](./iterm2) | Listo |
| Windows Terminal | [`windows-terminal/`](./windows-terminal) | Listo |
| Alacritty | [`alacritty/`](./alacritty) | Listo |
| Kitty | [`kitty/`](./kitty) | Listo |
| Chrome · Edge · Brave · Arc | [`chrome/`](./chrome) | Listo |
| Slack | — | Próximamente |
| JetBrains · Obsidian · Raycast · Firefox | — | Próximamente |

## Por que existe

Nació en el equipo que construye tiendas en VTEX IO, Shopify y Adobe Commerce, y es público, sin costo. Los colores viven en un solo archivo, [`palette.json`](./palette.json): cada port sale de ahí, nunca de un hex copiado a mano.

## Documentación

### Sumar un port

1. Abre un issue con el nombre de la app.
2. Usa solo los colores de `palette.json`.
3. Suma una captura con Noche y otra con Día.

Desarrollo y publicación de la extensión: [`vscode/README.md`](./vscode/README.md#documentación).

## Contribuir · Licencia

Conventional Commits; rama saliendo de `dev` y PR contra `dev`. [MIT](./LICENSE)

---

Hecho por [commente.me](https://www.commente.me) · hablecon@commente.me
