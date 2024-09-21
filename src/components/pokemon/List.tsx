"use client";

import { usePokemon } from "@/context/pokemon/hooks";
import Card from "./Card";

const ListPokemon = () => {
  const { state, setOffset } = usePokemon();

  const handleNext = () => {
    setOffset(state.offset + 10);
  };

  const handlePrevious = () => {
    if (state.offset - 10 >= 0) {
      setOffset(state.offset - 10);
    }
  };

  if (state.loading) return <p className="text-center mt-4">Loading...</p>;
  if (state.error || !state.page)
    return (
      <p className="text-center mt-4">{state.error || "No data available."}</p>
    );
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Pokémon List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {state.page.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-between my-8">
        <button
          onClick={handlePrevious}
          disabled={state.offset === 0}
          className={`px-4 py-2 rounded bg-blue-500 text-white ${
            state.offset === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={state.offset + 10 >= 1310}
          className={`px-4 py-2 rounded bg-blue-500 text-white ${
            state.offset + 10 >= 1310 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPokemon;
