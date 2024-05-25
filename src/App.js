import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/P-home.jsx';
import EducacionInicial from './pages/Educative-offer/EducacionInicial.jsx';
import EducacionMedia from './pages/Educative-offer/BasicaElementalMedia.jsx';
import EducacionSuperior from './pages/Educative-offer/BasicaSuperior.jsx';
import Bgu from './pages/Educative-offer/BachilleratoGeneralUnificado.jsx';
import Btc from './pages/Educative-offer/BachilleratoTecnicoContabilidad.jsx';
import Bti from './pages/Educative-offer/BachilleratoTecnicoInformatica.jsx';
import About from './pages/About-us/P-About-us.jsx';
import Contact from './pages/Contact/P-Contact.jsx'
import MissionVision from './pages/Mission-vision/P-Mission-vision.jsx';
import Horarios from './pages/Schedules/P-Schedules.jsx';
import Reports from './pages/Reports/P-Reports.jsx';
import News from './pages/News/P-News.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/educacion-inicial" Component={EducacionInicial} />
        <Route path="/basica-elemental-media" Component={EducacionMedia} />
        <Route path="/basica-superior" Component={EducacionSuperior} />
        <Route path="/bachillerato-general-unificado" Component={Bgu} />
        <Route path="/bachillerato-tecnico-contabilidad" Component={Btc} />
        <Route path="/bachillerato-tecnico-informatica" Component={Bti} />
        <Route path="/quienes-somos" Component={About} />
        <Route path="/mision-vision" Component={MissionVision} />
        <Route path="/contactanos" Component={Contact} />
        <Route path="/horarios-clase" Component={Horarios} />
        <Route path="/reportes-academicos" Component={Reports} />
        <Route path="/noticias" Component={News} />
      </Routes>
    </Router>
  );
}

export default App;
