export class Services {
    fetchpokemon(id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    }
}