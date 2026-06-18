"use client";
import { useEffect, useRef, useState } from "react";

function splitIntoLines(text: string, charsPerLine: number): string[] {
	const words = text.split(" ");
	const lines: string[] = [];
	let current = "";

	for (const word of words) {
		const next = current ? `${current} ${word}` : word;
		if (next.length > charsPerLine) {
			if (current) lines.push(current);
			current = word;
		} else {
			current = next;
		}
	}

	if (current) lines.push(current);
	return lines;
}

const FileContent = ({ children }: { children: React.ReactNode }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const rulerRef = useRef<HTMLSpanElement>(null);
	const [charsPerLine, setCharsPerLine] = useState(60);

	useEffect(() => {
		const container = containerRef.current;
		const ruler = rulerRef.current;
		if (!container || !ruler) return;

		const compute = () => {
			// ruler measures a single monospace char width
			const charWidth = ruler.getBoundingClientRect().width;
			// subtract line-number column width (the md:table-cell span)
			const lineNumCol = container.querySelector("[data-line-num]");
			const lineNumWidth = lineNumCol?.getBoundingClientRect().width ?? 0;
			const available = container.getBoundingClientRect().width - lineNumWidth;
			if (charWidth > 0) {
				setCharsPerLine(Math.floor(available / charWidth));
			}
		};

		const ro = new ResizeObserver(compute);
		ro.observe(container);
		compute(); // initial

		return () => ro.disconnect();
	}, []);

	const raw = children?.toString() ?? "";
	const paragraphs = raw.split("\n").map((p) => p.trim());

	const contentLines: string[] = [];
	for (const para of paragraphs) {
		if (!para) {
			contentLines.push("");
		} else {
			contentLines.push(...splitIntoLines(para, charsPerLine));
		}
	}

	const formattedLines = [
		"/**",
		...contentLines.map((line) => (line ? ` * ${line}` : " *")),
		" */",
	].map((text, index) => ({ lineNumber: index + 1, text }));

	return (
		<div
			ref={containerRef}
			className="[counter-reset:line] font-mono text-sm md:text-base text-theme-foreground w-full"
		>
			{/* invisible ruler — measures one monospace character */}
			<span
				ref={rulerRef}
				aria-hidden
				className="absolute opacity-0 pointer-events-none font-mono text-sm md:text-base"
			>
				m
			</span>

			{formattedLines.map((line, i) => {
				const match = line.text.match(/^(\s*\/?\*+\/?\s?)(.*)$/);
				const prefix = match?.[1] ?? "";
				const content = match?.[2] ?? line.text;

				return (
					<div
						key={line.lineNumber}
						className="table-row [counter-increment:line]"
					>
						{/* data-line-num lets us measure this column's width */}
						<span
							data-line-num={i === 0 ? "" : undefined}
							className="hidden md:table-cell text-right text-theme-foreground/40 pr-6 select-none before:content-[counter(line)] w-10 shrink-0"
						/>
						<span className="table-cell pl-4 md:pl-0 leading-6 md:leading-7 whitespace-pre">
							<span className="hidden md:inline">{prefix}</span>
							{content}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export { FileContent };
