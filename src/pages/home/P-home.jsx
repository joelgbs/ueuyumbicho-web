import '../../App.css';
import './css/S-home.css'
import React, { useState,useRef } from 'react';
import Slider from '../../components/C-Slider.jsx';
import NewsCard from '../../components/C-card-noticias.jsx';
import { OpinionForm, OpinionList }from '../../components/C-customer-reviews.jsx';
import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';
import Card from './components/C-cards-home.jsx';
import imagen from './assets/foto-patio-1.jpg';
import Esuperior from './assets/foto-estudiantes-4.jpeg';
import Ebachillerato from './assets/foto-estudiantes.jpeg';
import Einicial from './assets/jardin.png';
import Ebasica from './assets/escuela.png';
function Home() {
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

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
      const container = containerRef.current;
      container.isDown = true;
      container.startX = e.pageX - container.offsetLeft;
      container.scrollLeft = container.scrollLeft;
  };

  const handleMouseLeave = () => {
      const container = containerRef.current;
      container.isDown = false;
  };

  const handleMouseUp = () => {
      const container = containerRef.current;
      container.isDown = false;
  };

  const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container.isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - container.startX) * 2; // Ajusta la velocidad de desplazamiento
      container.scrollLeft = container.scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
      const container = containerRef.current;
      container.isDown = true;
      container.startX = e.touches[0].pageX - container.offsetLeft;
      container.scrollLeft = container.scrollLeft;
  };

  const handleTouchEnd = () => {
      const container = containerRef.current;
      container.isDown = false;
  };

  const handleTouchMove = (e) => {
      const container = containerRef.current;
      if (!container.isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - container.startX) * 2; // Ajusta la velocidad de desplazamiento
      container.scrollLeft = container.scrollLeft - walk;
  };
  return (
    <div className="App">
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <Cnav showMenu={showMenu} />
      <div className='home-page-main'>
        <div className="Hpm-sides">
          <h1 className='Hpm-h1'>Bievenido a la Unidad Educativa Uyumbicho</h1>
          <span className='Hpm-span'>La Unidad Educativa Uyumbicho ofrece una educación de calidad en un entorno inspirador. Con un enfoque en valores, innovación y desarrollo integral, preparamos a nuestros estudiantes para un futuro prometedor. En Uyumbicho, cultivamos el pensamiento crítico, la creatividad y el respeto por el medio ambiente, brindando a cada estudiante la oportunidad de crecer y prosperar.</span>
        </div>
        <div className="Hpm-sides">
          <button className='Hpm-button-1'>Ofertas Academicas</button>
          <button className='Hpm-button-2'>Noticias</button>
        </div>
      </div>
      <div className="mision-vision-content">
        <div className="Mvc-imagen-content">
        <div className="Mvc-img"></div>
        </div>
        {/* <div className="Mvc-quienes-somos-content">
          <div className="card-quienes-somos">
          <h1 className='Mvc-h1'>¿Quienes somos?</h1>
              <p className="Mvc-p">La Unidad Educativa Uyumbicho es una institución comprometida con la excelencia académica y el desarrollo integral de sus estudiantes. En un entorno natural privilegiado, ofrecemos programas desde educación inicial hasta bachillerato, combinando conocimientos sólidos con valores éticos y habilidades sociales. Nuestros docentes altamente calificados fomentan un ambiente inclusivo y respetuoso, motivando a cada estudiante a alcanzar su máximo potencial y preparándolos para su futuro académico y profesional.</p>
          </div>
        </div> */}
        {/* <div className="Mvc-content">
            <div className="card-mision">
              <h1 className='Mvc-h1'>Mision</h1>
              <p className="Mvc-p">En la Unidad Educativa Uyumbicho, nuestra misión es proporcionar una educación integral y de calidad que fomente el desarrollo académico, personal y social de nuestros estudiantes. Nos comprometemos a cultivar un entorno inclusivo y estimulante donde cada alumno pueda alcanzar su máximo potencial, promoviendo valores de respeto, responsabilidad y excelencia.</p>
            </div>
            <div className="card-vision">
            <h1 className='Mvc-h1'>Vision</h1>
              <p className="Mvc-p">Nuestra visión es ser una institución educativa líder, reconocida por su innovación pedagógica y su compromiso con la formación de ciudadanos competentes y éticos. Aspiramos a preparar a nuestros estudiantes para los desafíos del futuro, inspirándolos a ser agentes de cambio positivo en sus comunidades y en el mundo.</p>
            </div>
        </div> */}
      </div>
      <div className="ofertas-academicas-content">
        <h1 className='h1-Oac'>Conoce nuestras Ofertas Academicas</h1>
        <p className='P-Oac'>La Unidad Educativa Uyumbicho brinda una amplia variedad de programas académicos diseñados para satisfacer las necesidades e intereses individuales de nuestros estudiantes.</p>
        <div className="Oac-content">
          <div 
            className="oac-card-content"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={containerRef}
          >
          <Card
            imagen={Einicial}
            title='Educacion Inicial'
            info='Nuestro programa para los más pequeños establece bases sólidas para un futuro brillante.'
            link='/educacion-inicial'
          />
          <Card
            imagen={Ebasica}
            title='Educacion Basica'
            info='Fomentamos la curiosidad y el desarrollo integral de cada estudiante.'
            link='/basica-elemental-media'
          />
          <Card
            imagen={Esuperior}
            title='Educacion Superior'
            info='Preparamos a nuestros estudiantes para desafíos académicos y profesionales futuros.'
            link='/basica-superior'
          />
          <Card
            imagen={Ebachillerato}
            title='Bachillerato'
            info='Guiamos a los jóvenes hacia la excelencia académica y la exploración de sus intereses.'
            link='/bachillerato-general-unificado'
          />
          </div>
        </div>
      </div>
      <div className='div-opiniones'>
        <OpinionForm/>
        <div className='content-sliders-a'>
        <OpinionList/>
        </div>
      </div>
      <footer>
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p>© 2024 Unidad Educativa Uyumbicho. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
}

export default Home;
