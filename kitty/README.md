# Atacama Theme · Kitty

**Los tres sabores de Atacama Theme para Kitty: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Demos y grabaciones |

## Instalación

```bash
mkdir -p ~/.config/kitty/themes
for s in noche dia azul; do
  curl -fsSL -o ~/.config/kitty/themes/atacama-$s.conf https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/kitty/atacama-$s.conf
done
```

## Uso rápido

En `~/.config/kitty/kitty.conf`:

```
include themes/atacama-noche.conf
```

Recarga con `ctrl+shift+F5` (`cmd+ctrl+,` en macOS).

## Que incluye

- `atacama-noche.conf`, `atacama-dia.conf` y `atacama-azul.conf`: fondo, texto, cursor, selección, pestañas y los 16 colores ANSI.
- Todos salen del `palette.json` de la raíz, la fuente única de Atacama Theme, con `node terminais.mjs`. Nunca edites un archivo a mano: cambia la paleta y corre el script. `node terminais.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me) · hablecon@commente.me
