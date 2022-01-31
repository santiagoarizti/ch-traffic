
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 7,
    name: 'Standard 7',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 7 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        - A B B C D
        - A - E C D
        - X X E - F
        - - I I - F
        - - - H - -
        - - - H - -`,
    picture: undefined,
    solution: [
        'FD1', 'DD1', 'CD3', 'BR2', 'EU1',
        'XR1', 'AD3', 'XL1', 'ED1', 'BL3',
        'DU1', 'EU1', 'XR5',
    ],
};
export default level;
