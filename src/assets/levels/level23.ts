
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 23,
    name: 'Standard 23',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 23 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        - - O O O P
        - - A B B P
        - - A X X P
        - - C D E E
        - - C D F F
        - - Q Q Q -`,
    picture: undefined,
    solution: [
        'QL2', 'DD1', 'EL1', 'PD1', 'OR1',
        'AU1', 'XL3', 'AD1', 'OL1', 'PU1',
        'ER1', 'DU2', 'QR3', 'CD1', 'AD1',
        'BL3', 'DU1', 'EL1', 'PD1', 'OR1',
        'AU2', 'EL3', 'CU2', 'QL1', 'FL4',
        'PD2', 'DD2', 'CD1', 'XR6',
    ],
};
export default level;
