'use client';

import React, { createContext, useReducer, Dispatch } from 'react';
import { pokemonReducer, initialState, PokemonState } from './reducer';
import { PokemonAction } from './actions';

interface PokemonContextProps {
  state: PokemonState;
  dispatch: Dispatch<PokemonAction>;
}

export const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};