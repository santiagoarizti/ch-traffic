
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 22,
    name: 'Standard 22',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 22 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        - - A O O O
        B - A P C C
        B X X P - -
        - D - P E E
        F D G G - H
        F Q Q Q - H`,
    picture: undefined,
    solution: [
        'BU1', 'GR1', 'XL1', 'AD3', 'XR1',
        'BD1', 'OL3', 'PU1', 'EL1', 'HU2',
        'QR2', 'AD1', 'DD1', 'GR1', 'EL2',
        'PD2', 'CL3', 'HU2', 'PU2', 'ER3',
        'AU1', 'DU1', 'FU1', 'QL3', 'PD3',
        'XR5',
    ],
};
export default level;
