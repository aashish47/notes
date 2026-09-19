import type * as React from "react";

export function ScrollArea({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="scroll-area"
			className={`overflow-auto ${className}`}
			{...props}
		/>
	);
}
