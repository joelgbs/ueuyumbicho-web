import React, { useEffect, useState } from 'react';
import inspector from './assets/PersonalDocente/Rectorado/Leonardo Batson.JPG';
import vicerector from './assets/PersonalDocente/Rectorado/Samuel Loachamin.JPG';
import rector from './assets/usuario-icon.jpeg';
import Carousel from './components/carrusel';
import GrupoLibros from './components/libros-all';
import Cnav from './components/nav';
import { NavMenuMobile } from './components/nav-mobile';
import { OpinionForm, OpinionList } from './components/opiniones';
import './styles/Inicio.css';
import niñoconlibro from './assets/ilustraciones 3d/3d-business-boy-reading-a-book.png';
import niñoestudiando from './assets/ilustraciones 3d/3d-business-boy-studying-online.png';
import grupodechicos from './assets/ilustraciones 3d/3d-casual-life-colleagues-discussing-team-project-1.png';
import chicaconlibro from './assets/ilustraciones 3d/3d-casual-life-girl-with-books-and-backpack-2.png';
import chicoinfo from './assets/ilustraciones 3d/3d-business-man-wearing-vr-glasses-at-his-desk.png';
import ciencias from './assets/ilustraciones 3d/smart-ar-education-with-a-molecular-model.png';
import formacionLunes from './assets/formacion-lunes.jpg';
import fotoBastoneras1 from './assets/foto-bastoneras-1.jpg';
import fotoEstudiantes3 from './assets/foto-estudiantes-3.jpeg';
import fotoEstudiantes4 from './assets/foto-estudiantes-4.jpeg';
import fotoPatio1 from './assets/foto-patio-1.jpg';

