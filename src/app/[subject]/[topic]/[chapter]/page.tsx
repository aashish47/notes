import { NotePage } from "@/app/[subject]/[topic]/[chapter]/components/NotePage";
import {
	getNoteComponent,
	getNoteMeta,
	getSubjectLabel,
	getToc,
	getTopicChapters,
	listSubjects,
	listTopics,
	readNoteSource,
} from "@/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const subjects = listSubjects();
	const params: { subject: string; topic: string; chapter: string }[] = [];

	for (const subject of subjects) {
		const topics = listTopics(subject);
		for (const topic of topics) {
			const chapters = await getTopicChapters(subject, topic);
			for (const chapter of chapters) {
				params.push({
					subject,
					topic,
					chapter: chapter.slug,
				});
			}
		}
	}

	return params;
};

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

	const chapters = await getTopicChapters(subject, topic);

	if (!chapters.some((item) => item.slug === chapter)) {
		return { title: "Not Found" };
	}

	const meta = await getNoteMeta(subject, topic, chapter);

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

	const chapters = await getTopicChapters(subject, topic);

	if (
		!listSubjects().includes(subject) ||
		!listTopics(subject).includes(topic) ||
		!chapters.some((item) => item.slug === chapter)
	) {
		notFound();
	}

	const { default: Content } = await getNoteComponent(subject, topic, chapter);
	const source = readNoteSource(subject, topic, chapter);
	const toc = await getToc(source);

	const meta = await getNoteMeta(subject, topic, chapter);

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
