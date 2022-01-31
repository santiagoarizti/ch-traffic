
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 20,
    name: 'Standard 20',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 20 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A - - O O O
        A B B C - -
        X X D C - P
        - - D - - P
        - - E F F P
        - - E Q Q Q`,
    picture: undefined,
    solution: ['CD1', 'BR2', 'DU2', 'EU2', 'QL1', 'PD1', 'FL3', 'CD1', 'ED1', 'XR6'],
};
export default level;
