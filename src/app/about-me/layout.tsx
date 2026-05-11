
const sidebarItems= [
  {
    name: "Personal Info",
    href: "/about-me/personal-info"
  },
  {
    name: "Education",
    href: "/about-me/education"
  },
  {
    name: "Experience",
    href: "/about-me/experience"
  },
  {
    name: "Skills",
    href: "/about-me/skills"
  },
] 
const AboutMeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      sidebar
      {children}
    </div>
  );
};

export default AboutMeLayout;
