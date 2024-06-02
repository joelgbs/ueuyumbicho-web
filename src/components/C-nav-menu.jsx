import React from 'react';
import { Mn, MnOption, MnOptionSubmenu } from '../components/C-MenuOptions.jsx';
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

const DesktopNavMenu = () => {
  return (
    <div className='menu-horizontal'>
      <Mn menuClass='menu'>
      <MnOption><Home/></MnOption>
      {/* profesores */}
      <MnOption> <Teachers/> </MnOption>
        {/* Oferta Educativa */}
        <MnOptionSubmenu anchorName='Oferta Académica'>
          <Mn menuClass='submenu'>
            <MnOption> <EducacionInicial/> </MnOption>
            <MnOption> <BasicaElementalMedia/> </MnOption>
            <MnOption> <BasicaSuperior/> </MnOption>
            {/* Bachillerato */}
            <MnOptionSubmenu anchorName='Bachillerato >'>
              <Mn menuClass='submenu'>
              <MnOption> <BachilleratoGeneralUnificado/> </MnOption>
              <MnOption> <BachilleratoTecnicoContabilidad/> </MnOption>
              <MnOption> <BachilleratoTecnicoInformatica/> </MnOption>
              </Mn>
            </MnOptionSubmenu>
          </Mn>
        </MnOptionSubmenu>
        
        {/* Nosotros -institucion */}
        <MnOptionSubmenu anchorName='Institución'>
          <Mn menuClass='submenu'>
          <MnOption> <QuienesSomos/> </MnOption>
          <MnOption> <MisionVision/> </MnOption>
          <MnOption> <Contactanos/> </MnOption>
          </Mn>
        </MnOptionSubmenu>

        {/* Servicios */}
        <MnOptionSubmenu anchorName='Servicios'>
          <Mn menuClass='submenu'>
          <MnOption> <MatriculaAutomatica/> </MnOption>
          <MnOption> <CarmentaWeb/> </MnOption>
          <MnOption> <HorariosClase/> </MnOption>
          {/* <MnOption> <ReportesAcademicos/> </MnOption> */}
          </Mn>
        </MnOptionSubmenu>

        {/* Noticias */}
        <MnOption> <Noticias/> </MnOption>
        <MnOption> <Libreria/> </MnOption>
      </Mn>
    </div>
  );
};



export default DesktopNavMenu;