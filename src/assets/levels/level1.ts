import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 1,
    name: 'Standard 1',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 1 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        A A - - - O
        P - - Q - O
        P X X Q - O >X
        P - - Q - -
        B - - - C C
        B - R R R -`,
    picture: undefined,
    solution: [
        'CL3',
        'OD3',
        'AR1',
        'PU1',
        'BU1',
        'RL2',
        'QD2',
        'XR5',
    ],
};
export default level;
