'use client'
import { useContext, useEffect } from 'react';
import { PokemonContext } from '@/context/pokemon/index';

export function usePokemon() {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemon must be used within a PokemonProvider');
    }

    const { state, dispatch } = context;

    const fetchPokemonPage = async (offset: number) => {
        dispatch({ type: 'FETCH_POKEMON_PAGE_REQUEST' });
        try {
            const response = await fetch(`/api/pokemon?offset=${offset}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokémon data.');
            }
            const data = await response.json();
            console.log({ data })
            dispatch({ type: 'FETCH_POKEMON_PAGE_SUCCESS', payload: data });
        } catch (err) {
            console.error(err);
            dispatch({ type: 'FETCH_POKEMON_PAGE_FAILURE', error: 'Failed to load Pokémon data.' });
        }
    };

    const setOffset = (offset: number) => {
        dispatch({ type: 'SET_OFFSET', offset });
    };

    useEffect(() => {
        console.log('called')
        fetchPokemonPage(state.offset);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.offset]);


    return { state, setOffset };
}