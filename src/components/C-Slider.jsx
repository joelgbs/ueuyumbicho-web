import React, { useState, useEffect } from "react";
import '../css/slider.css'; 
import Foto1 from '../assets/colegio/foto-patio-1.jpg';
import Foto3 from '../assets/colegio/foto-estudiantes-2.jpeg';
import Foto4 from '../assets/colegio/foto-estudiantes-3.jpeg';
import Foto5 from '../assets/colegio/foto-estudiantes-4.jpeg';
import Foto6 from '../assets/colegio/bastoneras-ueu.jpg';
import Foto7 from '../assets/colegio/formacion-lunes.jpg';
import Foto8 from '../assets/colegio/foto-estudiantes.jpeg';
import Foto9 from '../assets/colegio/foto-bastoneras-1.jpg';
import Foto10 from '../assets/colegio/foto-patio-1.jpg';
import Fotoportada from '../assets/colegio/foto-patio-2.jpg';

function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [Foto1, Fotoportada, Foto3, Foto4, Foto5, Foto6, Foto7, Foto8, Foto9, Foto10];

    useEffect(() => {
        const btnLeft = document.querySelector(".btn-left");
        const btnRight = document.querySelector(".btn-right");
        const slider = document.querySelector("#slider");
        const sliderSections = document.querySelectorAll(".slider-section");

        let counter = 0;
        let operacion = 0;
        const widthImg = 100 / sliderSections.length;

        const moveToRight = () => {
            if (counter >= sliderSections.length - 1) {
                counter = 0;
                operacion = 0;
                slider.style.transform = `translate(-${operacion}%)`;
                slider.style.transition = "none";
                return;
            }
            counter++;
            operacion = operacion + widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        };

        const moveToLeft = () => {
            counter--;
            if (counter < 0) {
                counter = sliderSections.length - 1;
                operacion = widthImg * (sliderSections.length - 1);
                slider.style.transform = `translate(-${operacion}%)`;
                slider.style.transition = "none";
                return;
            }
            operacion = operacion - widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        };

        btnLeft.addEventListener("click", moveToLeft);
        btnRight.addEventListener("click", moveToRight);

        let intervalId;

        const startInterval = () => {
            intervalId = setInterval(moveToRight, 3000);
        };

        const stopInterval = () => {
            clearInterval(intervalId);
        };

        startInterval();

        return () => {
            btnLeft.removeEventListener("click", moveToLeft);
            btnRight.removeEventListener("click", moveToRight);
            stopInterval();
        };
    }, []);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <div className="container-carousel">
            <div className="carruseles" id="slider">
                {images.map((image, index) => (
                    <section key={index} className={`slider-section ${index === currentSlide ? 'active' : ''}`}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </section>
                ))}
            </div>
            <div className="btn-left" onClick={handlePrevSlide}><i className='bx bx-chevron-left'></i></div>
            <div className="btn-right" onClick={handleNextSlide}><i className='bx bx-chevron-right'></i></div>
        </div>
    );
}

export default Slider;
