"use client";

import type * as React from "react";

import { cn } from "@/lib/tailwind.util";

function Timeline({
	className,
	children,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="timeline"
			className={cn("relative space-y-3 pl-6", className)}
			{...props}
		>
			{children}
		</ul>
	);
}

function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="timeline-item"
			className={cn(
				"relative text-sm font-medium text-theme-foreground",
				"before:absolute before:-left-3 before:top-2 before:z-1 before:size-2 before:-translate-x-1/2 before:rounded-full before:border before:border-indigo-500 before:bg-theme-background before:ring-4 before:ring-theme-background",
				"after:absolute after:-left-3 after:top-[19px] after:h-[calc(100%-2px)] after:w-px after:-translate-x-1/2 after:bg-theme-stroke last:after:hidden",
				className,
			)}
			{...props}
		/>
	);
}

export { Timeline, TimelineItem };
