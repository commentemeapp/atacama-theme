// Gera os temas de Ghostty, iTerm2, Windows Terminal, Alacritty e Kitty a partir do
// palette.json da raiz (fonte única), nos três sabores. O Warp tem gerador próprio
// (warp/build.mjs), por causa do degradê do Atacama Azul.
//   node terminais.mjs          escreve os arquivos
//   node terminais.mjs --check  só confere: falha se algum arquivo não bate com a paleta
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const raiz = new URL(".", import.meta.url).pathname;
const paleta = JSON.parse(readFileSync(join(raiz, "palette.json"), "utf8"));
const NOMES = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
const SABORES = ["noche", "dia", "azul"];
const ARQUIVO_ITERM = { noche: "Atacama Noche", dia: "Atacama Dia", azul: "Atacama Azul" };

const hex6 = (h) => h.slice(0, 7).toUpperCase();
const claro = (hex) => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
	return 0.299 * r + 0.587 * g + 0.114 * b > 128;
};

// Cores de terminal de um sabor, todas saindo do palette.json.
function cores(slug) {
	const f = paleta.flavors[slug];
	if (!f || f.ansi?.length !== 16) throw new Error(`palette.json: sabor ${slug} sem os 16 ANSI`);
	return {
		nome: f.name,
		fundo: f.term,
		texto: f.tfg,
		cursor: f.cursor,
		selecao: hex6(f.selbg),
		ansi: f.ansi,
		// Kitty: aba ativa na cor do cursor; o texto dela contrasta com o fundo do terminal.
		abaAtivaTexto: claro(f.term) ? "#FFFFFF" : "#1A1A1A",
	};
}
const cabecalho = (c) => `# Atacama Theme · ${c.nome} · MIT · commente.me`;

function ghostty(c) {
	return [
		cabecalho(c),
		`background = ${c.fundo}`,
		`foreground = ${c.texto}`,
		`cursor-color = ${c.cursor}`,
		`selection-background = ${c.selecao}`,
		`selection-foreground = ${c.texto}`,
		...c.ansi.map((h, i) => `palette = ${i}=${h}`),
		"",
	].join("\n");
}

function alacritty(c) {
	const bloco = (de) => NOMES.map((n, i) => `${n} = "${c.ansi[de + i]}"`).join("\n");
	return [
		cabecalho(c),
		"[colors.primary]",
		`background = "${c.fundo}"`,
		`foreground = "${c.texto}"`,
		"",
		"[colors.cursor]",
		`cursor = "${c.cursor}"`,
		`text = "${c.fundo}"`,
		"",
		"[colors.normal]",
		bloco(0),
		"",
		"[colors.bright]",
		bloco(8),
		"",
	].join("\n");
}

function kitty(c) {
	return [
		cabecalho(c),
		`background ${c.fundo}`,
		`foreground ${c.texto}`,
		`cursor ${c.cursor}`,
		`selection_background ${c.selecao}`,
		`selection_foreground ${c.texto}`,
		`active_tab_background ${c.cursor}`,
		`active_tab_foreground ${c.abaAtivaTexto}`,
		`inactive_tab_background ${c.fundo}`,
		`inactive_tab_foreground ${c.ansi[8]}`,
		...c.ansi.map((h, i) => `color${i} ${h}`),
		"",
	].join("\n");
}

function windowsTerminal(lista) {
	const NOMES_WT = ["black", "red", "green", "yellow", "blue", "purple", "cyan", "white"];
	const esquemas = lista.map((c) => {
		const o = {
			name: c.nome,
			background: c.fundo,
			foreground: c.texto,
			cursorColor: c.cursor,
			selectionBackground: c.selecao,
		};
		NOMES_WT.forEach((n, i) => {
			o[n] = c.ansi[i];
			o[`bright${n[0].toUpperCase()}${n.slice(1)}`] = c.ansi[i + 8];
		});
		return o;
	});
	return JSON.stringify({ schemes: esquemas }, null, 2) + "\n";
}

function iterm(c) {
	const comp = (h, i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(6);
	const cor = (chave, h) =>
		[
			`\t<key>${chave}</key>`,
			"\t<dict>",
			"\t\t<key>Color Space</key><string>sRGB</string>",
			"\t\t<key>Alpha Component</key><real>1</real>",
			`\t\t<key>Red Component</key><real>${comp(h, 1)}</real>`,
			`\t\t<key>Green Component</key><real>${comp(h, 3)}</real>`,
			`\t\t<key>Blue Component</key><real>${comp(h, 5)}</real>`,
			"\t</dict>",
		].join("\n");
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
		`<!-- Atacama Theme · ${c.nome} · MIT · commente.me -->`,
		'<plist version="1.0">',
		"<dict>",
		...c.ansi.map((h, i) => cor(`Ansi ${i} Color`, h)),
		cor("Background Color", c.fundo),
		cor("Foreground Color", c.texto),
		cor("Bold Color", c.texto),
		cor("Cursor Color", c.cursor),
		cor("Cursor Text Color", c.fundo),
		cor("Selection Color", c.selecao),
		cor("Selected Text Color", c.texto),
		"</dict>",
		"</plist>",
		"",
	].join("\n");
}

const todos = SABORES.map(cores);
const arquivos = {};
SABORES.forEach((slug, i) => {
	const c = todos[i];
	arquivos[`ghostty/atacama-${slug}`] = ghostty(c);
	arquivos[`alacritty/atacama-${slug}.toml`] = alacritty(c);
	arquivos[`kitty/atacama-${slug}.conf`] = kitty(c);
	arquivos[`iterm2/${ARQUIVO_ITERM[slug]}.itermcolors`] = iterm(c);
});
arquivos["windows-terminal/atacama.json"] = windowsTerminal(todos);

const conferir = process.argv.includes("--check");
const erros = [];
for (const [rel, novo] of Object.entries(arquivos)) {
	const caminho = join(raiz, rel);
	if (conferir) {
		let atual = "";
		try { atual = readFileSync(caminho, "utf8"); } catch {}
		if (atual !== novo) erros.push(`${rel} não bate com o palette.json (rode node terminais.mjs)`);
	} else {
		mkdirSync(dirname(caminho), { recursive: true });
		writeFileSync(caminho, novo);
	}
}
if (erros.length) { console.error(erros.join("\n")); process.exit(1); }
console.log(`ok · ${Object.keys(arquivos).length} arquivos de terminal ${conferir ? "conferidos" : "gerados"} a partir do palette.json`);
