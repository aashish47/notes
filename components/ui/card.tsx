import type * as React from "react";

export function Card({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={`bg-card text-card-foreground rounded-xl border shadow-sm ${className}`}
			{...props}
		/>
	);
}

export function CardHeader({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={`flex flex-col space-y-1.5 p-6 ${className}`}
			{...props}
		/>
	);
}

export function CardTitle({
	className = "",
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			data-slot="card-title"
			className={`leading-none font-semibold tracking-tight ${className}`}
			{...props}
		/>
	);
}

export function CardDescription({
	className = "",
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="card-description"
			className={`text-muted-foreground text-sm ${className}`}
			{...props}
		/>
	);
}

export function CardContent({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div data-slot="card-content" className={`p-6 ${className}`} {...props} />
	);
}
