import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';
import Inicio from './pages/Inicio';
import Teachers from './pages/Teachers/P-teacher.jsx';
// import EducacionInicial from './pages/Educative-offer/P-EducacionInicial.jsx';
// import EducacionMedia from './pages/Educative-offer/P-BasicaElementalMedia.jsx';
// import EducacionSuperior from './pages/Educative-offer/P-BasicaSuperior.jsx';
// import Bgu from './pages/Educative-offer/P-BachilleratoGeneralUnificado.jsx';
// import Btc from './pages/Educative-offer/P-BachilleratoTecnicoContabilidad.jsx';
// import Bti from './pages/Educative-offer/P-BachilleratoTecnicoInformatica.jsx';
import About from './pages/quienes-somos.jsx';
import Contact from './pages/contacto';
import MissionVision from './pages/mision-y-vision.jsx';
import Horarios from './pages/Schedules/P-Schedules.jsx';
// import Reports from './pages/Reports/P-Reports.jsx';
import News from './pages/News/P-News.jsx';
import Admin from './pages/Administration/P-administration.jsx';
import Editors from './pages/Editors/P-editors.jsx';
import LoginPass from './pages/login.jsx';
import LibratyVen from './pages/library/P-library.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contactanos" Component={Contact} />
        <Route path="/Profesores" Component={Teachers} />
        <Route path="/quienes-somos" Component={About} />
        <Route path="/mision-vision" Component={MissionVision} />
        <Route path="/Editor" Component={Editors} />
        <Route path="/noticias" Component={News} />
        <Route path="/horarios-clase" Component={Horarios} />
        <Route path="/administracion" Component={Admin} />
        <Route path="/biblioteca" Component={LibratyVen}/> 
        <Route path="/login" Component={LoginPass}/>

      </Routes>
    </Router>
  );
}

export default App;
