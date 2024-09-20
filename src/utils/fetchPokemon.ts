import { prisma } from '@/lib/prisma';
import axios from 'axios';


export async function fetchAndStorePokemons(pokemonsToFetch: number[]) {
    const fetchedPokemons = [];
    console.log('fetchAndStorePokemons');
    for (const id of pokemonsToFetch) {
        try {
            // Wait for 500 ms
            await new Promise(resolve => setTimeout(resolve, 500));

            // Fetch Pokémon data
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = pokemonResponse.data;

            // Store the data in the database
            await prisma.pokemon.create({
                data: {
                    pokemonId: pokemonData.id,
                    data: JSON.stringify(pokemonData),
                },
            });

            // Add to fetchedPokemons
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