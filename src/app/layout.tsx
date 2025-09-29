import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohtashim Ali | Portfolio",
  description: "Developed by Mohtashim Ali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira_code.className} p-4 md:p-8 bg-background`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
