import { ApiPokemonResponseType } from '@/app/api/pokemon/types';
import { PokemonAction } from './actions';

export interface PokemonState {
    data: ApiPokemonResponseType | null;
    loading: boolean;
    error: string | null;
    offset: number;
    limit: number;
}

export const initialState: PokemonState = {
    data: null,
    loading: false,
    error: null,
    offset: 0,
    limit: 20,
};

export function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
    switch (action.type) {
        case 'FETCH_POKEMON_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_POKEMON_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_POKEMON_FAILURE':
            return { ...state, loading: false, error: action.error };
        case 'SET_OFFSET':
            return { ...state, offset: action.offset };
        default:
            return state;
    }
}