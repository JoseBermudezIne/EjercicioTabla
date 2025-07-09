// PokemonCard.js
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card {
      border: 1px solid #ccc;
      padding: 12px;
      border-radius: 8px;
      width: 100%; 
      box-sizing: border-box;
    }
    .images img {
      margin-right: 8px;
    }
  </style>
  <div class="card">
    <h2 class="name"></h2>
    <div class="images">
      <img class="front" />
      <img class="back" />
      <img class="shiny" />
    </div>
    <p><strong>Base Exp:</strong> <span class="exp"></span></p>
    <p><strong>Height:</strong> <span class="height"></span></p>
    <p><strong>Types:</strong> <span class="types"></span></p>
  </div>
`;

export class PokemonCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    set data(pokemon) {
        const root = this.shadowRoot;
        root.querySelector('.name').textContent = pokemon.name;
        root.querySelector('.front').src = pokemon.sprites.front_default;
        root.querySelector('.back').src = pokemon.sprites.back_default;
        root.querySelector('.shiny').src = pokemon.sprites.front_shiny;
        root.querySelector('.exp').textContent = pokemon.base_experience;
        root.querySelector('.height').textContent = pokemon.height;
        root.querySelector('.types').textContent = pokemon.types.map(t => t.type.name).join(', ');
    }
}

customElements.define('pokemon-card', PokemonCard);
