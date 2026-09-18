"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type MobileNavSubject = {
	subject: string;
	label: string;
	topics: {
		topic: string;
		label: string;
		chapters: {
			slug: string;
			title: string;
			href: string;
		}[];
	}[];
};

export function MobileNotesNav({
	items,
	activeSubject,
	activeTopic,
	activeChapter,
}: {
	items: MobileNavSubject[];
	activeSubject?: string;
	activeTopic?: string;
	activeChapter?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-card border-border mb-6 inline-flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium lg:hidden"
			>
				<span>Browse subjects</span>
				<Menu className="size-4" />
			</button>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] lg:hidden"
					onClick={() => setIsOpen(false)}
				>
					<div
						className="bg-background ml-auto flex h-full w-[85vw] max-w-sm flex-col border-l shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="border-border flex items-center justify-between border-b px-4 py-3">
							<div className="font-medium">Subjects</div>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="text-muted-foreground hover:text-foreground"
								aria-label="Close subject navigation"
							>
								<X className="size-4" />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-3">
							<div className="space-y-4">
								{items.map((subject) => (
									<div key={subject.subject} className="mb-4">
										<Link
											href={`/${subject.subject}/`}
											className="block px-2 py-1 text-sm font-semibold"
										>
											{subject.label}
										</Link>

										<div className="mt-1 space-y-2 border-l pl-3">
											{subject.topics.map((topic) => {
												const isActiveTopic =
													activeSubject === subject.subject &&
													activeTopic === topic.topic;

												return (
													<div key={topic.topic}>
														<Link
															href={`/${subject.subject}/${topic.topic}/`}
															className="block px-2 py-1 text-sm font-medium"
														>
															{topic.label}
														</Link>

														<div className="border-l pl-3">
															{topic.chapters.map((chapter) => {
																const isActiveChapter =
																	isActiveTopic &&
																	activeChapter === chapter.slug;

																return (
																	<Link
																		key={chapter.slug}
																		href={chapter.href}
																		className={`block rounded-md px-3 py-2 text-sm ${
																			isActiveChapter
																				? "bg-primary text-primary-foreground"
																				: "text-muted-foreground hover:bg-accent hover:text-foreground"
																		}`}
																		onClick={() => setIsOpen(false)}
																	>
																		{chapter.title}
																	</Link>
																);
															})}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
