import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getBreadcrumbs, type NoteMeta, type TocItem } from "@/lib/content";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { NotesSidebar } from "./NotesSidebar";
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

	return (
		<SidebarProvider defaultOpen className="min-h-screen">
			<NotesSidebar
				activeSubject={subject}
				activeTopic={topic}
				activeChapter={chapter}
			/>

			<SidebarInset className="min-w-0">
				<div className="border-border flex items-center border-b px-4 py-3 lg:hidden">
					<SidebarTrigger className="-ml-2" />
					<span className="text-sm font-medium">Browse subjects</span>
				</div>

				<main className="min-w-0 flex-1">
					<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-6 md:px-8 md:py-10 xl:grid-cols-[minmax(0,1fr)_240px]">
						<div className="min-w-0">
							<nav
								aria-label="Breadcrumb"
								className="text-muted-foreground mb-6 flex flex-wrap items-center gap-2 text-sm"
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
												<Link
													href={item.href}
													className="hover:text-foreground inline-flex items-center gap-1.5"
												>
													{index === 0 && <Home className="size-3.5" />}
													{item.label}
												</Link>
											) : (
												<span
													className={
														index === 0
															? "inline-flex items-center gap-1.5"
															: undefined
													}
												>
													{index === 0 && <Home className="size-3.5" />}
													{item.label}
												</span>
											)}
										</div>
									);
								})}
							</nav>

							<article className="prose-notes">
								<header className="border-border mb-10 border-b pb-8">
									<h1>{meta.title}</h1>

									{meta.description && (
										<p className="!text-muted-foreground !mt-3 !text-lg">
											{meta.description}
										</p>
									)}
								</header>

								{children}
							</article>
						</div>

						<TableOfContents items={toc} />
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};
