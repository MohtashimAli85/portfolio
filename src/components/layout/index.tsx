import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./header";
interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="border border-theme-stroke rounded-lg h-full flex flex-col justify-between bg-theme-background">
      <Header />
      <main className="flex-1 bg-primary">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
