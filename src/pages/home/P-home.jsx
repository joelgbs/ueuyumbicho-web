import '../../App.css';
import '../../css/footer.css';
import '../../css/div-portada.css';
import '../../css/div-gusano.css';
import '../../css/section-who.css';
import '../../css/noticias-content.css';
import React, { useState } from 'react';
import Slider from '../../components/C-Slider.jsx';
import NewsCard from '../../components/C-card-noticias.jsx';
import { OpinionForm, OpinionList }from '../../components/C-customer-reviews.jsx';
import Cnav from '../../components/C-nav.jsx';
import {NavMenuMobile, NavMenuMobileButton} from '../../components/C-nav-menu-mobile.jsx';




function Home() {
  
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
    <div className="App">
      {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
      <div className='sections'>
      <Cnav showMenu={showMenu} />
        <div className='div-portada'>
              <div className='imagen-portada'></div>
              <div className='capa-div'>
                <p>Bienvenido a la</p>
                <h1>Unidad Educativa Uyumbicho</h1>
                <p>Donde la excelencia educativa y el desarrollo integral de nuestros estudiantes son nuestra prioridad.</p>
                <div className="div-info">
                  <div className="info-caja">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
              <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>+1000 Estudiantes</span>
                  </div>
                  <div className="info-caja">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M7 22V12.3981C7 11.3299 7 10.7958 7.24458 10.3478C7.48915 9.89983 7.93842 9.61101 8.83697 9.03338L10.9185 7.69526C11.4437 7.35763 11.7063 7.18881 12 7.18881C12.2937 7.18881 12.5563 7.35763 13.0815 7.69526L15.163 9.03338C16.0616 9.61101 16.5108 9.89983 16.7554 10.3478C17 10.7958 17 11.3299 17 12.3981V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13H12.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 22V16.1623C21 13.8707 19.7408 13.6852 17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 22V16.1623C3 13.8707 4.25916 13.6852 7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 7V4.98221M12 4.98221V2.97035C12 2.49615 12 2.25905 12.1464 2.11173C12.6061 1.64939 14.5 2.74303 15.2203 3.18653C15.8285 3.56105 16 4.30914 16 4.98221H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>+60 años Educando</span>
                  </div>
                  <div className="info-caja">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>Uyumbicho, Ecuador</span>
                  </div>
                </div>
                <div className='info-caja'>
                  <a href='index.html'>Lee mas </a>
                </div>
              </div>
        </div>
      </div>
      <div className='section-who'>
        <div className='who-info'>
          <h3>¿Quienes Somos?</h3>
          <p>
          En la Unidad Educativa Uyumbicho, nos dedicamos a ofrecer una educación de calidad que fomente el desarrollo académico y personal de nuestros estudiantes. Con un equipo docente capacitado y un entorno inclusivo, promovemos la creatividad, el pensamiento crítico y el respeto por la diversidad. Nuestro objetivo es formar ciudadanos responsables y preparados para los desafíos del futuro.
          </p>
        </div>
        <div className='who-slider'>
            <Slider/>
        </div>
      </div>
      <div className='section-who div-ubi'>
      <div className='who-slider'>
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.725915038733!2d-78.52677576486181!3d-0.38995128822799563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a45eb61b07c1%3A0x400595c0a279e98b!2sColegio%20Nacional%20Uyumbicho!5e0!3m2!1ses!2sec!4v1716541222310!5m2!1ses!2sec"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
        </div>
        
        <div className='who-info'>
          <h3>¿Donde nos ubicamos?</h3>
          <p>Nuestra institución, la Unidad Educativa Uyumbicho, se encuentra ubicada en el corazón de la provincia de Pichincha, Ecuador. A 23 km al sur de Quito y a 15 km al norte de Machachi, nuestro campus ofrece un entorno ideal para el aprendizaje. El nombre "Uyumbicho" significa "Valle caliente donde danza el indio a su alrededor", reflejando nuestra conexión con la rica herencia cultural de la región. Formamos parte del cantón Mejía, en la provincia de Pichincha, junto con otras parroquias rurales, contribuyendo al desarrollo de nuestra comunidad y provincia.</p>

        </div>
      </div>
      <h2>Valores Fundamentales</h2>
      <div className='div-gusano'>
        <div className='g-part1'>
          <p><strong>Respeto Mutuo</strong></p>
          <span>Fomentamos un ambiente donde todos se sientan seguros para expresarse y aprender unos de otros.</span>
        </div>
        <div className='g-part2'>
          <p><strong>Responsabilidad Personal</strong></p>
          <span>Creemos que asumir la responsabilidad de nuestras acciones y contribuir positivamente a nuestra comunidad es esencial para el crecimiento personal.</span>
        </div>
        <div className='g-part3'>
        <p><strong>Inclusión y Equidad</strong></p>
        <span>Todos son bienvenidos y apoyados en su viaje de aprendizaje y crecimiento.</span>
        </div>
      </div>
      <div className='section-new'>
        <h3 className='noticias-content-title'>Noticias</h3>
        <div className='noticias-content'>
          <NewsCard />
          <NewsCard />
          <NewsCard />
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
