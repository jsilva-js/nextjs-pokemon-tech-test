// app/pokemon/[pokemon]/page.tsx
import React from 'react';
import { getPokemonById } from '@/lib/queries/index';
import { Pokemon } from '@/types/pokemon';
import PokemonPage from '@/components/pokemon/Page';
import Image from 'next/image';

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
      <div className=''>
        <div className='flex justify-center items-center'>
            <Image
            width={120}
            height={120}
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            />
            <h1 className='text-pink-600 text-[4rem]'>{pokemonData.name}</h1>

        </div>
        <div className='flex justify-center'>
            <PokemonPage pokemon={pokemonData} />
        </div>
      </div>
    );
  }