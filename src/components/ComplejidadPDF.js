import React from 'react';

const ComplejidadPDF = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'80vh', width: "100%"}}>
            <div style={{ width: '75%', height: '95%', border: '1px solid #ccc' }}>
                <iframe title="PDF Viewer" src={`${process.env.PUBLIC_URL}/pdfs/examen.pdf`} width="100%" height="100%" style={{ border: 'none' }}></iframe>
            </div>
        </div>
    );
}

export default ComplejidadPDF;
