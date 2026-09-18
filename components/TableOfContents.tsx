import { ScrollArea } from "@/components/ui/scroll-area";
import type { TocItem } from "@/lib/content";

export function TableOfContents({ items }: { items: TocItem[] }) {
	if (items.length === 0) return null;
	return (
		<aside className="hidden xl:block">
			<ScrollArea className="sticky top-8 max-h-[calc(100vh-4rem)]">
				<p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
					On this page
				</p>
				<nav aria-label="Table of contents">
					<ul className="space-y-1 border-l pl-4 text-sm">
						{items.map((item) => (
							<li
								key={`${item.slug}-${item.depth}`}
								className={item.depth === 3 ? "pl-3" : ""}
							>
								<a
									className="text-muted-foreground hover:text-foreground block py-1 transition-colors"
									href={`#${item.slug}`}
								>
									{item.text}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</ScrollArea>
		</aside>
	);
}
