import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import prisma from a central location
import { fetchAndStorePokemons } from '@/utils/fetchPokemon';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit') || '20');
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

        const sortedPokemons = pokemonIds
            .map(id => allPokemons.find(p => p.id === id))
            .filter(p => p !== undefined);

        const totalPokemonCount = 1010; // Update this to the actual total number of Pokémon
        const result = {
            count: totalPokemonCount,
            next: offset + limit < totalPokemonCount ? `/api/pokemon?offset=${offset + limit}&limit=${limit}` : null,
            previous: offset - limit >= 0 ? `/api/pokemon?offset=${offset - limit}&limit=${limit}` : null,
            results: sortedPokemons,
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.error();
    }
}