
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 29,
    name: 'Standard 29',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 29 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        O O O - P -
        - - A - P -
        X X A - P B
        C D D E E B
        C F F G - H
        R R R G - H`,
    picture: undefined,
    solution: [
        'BU1', 'ER1', 'GU3', 'EL1', 'HU1',
        'RR3', 'CD1', 'FR2', 'DL1', 'AD3',
        'DR1', 'XR1', 'OR1', 'CU4', 'DL1',
        'XL1', 'AU3', 'RL3', 'HD1', 'FL2',
        'ER1', 'GD3', 'EL2', 'PD3', 'OR2',
        'AU1', 'XR3', 'AD1', 'OL1', 'BU1',
        'XR3',
    ],
};
export default level;
