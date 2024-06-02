import React, { useState } from 'react';import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';
import './S-quienes-somos.css';

function About(){
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
            <div className="card-quienes-somos">
                <h1 className='Mvc-h1'>¿Quiénes somos?</h1>
                <p className="Mvc-p">La Unidad Educativa Uyumbicho es una institución comprometida con la excelencia académica y el desarrollo integral de sus estudiantes. Ubicados en un entorno natural privilegiado, ofrecemos programas desde educación inicial hasta bachillerato, fusionando conocimientos sólidos con valores éticos y habilidades sociales. Nuestros docentes altamente calificados promueven un ambiente inclusivo y respetuoso, motivando a cada estudiante a alcanzar su máximo potencial y preparándolos para su futuro académico y profesional.</p>
            </div>

        </div>
    );
}

export default About;