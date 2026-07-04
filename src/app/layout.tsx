import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout";

const fira_code = Fira_Code({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: {
		default: "Mohtashim Ali",
		template: "%s | Mohtashim Ali",
	},
	description: "Developed by Mohtashim Ali",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fira_code.className}`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
