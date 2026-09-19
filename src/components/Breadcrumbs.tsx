import type { BreadcrumbItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
	<nav
		aria-label="Breadcrumb"
		className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
	>
		{items.map((item, index) => {
			const isLast = index === items.length - 1;
			return (
				<div key={`${item.label}-${index}`} className="flex items-center gap-2">
					{index > 0 && <ChevronRight className="size-3.5" />}
					{item.href && !isLast ? (
						<Link
							href={item.href}
							className="hover:text-foreground inline-flex items-center gap-1.5"
						>
							{index === 0 && <Home className="size-3.5" />}
							<span className="truncate">{item.label}</span>
						</Link>
					) : (
						<span
							aria-current={isLast ? "page" : undefined}
							className={cn(
								"inline-flex items-center gap-1.5 font-medium",
								isLast ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{index === 0 && <Home className="size-3.5" />}
							<span className="truncate">{item.label}</span>
						</span>
					)}
				</div>
			);
		})}
	</nav>
);
