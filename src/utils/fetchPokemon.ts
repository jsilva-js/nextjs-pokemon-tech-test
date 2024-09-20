import { prisma } from '@/lib/prisma';
import axios from 'axios';


export async function fetchAndStorePokemons(pokemonsToFetch: number[]) {
    const fetchedPokemons = [];
    for (const id of pokemonsToFetch) {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = pokemonResponse.data;

            await prisma.pokemon.create({
                data: {
                    pokemonId: pokemonData.id,
                    data: JSON.stringify(pokemonData),
                },
            });

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