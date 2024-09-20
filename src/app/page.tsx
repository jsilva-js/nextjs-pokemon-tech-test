'use client';

import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  image: string | null;
}

interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export default function HomePage() {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20; // Number of Pokémon per page
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (offset: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data.');
      }
      const data = await response.json();
      console.log(data)
      setPokemonData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load Pokémon data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(offset);
  }, [offset]);

  const handleNext = () => {
    if (pokemonData && pokemonData.next) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (pokemonData && pokemonData.previous && offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !pokemonData) return <p>{error || 'No data available.'}</p>;

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* {pokemonData.results.map((pokemon) => (
          <li key={pokemon.name} style={{ display: 'inline-block', margin: '10px' }}>
            {pokemon.image ? (
              <img src={pokemon.image} alt={pokemon.name} width="100" height="100" />
            ) : (
              <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }} />
            )}
            <p>{pokemon.name}</p>
          </li>
        ))} */}
      </ul>
      <div>
        <button onClick={handlePrevious} disabled={!pokemonData.previous || offset === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!pokemonData.next}>
          Next
        </button>
      </div>
    </div>
  );
}