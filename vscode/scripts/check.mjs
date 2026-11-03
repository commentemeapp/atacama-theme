// Gate do port VS Code: JSON válido, caminhos dos ícones existentes e toda cor dos temas
// saindo do palette.json (fonte única) ou dos tokens da marca listados abaixo.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

const raiz = new URL("..", import.meta.url).pathname;
const ler = (p) => JSON.parse(readFileSync(join(raiz, p), "utf8"));
const erros = [];

const paleta = ler("../palette.json");
const permitidas = new Set();
const coletar = (o) => {
	for (const v of Object.values(o)) {
		if (typeof v === "string" && /^#[0-9A-F]{6}/i.test(v)) permitidas.add(v.slice(0, 7).toUpperCase());
		else if (v && typeof v === "object") coletar(v);
	}
};
coletar(paleta.flavors);

// Tokens da marca (tokens.css) usados no workbench, e o preto das sombras.
const tokens = { "#0A6390": "--azul-profundo", "#F2F8FB": "--seleccion-fondo", "#B7C6CE": "--borde-campo", "#000000": "sombra" };
// Vieram do kit Atacama 1.5 sem estar na paleta nem nos tokens. Pendente de decisão:
// entrar no palette.json ou ser trocadas por uma cor de lá.
const pendentes = { "#2C3A41": "dia", "#EEF3F5": "dia", "#E6ECEF": "dia", "#C3D0D7": "noche", "#2E5568": "noche" };

const pkg = ler("package.json");
for (const t of pkg.contributes.themes) {
	let tema;
	try { tema = ler(t.path); } catch (e) { erros.push(`${t.path}: JSON inválido (${e.message})`); continue; }
	if (tema.name !== t.label) erros.push(`${t.path}: name «${tema.name}» difere do label «${t.label}»`);
	const hexes = JSON.stringify(tema).match(/#[0-9A-Fa-f]{6,8}\b/g) || [];
	for (const h of new Set(hexes.map((x) => x.slice(0, 7).toUpperCase()))) {
		if (!permitidas.has(h) && !(h in tokens) && !(h in pendentes)) erros.push(`${t.path}: ${h} fora do palette.json`);
	}
}

for (const it of [...pkg.contributes.iconThemes, ...pkg.contributes.productIconThemes]) {
	const j = ler(it.path);
	const base = dirname(join(raiz, it.path));
	for (const [id, d] of Object.entries(j.iconDefinitions || {})) {
		if (d.iconPath && !existsSync(join(base, d.iconPath))) erros.push(`${it.path}: ${id} aponta para ${d.iconPath}, que não existe`);
	}
}

const svgs = readdirSync(join(raiz, "product-icons/src")).filter((f) => f.endsWith(".svg")).length;
const codepoints = Object.keys(ler("product-icons/codepoints.json")).length;
if (svgs !== codepoints) erros.push(`product-icons: ${svgs} SVG e ${codepoints} codepoints`);

if (erros.length) {
	console.error(erros.join("\n"));
	process.exit(1);
}
console.log(`ok · ${pkg.contributes.themes.length} temas, ${Object.keys(pendentes).length} cores pendentes de decisão (scripts/check.mjs)`);
