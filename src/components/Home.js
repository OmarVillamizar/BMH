import React, { useState } from 'react';
import Cards from './Cards';
import Simulador from './Simulador';
import ComplejidadPDF from './ComplejidadPDF';
import Teoria from './Teoria';
import hImage from './imgs/hsistemas.png';
import Footer from './Footer';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'simulador':
        return <Simulador />;
      case 'teoria':
        return <Teoria />;
      case 'complejidad':
        return <ComplejidadPDF />;
      default:
        return <Cards onSelect={setSelectedComponent} />;
    }
  };

  return (
    <div className="App">
      <header className="bg-home">
        <div className="header-content">
          <img src={hImage} id="headerImage" alt="Header Logo" />
          <h1 id="headerTitle">Algoritmo Boyer Moore Horspool</h1>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <button className="nav-link btn-link" onClick={() => setSelectedComponent('home')}>Home</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn-link" onClick={() => setSelectedComponent('simulador')}>Simulador</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn-link" onClick={() => setSelectedComponent('teoria')}>Teoría</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn-link" onClick={() => setSelectedComponent('complejidad')}>Complejidad</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {renderComponent()}
      </main>
      <Footer />
    </div>
  );
}