import React from 'react';
import { Mn, MnOption, MnOptionSubmenu } from './opciones-del-menu.jsx';
import {
  BachilleratoGeneralUnificado,
  BachilleratoTecnicoContabilidad,
  BachilleratoTecnicoInformatica,
  BasicaElementalMedia,
  BasicaSuperior,
  CarmentaWeb,
  Contactanos,
  EducacionInicial,
  Home,
  HorariosClase,
  Libreria,
  MatriculaAutomatica,
  MisionVision,
  Noticias,
  QuienesSomos,
  Teachers
} from './direcciones-del-nav.jsx';

const DesktopNavMenu = () => {
  return (
    <div className='menu-horizontal'>
      <Mn menuClass='menu'>
        <MnOption><Home /></MnOption>
        <MnOption><Teachers /></MnOption>
        {/* <MnOptionSubmenu anchorName='Oferta Académica'>
          <Mn menuClass='submenu'>
            <MnOption><EducacionInicial /></MnOption>
            <MnOption><BasicaElementalMedia /></MnOption>
            <MnOption><BasicaSuperior /></MnOption>
            <MnOptionSubmenu anchorName='Bachillerato >'>
              <Mn menuClass='submenu'>
                <MnOption><BachilleratoGeneralUnificado /></MnOption>
                <MnOption><BachilleratoTecnicoContabilidad /></MnOption>
                <MnOption><BachilleratoTecnicoInformatica /></MnOption>
              </Mn>
            </MnOptionSubmenu>
          </Mn>
        </MnOptionSubmenu> */}
        <MnOptionSubmenu anchorName='Institución'>
          <Mn menuClass='submenu'>
            <MnOption><QuienesSomos /></MnOption>
            <MnOption><MisionVision /></MnOption>
            <MnOption><Contactanos /></MnOption>
          </Mn>
        </MnOptionSubmenu>
        <MnOptionSubmenu anchorName='Servicios'>
          <Mn menuClass='submenu'>
            <MnOption><MatriculaAutomatica /></MnOption>
            <MnOption><CarmentaWeb /></MnOption>
            <MnOption><HorariosClase /></MnOption>
          </Mn>
        </MnOptionSubmenu>
        <MnOption><Noticias /></MnOption>
        <MnOption><Libreria /></MnOption>
      </Mn>
    </div>
  );
};

export default DesktopNavMenu;
