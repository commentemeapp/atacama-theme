# Atacama Theme · Windows Terminal

**Los tres sabores de Atacama Theme para Windows Terminal: Noche, Día y Azul.**

| Sabor | Fondo | Acento | Uso |
|---|---|---|---|
| **Atacama Noche** | `#0B1820` | `#FFBD38` | Terminal oscuro |
| **Atacama Día** | `#F4F6F7` | `#005278` | Terminal claro |
| **Atacama Azul** | `#00405E` | `#FFBD38` | Demos y grabaciones |

## Instalación

Abre **Configuración › Abrir archivo JSON** y pega los tres objetos de [`atacama.json`](./atacama.json) dentro de la lista `"schemes"`.

## Uso rápido

En el perfil que quieras, dentro de `"profiles"`:

```json
"colorScheme": "Atacama Noche"
```

O desde la interfaz: **Configuración › Perfil › Apariencia › Combinación de colores**.

## Que incluye

- `atacama.json`: los tres esquemas, Atacama Noche, Atacama Día y Atacama Azul, con fondo, texto, cursor, selección y los 16 colores ANSI.
- Todos salen del `palette.json` de la raíz, la fuente única de Atacama Theme, con `node terminais.mjs`. Nunca edites un archivo a mano: cambia la paleta y corre el script. `node terminais.mjs --check` confirma que están al día.

## Contribuir · Licencia

Issues y pull requests en [commentemeapp/atacama-theme](https://github.com/commentemeapp/atacama-theme). [MIT](../LICENSE).

---

Hecho por [commente.me](https://commente.me) · hablecon@commente.me
