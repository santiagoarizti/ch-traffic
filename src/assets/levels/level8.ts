
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 8,
    name: 'Standard 8',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 8 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        - - - A A O
        - - B B C O
        X X D E C O
        F F D E G G
        H H I P P P
        K K I Q Q Q`,
    picture: undefined,
    solution: ['AL3', 'CU1', 'BL2', 'EU2', 'DU2', 'XR3', 'IU2', 'QL1', 'PL1', 'GL1', 'OD3', 'XR3'],
};
export default level;
