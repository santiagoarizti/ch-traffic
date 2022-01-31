
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 21,
    name: 'Standard 21',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 21 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        A A B O - -
        P - B O - -
        P X X O - -
        P Q Q Q - -
        - - - - - -
        - - - R R R`,
    picture: undefined,
    solution: [
        'PD2', 'QR2', 'XL1', 'BD4', 'XR1',
        'AR1', 'PU3', 'QL3', 'OD1', 'AR3',
        'OU1', 'QR3', 'PD3', 'XL1', 'BU4',
        'XR1', 'PU3', 'RL3', 'QL3', 'OD3',
        'XR5',
    ],
};
export default level;
