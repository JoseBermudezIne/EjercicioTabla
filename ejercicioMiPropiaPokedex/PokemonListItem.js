export class PokemonListItem extends HTMLElement {
    set data(pokemon) {
        this.pokemon = pokemon;
        this.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;cursor:pointer; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${pokemon.sprites.front_default}" width="50" />
          <strong>${pokemon.name}</strong>
          <strong>Types:</strong>
          <p>${pokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
        <button class="fav-btn">
          ${pokemon.favorito ? '💛' : '🤍'}
        </button>
      </div>
    `;

        this.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorito();
        });

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('pokemon-selected', {
                detail: this.pokemon,
                bubbles: true
            }));
        });
    }

    toggleFavorito() {
        const id = this.pokemon.id;
        const favoritos = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));

        if (favoritos.has(id)) {
            favoritos.delete(id);
        } else {
            favoritos.add(id);
        }

        localStorage.setItem('favoritos', JSON.stringify([...favoritos]));
        this.querySelector('.fav-btn').textContent = favoritos.has(id) ? '💛' : '🤍';
        window.dispatchEvent(new CustomEvent('favorites-updated'));
    }
}

customElements.define('pokemon-list-item', PokemonListItem);