import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import React, { useEffect, useState } from 'react';
import { NavMenuMobile } from '../components/nav-mobile.jsx';
import Cnav from '../components/nav.jsx';
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
    document.body.style.overflow = 'hidden';
  };

  const hideMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const horariosRef = firebase.database().ref('horarios');

    // Escucha cambios en la base de datos solo una vez
    horariosRef.once('value')
      .then((snapshot) => {
        const horariosData = snapshot.val();
        if (horariosData) {
          const horariosArray = Object.keys(horariosData).map(key => ({
            id: key,
            ...horariosData[key]
          }));
          setHorarios(horariosArray.sort((a, b) => courseOrder.indexOf(a.curso) - courseOrder.indexOf(b.curso)));
        }
      })
      .catch(error => console.error("Error fetching horarios:", error));

    // Detener la escucha al desmontar el componente
    return () => horariosRef.off();
  }, []);

  return (
    <div>
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <Cnav showMenu={showMenu} />
      <div className="horarios-body">
        <h1 className='H-h1'>Horarios de Clases</h1>
        {horarios.map((horario) => (
          <CardHorarios
            key={horario.id}
            curso={horario.curso}
            alectivo={horario.añoLectivo}
            image={horario.image}
          />
        ))}
      </div>
    </div>
  );
}


export default Horarios;
