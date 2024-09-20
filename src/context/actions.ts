import { ApiPokemonResponseType } from "@/app/api/pokemon/types";

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
export const SET_OFFSET = 'SET_OFFSET';

// Define action types
export type PokemonAction =
    | { type: 'FETCH_POKEMON_REQUEST' }
    | { type: 'FETCH_POKEMON_SUCCESS'; payload: ApiPokemonResponseType }
    | { type: 'FETCH_POKEMON_FAILURE'; error: string }
    | { type: 'SET_OFFSET'; offset: number }
