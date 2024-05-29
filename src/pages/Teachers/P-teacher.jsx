import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Cnav from '../../components/C-nav.jsx';
import { NavMenuMobile, NavMenuMobileButton } from '../../components/C-nav-menu-mobile.jsx';
import Minportada from '../../components/C-min-portada.jsx';
import fotoportada from '../../assets/colegio/foto-patio-1.jpg';
import CardTeacher from './C-card-teacher.jsx';
import './css/S-teachers.css';

function Teachers() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [docentes, setDocentes] = useState([]);

  const showMenu = () => {
    setMenuVisible(true);
    document.body.style.overflow = 'hidden'; // Deshabilita los scrolls en el body
  };

  const hideMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = ''; // Habilita los scrolls en el body
  };

  useEffect(() => {
    // Obtener los docentes de la base de datos al cargar el componente
    const docentesRef = firebase.database().ref('docentes');
    docentesRef.on('value', (snapshot) => {
      const docentesData = snapshot.val();
      if (docentesData) {
        const docentesArray = Object.entries(docentesData).map(([id, docente]) => ({ id, ...docente }));
        setDocentes(docentesArray);
      }
    });
    // Detener la escucha al desmontar el componente
    return () => docentesRef.off('value');
  }, []);

  return (
    <div>
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <div className="section-page">
        <Cnav showMenu={showMenu} />
        <Minportada
          imagen={fotoportada}
          titulo='Profesores'
        />
      </div>
      <div className="teacher-body">
        {/* Mapea los docentes y muestra un componente CardTeacher para cada uno */}
        {docentes.map((docente) => (
          <CardTeacher
            key={docente.id}
            imagen={docente.image}
            profesion={docente.profesion}
            nombre={docente.nombre}
            area={docente.area}
            descripcion={docente.descripcion}
          />
        ))}
      </div>
    </div>
  );
}

export default Teachers;
