import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 4,
    name: 'Standard 4',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 4 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'beginner',
    body: `
        O - - P - -
        O - - P - -
        O X X P - -
        - - A Q Q Q
        - - A - - B
        - - R R R B`,
    picture: undefined,
    solution: ['OD3', 'XL1', 'AU3', 'XR1', 'OU3', 'RL2', 'QL3', 'PD3', 'XR5'],
};
export default level;
