// Gera os temas do Warp a partir do palette.json da raiz (fonte única), nos três sabores.
//   node warp/build.mjs          escreve warp/atacama_<sabor>.yaml
//   node warp/build.mjs --check  só confere: falha se algum .yaml não bate com a paleta
// Exceção aceita (decisão do usuário, 03-11-2026): o fundo do Atacama Azul no Warp é um
// degradê do azul da marca (#005278, --azul) ao fundo de terminal do Noche. É o único
// degradê da marca; fica aqui e em nenhum outro port.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const raiz = new URL("..", import.meta.url).pathname;
const paleta = JSON.parse(readFileSync(join(raiz, "palette.json"), "utf8"));
const NOMES = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
const AZUL_MARCA = "#005278";
// Claro ou escuro pelo brilho do fundo do terminal (o "type" da paleta é a cor de sintaxe).
const claro = (hex) => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
	return 0.299 * r + 0.587 * g + 0.114 * b > 128;
};

function yaml(slug) {
	const f = paleta.flavors[slug];
	if (!f || f.ansi?.length !== 16) throw new Error(`palette.json: sabor ${slug} sem os 16 ANSI`);
	const fundo =
		slug === "azul"
			? `background:\n  top: '${AZUL_MARCA}'\n  bottom: '${paleta.flavors.noche.term}'`
			: `background: '${f.term}'`;
	const cores = (de) => NOMES.map((n, i) => `    ${n}: '${f.ansi[de + i]}'`).join("\n");
	return [
		`# Atacama Theme · ${f.name} · MIT · commente.me`,
		`name: ${f.name}`,
		`accent: '${f.cursor}'`,
		`cursor: '${f.cursor}'`,
		fundo,
		`foreground: '${f.tfg}'`,
		`details: ${claro(f.term) ? "lighter" : "darker"}`,
		"terminal_colors:",
		"  normal:",
		cores(0),
		"  bright:",
		cores(8),
		"",
	].join("\n");
}

const conferir = process.argv.includes("--check");
const erros = [];
for (const slug of Object.keys(paleta.flavors)) {
	const arquivo = join(raiz, "warp", `atacama_${slug}.yaml`);
	const novo = yaml(slug);
	if (conferir) {
		let atual = "";
		try { atual = readFileSync(arquivo, "utf8"); } catch {}
		if (atual !== novo) erros.push(`warp/atacama_${slug}.yaml não bate com o palette.json (rode node warp/build.mjs)`);
	} else writeFileSync(arquivo, novo);
}
if (erros.length) { console.error(erros.join("\n")); process.exit(1); }
console.log(`ok · ${Object.keys(paleta.flavors).length} temas do Warp ${conferir ? "conferidos" : "gerados"} a partir do palette.json`);
