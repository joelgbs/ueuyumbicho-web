import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import Cnav from '../../components/C-nav.jsx';
import { NavMenuMobile, NavMenuMobileButton } from '../../components/C-nav-menu-mobile.jsx';
import Minportada from '../../components/C-min-portada.jsx';
import fotoportada from '../../assets/colegio/foto-patio-1.jpg';
import './css/S-contact.css';

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
            <div className="section-page">
                <Cnav showMenu={showMenu} />
                <Minportada
                    imagen={fotoportada}
                    titulo='Contactanos'
                />
            </div>
            <div className="contact-form">
                <form className='form-contact' onSubmit={handleSubmit}>
                    <textarea
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        placeholder='Escribe aqui tu consulta'
                    />
                    <div className="box">
                        <label htmlFor="">Nombre completo: </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder='Name'
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="">Correo Electronico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="">Telefono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder='091 111 111'
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
