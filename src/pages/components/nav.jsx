import React from "react";
import '../styles/nav.css';
import Logoueu from '../assets/ueu.png';
import DesktopNavMenu from './nav-desktop';
import {NavMenuMobile, NavMenuMobileButton} from './nav-mobile';

export default function Cnav({ showMenu }) {
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


