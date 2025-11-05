import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "../actions/search-heros.action";


interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}


export const useHeroSearch = (opciones: Options) => {

    const { name, team, category, universe, status, strength } = opciones;

    return useQuery({
        queryKey: ['search', { name, team, category, universe, status, strength }],
        queryFn: () => searchHeroesAction(opciones),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}