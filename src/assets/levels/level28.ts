
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 28,
    name: 'Standard 28',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 28 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        O O O A - -
        - - P A B B
        X X P - - -
        C D P E E Q
        C D R R R Q
        F F G G - Q`,
    picture: undefined,
    solution: [
        'QU1', 'AD1', 'OR3', 'PU1', 'GR2',
        'FR2', 'DD1', 'CD1', 'EL3', 'AD1',
        'BL1', 'QU1', 'RR1', 'PD2', 'BL3',
        'AU1', 'PU2', 'ER3', 'DU1', 'CU1',
        'FL2', 'PD3', 'OL3', 'AU1', 'XR3',
        'PU2', 'GL1', 'RL1', 'QD2', 'XR3',
    ],
};
export default level;
