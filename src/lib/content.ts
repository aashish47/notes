import "server-only";

import { evaluate } from "@mdx-js/mdx";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import * as runtime from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const remarkGfmPlugin = remarkGfm;
const remarkMathPlugin = remarkMath;
const rehypeSlugPlugin = rehypeSlug;
const rehypeKatexPlugin = rehypeKatex;
const rehypePrettyCodePlugin = rehypePrettyCode;
const remarkMdxPlugin = remarkMdx;
const remarkParsePlugin = remarkParse;

export type NoteMeta = {
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

export const getNoteMeta = (
	subject: string,
	topic: string,
	chapter: string,
): NoteMeta => {
	const source = readNoteSource(subject, topic, chapter);
	const { data } = matter(source);

	return {
		title: typeof data.title === "string" ? data.title : chapter,
		description:
			typeof data.description === "string" ? data.description : undefined,
		order: typeof data.order === "number" ? data.order : undefined,
		draft: typeof data.draft === "boolean" ? data.draft : undefined,
		tags: Array.isArray(data.tags)
			? data.tags.filter((tag): tag is string => typeof tag === "string")
			: undefined,
	};
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

export const getTopicChapters = (subject: string, topic: string): Note[] =>
	listChapters(subject, topic)
		.map((chapter) => ({
			subject,
			topic,
			chapter,
			slug: chapter,
			metadata: getNoteMeta(subject, topic, chapter),
		}))
		.filter((note) => !note.metadata.draft)
		.sort(
			(a, b) =>
				(a.metadata.order ?? 999) - (b.metadata.order ?? 999) ||
				a.metadata.title.localeCompare(b.metadata.title),
		);

export const getAllNotes = (): Note[] =>
	listSubjects().flatMap((subject) =>
		listTopics(subject).flatMap((topic) => getTopicChapters(subject, topic)),
	);

export const getNote = (
	subject: string,
	topic: string,
	chapter: string,
): Note | undefined =>
	getTopicChapters(subject, topic).find((note) => note.slug === chapter);

export const getBreadcrumbs = ({
	subject,
	topic,
	chapter,
}: {
	subject?: string;
	topic?: string;
	chapter?: string;
}): BreadcrumbItem[] => {
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

	if (chapter) {
		breadcrumbs.push({
			label: getNoteMeta(subject!, topic!, chapter).title,
			href: `/${subject}/${topic}/${chapter}/`,
		});
	}

	return breadcrumbs;
};

export const getNoteContent = (
	subject: string,
	topic: string,
	chapter: string,
) => {
	const source = readNoteSource(subject, topic, chapter);
	const parsed = matter(source);

	return {
		metadata: getNoteMeta(subject, topic, chapter),
		content: parsed.content,
	};
};

export const renderNoteContent = async (
	subject: string,
	topic: string,
	chapter: string,
) => {
	const source = readNoteSource(subject, topic, chapter);
	const { content } = matter(source);

	const mdxModule = await evaluate(content, {
		...runtime,
		remarkPlugins: [remarkGfmPlugin, remarkMathPlugin],
		rehypePlugins: [
			rehypeSlugPlugin,
			[rehypeKatexPlugin, { strict: false }],
			[
				rehypePrettyCodePlugin,
				{
					theme: "github-dark",
					keepBackground: false,
				},
			],
		],
	});

	return mdxModule.default as React.ComponentType;
};

export const getToc = async (source: string): Promise<TocItem[]> => {
	const { content } = matter(source);

	const tree = unified()
		.use(remarkParsePlugin)
		.use(remarkMathPlugin)
		.use(remarkMdxPlugin)
		.parse(content);

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
