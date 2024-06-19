import React, { useState } from 'react';
import './Simulador.css';

const Simulador = () => {
    const [subcadena, setSubcadena] = useState("");
    const [texto, setTexto] = useState("");
    const [resultado, setResultado] = useState("");

    function preproceso(subcadena) {
        const alfabeto = new Array(256);
        for (let i = 0; i < 256; i++) {
            alfabeto[i] = subcadena.length;
        }
        for (let i = 0; i < subcadena.length - 1; i++) {
            alfabeto[subcadena.charCodeAt(i)] = subcadena.length - 1 - i;
        }
        return alfabeto;
    }

    function buscar(subcadena, texto) {
        const alfabeto = preproceso(subcadena);
        let saltar = 0;
        const posiciones = [];

        while (texto.length - saltar >= subcadena.length) {
            let i = 0;
            while (i < subcadena.length && subcadena[i] === texto[saltar + i]) {
                i++;
            }
            if (i === subcadena.length) {
                posiciones.push(saltar); 
            }
            saltar += alfabeto[texto.charCodeAt(saltar + subcadena.length - 1)];
        }

        return posiciones;
    }

    const handleBuscar = (e) => {
        e.preventDefault(); 
        const posiciones = buscar(subcadena, texto);
        if (posiciones.length > 0) {
            setResultado(`La subcadena se encontró ${posiciones.length} veces en las posiciones: ${posiciones.join(", ")}`);
        } else {
            setResultado("La subcadena no se encontró en el texto.");
        }
    };

    return (
        <div className="simulador-container">
            <div className="row">
                <div className="col-lg-6">
                    <h2>Simulador de Código</h2>
                    <form className="form" onSubmit={handleBuscar}>
                        <div className="mb-3">
                            <label htmlFor="texto" className="form-label">Texto:</label>
                            <input id="texto" type="text" className="form-control" value={texto} onChange={(e) => setTexto(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subcadena" className="form-label">Subcadena:</label>
                            <input id="subcadena" type="text" className="form-control" value={subcadena} onChange={(e) => setSubcadena(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </form>
                    <label className="resultado">Resultado: {resultado}</label>
                </div>
                <div className="col-lg-6">
                    <pre className="pre-scrollable">
{`function preproceso(subcadena) {
    const alfabeto = new Array(256);
    for (let i = 0; i < 256; i++) {
        alfabeto[i] = subcadena.length;
    }
    for (let i = 0; i < subcadena.length - 1; i++) {
        alfabeto[subcadena.charCodeAt(i)] = subcadena.length - 1 - i;
    }
    return alfabeto;
}

function buscar(subcadena, texto) {
    const alfabeto = preproceso(subcadena);
    let saltar = 0;
    const posiciones = [];

    while (texto.length - saltar >= subcadena.length) {
        let i = 0;
        while (i < subcadena.length && subcadena[i] === texto[saltar + i]) {
            i++;
        }
        if (i === subcadena.length) {
            posiciones.push(saltar); // se encontró una coincidencia
        }
        saltar += alfabeto[texto.charCodeAt(saltar + subcadena.length - 1)];
    }

    return posiciones;
}

const subcadena = "adarme";
const texto = "adarmexadarmexadarme";
const posiciones = buscar(subcadena, texto);

if (posiciones.length > 0) {
    console.log("La subcadena se encontró " + posiciones.length + " veces en las posiciones: " + posiciones.join(", "));
} else {
    console.log("La subcadena no se encontró en el texto.");
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Simulador;