import type { InputHTMLAttributes } from "react";

const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<span className="relative inline-flex h-5 w-5 items-center justify-center border border-theme-stroke rounded overflow-hidden">
			<input {...props} type="checkbox" className="appearance-none peer" />
			<span className="pointer-events-none absolute h-5 w-5 grid place-content-center text-white opacity-0 peer-checked:opacity-100 peer-checked:bg-theme-foreground">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					fill="none"
					viewBox="0 0 12 12"
				>
					<title>Checkmark</title>
					<g clipPath="url(#clip0_28578_1700)">
						<path
							fill="#F8FAFC"
							d="m5 7.586 4.596-4.597.707.708L5 9 1.818 5.818l.707-.707z"
						></path>
					</g>
					<defs>
						<clipPath id="clip0_28578_1700">
							<path fill="#fff" d="M0 0h12v12H0z"></path>
						</clipPath>
					</defs>
				</svg>
			</span>
		</span>
	);
};

export default Checkbox;
