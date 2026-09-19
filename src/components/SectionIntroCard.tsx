import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionIntroCardProps = {
	title: ReactNode;
	description?: ReactNode;
	icon: LucideIcon;
	className?: string;
};

export function SectionIntroCard({
	title,
	description,
	icon: Icon,
	className = "",
}: SectionIntroCardProps) {
	return (
		<Card
			className={`border-border/60 bg-card/80 rounded-2xl p-4 sm:p-5 ${className}`}
		>
			<div className="flex items-start gap-3 sm:gap-4">
				<div className="bg-muted text-muted-foreground border-border/60 flex size-11 shrink-0 items-center justify-center rounded-xl border">
					<Icon className="size-5" />
				</div>

				<div className="min-w-0 flex-1">
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						{title}
					</h1>
					{description && (
						<p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
							{description}
						</p>
					)}
				</div>
			</div>
		</Card>
	);
}
