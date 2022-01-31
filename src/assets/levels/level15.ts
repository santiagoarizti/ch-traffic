
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 15,
    name: 'Standard 15',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 15 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'intermediate',
    body: `
        - A A B B -
        C C D D O P
        Q R X X O P
        Q R E F O P
        Q R E F G G
        - H H I I -`,
    picture: undefined,
    solution: [
        'IR1', 'HR1', 'RD1', 'QD1', 'XL2',
        'FU1', 'EU1', 'GL2', 'PD1', 'OD1',
        'DR2', 'BR1', 'FU2', 'AL1', 'EU2',
        'XR2', 'RU1', 'QU1', 'HL2', 'IL2',
        'PD1', 'OD1', 'XR4',
    ],
};
export default level;
