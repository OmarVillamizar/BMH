import React from 'react';
import simulator from './imgs/algorithm.jpg';
import info from './imgs/horspool.jpg';
import complexity from './imgs/pdf.png';
import './cards.css';

const cardsData = [
  {
    title: "Simulador de Código",
    description: "Herramienta interactiva para simular el algoritmo Boyer Moore Horspool y realizar pruebas.",
    imgSrc: simulator,
    component: 'simulador'
  },
  {
    title: "Teoría del Algoritmo",
    description: "Información detallada sobre el funcionamiento y el patrón del algoritmo, con un video explicativo.",
    imgSrc: info,
    component: 'teoria'
  },
  {
    title: "Complejidad",
    description: "PDF explicativo sobre la complejidad calculada T(n) del algoritmo utilizado para Boyer Moore Horspool",
    imgSrc: complexity,
    component: 'complejidad'
  }
];

export default function Cards({ onSelect }) {
  return (
    <div className='container d-flex justify-content-center h-100 align-items-center'>
      <div className='row'>
        {cardsData.map((card, index) => (
          <div key={index} className='col-md-4 mt-0'>
            <div className="card text-center bg-dark animate__animated animate__fadeInUp" onClick={() => onSelect(card.component)}>
              <div className='overflow'>
                <img src={card.imgSrc} alt={`Imagen de ${card.title}`} className='card-img-top' style={{ width: '100%', marginTop: '-16px' }} />
              </div>
              <div className="card-body text-light">
                <h4 className="card-title">{card.title}</h4>
                <p className='card-text text-secondary'>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}