import { NextResponse } from 'next/server';
import { getPokemonById } from '@/lib/queries/index';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const pokemonId = parseInt(params.id);

    if (isNaN(pokemonId)) {
        return NextResponse.json({ error: 'Invalid Pokémon ID' }, { status: 400 });
    }

    const pokemonData = await getPokemonById(pokemonId);

    if (pokemonData) {
        return NextResponse.json(pokemonData);
    } else {
        return NextResponse.json({ error: 'Pokémon not found' }, { status: 404 });
    }
}