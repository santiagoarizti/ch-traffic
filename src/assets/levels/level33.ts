
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 33,
    name: 'Standard 33',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 33 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        - A R - B B
        - A R - - -
        X X R - - -
        I D D E E P
        I F F G H P
        Q Q Q G H P`,
    picture: undefined,
    solution: [
        'BL1', 'PU3', 'ER1', 'GU3', 'QR1',
        'ID1', 'DL1', 'EL2', 'HU3', 'QR2',
        'FR3', 'ER2', 'RD3', 'BL1', 'HU1',
        'GD2', 'XR3', 'AD1', 'BL2', 'RU3',
        'DR1', 'IU3', 'DL1', 'RD3', 'BR2',
        'AU1', 'IU1', 'XL3', 'GU1', 'RU2',
        'FL4', 'GD1', 'RD2', 'XR3', 'RU1',
        'QL3', 'GD1', 'EL1', 'PD3', 'XR3',
    ],
};
export default level;
