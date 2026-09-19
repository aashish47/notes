import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	getBreadcrumbs,
	getSubjectLabel,
	getTopicChapters,
	getTopicLabel,
	listSubjects,
	listTopics,
	type NoteMeta,
	type TocItem,
} from "@/lib/content";
import { NotesSidebar, type NotesSidebarNavigationItem } from "./NotesSidebar";
import { TableOfContents } from "./TableOfContents";

export const NotePage = ({
	meta,
	toc,
	subject,
	topic,
	chapter,
	children,
}: {
	meta: NoteMeta;
	toc: TocItem[];
	subject: string;
	topic?: string;
	chapter?: string;
	children: React.ReactNode;
}) => {
	const breadcrumbs = getBreadcrumbs({ subject, topic, chapter });
	const navigation: NotesSidebarNavigationItem[] = listSubjects().map(
		(subjectItem) => ({
			subject: subjectItem,
			subjectLabel: getSubjectLabel(subjectItem),
			topics: listTopics(subjectItem).map((topicItem) => ({
				topic: topicItem,
				topicLabel: getTopicLabel(topicItem),
				chapters: getTopicChapters(subjectItem, topicItem).map(
					(chapterItem) => ({
						slug: chapterItem.slug,
						title: chapterItem.metadata.title,
					}),
				),
			})),
		}),
	);

	return (
		<SidebarProvider defaultOpen className="min-h-screen">
			<NotesSidebar
				navigation={navigation}
				activeSubject={subject}
				activeTopic={topic}
				activeChapter={chapter}
			/>

			<SidebarInset className="max-w-full min-w-0 overflow-x-clip">
				<div className="border-border border-b px-4 py-3 md:px-6">
					<div className="mx-auto flex max-w-7xl items-center gap-2">
						<SidebarTrigger className="-ml-2 shrink-0" />
						<Breadcrumbs items={breadcrumbs} />
					</div>
				</div>

				<div className="max-w-full min-w-0 flex-1">
					<div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 px-5 py-6 md:px-8 md:py-10 xl:grid-cols-[minmax(0,1fr)_240px]">
						<div className="max-w-full min-w-0">
							<div className="mb-6" />

							<article className="prose-notes max-w-full min-w-0">
								<header className="border-border mb-10 max-w-full min-w-0 border-b pb-8">
									<h1 className="wrap-break-word">{meta.title}</h1>

									{meta.description && (
										<p className="text-muted-foreground! mt-3! text-lg! wrap-break-word">
											{meta.description}
										</p>
									)}
								</header>

								<div className="max-w-full min-w-0 wrap-break-word">
									{children}
								</div>
							</article>
						</div>

						<TableOfContents items={toc} />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};
