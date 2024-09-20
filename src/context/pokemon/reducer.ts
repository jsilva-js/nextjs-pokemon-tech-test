import { ApiPokemonResponseType } from '@/app/api/pokemon/types';
import { PokemonAction } from './actions';

export interface PokemonState {
    page: ApiPokemonResponseType | null;
    loading: boolean;
    error: string | null;
    offset: number;
}

export const initialState: PokemonState = {
    page: null,
    loading: false,
    error: null,
    offset: 0,
};

export function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
    switch (action.type) {
        case 'FETCH_POKEMON_PAGE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_POKEMON_PAGE_SUCCESS':
            return { ...state, loading: false, page: action.payload };
        case 'FETCH_POKEMON_PAGE_FAILURE':
            return { ...state, loading: false, error: action.error };
        case 'SET_OFFSET':
            return { ...state, offset: action.offset };
        default:
            return state;
    }
}