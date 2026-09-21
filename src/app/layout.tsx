import { NoteSearch } from "@/components/KnowledgeSearch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAllNotes } from "@/lib/content";
import { getSearchIndex } from "@/lib/search";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	title: "Notes",
	description: "A fast, static, MDX-powered personal knowledge base.",
	icons: {
		icon: "/icon.svg",
	},
};

const RootLayout = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	// 1. Await getAllNotes since it's now asynchronous
	const allNotes = await getAllNotes();

	const initialResults = getSearchIndex(
		allNotes.map((note) => ({
			subject: note.subject,
			topic: note.topic,
			chapter: note.chapter,
			title: note.metadata.title,
			description: note.metadata.description,
		})),
	);

	return (
		<html lang="en">
			<body className="bg-background text-foreground min-h-screen antialiased">
				<TooltipProvider>
					<div
						className="min-h-screen"
						style={{ ["--header-height" as string]: "4rem" }}
					>
						<header className="bg-background/80 border-border sticky top-0 z-40 flex h-(--header-height) border-b backdrop-blur-sm">
							<div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
								<Link href="/" className="flex shrink-0 items-center gap-3">
									<span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-lg text-sm font-bold">
										N
									</span>
									<div className="hidden sm:block">
										<div className="text-sm font-semibold tracking-tight">
											My Notes
										</div>
										<div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
											Knowledge base
										</div>
									</div>
								</Link>

								<div className="w-full max-w-xl">
									<NoteSearch initialResults={initialResults} />
								</div>
							</div>
						</header>
						{children}
					</div>
				</TooltipProvider>
			</body>
		</html>
	);
};

export default RootLayout;
