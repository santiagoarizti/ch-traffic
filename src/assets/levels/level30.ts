
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 30,
    name: 'Standard 30',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 30 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        O - A P P P
        O - A B - -
        O X X B - -
        C C D D - Q
        - - - - - Q
        E E F F - Q`,
    picture: undefined,
    solution: [
        'FR1', 'ER1', 'DR1', 'CR1', 'OD3',
        'XL1', 'AD1', 'PL1', 'QU3', 'FR1',
        'DR1', 'BD3', 'DL1', 'QD1', 'PR1',
        'AU1', 'XR3', 'OU3', 'EL1', 'CL1',
        'AD4', 'CR1', 'OD1', 'PL3', 'QU1',
        'DR1', 'XL2', 'BU4', 'FL1', 'DL1',
        'QD3', 'XR5',
    ],
};
export default level;
