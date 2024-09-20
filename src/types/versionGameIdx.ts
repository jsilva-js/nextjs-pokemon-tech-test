import { NamedAPIResource } from "./namedAPI";

export interface VersionGameIndex {
    /** The internal id of an API resource within game data */
    game_index: number;
    /** The version relevent to this game index */
    version: NamedAPIResource;
}