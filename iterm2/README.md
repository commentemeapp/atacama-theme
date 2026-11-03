# Atacama Theme · iTerm2

**Los tres sabores de Atacama Theme para iTerm2: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Demos y grabaciones |

## Instalación

Descarga los `.itermcolors`:

```bash
for s in Noche Dia Azul; do
  curl -fsSL -o "Atacama $s.itermcolors" "https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/iterm2/Atacama%20$s.itermcolors"
done
```

## Uso rápido

En iTerm2, **Settings › Profiles › Colors › Color Presets › Import…**, elige los tres archivos y después **Atacama Noche** en el mismo menú.

## Que incluye

- `Atacama Noche.itermcolors`, `Atacama Dia.itermcolors` y `Atacama Azul.itermcolors`: fondo, texto, negrita, cursor, selección y los 16 colores ANSI.
- Todos salen del `palette.json` de la raíz, la fuente única de Atacama Theme, con `node terminais.mjs`. Nunca edites un archivo a mano: cambia la paleta y corre el script. `node terminais.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me) · hablecon@commente.me
