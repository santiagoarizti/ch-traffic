import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 2,
    name: 'Standard 2',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 2 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        A - - O O O
        A - - B - P
        X X - B C P
        Q Q Q - C P
        - - D - E E
        F F D G G -`,
    picture: undefined,
    solution: ['EL1', 'PD2', 'XR1', 'AD1', 'OL3', 'CU2', 'BU1', 'XR5'],
};
export default level;
