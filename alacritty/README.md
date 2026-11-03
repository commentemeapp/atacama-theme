# Atacama Theme · Alacritty

**Los tres sabores de Atacama Theme para Alacritty: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Demos y grabaciones |

## Instalación

```bash
mkdir -p ~/.config/alacritty/themes
for s in noche dia azul; do
  curl -fsSL -o ~/.config/alacritty/themes/atacama-$s.toml https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/alacritty/atacama-$s.toml
done
```

## Uso rápido

En `~/.config/alacritty/alacritty.toml`:

```toml
[general]
import = ["~/.config/alacritty/themes/atacama-noche.toml"]
```

## Que incluye

- `atacama-noche.toml`, `atacama-dia.toml` y `atacama-azul.toml`: fondo, texto, cursor y los 16 colores ANSI.
- Todos salen del `palette.json` de la raíz, la fuente única de Atacama Theme, con `node terminais.mjs`. Nunca edites un archivo a mano: cambia la paleta y corre el script. `node terminais.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me) · hablecon@commente.me