export default function Inicio(){
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
  
  // Función para desplazar hacia abajo 100vh
  const scrollDown = () => {
    // Obtener la posición actual de desplazamiento vertical
    const currentPosition = window.scrollY;

    // Calcular la posición a la que se desea desplazar (100vh más abajo)
    const targetPosition = currentPosition + window.innerHeight;

    // Desplazar suavemente hacia la posición deseada
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'  // Opcional: animación de desplazamiento suave
    });
  };

  const images = [formacionLunes, fotoBastoneras1, fotoEstudiantes3, fotoEstudiantes4, fotoPatio1];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);
  
  return(
    <div className="inicio-body">
      <header className='animate__animated animate__pulse inicio-header' style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}>
        {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
        <div className="nav-content">
          <Cnav showMenu={showMenu} />
        </div>
        <h3 className='animate__animated animate__bounce'>UNIDAD EDUCATIVA</h3>
        <h1 className='animate__animated animate__bounce'>UYUMBICHO</h1>
        <span className='animate__animated animate__bounce'>¡Bienvenidos al sitio web de la Unidad Educativa Uyumbicho! Nos alegra tenerlos aquí. Exploren nuestras actividades y programas, y descubran cómo juntos construimos un futuro mejor para nuestros estudiantes.</span>
        <div className="opciones">
          <button onClick={scrollDown}>Conoce mas</button>
          <a href="/noticias">Noticias</a>
        </div>
      </header>
      <div className="inicio-sections">
        <div className="oferta-academica-content">
          <h1 className='animate__animated animate__headShake'>Oferta Academica</h1>
          <div className="card-content-ofer-acad">

            <div className="card-oferta-academica">
              <img src={niñoconlibro} alt="" />
              <div className="card-info-oferta-academica">
              <h1>Educacion Inicial</h1>
              <span>La educación inicial es el primer nivel del sistema educativo y está dirigida a niños y niñas de entre 3 y 5 años. Su objetivo principal es fomentar el desarrollo integral de los niños a través de actividades lúdicas y educativas que promuevan sus habilidades cognitivas, sociales, emocionales y físicas.</span>
              </div>
            </div>

            <div className="card-oferta-academica">
              <div className="card-info-oferta-academica">
              <h1>Educación Básica</h1>
              <span>La educación básica comprende desde el primer hasta el décimo año de educación general básica y está destinada a niños y adolescentes de 6 a 15 años. Su objetivo es proporcionar una formación integral que incluya conocimientos básicos en áreas como matemáticas, ciencias, lengua y literatura, y estudios sociales.</span>
              </div>
              <img src={niñoestudiando} alt="" />
            </div>

            <div className="card-oferta-academica">
            <img src={grupodechicos} alt="" />
            <div className="card-info-oferta-academica">
            <h1>Educación Superior</h1>
            <span>La educación superior abarca desde el primero hasta el tercer año de bachillerato y está destinada a adolescentes de 16 a 18 años. Aquí se brinda una formación más especializada que prepara a los estudiantes para la educación terciaria y para el mundo laboral.</span>
            </div>
            </div>

            <div className="card-oferta-academica">
              <div className="card-info-oferta-academica">
              <h1>Bachillerato General Unificado</h1>
              <span>El Bachillerato General Unificado (BGU) es una modalidad de bachillerato que ofrece una formación general con una orientación hacia las ciencias, las humanidades y las artes, preparando a los estudiantes para continuar sus estudios en la educación superior o para incorporarse al mercado laboral.</span>
              </div>
              <img src={ciencias} alt="" />
            </div>

            <div className="card-oferta-academica">
            <img src={chicaconlibro} alt="" />
            <div className="card-info-oferta-academica">
            <h1>Bachillerato en Contabilidad</h1>
            <span>El bachillerato en contabilidad se enfoca en formar a los estudiantes en los principios y prácticas de la contabilidad, la administración y las finanzas, preparándolos para trabajar en el sector empresarial o para continuar estudios superiores en estas áreas.</span>
            </div>
            </div>

            <div className="card-oferta-academica">
              <div className="card-info-oferta-academica">
              <h1>Bachillerato en Informática</h1>
              <span>El bachillerato en informática prepara a los estudiantes en el campo de la tecnología de la información, incluyendo la programación, el desarrollo de software, y el manejo de hardware y redes.</span>
              </div>
              <img src={chicoinfo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="inicio-sections">
        <div className="biblioteca-content">
          <div className="biblioteca-sides">
            <h1>Biblioteca</h1>
            <span>
              Explora nuestra extensa colección de libros y encuentra esa obra que te transportará a mundos desconocidos, te hará reflexionar sobre la vida o te enseñará algo nuevo cada vez que lo leas.
            </span>
            <a href="/biblioteca">Explora mas</a>
          </div>
          <div className="biblioteca-sides ">
            <div className="libros-all-content">
            <Carousel>
            <GrupoLibros/>
            </Carousel>
            </div>
          </div>
        </div>
      </div>
        <div className="inicio-sections">
          <div className="directiva-content">
            <h1 >Directiva</h1>
            <span>Estos líderes comprometidos son la piedra angular de nuestra institución, guiando con valores y dedicación hacia la excelencia educativa y el crecimiento personal de cada miembro de nuestra comunidad escolar.</span>
            <div className="card-group">
              <div className="card">
                <img src={rector} alt="" />
                <div className="layer"></div>
                <div className="info">
                  <h1>Rector</h1>
                  <p>Ronaldo Nacimba</p>
                </div>
              </div>
              <div className="card">
                <img src={vicerector} alt="" />
                <div className="layer"></div>
                <div className="info">
                  <h1>Vicerector</h1>
                  <p>Samuel Loachamin</p>
                </div>
              </div>
              <div className="card">
                <img src={inspector} alt="" />
                <div className="layer"></div>
                <div className="info">
                  <h1>Inspector General</h1>
                  <p>Leonardo Batson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inicio-sections">
          <div className='div-opiniones'>
            <OpinionForm/>
            <div className='opiniones-slider'>
              <OpinionList/>
            </div>
          </div>
        </div>
        <footer>
            <span>© 2024 Unidad Educativa Uyumbicho. Todos los derechos reservados.</span>
          </footer>
    </div>
  );
}