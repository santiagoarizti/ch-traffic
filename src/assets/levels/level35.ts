
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 35,
    name: 'Standard 35',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 35 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        - - O A A P
        - - O B - P
        X X O B - P
        K Q Q Q - -
        K D D E F -
        G G - E F -`,
    picture: undefined,
    solution: [
        'PD1', 'FU3', 'AR1', 'BU1', 'GR1',
        'KD1', 'QL1', 'EU2', 'GR3', 'DR3',
        'ED2', 'BD1', 'AL1', 'PU1', 'QR3',
        'OD3', 'XR1', 'KU4', 'XL1', 'OU3',
        'QL3', 'PD1', 'AR1', 'BU1', 'EU2',
        'GL4', 'DL4', 'ED2', 'BD1', 'AL1',
        'PU1', 'FD3', 'QR3', 'OD3', 'AL2',
        'BU1', 'XR3', 'KD1', 'AL1', 'OU3',
        'QL1', 'PD3', 'XR3',
    ],
};
export default level;
