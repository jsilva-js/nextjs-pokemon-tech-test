import ListPokemon from "@/components/pokemon/List";
import { PokemonProvider } from "@/context/pokemon";

export default function HomePage() {
  return (
    <PokemonProvider>
      <ListPokemon />;
    </PokemonProvider>
  );
}
