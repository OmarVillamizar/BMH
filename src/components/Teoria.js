import React from 'react';
import './style.css';

const Teoria = () => {
    return (
        <div className="teoria-container">
            <h1 className="text-center">Boyer-Moore-Horspool</h1>
            <p className="lead">
                Boyer-Moore-Horspool es un algoritmo eficiente diseñado para buscar subcadenas en cadenas de texto. Este algoritmo compara los caracteres de la subcadena con la cadena principal y, si encuentra una discrepancia, utiliza una tabla de saltos para determinar la longitud de un salto de múltiples caracteres, optimizando así el proceso de búsqueda.
            </p>
            <h2 className="text-center">Video explicativo sobre Boyer Moore Horspool</h2>
            <div className="d-flex justify-content-center mb-4">
                <iframe 
                    title="Video de YouTube"
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/9Yqc0LytJMk?t=1" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    style={{ maxWidth: '100%' }}
                ></iframe>
            </div>
            <h2 className="text-center">Un poco más sobre BMH</h2>
            <p>
                El algoritmo Boyer-Moore-Horspool es una variante simplificada del algoritmo de Boyer-Moore, diseñado para buscar ocurrencias de una subcadena dentro de una cadena de texto. Funciona mediante la comparación de caracteres y el uso de una tabla de saltos (o tabla de coincidencias erróneas) que ayuda a determinar cuántos caracteres se pueden saltar en la cadena principal si hay una discrepancia en la comparación.
            </p>
            <p>
                Esta técnica de salto basada en la tabla de coincidencias erróneas permite optimizar la búsqueda al evitar comparaciones innecesarias, especialmente cuando la subcadena tiene caracteres que no coinciden con los de la cadena principal.
            </p>
            <h2 className="text-center">Artículos Interesantes</h2>
            <ul>
                <li>
                    <a href="https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/" target="_blank" rel="noopener noreferrer">Explicación del algoritmo Boyer-Moore-Horspool en GeeksforGeeks</a>: Este artículo proporciona una explicación clara y concisa del algoritmo BMH, incluyendo su funcionamiento, complejidad y aplicaciones.
                </li>
                <li>
                    <a href="https://www.encora.com/insights/the-boyer-moore-horspool-algorithm" target="_blank" rel="noopener noreferrer">Algoritmo Boyer-Moore-Horspool: Enfoque eficiente para la búsqueda de subcadenas en Encora</a>: Este artículo explica el algoritmo BMH en detalle, destacando sus ventajas sobre otros algoritmos de búsqueda de subcadenas y su implementación en Python.
                </li>
            </ul>
        </div>
    );
}

export default Teoria;
