import { Sidebar } from "./components/sidebar";

const AboutMeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}
    </div>
  );
};

export default AboutMeLayout;
