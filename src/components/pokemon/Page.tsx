
import React from 'react';
import { Pokemon } from '@/types/pokemon';

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon }) => {
  const pokemonProperties = Object.keys(pokemon) as (keyof Pokemon)[];

  return (
    <div>
      <h1 className='text-lg font-bold'>Pokémon Details</h1>
      <ul>
        {pokemonProperties.map((property) => {
          const value = pokemon[property];

          if (Array.isArray(value)) {
            return (
              <li key={property}>
                <strong>{property}</strong>: ( {Array.isArray(value) ? value.length : 0} );
              </li>
            );
          } else if (value !== null && typeof value === 'object') {
            return (
              <li key={property}>
                <strong>{property}</strong>: pending data...
              </li>
            );
          } else {
            return (
              <li key={property}>
                <strong>{property}</strong>: {value}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default PokemonPage;