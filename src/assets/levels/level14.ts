
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 14,
    name: 'Standard 14',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 14 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        A A B - - -
        - - B - C C
        D E X X F G
        D E H H F G
        - - I - J J
        K K I - - -`,
    picture: undefined,
    solution: [
        'ED1', 'DD1', 'XL2', 'BD1', 'AR3',
        'BU1', 'XR2', 'EU3', 'DU3', 'HL2',
        'XL2', 'IU2', 'JL4', 'GD1', 'FD1',
        'ID1', 'XR6',
    ],
};
export default level;
