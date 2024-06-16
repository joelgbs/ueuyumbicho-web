import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import React, { useEffect, useState } from 'react';
import { NavMenuMobile } from '../components/nav-mobile.jsx';
import Cnav from '../components/nav.jsx';
import Cnews from './compents/C-news-card.jsx';
import './css/S-news.css';

// Función para capitalizar la primera letra de una cadena
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function News() {
  document.body.style.overflow = '';
  const [menuVisible, setMenuVisible] = useState(false);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const noticiasRef = firebase.database().ref('noticias');
    // Escuchar cambios en la base de datos en tiempo real
    noticiasRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const noticiasArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          // Formatear la fecha de publicación sin la hora y con el formato deseado
          fechaPublicacion: capitalizeFirstLetter(new Date(value.fechaPublicacion).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }))
        }));
        // Invertir el orden de las noticias
        setNoticias(noticiasArray.reverse());
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => noticiasRef.off();
  }, []);

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
      <Cnav showMenu={showMenu} />
      <div className="news-content">
        {/* Iterar sobre las noticias cargadas desde Firebase */}
        {noticias.map((noticia) => (
          <Cnews
            key={noticia.id}
            title={noticia.title}
            fechaPublicacion={noticia.fechaPublicacion}
            imagen={noticia.images}
            contenido={noticia.content}
          />
        ))}
      </div>
    </div>
  );
}

export default News;
