import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type NavigationCardProps = {
	href: string;
	index: number;
	title: ReactNode;
	description?: ReactNode;
	className?: string;
};

export function NavigationCard({
	href,
	index,
	title,
	description,
	className = "",
}: NavigationCardProps) {
	return (
		<Link href={href} className={`group block ${className}`}>
			<Card className="border-border/80 hover:bg-muted/50 overflow-hidden transition-colors duration-200">
				<div className="flex items-center gap-2.5 px-3 py-3.5 sm:gap-4 sm:px-5 sm:py-5">
					<span className="text-muted-foreground w-8 shrink-0 text-sm tabular-nums">
						{String(index).padStart(2, "0")}
					</span>
					<div className="min-w-0 flex-1">
						<h2 className="truncate leading-snug font-medium">{title}</h2>
						{description && (
							<p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-5">
								{description}
							</p>
						)}
					</div>
					<ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
				</div>
			</Card>
		</Link>
	);
}
