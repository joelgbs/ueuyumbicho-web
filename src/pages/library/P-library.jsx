import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LibratyVen() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay un token almacenado en el almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al usuario a la ventana de inicio de sesión
            navigate('/login');
        }
    }, [navigate]);

    return (
        <h1>Bienvenido a la librería</h1>
    );
}

export default LibratyVen;
