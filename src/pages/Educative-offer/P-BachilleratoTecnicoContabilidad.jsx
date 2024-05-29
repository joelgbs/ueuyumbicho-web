import React, { useState } from 'react';
import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';
import Minportada from '../../components/C-min-portada.jsx';
import fotoportada from '../../assets/colegio/foto-patio-1.jpg';

function Btc(){
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
      <div>
        {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
        <div className="section-page">
        <Cnav showMenu={showMenu} />
        <Minportada
          imagen={fotoportada}
          titulo='Bachilletaro Tecnico Contabilidad'
        />
        </div>
      </div>
    );
}

export default Btc;