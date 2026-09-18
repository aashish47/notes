"use client";

import { Button } from "@/components/ui/button";
import { searchNotes, type SearchResult } from "@/lib/search";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export const NoteSearch = ({
	initialResults,
}: {
	initialResults: SearchResult[];
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");

	const results = useMemo(
		() => searchNotes(initialResults, query),
		[initialResults, query],
	);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
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
			<Button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-background text-foreground border-border hover:bg-accent inline-flex w-full items-center justify-start gap-2 rounded-xl border px-4 py-3 text-left shadow-sm"
			>
				<Search className="size-4" />
				<span className="text-sm">Search notes, topics, or tags</span>
			</Button>

			{isOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm"
					onClick={() => setIsOpen(false)}
				>
					<div
						role="dialog"
						aria-modal="true"
						aria-label="Search notes"
						className="border-border bg-background mx-auto mt-24 w-full max-w-2xl overflow-hidden rounded-xl border shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="border-border flex items-center gap-2 border-b px-4 py-3">
							<Search className="text-muted-foreground size-4" />
							<input
								autoFocus
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search notes, topics, or tags"
								className="text-foreground placeholder:text-muted-foreground w-full border-0 bg-transparent text-base outline-none"
							/>
							<Button
								type="button"
								onClick={() => setIsOpen(false)}
								aria-label="Close search"
								className="text-muted-foreground hover:text-foreground hover:bg-transparent"
							>
								<X className="size-4" />
							</Button>
						</div>

						<div className="max-h-[65vh] overflow-y-auto">
							{query ? (
								results.length === 0 ? (
									<p className="text-muted-foreground px-4 py-3 text-sm">
										No notes found.
									</p>
								) : (
									<ul className="p-2">
										{results.map((result) => (
											<li key={`${result.href}-${result.title}`}>
												<Link
													href={result.href}
													className="hover:bg-accent block rounded-lg px-3 py-2 transition-colors"
													onClick={() => setIsOpen(false)}
												>
													<div className="text-foreground text-sm font-medium">
														{result.title}
													</div>
													<div className="text-muted-foreground mt-1 text-xs">
														{result.subject} / {result.topic}
													</div>
													{result.description && (
														<p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
															{result.description}
														</p>
													)}
												</Link>
											</li>
										))}
									</ul>
								)
							) : (
								<p className="text-muted-foreground px-4 py-3 text-sm">
									Type to search notes, topics, or tags.
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
