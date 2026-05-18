import { Metadata } from "next";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
  title: "Personal Info | Mohtashim Ali",
  description:
    "Learn more about Mohtashim Ali, a passionate frontend developer with expertise in React, Next.js, and Tailwind CSS. Discover his skills, experience, and projects in the world of web development.",
};
const PersonalInfo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default PersonalInfo;
