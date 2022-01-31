
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 26,
    name: 'Standard 26',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 26 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        - A - O O O
        B A - C P -
        B X X C P D
        E R R R P D
        E - F - - G
        - - F H H G`,
    picture: undefined,
    solution: [
        'DU1', 'GU1', 'ED1', 'HR1', 'RL1',
        'CD3', 'XR1', 'AD1', 'OL3', 'PU1',
        'RR2', 'AD3', 'RL2', 'XL1', 'CU4',
        'HL1', 'GD1', 'DU1', 'RR3', 'FU1',
        'XR1', 'AU3', 'EU1', 'HL3', 'FD1',
        'RL2', 'PD3', 'XR4',
    ],
};
export default level;
