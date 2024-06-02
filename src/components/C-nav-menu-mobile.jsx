import React, { useEffect } from "react";
import '../css/floating-menu.css';
import arrow from '../assets/arrow.svg'; // Asegúrate de que la ruta sea correcta
import {
    Home,
    Teachers,
    EducacionInicial,
    BasicaElementalMedia,
    BasicaSuperior,
    BachilleratoGeneralUnificado,
    BachilleratoTecnicoContabilidad,
    BachilleratoTecnicoInformatica,
    QuienesSomos,
    MisionVision,
    Contactanos,
    MatriculaAutomatica,
    CarmentaWeb,
    HorariosClase,
    ReportesAcademicos,
    Noticias,
    Libreria
} from './C-nav-menu-anchors.jsx';

function NavMenuMobile({ BotonExitmenufloat }) {
    useEffect(() => {
      // Obtener todos los elementos con la clase '.list__button--click'
      const listElements = document.querySelectorAll('.list__button--click');
  
      // Función para manejar el clic en un elemento de la lista
      const handleClick = (event) => {
        const listElement = event.currentTarget;
  
        // Alternar la clase 'arrow' en el elemento de la lista
        listElement.classList.toggle('arrow');
  
        // Obtener el menú siguiente al elemento de la lista
        const menu = listElement.nextElementSibling;
  
        // Verificar si el menú está cerrado
        if (menu.clientHeight === 0) {
          // Obtener la altura completa del menú
          const height = menu.scrollHeight;
          // Establecer la altura del menú para mostrarlo
          menu.style.height = `${height}px`;
        } else {
          // Si el menú está abierto, cerrarlo estableciendo su altura a cero
          menu.style.height = '0';
        }
      };
  
      // Iterar sobre cada elemento de la lista y agregar el event listener
      listElements.forEach(listElement => {
        listElement.addEventListener('click', handleClick);
      });
  
      // Cleanup function to remove event listeners
      return () => {
        listElements.forEach(listElement => {
          listElement.removeEventListener('click', handleClick);
        });
      };
    }, []);
  
    return (
      <div className='floating-menu-content' id="floating-menu-content">
        <div className='floating-menu'>
          <div className='div-exit'>
            <button onClick={BotonExitmenufloat}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000" fill="none">
                <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <ul className='list'>
            {/* home */}
            <li className='list__item'>
              <div className='list__button'>
                <Home />
              </div>
            </li>
            {/* profesores */}
            <li className='list__item'>
              <div className='list__button'>
                <Teachers />
              </div>
            </li>
            {/* Oferta Academica */}
            <li className='list__item list__item--click'>
              <div className='list__button list__button--click'>
                <span className='nav__link'>Oferta Academica</span>
                <img src={arrow} alt='arrow' className='list__arrow' />
              </div>
              <ul className='list__show'>
                <li className='list__inside'>
                  <EducacionInicial />
                </li>
                <li className='list__inside'>
                  <BasicaElementalMedia />
                </li>
                <li className='list__inside'>
                  <BasicaSuperior />
                </li>
                <li className='list__inside'>
                  <BachilleratoGeneralUnificado />
                </li>
                <li className='list__inside'>
                  <BachilleratoTecnicoContabilidad />
                </li>
                <li className='list__inside'>
                  <BachilleratoTecnicoInformatica />
                </li>
              </ul>
            </li>
  
            {/* Nosotros */}
            <li className='list__item list__item--click'>
              <div className='list__button list__button--click'>
                <span className='nav__link'>Institucion</span>
                <img src={arrow} alt='arrow' className='list__arrow' />
              </div>
              <ul className='list__show'>
                <li className='list__inside'>
                  <QuienesSomos />
                </li>
                <li className='list__inside'>
                  <MisionVision />
                </li>
                <li className='list__inside'>
                  <Contactanos />
                </li>
              </ul>
            </li>
  
            {/* Servicios */}
            <li className='list__item list__item--click'>
              <div className='list__button list__button--click'>
                <span className='nav__link'>Servicios</span>
                <img src={arrow} alt='arrow' className='list__arrow' />
              </div>
              <ul className='list__show'>
                <li className='list__inside'>
                  <MatriculaAutomatica />
                </li>
                <li className='list__inside'>
                  <CarmentaWeb />
                </li>
                <li className='list__inside'>
                  <HorariosClase />
                </li>
                {/* <li className='list__inside'>
                  <ReportesAcademicos />
                </li> */}
              </ul>
            </li>
  
            {/* Noticias */}
            <li className='list__item'>
              <div className='list__button'>
                <Noticias />
              </div>
            </li>
            {/* libreria */}
            <li className='list__item'>
              <div className='list__button'>
                <Libreria />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
function NavMenuMobileButton(props){
    return (
        <button onClick={props.BotoOpenMenuFloat} className='button-menu-float'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000" fill="none">
            <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}

export {NavMenuMobile, NavMenuMobileButton};