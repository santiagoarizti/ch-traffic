import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 3,
    name: 'Standard 3',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 3 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        - - - - - -
        - - - - - -
        - X X O - -
        - A A O - P
        - B - O - P
        - B C C - P`,
    picture: undefined,
    solution: ['PU3', 'OU2', 'CR2', 'AR3', 'OD3', 'XR1', 'BU4', 'XL1', 'OU3', 'CL3', 'AL3', 'PD3', 'OD3', 'XR5'],
};
export default level;