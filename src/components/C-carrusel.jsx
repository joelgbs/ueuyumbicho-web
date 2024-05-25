import React, { useState } from 'react';
import '../css/carrusel.css'; // Asegúrate de importar tus estilos CSS si es necesario

function Carousel({ children }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
    };

    return (
        <div className="carousel">
            <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {React.Children.map(children, (child, index) => (
                    <div key={index} className="carousel-slide">
                        {child}
                    </div>
                ))}
            </div>
            <button className="carousel-btn prev" onClick={goToPrevSlide}>&lt;</button>
            <button className="carousel-btn next" onClick={goToNextSlide}>&gt;</button>
        </div>
    );
}

export default Carousel;
