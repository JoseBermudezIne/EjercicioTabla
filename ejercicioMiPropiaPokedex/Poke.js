class PokemonesList {
    async buscarPokemonesList(offset = 0, limit = 10) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const pokemones = await response.json();
        return pokemones.results;
    }
    async buscarPokemon(pokemones) {
        const pokemonesInfo = [];
        for (let pokemon of pokemones) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const pokemonInf = await response.json();
            pokemonesInfo.push(pokemonInf);
        }
        return pokemonesInfo;
    }
}
export {PokemonesList};
