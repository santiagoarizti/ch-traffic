
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 6,
    name: 'Standard 6',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 6 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        A A - B - -
        C C - B O P
        - X X Q O P
        D D E Q O P
        F - E Q - -
        F - - R R R`,
    picture: undefined,
    solution: [
        'XL1', 'EU3', 'DR1', 'FU1', 'RL3',
        'PD2', 'OD2', 'QD1', 'XR6',
    ],
};
export default level;
