import React from "react";
import '../css/nav.css';
import Logoueu from '../assets/ueu.png';
import DesktopNavMenu from './C-nav-menu';
import {NavMenuMobile, NavMenuMobileButton} from './C-nav-menu-mobile.jsx';

function Cnav({ showMenu }) {
    return (
      <nav>
        <div className='nav-left'>
          <img src={Logoueu} alt='Logo' />
        </div>
        <div className="nav-right">
          <NavMenuMobileButton BotoOpenMenuFloat={showMenu} />
          <DesktopNavMenu />
        </div>
      </nav>
    );
  }

export default Cnav;
