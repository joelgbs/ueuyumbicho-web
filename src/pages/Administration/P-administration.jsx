import React from 'react';
import './css/S-administration.css'
import ErrorPage from '../P-error.jsx';
import { Adocentes, Tabladocentes } from './P-adm-Docentes.jsx'
function Admin(){
    return(
        <div className='body-administracion'>
            {/* <ErrorPage
                color='#000'
                mensajeError="Lo sentimos, esta página no está disponible para dispositivos móviles. Por favor, accede desde una computadora."
            /> */}
            <div className="administration-main">
                <nav>
                <ul className='list-admin'>
                    <li>
                        <a href="docentes.html">Gestión de Docentes</a>
                    </li>
                    <li>
                        <a href="horarios.html">Horarios de Clases</a>
                    </li>
                    <li>
                        <a href="reportes_estudiantes.html">Reportes de Estudiantes</a>
                    </li>
                    <li>
                        <a href="noticias.html">Noticias</a>
                    </li>
                    <li>
                        <a href="opiniones.html">Opiniones</a>
                    </li>
                    <li>
                        <a href="mensajes_directos.html">Mensajes Directos</a>
                    </li>
                    <li>
                        <a href="usuarios_admin.html">Usuarios Admin</a>
                    </li>
                    <li>
                        <a href="usuarios_estudiantes.html">Usuarios Estudiantes</a>
                    </li>
                    <li>
                        <a href="usuarios_periodismo.html">Usuarios C. Periodismo</a>
                    </li>
                </ul>

                </nav>
                <div className="sections-content">
                    <Adocentes/>
                    <Tabladocentes/>
                </div>
            </div>
        </div>
    );
}

export default Admin;