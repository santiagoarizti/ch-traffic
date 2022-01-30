
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 16,
    name: 'Standard 16',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 16 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A A B B C O
        D - E E C O
        D F P X X O
        - F P Q Q Q
        - - P - - -
        G G - - - -`,
    picture: undefined,
    solution: ['GR3', 'PD1', 'FD2', 'DD2', 'XL3', 'CD1', 'EL2', 'BR1', 'PU3', 'GL1', 'QL2', 'CD3', 'QR2', 'FU1', 'GL2', 'PD3', 'XR3', 'PU3', 'QL1', 'OD3', 'XR3'],
};
export default level;
