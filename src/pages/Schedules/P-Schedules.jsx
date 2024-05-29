import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Cnav from '../../components/C-nav.jsx';
import { NavMenuMobile, NavMenuMobileButton } from '../../components/C-nav-menu-mobile.jsx';
import Minportada from '../../components/C-min-portada.jsx';
import fotoportada from '../../assets/colegio/foto-patio-1.jpg';
import CardHorarios from './C-card-horarios';
import './css/S-horarios.css';

const courseOrder = [
  "1ro EGB A", "1ro EGB B", "2do EGB A", "2do EGB B",
  "3ro EGB A", "3ro EGB B", "4to EGB A", "4to EGB B",
  "5to EGB A", "5to EGB B", "6to EGB A", "6to EGB B",
  "7mo EGB A", "7mo EGB B", "8vo EGB A", "8vo EGB B",
  "8vo EGB C", "8vo EGB D", "9no EGB A", "9no EGB B",
  "9no EGB C", "9no EGB D", "10mo EGB A", "10mo EGB B",
  "10mo EGB C", "10mo EGB D", "1ro BGU A", "1ro BGU B",
  "1ro BGU C", "1ro INFO A", "1ro CONTA A", "2do BGU A",
  "2do BGU B", "2do BGU C", "2do INFO A", "2do CONTA A",
  "3ro BGU A", "3ro BGU B", "3ro BGU C", "3ro INFO A",
  "3ro CONTA A"
];

function Horarios() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const showMenu = () => {
    setMenuVisible(true);
    document.body.style.overflow = 'hidden'; // Deshabilita los scrolls en el body
  };

  const hideMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = ''; // Habilita los scrolls en el body
  };

  useEffect(() => {
    const horariosRef = firebase.database().ref('horarios');

    // Escucha cambios en la base de datos
    horariosRef.on('child_added', (snapshot) => {
      const horarioData = snapshot.val();
      const newHorario = { id: snapshot.key, ...horarioData };
      setHorarios((prevHorarios) => {
        const updatedHorarios = [...prevHorarios, newHorario];
        return updatedHorarios.sort((a, b) => courseOrder.indexOf(a.curso) - courseOrder.indexOf(b.curso));
      });
    });

    // Detener la escucha al desmontar el componente
    return () => horariosRef.off('child_added');
  }, []);

  return (
    <div>
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <div className="section-page">
        <Cnav showMenu={showMenu} />
        <Minportada
          imagen={fotoportada}
          titulo='Horarios'
        />
      </div>
      <div className="horarios-body">
        {horarios.map((horario) => (
          <CardHorarios
            // key={horario.id}
            // curso={horario.curso}
            // alectivo={horario.alectivo}
            image={horario.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Horarios;
