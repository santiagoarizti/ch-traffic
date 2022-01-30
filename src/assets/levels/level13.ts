
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 13,
    name: 'Standard 13',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 13 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A A B B C -
        - - D - C O
        - E D X X O
        P E D F F O
        P - - G H H
        P I I G K K`,
    picture: undefined,
    solution: ['OU1', 'DD2', 'ED1', 'FR1', 'XL3', 'GU3', 'DU2', 'KL1', 'HL2', 'FL2', 'OD3', 'CD3', 'BR2', 'GU1', 'DU1', 'XR6'],
};
export default level;
