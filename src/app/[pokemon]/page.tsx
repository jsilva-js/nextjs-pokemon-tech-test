// app/pokemon/[pokemon]/page.tsx
import React from 'react';
import { getPokemonById } from '@/lib/queries/index';
import { Pokemon } from '@/types/pokemon';
import PokemonPage from '@/components/pokemon/Page';

interface PageProps {
    params: { pokemon: string };
  }
  
  export default async function Page({ params }: PageProps) {
    const pokemonId = parseInt(params.pokemon);
  
    if (isNaN(pokemonId)) {
      return (
        <div>
          <h1>Invalid Pokémon ID</h1>
        </div>
      );
    }
  
    const pokemonData: Pokemon | null = await getPokemonById(pokemonId);
  
    if (!pokemonData) {
      return (
        <div>
          <h1>Pokémon Not Found</h1>
        </div>
      );
    }
  
    return (
      <div>
        <h1>{pokemonData.name}</h1>
        <PokemonPage pokemon={pokemonData} />
      </div>
    );
  }