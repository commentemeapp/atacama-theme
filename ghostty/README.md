# Atacama Theme · Ghostty

**Los tres sabores de Atacama Theme para Ghostty: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Demos y grabaciones |

## Instalación

```bash
mkdir -p ~/.config/ghostty/themes
for s in noche dia azul; do
  curl -fsSL -o ~/.config/ghostty/themes/atacama-$s https://raw.githubusercontent.com/commentemeapp/atacama-theme/main/ghostty/atacama-$s
done
```

## Uso rápido

En `~/.config/ghostty/config`:

```
theme = atacama-noche
```

Para seguir el modo del sistema: `theme = light:atacama-dia,dark:atacama-noche`.

## Que incluye

- `atacama-noche`, `atacama-dia` y `atacama-azul`: fondo, texto, cursor, selección y los 16 colores ANSI.
- Todos salen del `palette.json` de la raíz, la fuente única de Atacama Theme, con `node terminais.mjs`. Nunca edites un archivo a mano: cambia la paleta y corre el script. `node terminais.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me) · hablecon@commente.me
