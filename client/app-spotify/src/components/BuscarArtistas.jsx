import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listaDeArtistas.css';
import li_search from '../assets/li_search.svg';
import li_arrow_left from '../assets/li_arrow_left.svg';
import './buscarArtistas.css';

function BuscarArtistas({ setMostrarBuscarArtistas }) {
    const [linkArtista, setLinkArtista] = useState('');
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        const artistasSalvos = JSON.parse(window.localStorage.getItem('artistasSpotify')) || [];
        setArtistas(artistasSalvos);
    }, []);

    const getToken = async () => {
        try {
            const response = await axios.get("http://localhost:3000/token");
            const token = response.data;
            window.localStorage.setItem('tokenSpotify', token);
            return token.token;
        } catch (error) {
            console.log('Erro ao obter o token:', error);
            return null;
        }
    };

    const extrairIdDoArtista = (url) => {
        const regex = /\/artist\/([a-zA-Z0-9]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const buscarArtistaNoSpotify = async () => {
        const tokenSpotify = await getToken();

        if (!tokenSpotify) {
            console.error('Token inválido ou não obtido.');
            return;
        }

        const idArtista = extrairIdDoArtista(linkArtista);

        if (!idArtista) {
            alert('ID do artista não encontrado no link.');
            return;
        }

        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${idArtista}`, {
                headers: {
                    'Authorization': `Bearer ${tokenSpotify}`
                }
            });
            const artista = response.data;

            const novosArtistas = [...artistas, artista];
            setArtistas(novosArtistas);
            window.localStorage.setItem('artistasSpotify', JSON.stringify(novosArtistas));

            setLinkArtista('');

        } catch (error) {
            alert('Erro ao buscar artista:', error);
        }
    };

    const limparLista = () => {
        window.localStorage.removeItem('artistasSpotify');
        setArtistas([]);
    };

    return (
        <div className="container">
            <div className="botoes-container" style={{ marginBottom: "2rem", display: "flex", alignItems: 'flex-start' }}>
                <figure style={{ display: "flex", justifyContent: 'center', alignItems: "center", cursor:"pointer" }} onClick={() => { setMostrarBuscarArtistas(prev => !prev) }}>
                    <img src={li_arrow_left} style={{ marginRight: "0.5rem", marginLeft: "1.5rem" }} />
                    <p>Back</p>
                </figure>
                <div style={{ width: "100%", display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div className="input-container">
                        <img style={{ width: '20px', height: "20px", marginLeft: "1rem" }} src={li_search} alt="ícone de busca" />
                        <input
                            type='text'
                            value={linkArtista}
                            onChange={(event) => setLinkArtista(event.target.value)}
                            placeholder='Cole o link do artista aqui'
                            className="input-artista"
                        />
                    </div>
                    <button onClick={buscarArtistaNoSpotify} style={{ marginLeft: '0', marginRight: "1rem" }} className="botao">Buscar Artista</button>


                </div>

            </div>


            <div>
                <h2 style={{marginLeft:'1.5rem'}}>Seus artistas</h2>
                <table className="tabela">
                    <thead>
                        <tr className="cabecalho-tabela">
                            <th className="cabecalho-centralizado">Imagem</th>
                            <th className="cabecalho-centralizado">Nome</th>
                            <th className="cabecalho-centralizado">Seguidores</th>
                            <th className="cabecalho-centralizado">Popularidade</th>
                            <th className="cabecalho-centralizado">Gêneros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artistas.length > 0 ? (
                            artistas.map((artista, index) => (
                                <tr key={index}>
                                    <td className="celula-centralizada">
                                        <img
                                            src={artista.images[0]?.url}
                                            alt={artista.name}
                                            className="imagem-artista"
                                        />
                                    </td>
                                    <td className="celula-centralizada">{artista.name}</td>
                                    <td className="celula-centralizada">
                                        {artista.followers.total.toLocaleString()}
                                    </td>
                                    <td className="celula-centralizada">{artista.popularity}</td>
                                    <td className="celula-centralizada">
                                        {artista.genres.slice(0, 3).join(', ')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="celula-centralizada">
                                    Nenhum artista encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick={limparLista} className="botao" style={{ marginRight: "1.5rem" }}>Limpar</button>
            </div>
        </div>
    );
}

export default BuscarArtistas;
