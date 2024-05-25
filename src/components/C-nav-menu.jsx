import React from 'react';
import { Mn, MnOption, MnOptionSubmenu } from '../components/C-MenuOptions.jsx';
import {
    Home,
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
  } from './C-nav-menu-anchors.jsx';

const DesktopNavMenu = () => {
  return (
    <div className='menu-horizontal'>
      <Mn menuClass='menu'>
      <MnOption><Home/></MnOption>
        {/* Oferta Educativa */}
        <MnOptionSubmenu anchorName='Oferta Educativa'>
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
        
        {/* Nosotros */}
        <MnOptionSubmenu anchorName='Nosotros'>
          <Mn menuClass='submenu'>
          <MnOption> <QuienesSomos/> </MnOption>
          <MnOption> <MisionVision/> </MnOption>
          </Mn>
        </MnOptionSubmenu>

        {/* Servicios */}
        <MnOptionSubmenu anchorName='Servicios'>
          <Mn menuClass='submenu'>
          <MnOption> <MatriculaAutomatica/> </MnOption>
          <MnOption> <CarmentaWeb/> </MnOption>
          </Mn>
        </MnOptionSubmenu>

        {/* Estudiantes */}
        <MnOptionSubmenu anchorName='Estudiantes'>
          <Mn menuClass='submenu'>
          <MnOption> <HorariosClase/> </MnOption>
          <MnOption> <ReportesAcademicos/> </MnOption>
          </Mn>
        </MnOptionSubmenu>

        {/* Noticias y Contacto */}
        <MnOption> <Noticias/> </MnOption>
        <MnOption> <Contactanos/> </MnOption>
      </Mn>
    </div>
  );
};



export default DesktopNavMenu;