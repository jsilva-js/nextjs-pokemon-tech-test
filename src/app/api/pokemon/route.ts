import { NextResponse } from 'next/server';
import { findPokemonsByIds } from '@/lib/queries/db';
import { fetchAndStorePokemons } from '@/utils/fetchPokemon';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = 10;
    const offset = parseInt(searchParams.get('offset') || '0');

    try {
        const pokemonIds = Array.from({ length: limit }, (_, i) => offset + i + 1);

        const existingPokemons = await findPokemonsByIds(pokemonIds);
        const existingPokemonIds = new Set(existingPokemons.map(p => p.id));

        const pokemonsToFetch = pokemonIds.filter(id => !existingPokemonIds.has(id));

        const fetchedPokemons = await fetchAndStorePokemons(pokemonsToFetch);

        const allPokemons = [
            ...existingPokemons.map(pokemonData => ({
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
            })),
            ...fetchedPokemons,
        ];

        // Sort Pokémon data in the order of requested IDs
        const sortedPokemons = pokemonIds
            .map(id => allPokemons.find(p => p.id === id))
            .filter(p => p !== undefined);

        return NextResponse.json(sortedPokemons);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.error();
    }
}