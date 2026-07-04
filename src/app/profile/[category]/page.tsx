import { profileCategories } from "@/lib/portfolio";

export function generateStaticParams() {
	return profileCategories.map((category) => ({ category }));
}

export default function CategoryPage() {
	return <>What you looking for?</>;
}
