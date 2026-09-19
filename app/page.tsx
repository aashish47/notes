import { SubjectCard } from "@/components/SubjectCard";
import { listSubjects } from "@/lib/content";

const HomePage = () => {
	const subjects = listSubjects();

	return (
		<main className="bg-background min-h-screen">
			<header className="border-border border-b">
				<div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
					<div className="border-border bg-muted/40 text-muted-foreground mb-5 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase">
						Knowledge base
					</div>
					<h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
						Your notes, organized.
					</h1>
					<p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6 md:text-base">
						Browse subjects, revisit key ideas, and keep your learning in one
						clean place.
					</p>
				</div>
			</header>
			<section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
				<div className="mb-6">
					<h2 className="text-2xl font-semibold tracking-tight">Subjects</h2>
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
