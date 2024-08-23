import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ListaDeArtistas from '../components/ListaDeArtistas';
import { OptionContext } from '../contexts/Option';

function Artistas() {
    const [artistas, setArtistas] = useState([]);
    const [generosComuns, setGenerosComuns] = useState([]);
    const { setSelectedOption } = useContext(OptionContext)

    const obterListaArtistas = () => {
        axios.post('http://localhost:3000/process-artists')
            .then((response) => {
                setArtistas(response.data.ordenacaoArtistas);
                setGenerosComuns(response.data.generosComuns);
            })
            .catch((error) => {
                console.error('Erro ao obter dados:', error.response ? error.response.data : error.message);
            });
    };
    useEffect(() => {
        obterListaArtistas();
        setSelectedOption('artistas');
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ListaDeArtistas
                artistas={artistas}
                generosComuns={generosComuns} />
        </div>
    );
}

export default Artistas;
