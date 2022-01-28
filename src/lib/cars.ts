export type CarCode = 'O'|'Q'|'R'|'P'|'K'|'D'|'F'|'G'|'E'|'X'|'H'|'C'|'I'|'A'|'J'|'B';

export interface Car {
    /** id from 1-15 */
    id: number,
    /** the code that appears in the cards. */
    code: CarCode,
    /** how the car looks? give a nice name */
    name: string,
    /** css color */
    color: string,
    /** normal size is 2, large is 3 */
    size: number,
}

export function isCarCode(code: string): code is CarCode {
    return /[OQRPKDFGEXHCIAJB]/.test(code);
}

export const cars: Car[] = [{
    id: 0,
    code: 'O',
    name: 'yellow truck',
    color: 'gold',
    size: 3,
}, {
    id: 1,
    code: 'Q',
    name: 'blue truck',
    color: 'blue',
    size: 3,
}, {
    id: 2,
    code: 'R',
    name: 'green truck',
    color: 'aquamarine',
    size: 3,
}, {
    id: 3,
    code: 'P',
    name: 'purple truck',
    color: 'violet',
    size: 3,
}, {
    id: 4,
    code: 'K',
    name: 'army car',
    color: 'olive',
    size: 2,
}, {
    id: 5,
    code: 'D',
    name: 'pink car',
    color: 'pink',
    size: 2,
}, {
    id: 6,
    code: 'F',
    name: 'green car',
    color: 'seagreen',
    size: 2,
}, {
    id: 7,
    code: 'G',
    name: 'black car',
    color: 'darkslategrey',
    size: 2,
}, {
    id: 8,
    code: 'E',
    name: 'purple car',
    color: 'rebeccapurple',
    size: 2,
}, {
    id: 9,
    code: 'X',
    name: 'mcqueen',
    color: 'red',
    size: 2,
}, {
    id: 10,
    code: 'H',
    name: 'beige car',
    color: 'wheat',
    size: 2,
}, {
    id: 11,
    code: 'C',
    name: 'cyan car',
    color: 'turquoise',
    size: 2,
}, {
    id: 12,
    code: 'I',
    name: 'yellow car',
    color: 'palegoldenrod',
    size: 2,
}, {
    id: 13,
    code: 'A',
    name: 'lemon car',
    color: 'lightgreen',
    size: 2,
}, {
    id: 14,
    code: 'J',
    name: 'brown car',
    color: 'brown',
    size: 2,
}, {
    id: 15,
    code: 'B',
    name: 'orange car',
    color: 'orange',
    size: 2,
}];
