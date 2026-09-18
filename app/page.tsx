import { SubjectCard } from "@/components/SubjectCard";
import { Badge } from "@/components/ui/badge";
import { listSubjects } from "@/lib/content";
import { BookOpen, Search } from "lucide-react";

const HomePage = () => {
	const subjects = listSubjects();

	return (
		<main className="bg-background min-h-screen">
			<header className="border-border bg-muted/30 border-b">
				<div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
					<Badge className="bg-background text-muted-foreground mb-5 shadow-sm">
						Personal knowledge base
					</Badge>
					<h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
						Learn, organize, and revisit your notes.
					</h1>
					<p className="text-muted-foreground mt-5 max-w-2xl text-base leading-7 md:text-lg">
						A fast static notes site powered by Next.js, Tailwind CSS,
						shadcn/ui, and MDX.
					</p>
					<div className="text-muted-foreground mt-8 flex flex-wrap gap-3 text-sm">
						<span className="bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
							<BookOpen className="size-4" /> {subjects.length} subjects
						</span>
						<span className="bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
							<Search className="size-4" /> MDX notes
						</span>
					</div>
				</div>
			</header>
			<section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
				<div className="mb-8">
					<h2 className="text-2xl font-semibold tracking-tight">Subjects</h2>
					<p className="text-muted-foreground mt-1 text-sm">
						Choose a subject to browse its chapters.
					</p>
				</div>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{subjects.map((subject) => (
						<SubjectCard key={subject} subject={subject} />
					))}
				</div>
			</section>
		</main>
	);
};

export default HomePage;
