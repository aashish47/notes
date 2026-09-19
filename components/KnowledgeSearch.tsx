"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { searchNotes, type SearchResult } from "@/lib/search";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export const NoteSearch = ({
	initialResults,
}: {
	initialResults: SearchResult[];
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const results = useMemo(
		() => searchNotes(initialResults, query),
		[initialResults, query],
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				(event.key === "k" || event.key === "K") &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				setIsOpen((open) => !open);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setQuery("");
		} else {
			// Focus input when opened
			const timer = setTimeout(() => {
				inputRef.current?.focus();
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<>
			<Button
				type="button"
				onClick={() => setIsOpen(true)}
				className="bg-background text-muted-foreground hover:text-foreground border-border hover:bg-accent/60 inline-flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2 text-left text-sm shadow-xs transition-colors"
			>
				<span className="flex items-center gap-2">
					<Search className="size-4" />
					<span>Search notes, topics, or tags...</span>
				</span>
				<kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:inline-flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-2xl gap-0 p-0" showCloseButton={true}>
					<DialogHeader className="sr-only">
						<DialogTitle>Search notes</DialogTitle>
						<DialogDescription>
							Search across all notes, topics, and tags.
						</DialogDescription>
					</DialogHeader>

					<div className="border-border flex items-center gap-3 border-b px-4 py-3.5">
						<Search className="text-muted-foreground size-4 shrink-0" />
						<input
							ref={inputRef}
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search notes, topics, or tags..."
							className="text-foreground placeholder:text-muted-foreground w-full border-0 bg-transparent text-base outline-none"
						/>
					</div>

					<div className="max-h-[60vh] overflow-y-auto p-2">
						{query ? (
							results.length === 0 ? (
								<p className="text-muted-foreground py-8 text-center text-sm">
									No notes found matching &ldquo;{query}&rdquo;.
								</p>
							) : (
								<ul className="space-y-1">
									{results.map((result) => (
										<li key={`${result.href}-${result.title}`}>
											<Link
												href={result.href}
												className="hover:bg-accent block rounded-lg px-3 py-2.5 transition-colors"
												onClick={() => setIsOpen(false)}
											>
												<div className="text-foreground text-sm font-medium">
													{result.title}
												</div>
												<div className="text-muted-foreground mt-0.5 text-xs">
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
							<div className="py-8 text-center">
								<p className="text-muted-foreground text-sm">
									Type to search notes, topics, or tags.
								</p>
								<p className="text-muted-foreground/70 mt-1 text-xs">
									Navigate through subjects and chapters instantly.
								</p>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
