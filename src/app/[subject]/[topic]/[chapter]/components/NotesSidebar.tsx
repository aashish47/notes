"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type NotesSidebarNavigationItem = {
	subject: string;
	subjectLabel: string;
	topics: {
		topic: string;
		topicLabel: string;
		chapters: {
			slug: string;
			title: string;
		}[];
	}[];
};

export const NotesSidebar = ({
	navigation,
	activeSubject,
	activeTopic,
	activeChapter,
}: {
	navigation: NotesSidebarNavigationItem[];
	activeSubject?: string;
	activeTopic?: string;
	activeChapter?: string;
}) => {
	/*
	 * Only store values that the user has explicitly changed.
	 *
	 * This avoids using an effect to synchronize state with props.
	 * If a subject/topic has no explicit state, its active status
	 * determines whether it should be open.
	 */
	const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});

	const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

	return (
		<Sidebar side="left" collapsible="offcanvas" className="bg-sidebar">
			<SidebarHeader className="border-border bg-sidebar border-b px-4 py-4 md:hidden">
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
					{navigation.map((subjectItem) => {
						const isSubjectActive = activeSubject === subjectItem.subject;

						const isSubjectOpen =
							openSubjects[subjectItem.subject] ?? isSubjectActive;

						return (
							<Collapsible
								key={subjectItem.subject}
								open={isSubjectOpen}
								onOpenChange={(nextOpen) =>
									setOpenSubjects((current) => ({
										...current,
										[subjectItem.subject]: nextOpen,
									}))
								}
								className="space-y-3"
							>
								<div className="flex items-center gap-2">
									<Link
										href={`/${subjectItem.subject}/`}
										className={`block min-w-0 flex-1 rounded-md px-2 py-1.5 text-sm font-semibold ${
											isSubjectActive ? "bg-accent" : "hover:bg-accent/60"
										}`}
									>
										{subjectItem.subjectLabel}
									</Link>

									<CollapsibleTrigger
										type="button"
										className="text-muted-foreground hover:text-foreground hover:bg-accent flex size-6 items-center justify-center rounded-sm transition-colors"
										aria-label={`Toggle ${subjectItem.subjectLabel}`}
									>
										<ChevronDown
											className={`size-3.5 transition-transform ${
												isSubjectOpen ? "rotate-180" : ""
											}`}
										/>
									</CollapsibleTrigger>
								</div>

								<CollapsibleContent className="border-border/60 space-y-2 border-l pl-3">
									{subjectItem.topics.map((topicItem) => {
										const key = `${subjectItem.subject}:${topicItem.topic}`;

										const isTopicActive =
											activeSubject === subjectItem.subject &&
											activeTopic === topicItem.topic;

										const isTopicOpen = openTopics[key] ?? isTopicActive;

										return (
											<Collapsible
												key={topicItem.topic}
												open={isTopicOpen}
												onOpenChange={(nextOpen) =>
													setOpenTopics((current) => ({
														...current,
														[key]: nextOpen,
													}))
												}
												className="space-y-1"
											>
												<div className="flex items-center gap-1.5">
													<Link
														href={`/${subjectItem.subject}/${topicItem.topic}/`}
														className={`block min-w-0 flex-1 rounded-md px-2 py-1 text-sm font-medium ${
															isTopicActive
																? "bg-accent"
																: "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
														}`}
													>
														{topicItem.topicLabel}
													</Link>

													<CollapsibleTrigger
														type="button"
														className="text-muted-foreground hover:text-foreground hover:bg-accent flex size-5 items-center justify-center rounded-sm transition-colors"
														aria-label={`Toggle ${topicItem.topicLabel}`}
													>
														<ChevronDown
															className={`size-3 transition-transform ${
																isTopicOpen ? "rotate-180" : ""
															}`}
														/>
													</CollapsibleTrigger>
												</div>

												<CollapsibleContent className="border-border/60 space-y-1 border-l pl-3">
													{topicItem.chapters.map((chapter) => {
														const isActiveChapter =
															isTopicActive && activeChapter === chapter.slug;

														return (
															<Link
																key={chapter.slug}
																href={`/${subjectItem.subject}/${topicItem.topic}/${chapter.slug}/`}
																className={`block rounded-md px-2 py-1.5 text-sm ${
																	isActiveChapter
																		? "bg-primary text-primary-foreground"
																		: "text-muted-foreground hover:bg-accent hover:text-foreground"
																}`}
															>
																{chapter.title}
															</Link>
														);
													})}
												</CollapsibleContent>
											</Collapsible>
										);
									})}
								</CollapsibleContent>
							</Collapsible>
						);
					})}
				</div>
			</SidebarContent>
		</Sidebar>
	);
};
