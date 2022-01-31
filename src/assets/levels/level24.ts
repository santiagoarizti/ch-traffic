
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 24,
    name: 'Standard 24',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 24 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'advanced',
    body: `
        - - A B B -
        - C A - - -
        D C X X E -
        D F F - E -
        O O O - G -
        H H - - G -`,
    picture: undefined,
    solution: [
        'CU1', 'DU2', 'FL1', 'XL2', 'AD2',
        'BL1', 'EU2', 'GU2', 'HR3', 'OR3',
        'AD2', 'FR2', 'XR2', 'CD4', 'DD4',
        'FL2', 'XL2', 'BL2', 'AU4', 'FR2',
        'XR2', 'CU2', 'OL2', 'GD1', 'XR4',
    ],
};
export default level;
