import React, { useState } from 'react';
import BuscarArtistas from './BuscarArtistas';
import li_search from '../assets/li_search.svg';
import './listaDeArtistas.css';

function ListaDeArtistas({ artistas, generosComuns }) {
    const [mostrarBuscarArtistas, setMostrarBuscarArtistas] = useState(false);
    const [busca, setBusca] = useState('');

    const handleButtonClick = () => {
        setMostrarBuscarArtistas(!mostrarBuscarArtistas);
    };

    const handleChange = (e) => {
        setBusca(e.target.value);
    };

    const artistasFiltrados = (Array.isArray(artistas) ? artistas : [])
        .map((artista, index) => ({ ...artista, originalIndex: index }))
        .filter((artista) =>
            artista.name.toLowerCase().includes(busca.toLowerCase())
        );

    return (
        <div className="container">
            {<header className="header">
                <h1>Artistas</h1>
                <p>Explore nossos artistas!</p>
            </header>}

            <div className="botoes-container">
                {!mostrarBuscarArtistas && <button onClick={handleButtonClick} className="botao">
                    <span>{'Mais artistas'}</span>
                </button>}
                {!mostrarBuscarArtistas && (
                    <div className="input-container">
                        <img className='img-icon' src={li_search} alt="ícone de busca" />
                        <input
                            type="text"
                            placeholder="Buscar artista..."
                            value={busca}
                            onChange={handleChange}
                            className="input-artista"
                        />
                    </div>
                )}
            </div>

            {mostrarBuscarArtistas ? (
                <BuscarArtistas setMostrarBuscarArtistas={setMostrarBuscarArtistas} />
            ) : (
                <>
                    <table className="tabela">
                        <thead>
                            <tr className="cabecalho-tabela">
                                <th className="cabecalho-centralizado">Ranking</th>
                                <th className="cabecalho-centralizado">Imagem</th>
                                <th className="cabecalho-centralizado">Nome</th>
                                <th className="cabecalho-centralizado">Seguidores</th>
                                <th className="cabecalho-centralizado">Popularidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artistasFiltrados.length > 0 ? (
                                artistasFiltrados.map((artista) => (
                                    <tr key={artista.originalIndex}>
                                        <td className="celula-centralizada">{artista.originalIndex + 1}</td>
                                        <td className="celula-centralizada">
                                            {artista.imageUrl ? (
                                                <img
                                                    src={artista.imageUrl}
                                                    alt={artista.name}
                                                    className="imagem-artista"
                                                />
                                            ) : (
                                                <p>Sem imagem</p>
                                            )}
                                        </td>
                                        <td className="celula-centralizada">{artista.name}</td>
                                        <td className="celula-centralizada">
                                            {artista.followers.toLocaleString()}
                                        </td>
                                        <td className="celula-centralizada">{artista.popularity}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="mensagem-nenhum-artista">Nenhum artista encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <table className="tabela">
                        <thead>
                            <tr className="cabecalho-tabela">
                                <th className="cabecalho-centralizado">Ranking</th>
                                <th className="cabecalho-centralizado">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(generosComuns) && generosComuns.length > 0 ? (
                                generosComuns.map((genero, index) => (
                                    <tr key={index}>
                                        <td className="celula-centralizada">{index+1}</td>
                                        <td className="celula-centralizada">{genero}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="mensagem-nenhum-artista">Nenhum gênero encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default ListaDeArtistas;
