import { NextResponse } from 'next/server';
import axios from 'axios';
import { prisma } from '@/lib/prisma'; // Import prisma from a central location

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Get 'limit' and 'offset' from query parameters, with default values
    //   const limit = parseInt(searchParams.get('limit') || '20');
    //   const offset = parseInt(searchParams.get('offset') || '0');

    try {
        // Fetch the list of Pokémon names and URLs from the PokeAPI with limit and offset
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${3}&offset=${0}`
        );

        const data = response.data; // Contains 'count', 'next', 'previous', 'results'

        // Extract the Pokémon IDs from the URLs
        const pokemonIds = data.results.map((pokemon: { name: string; url: string }) => {
            const parts = pokemon.url.split('/');
            const id = parseInt(parts[parts.length - 2]);
            return { id, name: pokemon.name, url: pokemon.url };
        });

        // Check which Pokémon IDs are already in the database
        const existingPokemons = await prisma.pokemon.findMany({
            where: {
                pokemonId: { in: pokemonIds.map(p => p.id) },
            },
        });

        // Map existing Pokémon IDs for quick lookup
        const existingPokemonIds = new Set(existingPokemons.map(p => p.pokemonId));

        // Determine which Pokémon need to be fetched from the external API
        const pokemonsToFetch = pokemonIds.filter(p => !existingPokemonIds.has(p.id));

        // Fetch missing Pokémon data with 500 ms delay between each request
        const fetchedPokemons = [];

        for (const pokemon of pokemonsToFetch) {
            try {
                // Wait for 500 ms
                await new Promise(resolve => setTimeout(resolve, 500));

                // Fetch Pokémon data
                const pokemonResponse = await axios.get(pokemon.url);
                const pokemonData = pokemonResponse.data;

                console.log(pokemonData)
                // Store the data in the database
                await prisma.pokemon.create({
                    data: {
                        pokemonId: pokemonData.id,
                        data: JSON.stringify(pokemonData), // Store as string in SQLite
                    },
                });

                // Add to fetchedPokemons
                fetchedPokemons.push({
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default, // Get the default front image
                });
            } catch (error) {
                console.error(`Error fetching data for ${pokemon.name}:`, error);
                // Continue with the next Pokémon even if an error occurs
            }
        }

        // Combine existing Pokémons with fetched Pokémons
        const allPokemons = [
            ...existingPokemons.map(pokemon => {
                const pokemonData = JSON.parse(pokemon.data);
                return {
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                };
            }),
            ...fetchedPokemons,
        ];

        // Sort the Pokémon to maintain the correct order
        const sortedPokemons = pokemonIds.map(pokemon => {
            return allPokemons.find(p => p.name === pokemon.name);
        }).filter(p => p !== undefined);

        // Prepare the response
        const result = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            results: sortedPokemons,
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.error();
    }
}