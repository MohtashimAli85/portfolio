import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="border border-divider rounded-lg h-full flex flex-col justify-between bg-primary">
      <Header />
      <main className="flex-1 bg-primary">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
