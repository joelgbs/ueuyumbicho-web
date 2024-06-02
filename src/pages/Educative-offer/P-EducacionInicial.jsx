import React, { useState } from 'react';
import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';



function EducacionInicial(){
  document.body.style.overflow = '';
  const [menuVisible, setMenuVisible] = useState(false);
  const showMenu = () => {
    setMenuVisible(true);
    document.body.style.overflow = 'hidden'; // Deshabilita los scrolls en el body
  };
  const hideMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = ''; // Habilita los scrolls en el body
  };
    return(
      <div className="Einicial">
        {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
        <div className="section-page">
        <Cnav showMenu={showMenu} />
        </div>
      </div>
    );
}

export default EducacionInicial;