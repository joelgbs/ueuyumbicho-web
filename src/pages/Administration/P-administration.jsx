import React, { useState, useEffect } from 'react';
import './css/S-administration.css';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../P-error.jsx';
import { Adocentes, Tabladocentes } from './P-adm-Docentes.jsx';
import { Ahorarios, Tablahorarios } from './P-adm-horarios.jsx';
import Aopiniones from './P-adm-Opiniones.jsx';
import {AformUsuarios, AtableUsuarios} from './P-adm-usuarios.jsx';
import MensajesTable from './P-adm-contactanos.jsx';

function Admin() {
    document.body.style.overflow = '';
    const [visibleSection, setVisibleSection] = useState('docentes');
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        checkScreenSize(); // Check on initial render
        window.addEventListener('resize', checkScreenSize); // Check on window resize

        // Verificar si hay un token almacenado en el almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al usuario a la ventana de inicio de sesión
            navigate('/login');
        }

        return () => {
            window.removeEventListener('resize', checkScreenSize); // Cleanup listener on unmount
        };
    }, [navigate]);

    const handleMenuClick = (section) => {
        setVisibleSection(section);
    };

    if (isMobile) {
        return (
            <ErrorPage
                color='#000'
                mensajeError="Lo sentimos, esta página no está disponible para dispositivos móviles. Por favor, accede desde una computadora."
            />
        );
    }


    return (
        <div className='body-administracion'>
            <div className="administration-main">
                <nav>
                    {/* menu lateral */}
                    <ul className='list-admin'>
                        <li onClick={() => handleMenuClick('docentes')}>
                            <span>Gestión de Docentes</span>
                        </li>
                        <li onClick={() => handleMenuClick('horarios')}>
                            <span>Horarios de Clases</span>
                        </li>
                        <li onClick={() => handleMenuClick('reportes')}>
                            <span>Reportes de Estudiantes</span>
                        </li>
                        <li onClick={() => handleMenuClick('noticias')}>
                            <span>Noticias</span>
                        </li>
                        <li onClick={() => handleMenuClick('opiniones')}>
                            <span>Opiniones</span>
                        </li>
                        <li onClick={() => handleMenuClick('mensajes')}>
                            <span>Mensajes Directos</span>
                        </li>
                        <li onClick={() => handleMenuClick('admin')}>
                            <span>Usuarios Admin</span>
                        </li>
                        <li onClick={() => handleMenuClick('estudiantes')}>
                            <span>Usuarios Estudiantes</span>
                        </li>
                        <li onClick={() => handleMenuClick('periodismo')}>
                            <span>Usuarios C. Periodismo</span>
                        </li>
                    </ul>
                </nav>
                <div className="sections-content">
                    <div className={`content-docentes ${visibleSection === 'docentes' ? 'visible' : 'hidden'}`}>
                        <Adocentes />
                        <Tabladocentes />
                    </div>
                    <div className={`content-horarios ${visibleSection === 'horarios' ? 'visible' : 'hidden'}`}>
                        <Ahorarios />
                        <Tablahorarios />
                    </div>
                    <div className={`content-reportes ${visibleSection === 'reportes' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de reportes */}
                        <h1>reportes</h1>
                    </div>
                    <div className={`content-noticias ${visibleSection === 'noticias' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de noticias */}
                        <h1>noticias</h1>
                    </div>
                    <div className={`content-opiniones ${visibleSection === 'opiniones' ? 'visible' : 'hidden'}`}>
                        <Aopiniones />
                    </div>
                    <div className={`content-mensajes ${visibleSection === 'mensajes' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de mensajes directos */}
                        <h1>mensajes</h1>
                        <MensajesTable/>
                    </div>
                    <div className={`usuarios-admin ${visibleSection === 'admin' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de usuarios admin */}
                        <h1>Administracion</h1>
                        <AformUsuarios
                            seccionformulario='administracion'
                        />
                        <AtableUsuarios
                            seccionformulario='administracion'
                        />
                    </div>
                    <div className={`usuarios-estudiantes ${visibleSection === 'estudiantes' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de usuarios estudiantes */}
                        <h1>Estudiantes</h1>
                        <AformUsuarios
                            seccionformulario='estudiantes'
                        />
                        <AtableUsuarios
                            seccionformulario='estudiantes'
                        />
                    </div>
                    <div className={`usuarios-periodismo ${visibleSection === 'periodismo' ? 'visible' : 'hidden'}`}>
                        {/* Contenido de usuarios c. periodismo */}
                        <h1>Periodismo</h1>
                        <AformUsuarios
                            seccionformulario='periodismo'
                        />
                        <AtableUsuarios
                            seccionformulario='periodismo'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
