import React from "react";
import Navbar from "./navbar";
import ContactMe from "./navbar/contact-me";

const Header = () => {
	return (
		<header className=" h-14   border-b border-theme-stroke flex items-center justify-between lg:justify-normal">
			<h1 className="text-theme-foreground md:basis-80 pl-5.5 relative z-20">
				mohtashim-ali
			</h1>
			<Navbar />
			<ContactMe />
		</header>
	);
};

export default Header;
