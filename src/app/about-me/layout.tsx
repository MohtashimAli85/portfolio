import { Sidebar } from "./components/sidebar-item";

const AboutMeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 h-full">
      <Sidebar />
      {children}
    </div>
  );
};

export default AboutMeLayout;
