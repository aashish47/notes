import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NavigationCard } from "@/components/NavigationCard";
import { SectionIntroCard } from "@/components/SectionIntroCard";
import {
	getBreadcrumbs,
	getSubjectLabel,
	getTopicChapters,
	getTopicLabel,
	listSubjects,
	listTopics,
} from "@/lib/content";
import { BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
	listSubjects().map((subject) => ({ subject }));

const SubjectPage = async ({
	params,
}: {
	params: Promise<{ subject: string }>;
}) => {
	const { subject } = await params;

	if (!listSubjects().includes(subject)) {
		notFound();
	}

	const topics = listTopics(subject);
	const breadcrumbs = getBreadcrumbs({ subject });

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-16">
				<Breadcrumbs items={breadcrumbs} />

				<div className="mt-8">
					<SectionIntroCard
						title={getSubjectLabel(subject)}
						description={`${topics.length} topic${topics.length === 1 ? "" : "s"}`}
						icon={BookOpen}
					/>
				</div>

				<div className="mt-8 space-y-2.5">
					{topics.map((topic, index) => {
						const chapters = getTopicChapters(subject, topic);

						return (
							<NavigationCard
								key={topic}
								href={`/${subject}/${topic}/`}
								index={index + 1}
								title={getTopicLabel(topic)}
								description={`${chapters.length} chapter${
									chapters.length === 1 ? "" : "s"
								}`}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
};

export default SubjectPage;
