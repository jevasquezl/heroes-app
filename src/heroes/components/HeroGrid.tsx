

import { HeroGridCard } from './HeroGridCard';
import type { Hero } from "../types/hero.interface"

interface Props {
    heroes: Hero[]
}

// export interface Hero {
//     id:              string;
//     name:            string;
//     slug:            string;
//     alias:           string;
//     powers:          string[];
//     description:     string;
//     strength:        number;
//     intelligence:    number;
//     speed:           number;
//     durability:      number;
//     team:            string;
//     image:           string;
//     firstAppearance: string;
//     status:          string;
//     category:        string;
//     universe:        string;
// }

// `?height=300&width=300`
export const HeroGrid = ({ heroes }: Props) => {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {heroes.map(hero => (
                <HeroGridCard key={hero.id} hero={hero} />
            ))}
        </div>
    );
}



