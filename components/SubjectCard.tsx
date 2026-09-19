import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	getSubjectLabel,
	getTopicChapters,
	getTopicLabel,
	listTopics,
} from "@/lib/content";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

export function SubjectCard({ subject }: { subject: string }) {
	const topics = listTopics(subject);

	return (
		<Card className="group border-border/60 bg-card/80 hover:border-border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
			<CardHeader className="pb-3">
				<div className="border-border bg-muted text-muted-foreground mb-3 flex size-10 items-center justify-center rounded-lg border">
					<BookOpen className="size-4" />
				</div>

				<CardTitle className="text-lg tracking-tight">
					<Link
						href={`/${subject}/`}
						className="hover:text-foreground transition-colors"
					>
						{getSubjectLabel(subject)}
					</Link>
				</CardTitle>
			</CardHeader>

			<CardContent className="pt-0">
				<p className="text-muted-foreground mb-4 text-sm">
					{topics.length} topic
					{topics.length === 1 ? "" : "s"}
				</p>

				<div className="space-y-1">
					{topics.map((topic) => {
						const chapters = getTopicChapters(subject, topic);

						return (
							<Link
								key={topic}
								href={`/${subject}/${topic}/`}
								className="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors"
							>
								<span>
									{getTopicLabel(topic)}
									<span className="ml-2 text-[11px] opacity-80">
										{chapters.length} chapter
										{chapters.length === 1 ? "" : "s"}
									</span>
								</span>

								<ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
							</Link>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
