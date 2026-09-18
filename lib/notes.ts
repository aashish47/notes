import GithubSlugger from "github-slugger";
import fs from "node:fs";
import path from "node:path";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type NoteMeta = {
	title: string;
	description?: string;
	order?: number;
};

export type TocItem = {
	depth: 2 | 3;
	text: string;
	slug: string;
};

const contentRoot = path.join(process.cwd(), "content");

function subjectDir(subject: string) {
	return path.join(contentRoot, subject);
}

function readExport(
	source: string,
	name: keyof NoteMeta,
): string | number | undefined {
	const pattern = new RegExp(`export\\s+const\\s+${name}\\s*=\\s*([^\\n]+)`);
	const match = source.match(pattern);
	if (!match) return undefined;
	const raw = match[1].trim().replace(/;$/, "");
	if (/^['"`]/.test(raw)) return raw.slice(1, -1);
	const number = Number(raw);
	return Number.isNaN(number) ? undefined : number;
}

export function listSubjects() {
	return fs
		.readdirSync(contentRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
}

export function listChapters(subject: string) {
	return fs
		.readdirSync(subjectDir(subject), { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
		.map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export function readNoteSource(subject: string, chapter: string) {
	return fs.readFileSync(
		path.join(subjectDir(subject), `${chapter}.mdx`),
		"utf8",
	);
}

export function getNoteMeta(subject: string, chapter: string): NoteMeta {
	const source = readNoteSource(subject, chapter);
	const title = readExport(source, "title");
	const description = readExport(source, "description");
	const order = readExport(source, "order");

	return {
		title: typeof title === "string" ? title : chapter,
		description: typeof description === "string" ? description : undefined,
		order: typeof order === "number" ? order : undefined,
	};
}

export function getSubjectLabel(subject: string) {
	return subject
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function getSubjectChapters(subject: string) {
	return listChapters(subject)
		.map((chapter) => ({ slug: chapter, ...getNoteMeta(subject, chapter) }))
		.sort(
			(a, b) =>
				(a.order ?? 999) - (b.order ?? 999) ||
				a.title.localeCompare(b.title),
		);
}

export async function getToc(source: string): Promise<TocItem[]> {
	const tree = unified()
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkMdx)
		.parse(source);
	const slugger = new GithubSlugger();
	const items: TocItem[] = [];

	visit(tree, "heading", (node: any) => {
		if (node.depth !== 2 && node.depth !== 3) return;
		const text = node.children
			.filter(
				(child: any) =>
					child.type === "text" || child.type === "inlineCode",
			)
			.map((child: any) => child.value)
			.join("")
			.trim();
		if (!text) return;
		items.push({ depth: node.depth, text, slug: slugger.slug(text) });
	});

	return items;
}
