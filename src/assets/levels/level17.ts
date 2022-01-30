
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 17,
    name: 'Standard 17',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 17 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A O O O - -
        A - B B C C
        X X D - - -
        E E D P - -
        Q Q Q P F G
        R R R P F G`,
    picture: undefined,
    solution: ['GU2', 'FU2', 'BL1', 'PU2', 'BR3', 'QR3', 'DD2', 'ER1', 'XR1', 'AD4', 'EL1', 'XL1', 'BL1', 'OR2', 'DU4', 'ER1', 'XR1', 'AU2', 'QL3', 'GD1', 'FD1', 'RL3', 'PD2', 'XR5'],
};
export default level;
