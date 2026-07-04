import { TabProvider } from "@/components/ui/tabs";
import { Sidebar } from "./components/sidebar";

const AboutMeLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<TabProvider>
			<div className="flex h-full">
				<Sidebar />
				{children}
			</div>
		</TabProvider>
	);
};

export default AboutMeLayout;
