
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 9,
    name: 'Standard 9',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 9 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        - A B B C C
        - A - D E E
        X X - D O F
        P Q Q Q O F
        P - G - O H
        P - G - - H`,
    picture: undefined,
    solution: ['OD1', 'XR1', 'PU3', 'QL1', 'DD2', 'XR2', 'AD1', 'EL1', 'BL1', 'CL1', 'FU2', 'XR3'],
};
export default level;
