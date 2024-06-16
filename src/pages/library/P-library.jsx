import React from 'react';
import './css/S-libreria.css';
import LogoLibreria from './assets/logo-libreria-removebg-preview.png';
import ImagenLibreria from './assets/Pair-programming.png';
import GrupoLibros from './components/C-grupo-libros';

function LibratyVen() {
    document.body.style.overflow = '';

    return (
        <div className='body-libreria'>
            <div className="seccion-principal">
                <nav className='nav-libreria'>
                    <img src={LogoLibreria} alt="Logo Libreria" />
                    <h1>Libreria</h1>
                </nav>
                <div className="informacion-principal">
                    <div className="contenedor-sides">
                        <h1>Bienvenido a nuestra Libreria</h1>
                        <p>Descubre una amplia selección de libros en nuestras secciones de ficción, no ficción, poesía y más.</p>
                        <button>Contribuir</button>
                    </div>
                    <div className="contenedor-sides-img">
                        <img src={ImagenLibreria} alt="Imagen Libreria" />
                    </div>
                </div>
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Romance</h1>
                <p>Descubre historias de amor apasionantes y emocionantes.</p>
                <GrupoLibros genero='romance' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros LGBTQ+</h1>
                <p>Explora obras que celebran la diversidad y la inclusión.</p>
                <GrupoLibros genero='lgbtq+' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Acción</h1>
                <p>Vive emocionantes aventuras llenas de adrenalina y suspenso.</p>
                <GrupoLibros genero='accion' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros Científicos</h1>
                <p>Sumérgete en el mundo de la ciencia y el conocimiento.</p>
                <GrupoLibros genero='cientifico' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Comedia</h1>
                <p>Diviértete con historias llenas de humor y risas.</p>
                <GrupoLibros genero='comedia' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros de Biografía</h1>
                <p>Conoce la vida y obra de personas inspiradoras.</p>
                <GrupoLibros genero='biografia' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Ensayo</h1>
                <p>Explora reflexiones y análisis profundos sobre diversos temas.</p>
                <GrupoLibros genero='ensayo' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros de Fantasía</h1>
                <p>Sumérgete en mundos mágicos llenos de criaturas y aventuras.</p>
                <GrupoLibros genero='fantasia' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Poesía</h1>
                <p>Disfruta de la belleza y el poder de la palabra poética.</p>
                <GrupoLibros genero='poesia' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros de Ciencia Ficción</h1>
                <p>Explora futuros alternativos y realidades imaginarias.</p>
                <GrupoLibros genero='ciencia_ficcion' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros de Drama</h1>
                <p>Sumérgete en historias llenas de emoción, conflicto y pasión.</p>
                <GrupoLibros genero='drama' />
            </div>
            <div className='Libros-por-genero Lg-2'>
                <h1>Libros de Filosofía</h1>
                <p>Explora las grandes preguntas y reflexiones sobre la existencia y el pensamiento humano.</p>
                <GrupoLibros genero='filosofia' />
            </div>
            <div className='Libros-por-genero Lg-1'>
                <h1>Libros Históricos</h1>
                <p>Descubre el pasado a través de relatos y análisis históricos.</p>
                <GrupoLibros genero='historico' />
            </div>
        </div>
    );
}

export default LibratyVen;
