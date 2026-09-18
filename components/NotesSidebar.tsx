import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import {
	getSubjectLabel,
	getTopicChapters,
	getTopicLabel,
	listSubjects,
	listTopics,
} from "@/lib/content";
import Link from "next/link";

const renderNavigation = ({
	activeSubject,
	activeTopic,
	activeChapter,
}: {
	activeSubject?: string;
	activeTopic?: string;
	activeChapter?: string;
}) => {
	const subjects = listSubjects();

	return subjects.map((subject) => {
		const topics = listTopics(subject);

		return (
			<div key={subject} className="space-y-3">
				<Link
					href={`/${subject}/`}
					className={`block rounded-md px-2 py-1.5 text-sm font-semibold ${
						activeSubject === subject ? "bg-accent" : "hover:bg-accent/60"
					}`}
				>
					{getSubjectLabel(subject)}
				</Link>

				<div className="space-y-2 border-l pl-3">
					{topics.map((topic) => {
						const chapters = getTopicChapters(subject, topic);
						const isActiveTopic =
							activeSubject === subject && activeTopic === topic;

						return (
							<div key={topic} className="space-y-1">
								<Link
									href={`/${subject}/${topic}/`}
									className={`block rounded-md px-2 py-1 text-sm font-medium ${
										isActiveTopic
											? "bg-accent"
											: "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
									}`}
								>
									{getTopicLabel(topic)}
								</Link>

								<div className="space-y-1 border-l pl-3">
									{chapters.map((chapter) => {
										const isActiveChapter =
											isActiveTopic && activeChapter === chapter.slug;

										return (
											<Link
												key={chapter.slug}
												href={`/${subject}/${topic}/${chapter.slug}/`}
												className={`block rounded-md px-2 py-1.5 text-sm ${
													isActiveChapter
														? "bg-primary text-primary-foreground"
														: "text-muted-foreground hover:bg-accent hover:text-foreground"
												}`}
											>
												{chapter.metadata.title}
											</Link>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	});
};

export const NotesSidebar = ({
	activeSubject,
	activeTopic,
	activeChapter,
}: {
	activeSubject?: string;
	activeTopic?: string;
	activeChapter?: string;
}) => (
	<Sidebar side="left" collapsible="offcanvas" className="bg-sidebar border-r">
		<SidebarHeader className="border-b px-4 py-4">
			<Link href="/" className="flex items-center gap-3">
				<span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-lg text-sm font-bold">
					N
				</span>
				<div>
					<div className="font-semibold tracking-tight">My Notes</div>
					<div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
						Knowledge base
					</div>
				</div>
			</Link>
		</SidebarHeader>

		<SidebarContent className="p-3">
			<div className="text-muted-foreground px-2 pb-2 text-xs font-medium tracking-wider uppercase">
				Subjects
			</div>
			<div className="space-y-4">
				{renderNavigation({ activeSubject, activeTopic, activeChapter })}
			</div>
		</SidebarContent>
	</Sidebar>
);
