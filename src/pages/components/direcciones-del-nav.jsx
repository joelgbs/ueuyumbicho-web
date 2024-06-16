import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  return (
    <a onClick={handleClick} className='nav__link'>Inicio</a>
  );
}


function EducacionInicial() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/educacion-inicial');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Educación Inicial</a>
  );
}

function BasicaElementalMedia() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/basica-elemental-media');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Básica, Elemental y Media</a>
  );
}

function BasicaSuperior() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/basica-superior');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Básica Superior</a>
  );
}

function Teachers() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/Profesores');
  return (
    <a onClick={handleClick} className='nav__link'>Profesores</a>
  );
}

function BachilleratoGeneralUnificado() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/bachillerato-general-unificado');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Bachillerato General Unificado</a>
  );
}

function BachilleratoTecnicoContabilidad() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/bachillerato-tecnico-contabilidad');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Bachillerato Técnico Contabilidad</a>
  );
}

function BachilleratoTecnicoInformatica() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/bachillerato-tecnico-informatica');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Bachillerato Técnico Informática</a>
  );
}

function QuienesSomos() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/quienes-somos');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>¿Quiénes somos?</a>
  );
}

function MisionVision() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/mision-vision');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Misión y Visión</a>
  );
}

function Contactanos() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/contactanos');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Contáctanos</a>
  );
}

function MatriculaAutomatica() {
  return (
    <a href='https://juntos.educacion.gob.ec/index.php/costa-consulta/consulta' className='nav__link nav__link--inside'>Matrícula Automática</a>
  );
}

function CarmentaWeb() {
  return (
    <a href='https://academico.educarecuador.gob.ec/carmenta-web/' className='nav__link nav__link--inside'>Carmenta Web</a>
  );
}

function HorariosClase() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/horarios-clase');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Horarios de Clase</a>
  );
}

function ReportesAcademicos() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/reportes-academicos');
  return (
    <a onClick={handleClick} className='nav__link nav__link--inside'>Reportes Académicos</a>
  );
}

function Noticias() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/noticias');
  return (
    <a onClick={handleClick} className='nav__link'>Noticias</a>
  );
}
function Libreria() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/biblioteca');
  return (
    <a onClick={handleClick} className='nav__link'>Biblioteca</a>
  );
}

export {
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
};
