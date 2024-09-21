import { prisma } from '../prisma';
import { Pokemon } from '@/types/pokemon';

export async function findPokemonById(pokemonId: number): Promise<Pokemon | null> {
    const pokemonRecord = await prisma.pokemon.findUnique({
        where: { pokemonId },
    });
    return pokemonRecord ? JSON.parse(pokemonRecord.data) : null;
}

export async function createPokemon(pokemonData: Pokemon) {
    await prisma.pokemon.create({
        data: {
            pokemonId: pokemonData.id,
            data: JSON.stringify(pokemonData),
        },
    });
}

export async function findPokemonsByIds(pokemonIds: number[]): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany({
        where: {
            pokemonId: { in: pokemonIds },
        }
    });

    return pokemons.map(pokemon => JSON.parse(pokemon.data));
}