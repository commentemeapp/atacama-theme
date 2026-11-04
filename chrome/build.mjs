// Gera os dois temas do Chrome (Atacama Noche e Atacama Día) a partir do palette.json da raiz.
// O Chrome não troca de tema com o sistema: cada tema tem um conjunto de cores só, e o
// navegador aceita um tema por vez. Por isso são duas extensões, uma por sabor.
//   node chrome/build.mjs          escreve chrome/<sabor>/manifest.json
//   node chrome/build.mjs --check  só confere: falha se algum manifest não bate com a paleta
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const raiz = new URL("..", import.meta.url).pathname;
const { flavors: p } = JSON.parse(readFileSync(join(raiz, "palette.json"), "utf8"));
const n = p.noche, d = p.dia, a = p.azul;
// Fora da paleta, só tokens da marca (tokens.css): o azul da marca e o --borde-campo.
const AZUL = "#005278"; // --azul
const BORDE_CAMPO = "#B7C6CE"; // --borde-campo
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// O anônimo segue escuro nos dois sabores, como no Chrome.
const anonimo = { frame_incognito: n.bg3, frame_incognito_inactive: n.bg2 };

const SABORES = {
	noche: {
		name: n.name,
		description: "Atacama Theme para Chrome, sabor oscuro: marco azul, barra en azul profundo y acento amarillo. Hecho por commente.me.",
		colors: {
			frame: AZUL,
			frame_inactive: a.term,
			...anonimo,
			toolbar: n.bg,
			tab_text: a.tfg,
			tab_background_text: n.fg,
			tab_background_text_inactive: BORDE_CAMPO,
			bookmark_text: n.fg,
			toolbar_text: n.fg,
			toolbar_button_icon: n.fg,
			omnibox_background: n.surf,
			omnibox_text: a.tfg,
			ntp_background: n.bg,
			ntp_text: n.fg,
			ntp_link: n.prop,
			ntp_header: n.cursor,
			button_background: n.surf,
		},
	},
	dia: {
		name: d.name,
		description: "Atacama Theme para Chrome, sabor claro: papel gris, barra blanca y acento azul. Hecho por commente.me.",
		colors: {
			frame: d.bg2,
			frame_inactive: d.bg3,
			...anonimo,
			toolbar: d.bg,
			tab_text: d.fg,
			tab_background_text: d.muted,
			tab_background_text_inactive: d.muted,
			bookmark_text: d.fg,
			toolbar_text: d.fg,
			toolbar_button_icon: d.muted,
			omnibox_background: d.bg3,
			omnibox_text: d.fg,
			ntp_background: d.bg,
			ntp_text: d.fg,
			ntp_link: d.keyword,
			ntp_header: d.keyword,
			button_background: d.sel,
		},
	},
};

function manifest({ name, description, colors }) {
	for (const [k, v] of Object.entries(colors)) if (!/^#[0-9A-F]{6}$/i.test(v)) throw new Error(`${name}: ${k} sem cor (${v})`);
	return JSON.stringify(
		{
			manifest_version: 3,
			name,
			version: "1.0.0",
			description,
			icons: { 128: "icon-128.png" },
			theme: {
				images: { theme_ntp_background: "images/ntp.png" },
				colors: Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, rgb(v)])),
				properties: { ntp_background_alignment: "bottom right", ntp_background_repeat: "no-repeat" },
			},
		},
		null,
		2,
	) + "\n";
}

const conferir = process.argv.includes("--check");
const erros = [];
for (const [slug, sabor] of Object.entries(SABORES)) {
	const arquivo = join(raiz, "chrome", slug, "manifest.json");
	const novo = manifest(sabor);
	if (conferir) {
		let atual = "";
		try { atual = readFileSync(arquivo, "utf8"); } catch {}
		if (atual !== novo) erros.push(`chrome/${slug}/manifest.json não bate com o palette.json (rode node chrome/build.mjs)`);
	} else writeFileSync(arquivo, novo);
}
if (erros.length) { console.error(erros.join("\n")); process.exit(1); }
console.log(`ok · ${Object.keys(SABORES).length} temas do Chrome ${conferir ? "conferidos" : "gerados"} a partir do palette.json`);
