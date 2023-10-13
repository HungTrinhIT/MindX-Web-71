import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const SiteLayout = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] m-[0_auto] p-[24px] md:p-[2rem] min-h-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
