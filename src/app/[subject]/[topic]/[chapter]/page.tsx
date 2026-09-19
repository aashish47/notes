import { NotePage } from "@/app/[subject]/[topic]/[chapter]/components/NotePage";
import {
	getNoteMeta,
	getSubjectLabel,
	getToc,
	getTopicChapters,
	listSubjects,
	listTopics,
	readNoteSource,
	renderNoteContent,
} from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
	listSubjects().flatMap((subject) =>
		listTopics(subject).flatMap((topic) =>
			getTopicChapters(subject, topic).map((chapter) => ({
				subject,
				topic,
				chapter: chapter.slug,
			})),
		),
	);

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{
		subject: string;
		topic: string;
		chapter: string;
	}>;
}): Promise<Metadata> => {
	const { subject, topic, chapter } = await params;
	const chapters = getTopicChapters(subject, topic);

	if (!chapters.some((item) => item.slug === chapter)) {
		return {};
	}

	const meta = getNoteMeta(subject, topic, chapter);

	return {
		title: `${meta.title} · ${getSubjectLabel(subject)}`,
		description: meta.description,
	};
};

const NoteRoute = async ({
	params,
}: {
	params: Promise<{
		subject: string;
		topic: string;
		chapter: string;
	}>;
}) => {
	const { subject, topic, chapter } = await params;

	if (
		!listSubjects().includes(subject) ||
		!listTopics(subject).includes(topic) ||
		!getTopicChapters(subject, topic).some((item) => item.slug === chapter)
	) {
		notFound();
	}

	const Content = await renderNoteContent(subject, topic, chapter);
	const source = readNoteSource(subject, topic, chapter);
	const toc = await getToc(source);
	const meta = getNoteMeta(subject, topic, chapter);

	return (
		<NotePage
			meta={meta}
			toc={toc}
			subject={subject}
			topic={topic}
			chapter={chapter}
		>
			<div className="max-w-full min-w-0">
				<Content />
			</div>
		</NotePage>
	);
};

export default NoteRoute;
