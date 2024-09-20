import { NamedAPIResource } from "../namedAPI";

export interface PokemonHeldItem {
    /** The item the referenced Pokémon holds */
    item: NamedAPIResource;
    /** The details of the different versions in which the item is held */
    version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
    /** The version in which the item is held */
    version: NamedAPIResource;
    /** How often the item is held */
    rarity: number;
}