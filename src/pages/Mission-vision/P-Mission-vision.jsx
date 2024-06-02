import React, { useState } from 'react';import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';
import './S-mision-vision.css';

function MissionVision(){
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
            <Cnav showMenu={showMenu} />
            <h1 className='h1-MV'>Misión y Visión</h1>
            <p className='p-MV'>En la Unidad Educativa Uyumbicho, brindamos educación integral y de calidad, fomentando el desarrollo académico, personal y social de nuestros estudiantes en un entorno inclusivo. Nos esforzamos por ser líderes en innovación pedagógica y formar ciudadanos competentes y éticos para el futuro.</p>

            <div className="Mvc-content">
              <div className="card-mision">
                  <h1 className='Mvc-h1'>Misión</h1>
                  <p className="Mvc-p">En la Unidad Educativa Uyumbicho, nos dedicamos a brindar una educación integral y de calidad que promueva el desarrollo académico, personal y social de nuestros estudiantes. Nuestro compromiso es crear un entorno inclusivo y estimulante donde cada alumno pueda alcanzar su máximo potencial, impulsando valores de respeto, responsabilidad y excelencia.</p>
              </div>
              <div className="card-vision">
                  <h1 className='Mvc-h1'>Visión</h1>
                  <p className="Mvc-p">Buscamos ser una institución educativa líder, reconocida por su innovación pedagógica y su compromiso con la formación de ciudadanos competentes y éticos. Aspiramos a preparar a nuestros estudiantes para los desafíos del futuro, inspirándolos a convertirse en agentes de cambio positivo en sus comunidades y en el mundo.</p>
              </div>
          </div>
        </div>
    );
}

export default MissionVision;