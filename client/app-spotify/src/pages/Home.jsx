import React, { useContext, useEffect } from 'react'
import { OptionContext } from '../contexts/Option'
import './home.css';

function Home() {
    const { setSelectedOption } = useContext(OptionContext);
    useEffect(() => {
        setSelectedOption("home");
    }, [])
    return (
        <div style={{ display: 'flex', overflowX:'hidden', position:'relative' }}>
            <section style={{width:'100%', height:'50px',display: 'flex', justifyContent: "center", textAlign:"center", position:"absolute", marginTop:"1rem" }}>
                <h1 className='title-home'>.Monks Tune</h1>
            </section>
            <section style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', flexDirection: 'column' }}>

                <article style={{ display: "flex", width: "100%", justifyContent: "flex-start", marginLeft:"4rem" }}>
                    <p className="gradient2" style={{ width: '30%', textAlign: 'center', backgroundColor: '#1E1E1E',  borderRadius: '8px', marginBottom: "1rem" }}>.Monks Tune é uma aplicação desenvolvida para o time de Social Media da Monks, projetada para otimizar o processo de análise de impacto de músicas famosas no engajamento dos posts dos clientes. Através da integração com a base de dados do Spotify.</p>
                </article>
                <article style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginRight:"4rem" }} >
                    <p className="gradient2" style={{ width: '30%', textAlign: 'center', backgroundColor: '#1E1E1E',  borderRadius: '8px', marginBottom: "1rem" }}>
                        O .Monks Tune extrai informações detalhadas de artistas pré-selecionados e gera rankings inteligentes, ordenando artistas do gênero "pop" por número de seguidores e identificando os gêneros mais comuns entre os artistas analisados. Este app foi criado para facilitar a tomada de decisões estratégicas, economizando tempo e aumentando a eficiência da equipe.
                    </p>
                </article>

            </section>

        </div>
    )
}

export default Home