import Navbar from "./navbar";
import ContactMe from "./navbar/contact-me";

const Header = () => {
	return (
		<header className=" h-14   border-b border-theme-stroke flex items-center justify-between lg:justify-normal">
			<h1 className="text-theme-foreground md:basis-80 h-full leading-13.75 pl-5.5 relative z-20 border-r border-theme-stroke">
				mohtashim-ali
			</h1>
			<Navbar />
			<ContactMe />
		</header>
	);
};

export default Header;
