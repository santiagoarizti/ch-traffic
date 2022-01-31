
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 37,
    name: 'Standard 37',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 37 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        A A B - C C
        D D B - O P
        Q X X - O P
        Q R R R O P
        Q - - E F F
        G G - E H H`,
    picture: undefined,
    solution: [
        'GR1', 'QD1', 'XL1', 'BD1', 'CL2',
        'PU1', 'OU1', 'RR2', 'BD2', 'XR1',
        'DR1', 'QU2', 'GL1', 'BD1', 'RL2',
        'OD1', 'CR1', 'AR1', 'QU1', 'RL1',
        'EU3', 'RR1', 'QD2', 'AL1', 'CL1',
        'OU1', 'RR2', 'BU1', 'GR1', 'QD1',
        'XL1', 'DL1', 'BU2', 'HL1', 'FL2',
        'RL2', 'PD3', 'OD2', 'CR2', 'EU1',
        'BU1', 'XR2', 'QU1', 'GL1', 'HL1',
        'OD1', 'XR4',
    ],
};
export default level;
