import { NavigationCard } from "@/components/NavigationCard";
import {
	getBreadcrumbs,
	getTopicChapters,
	getTopicLabel,
	listSubjects,
	listTopics,
} from "@/lib/content";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
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
					{breadcrumbs.map((item, index) => {
						const isLast = index === breadcrumbs.length - 1;
						return (
							<div
								key={`${item.label}-${index}`}
								className="flex items-center gap-2"
							>
								{index > 0 && <ChevronRight className="size-3.5" />}
								{item.href && !isLast ? (
									<Link href={item.href} className="hover:text-foreground">
										{item.label}
									</Link>
								) : (
									<span>{item.label}</span>
								)}
							</div>
						);
					})}
				</nav>

				<div className="bg-card mt-8 flex items-start gap-4 rounded-2xl border p-5 shadow-sm">
					<div className="bg-muted grid size-12 shrink-0 place-items-center rounded-xl">
						<BookOpen className="size-6" />
					</div>

					<div>
						<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
							{getTopicLabel(topic)}
						</h1>
						<p className="text-muted-foreground mt-2">
							{chapters.length} chapter
							{chapters.length === 1 ? "" : "s"}
						</p>
					</div>
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
