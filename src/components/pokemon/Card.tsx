import React from 'react';
import Image from 'next/image';
import { ApiPokemonResponseType } from '@/app/api/pokemon/types';
import Link from 'next/link';

interface CardProps {
  pokemon: ApiPokemonResponseType[0];
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <Link href={`/${pokemon.id}`}>
    <div className="bg-gray-400 rounded-lg shadow-md p-4">
      {pokemon.image ? (
          <Image
          width={120}
          height={120}
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-32 object-contain mb-2"
          />
        ) : (
            <div className="w-full h-32 bg-gray-200 mb-2" />
        )}
      <h2 className="text-lg text-gray-950 font-semibold capitalize">{pokemon.name}</h2>
      <p className="text-gray-600">ID: {pokemon.id}</p>
    </div>
        </Link>
  );
};

export default Card;