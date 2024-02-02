import React, { FC, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='flex-1'>
      {children}
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
