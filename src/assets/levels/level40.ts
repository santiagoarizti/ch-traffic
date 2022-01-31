
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: 40,
    name: 'Standard 40',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: `
        level 40 of the built-in leve sin the rush hour game,
        translated by santi.`,
    difficulty: 'expert',
    body: `
        O A A - B -
        O C D - B P
        O C D X X P
        Q Q Q E - P
        - - F E G G
        H H F I I -`,
    picture: undefined,
    solution: [
        'PU1', 'IR1', 'ED1', 'QR3', 'FU1',
        'HR1', 'OD3', 'AL1', 'DU1', 'CD2',
        'XL3', 'BD1', 'DD1', 'AR3', 'DU1',
        'XR2', 'OU3', 'HL1', 'FD1', 'CU3',
        'QL3', 'PD1', 'XL1', 'AR1', 'EU4',
        'QR2', 'XR1', 'CD3', 'XL1', 'ED1',
        'AL1', 'PU1', 'QR1', 'FU1', 'HR1',
        'OD3', 'XL1', 'DD1', 'AL3', 'BU1',
        'EU1', 'DU1', 'XR3', 'OU1', 'HL1',
        'FD1', 'IL1', 'GL1', 'QL1', 'PD3',
        'XR3',
    ],
};
export default level;
