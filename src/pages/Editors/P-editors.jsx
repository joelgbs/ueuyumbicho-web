import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicarNoticia from './components/C-form-editors';
import CardNews from './components/C-card-news';

function Editors(){
    document.body.style.overflow = '';
    const navigate = useNavigate();

    useEffect(() => {
        // Recoger el token almacenado en el almacenamiento local del navegador
        const token = localStorage.getItem('token');

        // Verificar si hay un token almacenado
        if (!token) {
            // Si no hay token, redirigir al usuario a la ventana de inicio de sesión
            navigate('/login');
        }
    }, [navigate]);

    return(
        <div>
            <PublicarNoticia/>
            <CardNews/>
        </div>
    );
}

export default Editors;
