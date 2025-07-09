import { PokemonesList } from './Poke.js';
import './PokemonListItem.js';
import './PokemonCard.js';
let currentPage = 0;
const limit = 10;
const total = 150;
const favoritos = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));
let todos = [];
let mostrandoFavoritos = false;
let allPokemons = [];

async function init() {
    const api = new PokemonesList();
    const allBasicData = await api.buscarPokemonesList(0, 150);
    allPokemons = await api.buscarPokemon(allBasicData);
    loadPage(currentPage);
}

function loadPage(page = 0) {
    const start = page * limit;
    const end = start + limit;
    const paginated = allPokemons.slice(start, end);
    todos = paginated;
    renderList(paginated);
    document.getElementById('page-indicator').textContent = `Página ${page + 1}`;
}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if ((currentPage + 1) * limit < total) {
        currentPage++;
        loadPage(currentPage);
    }
});

function renderList(pokemons) {
    const listEl = document.getElementById('pokemon-list');
    listEl.innerHTML = '';
    const favoritosActualizados = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));

    pokemons.forEach(pokeData => {
        const item = document.createElement('pokemon-list-item');
        item.data = {
            id: pokeData.id,
            name: pokeData.name,
            sprites: pokeData.sprites,
            types: pokeData.types,
            height: pokeData.height,
            base_experience: pokeData.base_experience,
            favorito: favoritosActualizados.has(pokeData.id)
        };
        listEl.appendChild(item);
    });
}

document.getElementById('pokemon-list').addEventListener('pokemon-selected', e => {
    const pokeData = e.detail;
    const card = document.createElement('pokemon-card');
    card.data = pokeData;
    const detailEl = document.getElementById('pokemon-detail');
    detailEl.innerHTML = '';
    detailEl.appendChild(card);
});

document.getElementById('toggle-fav-btn').addEventListener('click', () => {
    mostrandoFavoritos = !mostrandoFavoritos;
    const btn = document.getElementById('toggle-fav-btn');
    btn.textContent = mostrandoFavoritos ? 'Ver Todos 🔁' : 'Ver Favoritos 💛';

    if (mostrandoFavoritos) {
        const favoritosActualizados = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));
        const favoritosList = allPokemons.filter(p => favoritosActualizados.has(p.id));
        renderList(favoritosList);
        document.getElementById('page-indicator').textContent = `Favoritos: ${favoritosList.length}`;
    } else {
        loadPage(currentPage);
    }
});

window.addEventListener('favorites-updated', () => {
    if (mostrandoFavoritos) {
        const favoritosActualizados = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));
        const favoritosList = allPokemons.filter(p => favoritosActualizados.has(p.id));
        renderList(favoritosList);
        document.getElementById('page-indicator').textContent = `Favoritos: ${favoritosList.length}`;
    }
});


init();