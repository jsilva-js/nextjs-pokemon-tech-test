import { createPokemon } from '@/lib/queries/db';
import axios from 'axios';


export async function fetchAndStorePokemons(pokemonsToFetch: number[]) {
    const fetchedPokemons = [];
    for (const id of pokemonsToFetch) {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = pokemonResponse.data;

            await createPokemon(pokemonData);

            fetchedPokemons.push({
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
            });
        } catch (error) {
            console.error(`Error fetching data for Pokémon ID ${id}:`, error);
        }
    }

    return fetchedPokemons;
}