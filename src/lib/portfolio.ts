import data from "@/data/portfolio-content.json";

// 1. The raw profile object
export const profileData = data.profile;
export type ProfileData = typeof profileData;
// 2. The profile data as an array of [category, folderData]
export const profileDataList = Object.entries(profileData);

// 3. Simple array of your categories
export type ProfileCategories = keyof ProfileData;
export const profileCategories: ProfileCategories[] = [
	"professional",
	"personal",
	"hobbies",
];
// 4. All items from all categories mixed into one flat array
export const allProfileItems = Object.entries(profileData).flatMap(
	([category, categoryData]) =>
		Object.values(categoryData)
			.flatMap((folderData) => folderData.items)
			.map((item) => ({ ...item, category: category as ProfileCategories })),
);
// 5. All slugs for static page generation (Next.js)
export const allProfileSlugs = allProfileItems.map((item) => ({
	category: item.category,
	slug: item.slug,
}));

// 6. Hashmap: profileItemMap[category][slug] → item
export type ProfileItem = (typeof allProfileItems)[number];
export const profileItemMap = Object.fromEntries(
	profileCategories.map((cat) => [
		cat,
		Object.fromEntries(
			allProfileItems.filter((i) => i.category === cat).map((i) => [i.slug, i]),
		),
	]),
);

// Distributive helper: gets union of all folder value types across every category
type ProfileFolders<C extends ProfileCategories = ProfileCategories> =
	C extends ProfileCategories
		? (typeof profileData)[C][keyof (typeof profileData)[C]]
		: never;

export type ProfileSlugs = ProfileFolders["items"][number]["slug"];
