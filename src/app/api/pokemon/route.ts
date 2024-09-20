import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import prisma from a central location
import { fetchAndStorePokemons } from '@/utils/fetchPokemon';
import { ApiPokemonResponseType } from './types';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = 10;
    const offset = parseInt(searchParams.get('offset') || '0');

    try {
        const pokemonIds = Array.from({ length: limit }, (_, i) => offset + i + 1);

        const existingPokemons = await prisma.pokemon.findMany({
            where: {
                pokemonId: { in: pokemonIds },
            },
        });

        const existingPokemonIds = new Set(existingPokemons.map(p => p.pokemonId));

        const pokemonsToFetch = pokemonIds.filter(id => !existingPokemonIds.has(id));

        const fetchedPokemons = await fetchAndStorePokemons(pokemonsToFetch);

        const allPokemons = [
            ...existingPokemons.map(pokemon => {
                const pokemonData = JSON.parse(pokemon.data);
                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                };
            }),
            ...fetchedPokemons,
        ];

        const sortedPokemons: ApiPokemonResponseType = pokemonIds
            .map(id => allPokemons.find(p => p.id === id))
            .filter(p => p !== undefined);


        return NextResponse.json(sortedPokemons);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.error();
    }
}