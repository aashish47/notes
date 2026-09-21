import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
	h1: ({ children, ...props }) => (
		<h1
			className="text-foreground mt-8 scroll-mt-24 text-3xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h1>
	),
	h2: ({ children, ...props }) => (
		<h2
			className="text-foreground mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h2>
	),
	h3: ({ children, ...props }) => (
		<h3
			className="text-foreground mt-8 scroll-mt-24 text-xl font-semibold tracking-tight"
			{...props}
		>
			{children}
		</h3>
	),
	p: ({ children, ...props }) => (
		<p className="text-foreground/90 mt-5 leading-7" {...props}>
			{children}
		</p>
	),
	a: ({ children, ...props }) => (
		<a
			className="text-primary font-medium underline-offset-4 hover:underline"
			{...props}
		>
			{children}
		</a>
	),
	ul: ({ children, ...props }) => (
		<ul className="text-foreground/90 mt-5 list-disc space-y-2 pl-6" {...props}>
			{children}
		</ul>
	),
	ol: ({ children, ...props }) => (
		<ol
			className="text-foreground/90 mt-5 list-decimal space-y-2 pl-6"
			{...props}
		>
			{children}
		</ol>
	),
	li: ({ children, ...props }) => (
		<li className="leading-7" {...props}>
			{children}
		</li>
	),
	blockquote: ({ children, ...props }) => (
		<blockquote
			className="border-border text-muted-foreground mt-6 border-l-2 pl-4 italic"
			{...props}
		>
			{children}
		</blockquote>
	),
	table: ({ children, ...props }) => (
		<div className="border-border mt-6 overflow-x-auto rounded-lg border">
			<table className="min-w-full text-sm" {...props}>
				{children}
			</table>
		</div>
	),
	thead: ({ children, ...props }) => (
		<thead className="bg-muted/70" {...props}>
			{children}
		</thead>
	),
	th: ({ children, ...props }) => (
		<th
			className="border-border border-b px-4 py-2 text-left font-medium"
			{...props}
		>
			{children}
		</th>
	),
	td: ({ children, ...props }) => (
		<td className="border-border border-b px-4 py-2 align-top" {...props}>
			{children}
		</td>
	),
	code: ({ children, className, ...props }) => {
		const isInline = !className;
		if (isInline) {
			return (
				<code
					className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]"
					{...props}
				>
					{children}
				</code>
			);
		}
		return (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
	pre: ({ children, ...props }) => (
		<pre
			className="bg-muted/80 mt-6 overflow-x-auto rounded-xl p-4 text-sm"
			{...props}
		>
			{children}
		</pre>
	),
};

export const useMDXComponents = (): MDXComponents => components;
