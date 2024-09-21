import axios from 'axios';
import { Pokemon } from '@/types/pokemon';
import { findPokemonById, createPokemon } from '@/lib/queries/db';

export async function getPokemonById(pokemonId: number): Promise<Pokemon | null> {
    try {
        // Check if the Pokémon exists in the database
        const pokemonData = await findPokemonById(pokemonId);

        if (pokemonData) {
            return pokemonData;
        }

        // Fetch Pokémon data from the external API if not found in the database
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const newPokemonData: Pokemon = response.data;

        // Save the new Pokémon data to the database
        await createPokemon(newPokemonData);

        return newPokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}