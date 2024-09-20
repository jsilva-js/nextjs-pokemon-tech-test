export type ApiPokemonResponseType = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        name: string;
        image: string;
    }[];
}