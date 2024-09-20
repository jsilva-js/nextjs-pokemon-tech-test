
import { useContext } from 'react';
import { PokemonContext } from '@/context/index';

export function usePokemon() {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemon must be used within a PokemonProvider');
    }

    const { state, dispatch } = context;

    const fetchPokemonPage = async (offset: number) => {
        dispatch({ type: 'FETCH_POKEMON_REQUEST' });
        try {
            const response = await fetch(`/api/pokemon?limit=${state.limit}&offset=${offset}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokémon data.');
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_POKEMON_SUCCESS', payload: data });
        } catch (err) {
            console.error(err);
            dispatch({ type: 'FETCH_POKEMON_FAILURE', error: 'Failed to load Pokémon data.' });
        }
    };

    const setOffset = (offset: number) => {
        dispatch({ type: 'SET_OFFSET', offset });
    };



    return { state, setOffset, fetchPokemonPage };
}