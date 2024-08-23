const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const artistIds = {
    "Ed Sheeran": "6eUKZXaKkcviH0Ku9w2n3V",
    "Queen": "1dfeR4HaWDbWqFHLkxsg1d",
    "Ariana Grande": "66CXWjxzNUsdJxJ2JdwvnR",
    "Maroon 5": "04gDigrS5kc9YWfZHwBETP",
    "Imagine Dragons": "53XhwfbYqKCa1cC15pYq2q",
    "Eminem": "7dGJo4pcD2V6oG8kP0tJRR",
    "Lady Gaga": "1HY2Jd0NmPuamShAr6KMms",
    "Cold play": "4gzpq5DPGxSnKTe4SA8HAU",
    "Beyonce": "6vWDO969PvNqNYHIOW5v0m",
    "Bruno Mars": "0du5cEVh5yTK9QJze8zA0C",
    "Rihanna": "5pKCCKE2ajJHZ9KAiaK11H",
    "Shakira": "0EmeFodog0BfCgMzAIvKQp",
    "Justin Bieber": "1uNFoZAHBGtllmzznpCI3s",
    "Demi Lovato": "6S2OmqARrzebs0tKUEyXyp",
    "Taylor Swift": "06HL4z0CvFAxyc27GXpf02"
};


let cachedToken = null;
let tokenExpirationTime = null;

const getToken = async () => {
    if (cachedToken && tokenExpirationTime > Date.now()) {
        return cachedToken;
    }

    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
        grant_type: 'client_credentials'
    }), {
        headers: {
            'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
        }
    });

    cachedToken = response.data.access_token;
    tokenExpirationTime = Date.now() + (response.data.expires_in * 1000);

    return cachedToken;
};

let cachedArtists = null;

const getArtistData = async (token) => {
    if (cachedArtists) {
        return cachedArtists;
    }

    const requests = Object.values(artistIds).map(id =>
        axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    );

    const responses = await Promise.all(requests);
    cachedArtists = responses.map(response => ({
        name: response.data.name,
        followers: response.data.followers.total,
        popularity: response.data.popularity,
        imageUrl: response.data.images[0]?.url,
        genres: response.data.genres
    }));

    return cachedArtists;
};

const sendArtistData = async () => {
    try {
        const token = await getToken();
        const artists = await getArtistData(token);

        const ordenacaoSeguidor = artists
            .sort((a, b) => b.followers - a.followers)
            .map(artist => ({
                artist_name: artist.name,
                followers: artist.followers,
            }));

        const genres = [...new Set(artists.map(artist => artist.genres).flat())].slice(0, 5);

        const body = {
            github_url: "https://github.com/tallyson95",
            name: "Tallyson Pereira da Silva",
            pop_ranking: ordenacaoSeguidor,
            genre_ranking: genres,
        };

        await axios.post('https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app?access_token=bC2lWA5c7mt1rSPR', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Dados dos artistas enviados com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar dados dos artistas:', error);
    }
};

app.get('/token', async (req, res) => {
    try {
        const token = await getToken();
        res.json({ token });
    } catch (error) {
        console.error('Erro ao obter token:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.post('/process-artists', async (req, res) => {
    try {
        const token = await getToken();
        const artists = await getArtistData(token);

        const ordenacaoSeguidor = artists
            .sort((a, b) => b.followers - a.followers) 
            .map(artist => ({
                name: artist.name,
                followers: artist.followers,
                popularity: artist.popularity,
                imageUrl: artist.imageUrl
            }));

        res.json({
            ordenacaoSeguidor
        });
    } catch (error) {
        console.error('Erro ao processar artistas:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.listen(port, async () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    await sendArtistData(); 
});
