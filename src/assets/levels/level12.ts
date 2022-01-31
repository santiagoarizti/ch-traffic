
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 12,
    name: 'Standard 12',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 12 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A B B - - O
        A - P - - O
        X X P - - O
        - - P Q Q Q
        - - - - C -
        R R R - C -`,
    picture: undefined,
    solution: [
        'BR2', 'PU1', 'QL2', 'CU3', 'RR3',
        'QR2', 'PD3', 'BL2', 'CU1', 'XR3',
        'AD1', 'BL1', 'PU3', 'RL1', 'QL1',
        'OD3', 'XR3',
    ],
};
export default level;
