# Atacama Theme · VS Code

Una extensión, tres tipos de tema. Funciona también en Cursor, Windsurf y VSCodium (Open VSX).

| Tipo | Nombre |
|---|---|
| Color Theme | Atacama Noche · Atacama Día |
| File Icon Theme | Atacama Icons |
| Product Icon Theme | Atacama Product Icons |

## Instalar

```bash
code --install-extension commenteme.atacama-theme
```

`Cmd/Ctrl + K`, `Cmd/Ctrl + T` → **Atacama Noche**.

```json
{
  "workbench.colorTheme": "Atacama Noche",
  "workbench.iconTheme": "atacama-icons",
  "workbench.productIconTheme": "atacama-product-icons"
}
```

## Publicar

```bash
npm install && npm run build:icons
npx vsce publish      # VS Code Marketplace
npx ovsx publish      # Open VSX (Cursor, Windsurf, VSCodium)
```

## Sintaxis

| Rol | Noche | Día |
|---|---|---|
| Palabra clave | #FFBD38 | #005278 |
| String | #E9D7AC | #8A5A00 |
| Propiedad / tag | #7FBBD8 | #1F6F96 |
| Función | #B5E3C9 | #1F7A5C |
| Tipo / componente | #F7A1B8 | #B3123F |
| Constante / número | #C9B6FF | #6A4BC4 |
| Comentario | #6F8692 | #5C6D75 |
