
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 27,
    name: 'Standard 27',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 27 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        A B B O - -
        A C C O - -
        X X D O - P
        - - D E E P
        - - F - - P
        - - F R R R`,
    picture: undefined,
    solution: [
        'PU2', 'ER1', 'OD2', 'CR2', 'BR2',
        'DU2', 'XR1', 'AD4', 'XL1', 'DD2',
        'CL3', 'BL3', 'OU2', 'DU1', 'EL4',
        'OD2', 'DD1', 'CR3', 'DU2', 'ER1',
        'XR1', 'AU3', 'EL1', 'FU1', 'RL3',
        'PD3', 'OD1', 'XR5',
    ],
};
export default level;
