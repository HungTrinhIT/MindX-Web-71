import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SiteLayout = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1280px] m-[0_auto] padding-[2rem] py-8'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
