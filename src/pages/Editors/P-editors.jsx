import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <h1>Página de Editores</h1>
    );
}

export default Editors;
