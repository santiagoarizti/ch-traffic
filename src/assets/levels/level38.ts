
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 38,
    name: 'Standard 38',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 38 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        A - - O O O
        A B B C - -
        X X D C - R
        - - D E E R
        - - F G G R
        - - F Q Q Q`,
    picture: undefined,
    solution: [
        'OL1', 'RU2', 'GR1', 'ER1', 'CD2',
        'BR2', 'DU1', 'FU1', 'QL3', 'CD1',
        'EL1', 'RD1', 'OR1', 'DU1', 'XR1',
        'AD3', 'XL1', 'DD1', 'OL1', 'RU1',
        'ER1', 'CU2', 'QR3', 'FD1', 'DD1',
        'BL3', 'CU1', 'DU1', 'AD1', 'EL4',
        'RD1', 'CD1', 'DD1', 'BR3', 'OR1',
        'DU2', 'ER1', 'XR1', 'AU4', 'EL1',
        'XL1', 'FU2', 'QL1', 'GL4', 'RD2',
        'CD1', 'FD1', 'XR6',
    ],
};
export default level;
