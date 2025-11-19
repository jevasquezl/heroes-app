import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.action"



export const useHeroBySlug = (idSlug: string) => {
    return useQuery({
        queryKey: ['hero', { idSlug }],
        queryFn: () => getHeroAction(idSlug),
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}


