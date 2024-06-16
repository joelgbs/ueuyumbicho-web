import React, { useState } from 'react';
import { NavMenuMobile } from '../components/nav-mobile.jsx';
import Cnav from '../components/nav.jsx';
import SectionTeachers from './C-sections-teachers.jsx';
import './css/S-teachers.css';

function Teachers() {
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(true);
    document.body.style.overflow = 'hidden'; // Deshabilita los scrolls en el body
  };

  const hideMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = ''; // Habilita los scrolls en el body
  };


  return (
    <div>
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <div className="section-page">
        <Cnav showMenu={showMenu} />
      </div>
      <div className="teacher-body">
        <h1 className='Tb-h1'>Conoce a nuestros Docentes</h1>
        <p className='Tb-p'>Conoce a nuestros talentosos profesores, dedicados a guiar tu aprendizaje con experiencia y amabilidad. Te invitamos a explorar un mundo de conocimiento junto a ellos.</p>
        <SectionTeachers area='Vicerrectorado'/>
        <SectionTeachers area='Inspeccion'/>
        <SectionTeachers area='Emprendimiento' />
        <SectionTeachers area='Artistica' />
        <SectionTeachers area='Ingles' />
        <SectionTeachers area='Estudios Sociales' />
        <SectionTeachers area='Ciencias naturales' />
        <SectionTeachers area='Matematicas' />
        <SectionTeachers area='Informatica' />
        <SectionTeachers area='Lenguaje' />
      </div>
    </div>
  );
}

export default Teachers;
