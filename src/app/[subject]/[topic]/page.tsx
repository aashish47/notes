import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NavigationCard } from "@/components/NavigationCard";
import { SectionIntroCard } from "@/components/SectionIntroCard";
import {
	getBreadcrumbs,
	getTopicChapters,
	getTopicLabel,
	listSubjects,
	listTopics,
} from "@/lib/content";
import { BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
	listSubjects().flatMap((subject) =>
		listTopics(subject).map((topic) => ({
			subject,
			topic,
		})),
	);

const TopicPage = async ({
	params,
}: {
	params: Promise<{
		subject: string;
		topic: string;
	}>;
}) => {
	const { subject, topic } = await params;

	if (
		!listSubjects().includes(subject) ||
		!listTopics(subject).includes(topic)
	) {
		notFound();
	}

	const chapters = getTopicChapters(subject, topic);
	const breadcrumbs = getBreadcrumbs({ subject, topic });

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-16">
				<nav
					aria-label="Breadcrumb"
					className="text-muted-foreground flex items-center gap-2 text-sm"
				>
					<Breadcrumbs items={breadcrumbs} />
				</nav>

				<div className="mt-8">
					<SectionIntroCard
						title={getTopicLabel(topic)}
						description={`${chapters.length} chapter${chapters.length === 1 ? "" : "s"}`}
						icon={BookOpen}
					/>
				</div>

				<div className="mt-8 space-y-2.5">
					{chapters.map((chapter, index) => (
						<NavigationCard
							key={chapter.slug}
							href={`/${subject}/${topic}/${chapter.slug}/`}
							index={index + 1}
							title={chapter.metadata.title}
							description={chapter.metadata.description}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default TopicPage;
