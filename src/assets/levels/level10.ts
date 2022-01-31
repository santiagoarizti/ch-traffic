
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 10,
    name: 'Standard 10',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 10 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        A A B - C C
        D D B - - O
        P X X - - O
        P Q Q Q - O
        P - - E F F
        G G - E H H`,
    picture: undefined,
    solution: [
        'CL1', 'OU1', 'QR2', 'XR2', 'BD4',
        'DR1', 'AR1', 'PU2', 'QL3', 'XL2',
        'EU3', 'HL1', 'FL1', 'OD3', 'CR1',
        'EU1', 'XR5',
    ],
};
export default level;
