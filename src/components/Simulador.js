import React, { useState, useRef, useEffect } from 'react';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './Simulador.css';

const Simulador = () => {
    const [subcadena, setSubcadena] = useState("");
    const [texto, setTexto] = useState("");
    const [resultado, setResultado] = useState("");
    const [pasosCodigoSt, setPasosCodigoSt] = useState("");
    const [linea, setLinea] = useState(0);
    const [pasoActual, setPasoActual] = useState({ linea: 0, desc: "‎", color:[], colorSalto:-1});
    const lineRefs = useRef([]);
    const [valoresSaltos, setValoresSaltos] = useState([]);
    const [valorSubcadena, setValorSubcadena] = useState([]);
    const [valorTexto, setValorTexto] = useState([]);

    useEffect(() => {
        scroll();
    }, [linea]);

    const preproceso = (pasosCodigo) => {
        let valores = []
        pasosCodigo.push({ linea: 1, desc: `Empezamos con la creación de la tabla de saltos.` });
        let tablaDeSaltos = new Array(256).fill(subcadena.length);
        pasosCodigo.push({ linea: 2, desc: `Inicializamos el array con todos los posibles ASCII.` });

        pasosCodigo.push({ linea: 4, desc: `Se realiza un ciclo que llena cada posicion con la longitud del patron, es decir, establecemos para cada carácter la longitud máxima de salto.` });
        for (let i = 0; i < subcadena.length - 1; ++i) {
            tablaDeSaltos[subcadena.charCodeAt(i)] = subcadena.length - 1 - i;
            valores.push(subcadena.length - 1 - i);
        }
        valores.push(subcadena.length);
        valores.push(subcadena.length);
        setValoresSaltos(valores);
        setValorSubcadena(subcadena);
        setValorTexto([...texto]);
        pasosCodigo.push({ linea: 8, desc: `Se realiza un ciclo en el cual se crea la tabla de saltos, dandole un valor de salto a cada carácter perteneciente a la subcadena mediante la ecuación m-i-1.` });
        pasosCodigo.push({ linea: 12, desc: `Retornamos la tabla de salto con los valores correspondientes.` });
        return tablaDeSaltos;
    };

    const buscar = (pasosCodigo) => {
        pasosCodigo.push({ linea: 15, desc: `Se llama al metodo principal de BMH pasando los parámetros de subcadena y texto.` });
        pasosCodigo.push({ linea: 16, desc: `Se crea una lista de posiciones en donde se retornaran las posiciones del texto en donde se ha encontrado la subcadena.` });
        const posiciones = [];
        pasosCodigo.push({ linea: 18, desc: `Se valida que la subcadena a buscar no este vacía.` });
        if (subcadena.length <= 0){
            pasosCodigo.push({ linea: 19, desc: `En este caso es una subcadena vacía, por lo tanto retornamos 0 posiciones.` });
            return posiciones;
        }
        pasosCodigo.push({ linea: 22, desc: `Se invoca la creación de la tabla de saltos para la subcadena.` });
        const tablaDeSaltos = preproceso(pasosCodigo);
        pasosCodigo.push({ linea: 22, desc: `Se guarda la tabla de saltos creada en la variable tablaDeSaltos.` });
        let color = []
        pasosCodigo.push({ linea: 24, desc: `Se inicia un bucle para recorrer el texto, validando que queden suficientes carácteres restantes como para hallar la subcadena, es decir : "${subcadena.length}".` });
        pasosCodigo.push({ linea: 24, desc: `"i" sera la posición actual que estamos analizando en el texto, la cual estará afectada por los saltos realizados.` });
        pasosCodigo.push({ linea: 25, desc: `Este bucle se usará para comparar la subcadena dentro del texto.` });
        let posicion = 0;
        for (let posicion = 0; posicion <= texto.length - subcadena.length;) {
            for (let j = subcadena.length - 1;; --j) {
                pasosCodigo.push({ linea: 26, desc: `Pregunta si el carácter de la subcadena "${subcadena[j]}" coincide con "${texto[posicion+j]}" del texto.` ,color: [...color], colorSalto:posicion+j});
                if (subcadena[j] !== texto[posicion + j]) {
                    
                    pasosCodigo.push({ linea: 27, desc: `Como no coinciden, se obtiene el valor del carácter actual analizado en el texto, es decir : "${texto[posicion + j]}".`,color: [...color], colorSalto:posicion+j});
                    const caracterActual = texto.charCodeAt(posicion + subcadena.length - 1);
                    pasosCodigo.push({ linea: 28, desc: `Se calcula el valor de salto correspondiente a la discrepancia de carácteres.`,color: [...color], colorSalto:posicion+j});
                    const valorSalto = (caracterActual < tablaDeSaltos.length) ? tablaDeSaltos[caracterActual] : subcadena.length;
                    pasosCodigo.push({ linea: 29, desc: `Se desplaza el índice de búsqueda "i" con la longitud de salto correspondiente carácter "${texto[posicion + j]}", es decir  ${valorSalto} .`,color: [...color], colorSalto:posicion+j});
                    posicion += valorSalto;
                    pasosCodigo.push({ linea: 30, desc: `Se rompe el bucle interno de búsqueda y continuamos.`,color: [...color], colorSalto:posicion+j});
                    break;
                }
                color.push(posicion+j)
                pasosCodigo.push({ linea: 33, desc: `Pregunta si ya se ha encontrado toda la subcadena en el texto.`,color: [...color], colorSalto:posicion+j});
                if (j === 0) {
                    posiciones.push(posicion);
                    pasosCodigo.push({ linea: 34, desc: `Se ha encontrado toda la subcadena en el texto, por lo tanto se guarda la posición encontrada en el arreglo de posiciones.`,color: [...color], colorSalto:-1});
                    posicion += subcadena.length;
                    pasosCodigo.push({ linea: 35, desc: `Se realiza el salto máximo en la tabla de saltos, correspondiente a ${subcadena.length}.` ,color: [...color], colorSalto:-1});
                    pasosCodigo.push({ linea: 36, desc: `Se rompe este ciclo interno y se sigue buscando en el texto.`,color: [...color], colorSalto:-1});
                    break;
                }
            }
        }
        pasosCodigo.push({ linea: 41, desc: `Se retorna el array con las posiciones en las que hemos encontrado la subcadena dentro del texto .`,color: [...color], colorSalto:posicion });
        pasosCodigo.push({ linea: 41, desc: `Se ha aplicado el algoritmo de string matching Boyer Moore Horspool correctamente .` ,color: [...color], colorSalto:posicion});
        return posiciones;
    };

    const handleBuscar = (e) => {
        e.preventDefault();
        var pasosCodigo_ = [];
        const posiciones = buscar(pasosCodigo_);
        setPasosCodigoSt(pasosCodigo_);
        setPasoActual(pasosCodigo_[0]);
        setLinea(0);
        if (posiciones.length > 0) {
            setResultado(`La subcadena se encontró ${posiciones.length} veces en las posiciones: ${posiciones.join(", ")}`);
        } else {
            setResultado("La subcadena no se encontró en el texto.");
        }
    };

    const undoStep = () => {
        if (linea > 0 && pasosCodigoSt.length > 0) {
            setPasoActual(pasosCodigoSt[linea - 1]);
            setLinea(linea - 1);
        }
    };

    const nextStep = () => {
        if (linea < pasosCodigoSt.length - 1 && pasosCodigoSt.length > 0) {
            setPasoActual(pasosCodigoSt[linea + 1]);
            setLinea(linea + 1);
        }
    };

    const scroll = () => {
        if (lineRefs.current[pasoActual.linea]) {
            lineRefs.current[pasoActual.linea].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const codigo = `public static int[] preproceso(String subCadena) {
    int[] tablaDeSaltos = new int[256];

    for (int i = 0; i < tablaDeSaltos.length; i++) {
        tablaDeSaltos[i] = subCadena.length();
    }

    for (int i = 0; i < subCadena.length() - 1; ++i) {
        tablaDeSaltos[subCadena.charAt(i)] = subCadena.length() - 1 - i;
    }

    return tablaDeSaltos;
}

public static List<Integer> BoyerMooreHorspool(String subCadena, String texto) {
    List<Integer> posiciones = new ArrayList<>();

    if (subCadena.length() <= 0){
        return posiciones;
    }

    int[] tablaDeSaltos = preproceso(subCadena);

    for (int i = 0; i <= texto.length() - subCadena.length();) {
        for (int j = subCadena.length() - 1;; --j) {
            if (subCadena.charAt(j) != texto.charAt(i + j)) {
                int caracterActual = texto.charAt(i + subCadena.length() - 1);
                int valorSalto = (caracterActual < tablaDeSaltos.length) ? tablaDeSaltos[caracterActual] : subCadena.length();
                i += valorSalto;
                break;
            }

            if (j == 0) {
                posiciones.add(i);
                i += subCadena.length();
                break;
            }
        }
    }

    return posiciones;
}`;

    return (
        <div className="simulador-container">
            <div className="simulador-left">
                <h2>Introduce los valores:</h2>
                <div className="mb-3">
                    <label htmlFor="texto" className="simulador-label">Texto:</label>
                    <input id="texto" type="text" className="simulador-input" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="subcadena" className="simulador-label">Subcadena:</label>
                    <input id="subcadena" type="text" className="simulador-input" value={subcadena} onChange={(e) => setSubcadena(e.target.value)} />
                </div>
                <button onClick={handleBuscar} type="submit" className="btn btn-primary">Buscar</button>
                <div className="simulador-right">
                    <h4 id="explicacion-titulo">Explicación :</h4>
                    <p>{pasoActual.desc}</p>
                </div>
        
            </div>
            <div className="simulador-center overflow-auto">
                <h2 className='tituloJava'>Implementación de Boyer-Moore-Horspool en Java</h2>
                <button onClick={undoStep} className="btn btn-secondary" id="btnD">Anterior</button>
                <button onClick={nextStep} className="btn btn-secondary" id="btnI">Siguiente</button>
                <SyntaxHighlighter className="w-[90%]" wrapLines language="java" style={darcula} showLineNumbers lineProps={(lineNumber) => {
                    const prop = { style: { display: "block", width: "100%" }, ref: (el) => (lineRefs.current[lineNumber] = el) };
                    if (pasoActual.linea === lineNumber) {
                        prop.style.backgroundColor = "#545252";
                    }
                    return prop;
                }}>
                    {codigo}
                </SyntaxHighlighter>
            </div>
            <div className="simulador-right">
                 <h2>Resultado: </h2>
                <label>{resultado}</label>
                <div className='divTablas'>
                <h4 id="Tsaltos">Búsqueda en el texto: </h4>
                <table className='tablaArrays'>
                    <tbody>
                    <tr>    
                            {valorTexto.map((el,i) => {
                               return <td className='tdd' bgcolor={pasoActual.color && pasoActual.color.includes(i) ? "red" : pasoActual.colorSalto && pasoActual.colorSalto === i ? "blue" : ""}>{el}</td>
                            })}
                    </tr>
                    </tbody>
                </table>
                </div>
                <h4 id="Tsaltos">Tabla de Saltos: </h4>
                <div className='divTablas'>
                <table className='tablaArrays'>
                    <tbody>
                    <tr>
                            {[...valorSubcadena].map(el => {
                                return <td className='tdd'>{el}</td>
                            })}
                            {valorSubcadena.length === 0 ? null && valorTexto.length === 0:<td className='tdd'>
                                #
                            </td>}
                    </tr>
                        <tr>
                            {valoresSaltos.map(el => {
                                return <td className='tdd'>{el}</td>
                            })}
                        </tr>
                    </tbody>
                </table>
                </div>

            </div>
        </div>
    );
};

export default Simulador;
