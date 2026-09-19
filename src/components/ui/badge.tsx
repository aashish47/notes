import type * as React from "react";

export function Badge({
	className = "",
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="badge"
			className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${className}`}
			{...props}
		/>
	);
}
