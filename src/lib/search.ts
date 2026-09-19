export type SearchResult = {
	subject: string;
	topic: string;
	chapter: string;
	href: string;
	title: string;
	description?: string;
};

export const getSearchIndex = (
	notes: Array<{
		subject: string;
		topic: string;
		chapter: string;
		title: string;
		description?: string;
	}>,
): SearchResult[] =>
	notes.map((note) => ({
		subject: note.subject,
		topic: note.topic,
		chapter: note.chapter,
		href: `/${note.subject}/${note.topic}/${note.chapter}/`,
		title: note.title,
		description: note.description,
	}));

export const searchNotes = (
	items: SearchResult[],
	query: string,
): SearchResult[] => {
	const normalizedQuery = query.trim().toLowerCase();
	if (!normalizedQuery) {
		return items;
	}

	return items
		.filter((item) => {
			const haystack = [
				item.title,
				item.description ?? "",
				item.subject,
				item.topic,
			]
				.join(" ")
				.toLowerCase();
			return haystack.includes(normalizedQuery);
		})
		.slice(0, 20);
};
