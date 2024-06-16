import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import React, { useState } from 'react';
import { NavMenuMobile } from './components/nav-mobile.jsx';
import Cnav from './components/nav.jsx';
import './styles/contacto.css';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAqbn4SXVYSO0f75VKu2WUSC7tLUN3_uYQ",
    authDomain: "uyumbichoweb.firebaseapp.com",
    databaseURL: "https://uyumbichoweb-default-rtdb.firebaseio.com",
    projectId: "uyumbichoweb",
    storageBucket: "uyumbichoweb.appspot.com",
    messagingSenderId: "294140970341",
    appId: "1:294140970341:web:685c6d36bb0a1feafdcd8c",
    measurementId: "G-CYDCB6288S"
};

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Contact() {
    document.body.style.overflow = '';
    const [menuVisible, setMenuVisible] = useState(false);
    const [consulta, setConsulta] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const showMenu = () => {
        setMenuVisible(true);
        document.body.style.overflow = 'hidden'; // Deshabilita los scrolls en el body
    };

    const hideMenu = () => {
        setMenuVisible(false);
        document.body.style.overflow = ''; // Habilita los scrolls en el body
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Guardar datos en Firebase
        firebase.database().ref('mensajes').push({
            consulta: consulta,
            nombre: nombre,
            email: email,
            telefono: telefono,
            fecha: new Date().toISOString(),
            visto: false
        }).then(() => {
            // Limpia el formulario después de enviar exitosamente
            setConsulta('');
            setNombre('');
            setEmail('');
            setTelefono('');
            alert('¡Tu consulta se ha enviado correctamente!');
        }).catch((error) => {
            console.error('Error al enviar la consulta:', error);
            alert('No se pudo enviar tu consulta, inténtalo más tarde.');
        });
    };

    return (
        <div>
            {menuVisible && <NavMenuMobile BotonExitmenufloat={hideMenu} />}
            <Cnav showMenu={showMenu} />
            <div className="contact-form">
                <h1 className='C-h1'>Contactanos</h1>
                <p className='C-p'>¡Nos encantaría saber de ti! Si tienes alguna pregunta, sugerencia o simplemente quieres saludar, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.</p>
    <form className='form-contact' onSubmit={handleSubmit}>
        <textarea
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder='Escribe aquí tu consulta'
            className='input-field'
        />
        <div className="box">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder='Nombre'
                className='input-field'
            />
        </div>
        <div className="box">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='input-field'
            />
        </div>
        <div className="box">
            <label htmlFor="telefono">Teléfono:</label>
            <input
                type="text"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder='Teléfono'
                className='input-field'
            />
        </div>
        <button type="submit" className='submit-btn'>Enviar</button>
    </form>
</div>

        </div>
    );
}

export default Contact;
