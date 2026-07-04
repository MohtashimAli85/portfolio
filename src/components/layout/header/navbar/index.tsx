"use client";
import MobileMenu from "./mobile-menu";
import NavItem from "./nav-item";
import navbarRoutes from "./routes";

const Navbar = () => {
	return (
		<nav className=" lg:grow h-full lg:border- lg:border-r border-theme-stroke">
			<ul className="hidden lg:flex h-full [&>li+li]:border-l [&>li+li]:border-l-theme-stroke">
				{navbarRoutes.toSpliced(-1).map((route) => (
					<li key={route.href}>
						<NavItem route={route} />
					</li>
				))}
			</ul>
			<MobileMenu />
		</nav>
	);
};

export default Navbar;
