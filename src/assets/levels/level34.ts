
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 34,
    name: 'Standard 34',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 34 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        A - - R R R
        A - - B - P
        X X - B C P
        Q Q Q D C P
        - - E D F F
        I I E H H -`,
    picture: undefined,
    solution: [
        'RL2', 'PU1', 'CU1', 'HR1', 'DD1',
        'QR3', 'XR1', 'AD3', 'XL1', 'EU3',
        'IR1', 'AD1', 'QL3', 'PD1', 'RL1',
        'BU1', 'DU2', 'FL3', 'DD2', 'BD1',
        'RR3', 'EU1', 'QR2', 'XR1', 'AU4',
        'XL1', 'ED1', 'RL2', 'PU1', 'IL1',
        'FL1', 'QR1', 'ED3', 'QL3', 'DU1',
        'HL1', 'PD3', 'CU1', 'XR1', 'AD1',
        'RL1', 'BU1', 'XR5',
    ],
};
export default level;
