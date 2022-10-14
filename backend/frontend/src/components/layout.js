import { Outlet } from 'react-router-dom';
import Nav from './nav';
import Nav3 from './nav3';
import Footer from "./footer";
import TopButton from "./topbutton";

function layout() {
  const moveToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <div>
      <Nav3 />
      <main>
        <Outlet>
          {/* <Outlet /> */}
        </Outlet>
      </main>
      <Footer />
      <TopButton />
      {/* <TopButton onClick={moveToTop} /> */}
    </div>
  );
};

export default layout;