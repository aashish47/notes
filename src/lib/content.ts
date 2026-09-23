import "server-only";

import GithubSlugger from "github-slugger";
import { notFound } from "next/navigation";
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
	draft?: boolean;
	tags?: string[];
};

export type Metadata = {
	title: string;
	description?: string;
	order?: number;
	draft?: boolean;
	tags?: string[];
};

export type Note = {
	subject: string;
	topic: string;
	chapter: string;
	slug: string;
	metadata: NoteMeta;
};

export type TocItem = {
	depth: 2 | 3;
	text: string;
	slug: string;
};

type TocHeadingChild = {
	type: "text" | "inlineCode";
	value: string;
};

type TocHeading = {
	type: "heading";
	depth: 2 | 3;
	children: TocHeadingChild[];
};

const contentRoot = path.join(process.cwd(), "content");

const subjectDir = (subject: string) => path.join(contentRoot, subject);

const topicDir = (subject: string, topic: string) =>
	path.join(subjectDir(subject), topic);

export type BreadcrumbItem = {
	label: string;
	href?: string;
};

export type SearchResult = {
	subject: string;
	topic: string;
	chapter: string;
	href: string;
	title: string;
	description?: string;
};

export const listSubjects = (): string[] => {
	if (!fs.existsSync(contentRoot)) return [];

	return fs
		.readdirSync(contentRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
};

export const listTopics = (subject: string): string[] => {
	const directory = subjectDir(subject);

	if (!fs.existsSync(directory)) return [];

	return fs
		.readdirSync(directory, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
};

export const listChapters = (subject: string, topic: string): string[] => {
	const directory = topicDir(subject, topic);

	if (!fs.existsSync(directory)) return [];

	return fs
		.readdirSync(directory, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
		.map((entry) => entry.name.replace(/\.mdx$/, ""));
};

export const readNoteSource = (
	subject: string,
	topic: string,
	chapter: string,
): string =>
	fs.readFileSync(
		path.join(topicDir(subject, topic), `${chapter}.mdx`),
		"utf8",
	);

export const getNoteMeta = async (
	subject: string,
	topic: string,
	chapter: string,
): Promise<Metadata> => {
	const mod = await import(`../../content/${subject}/${topic}/${chapter}.mdx`);

	return mod.metadata;
};

export const getSubjectLabel = (subject: string): string =>
	subject
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

export const getTopicLabel = (topic: string): string =>
	topic
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

export const getTopicChapters = async (
	subject: string,
	topic: string,
): Promise<Note[]> => {
	const chapters = listChapters(subject, topic);
	const notes: Note[] = [];

	for (const chapter of chapters) {
		const metadata = await getNoteMeta(subject, topic, chapter);
		notes.push({
			subject,
			topic,
			chapter,
			slug: chapter,
			metadata,
		});
	}

	return notes
		.filter((note) => !note.metadata.draft)
		.sort(
			(a, b) =>
				(a.metadata.order ?? 999) - (b.metadata.order ?? 999) ||
				a.metadata.title.localeCompare(b.metadata.title),
		);
};

export const getAllNotes = async (): Promise<Note[]> => {
	const subjects = listSubjects();
	const allNotes: Note[] = [];

	for (const subject of subjects) {
		const topics = listTopics(subject);
		for (const topic of topics) {
			const chapters = await getTopicChapters(subject, topic);
			allNotes.push(...chapters);
		}
	}

	return allNotes;
};

export const getNote = async (
	subject: string,
	topic: string,
	chapter: string,
): Promise<Note | undefined> => {
	const chapters = await getTopicChapters(subject, topic);
	return chapters.find((note) => note.slug === chapter);
};

export const getBreadcrumbs = async ({
	subject,
	topic,
	chapter,
}: {
	subject?: string;
	topic?: string;
	chapter?: string;
}): Promise<BreadcrumbItem[]> => {
	const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

	if (subject) {
		breadcrumbs.push({
			label: getSubjectLabel(subject),
			href: `/${subject}/`,
		});
	}

	if (topic) {
		breadcrumbs.push({
			label: getTopicLabel(topic),
			href: `/${subject}/${topic}/`,
		});
	}

	if (chapter && subject && topic) {
		const meta = await getNoteMeta(subject, topic, chapter);
		breadcrumbs.push({
			label: meta.title,
			href: `/${subject}/${topic}/${chapter}/`,
		});
	}

	return breadcrumbs;
};

export const getNoteComponent = async (
	subject: string,
	topic: string,
	chapter: string,
) => {
	try {
		return await import(`../../content/${subject}/${topic}/${chapter}.mdx`);
	} catch (err) {
		if (hasCode(err) && err.code === "MODULE_NOT_FOUND") {
			notFound();
		}
		throw err;
	}
};

function hasCode(err: unknown): err is { code: string } {
	return typeof err === "object" && err !== null && "code" in err;
}

export const getToc = async (source: string): Promise<TocItem[]> => {
	const tree = unified()
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkMdx)
		.parse(source);

	const slugger = new GithubSlugger();
	const items: TocItem[] = [];

	visit(tree, "heading", (node) => {
		const heading = node as unknown as TocHeading;

		if (heading.depth !== 2 && heading.depth !== 3) return;

		const text = heading.children
			.filter((child) => child.type === "text" || child.type === "inlineCode")
			.map((child) => child.value)
			.join("")
			.trim();

		if (!text) return;

		items.push({
			depth: heading.depth,
			text,
			slug: slugger.slug(text),
		});
	});

	return items;
};
