// lib/getPokemonById.ts
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { Pokemon } from '@/types/pokemon';

export async function getPokemonById(pokemonId: number): Promise<Pokemon | null> {
    try {
        const pokemonRecord = await prisma.pokemon.findUnique({
            where: { pokemonId },
        });

        if (pokemonRecord) {
            const pokemonData: Pokemon = JSON.parse(pokemonRecord.data);
            return pokemonData;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData: Pokemon = response.data;

        await prisma.pokemon.create({
            data: {
                pokemonId: pokemonData.id,
                data: JSON.stringify(pokemonData),
            },
        });

        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}
