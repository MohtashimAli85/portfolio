import type { Route } from "next";
export interface NavbarRoute {
	name: string;
	href: Route;
}
const navbarRoutes: NavbarRoute[] = [
	{
		name: "_hello",
		href: "/",
	},
	{
		name: "_about-me",
		href: "/profile/personal/overview" as Route,
	},
	{
		name: "_projects",
		href: "/projects",
	},
	{
		name: "_contact-me",
		href: "/contact-me",
	},
];
export default navbarRoutes;
