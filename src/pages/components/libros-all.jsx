import React, { useEffect, useState } from "react";
import '../styles/grupo-libros.css';
import LibroCard from './card-libro';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function GrupoLibros() {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const librosRef = ref(db, 'libros');
        onValue(librosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const librosArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Invertir el orden de los libros y eliminar duplicados
                const uniqueLibros = Array.from(new Set(librosArray.map(libro => libro.id))).map(id => {
                    return librosArray.find(libro => libro.id === id);
                });
                setLibros(uniqueLibros.reverse());
            } else {
                setLibros([]);
            }
        });
    }, []);

    const abrirPDF = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="slider-libros">
            {libros.map((libro) => (
                <LibroCard
                    key={libro.id}
                    imagen={libro.portadaURL}
                    titulo={libro.titulo}
                    autor={libro.autor}
                    onClick={() => abrirPDF(libro.archivoURL)}
                />
            ))}
        </div>
    );
}

export default GrupoLibros;
