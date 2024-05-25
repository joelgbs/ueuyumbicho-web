import '../css/customer-reviews.css';
import Carousel from './C-carrusel.jsx';
// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, off } from "firebase/database"; // Agrega onValue y off aquí

// Importa React y useState
import React, { useState, useEffect } from 'react';

// Define la configuración de Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Define la función OpinionForm
const OpinionForm = () => {
    // Estado para almacenar el valor del textarea
    const [opinion, setOpinion] = useState('');

    // Función para manejar el envío de la opinión
    const handleSendOpinion = async (event) => {
        event.preventDefault();
        try {
            // Obtén el valor del textarea
            const textareaValue = opinion.trim();
            
            // Verifica si el valor del textarea está vacío
            if (!textareaValue) {
                alert('Por favor, escribe tu opinión antes de enviar.');
                return;
            }

            // Inicia sesión con Google
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Obtiene los datos del usuario
            const fotoUsuario = user.photoURL;
            const nombreUsuario = user.displayName;
            const correoUsuario = user.email;

            // Obtiene la referencia a la base de datos
            const database = getDatabase();

            // Guarda la opinión en la base de datos
            const opinionesRef = ref(database, 'opiniones');
            const nuevaOpinionRef = push(opinionesRef);
            set(nuevaOpinionRef, {
                fotoUsuario,
                nombreUsuario,
                correoUsuario,
                testimonioUsuario: textareaValue
            });

            // Limpia el contenido del textarea
            setOpinion('');

            // Muestra un mensaje de éxito
            alert('¡Opinión enviada con éxito!');
        } catch (error) {
            console.error('Error al enviar la opinión:', error);
            alert('Hubo un error al enviar la opinión. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    // Función para manejar el cambio en el textarea
    const handleOpinionChange = (event) => {
        setOpinion(event.target.value);
    };

    // Renderiza el formulario de opinión
    return (
        <div className="input-opiniones">
            <h1>Escribe tu opinión sobre nuestra institución</h1>
            <form onSubmit={handleSendOpinion}>
                <textarea
                    name="txtaopinion"
                    placeholder="Escribe tu opinión aquí"
                    value={opinion}
                    onChange={handleOpinionChange}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};


const OpinionList = () => {
    const [opiniones, setOpiniones] = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const opinionesRef = ref(database, 'opiniones');
        
        // Escucha cambios en la base de datos
        onValue(opinionesRef, (snapshot) => {
            const opinionesData = snapshot.val();
            if (opinionesData) {
                const opinionesArray = Object.values(opinionesData);
                setOpiniones(opinionesArray);
            }
        });

        // Se detiene la escucha al desmontar el componente
        return () => {
            off(opinionesRef);
        };
    }, []);

    return (
        <Carousel>
            {opiniones.map((opinion, index) => (
                <OpinionCard
                    key={index}
                    fotoUsuario={opinion.fotoUsuario}
                    nombre={opinion.nombreUsuario}
                    testimonio={opinion.testimonioUsuario}
                />
            ))}
        </Carousel>
    );
};

function OpinionCard(props){
    return(
        <div className="opinion-card">
            {/* foto del usuario */}
            {props.fotoUsuario && <img src={props.fotoUsuario} alt="foto usuario" />}
            {/* nombre del usuario */}
            <h3>{props.nombre}</h3>
            {/* testimonio del usuario */}
            <p>"{props.testimonio}"</p>
        </div>
    );
}

export {OpinionForm, OpinionList};
