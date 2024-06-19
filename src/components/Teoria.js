import React from 'react';
import './Teoria.css';

const Teoria = () => {
    return (
        <div className="teoria-container">
            <h1>Teoría organizada etc...</h1>
            <p className=''>
            Boyer-Moore-Horspool es un algoritmo diseñado para buscar subcadenas en cadenas de texto, este algoritmo compara los caracteres de la subcadena con la cadena principal, si se encuentra una discrepancia, se emplea una tabla de coincidencias erróneas para determinar la longitud de un salto de múltiples caracteres, optimizando así el proceso de búsqueda.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe 
                    title="Video de YouTube"
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/WY-Jv1HKQdg" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style={{ maxWidth: '100%', margin: 'auto' }}
                ></iframe>
            </div>
            <h1>Contenido de información del algoritmo...</h1>
        </div>
    );
}

export default Teoria;