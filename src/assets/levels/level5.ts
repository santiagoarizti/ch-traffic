
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 5,
    name: 'Standard 5',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 5 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        A A - O - B
        P - - O Q B
        P X X O Q G
        P R R R Q G
        D - - - E E
        D - - - F F`,
    picture: undefined,
    solution: ['EL3', 'GD1', 'FL3', 'QD2', 'AR1', 'PU1', 'RL1', 'OD3', 'XR5'],
};
export default level;
