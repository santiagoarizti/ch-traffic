export interface Car {
    /** id from 1-15 */
    id: number,
    /** the code that appears in the cards. */
    code: 'O'|'Q'|'R'|'P'|'K'|'D'|'F'|'G'|'E'|'X'|'H'|'C'|'I'|'A'|'J'|'B',
    /** how the car looks? give a nice name */
    name: string,
    /** css color */
    color: string,
    /** normal size is 2, large is 3 */
    large: boolean,
}

export function isCarCode(code: string): code is Car['code'] {
    return /[OQRPKDFGEXHCIAJB]/.test(code);
}

export const cars: Car[] = [{
    id: 0,
    code: 'O',
    name: 'yellow truck',
    color: 'gold',
    large: true,
}, {
    id: 1,
    code: 'Q',
    name: 'blue truck',
    color: 'blue',
    large: true,
}, {
    id: 2,
    code: 'R',
    name: 'green truck',
    color: 'aquamarine',
    large: true,
}, {
    id: 3,
    code: 'P',
    name: 'purple truck',
    color: 'violet',
    large: true,
}, {
    id: 4,
    code: 'K',
    name: 'army car',
    color: 'olive',
    large: false,
}, {
    id: 5,
    code: 'D',
    name: 'pink car',
    color: 'pink',
    large: false,
}, {
    id: 6,
    code: 'F',
    name: 'green car',
    color: 'seagreen',
    large: false,
}, {
    id: 7,
    code: 'G',
    name: 'black car',
    color: 'darkslategrey',
    large: false,
}, {
    id: 8,
    code: 'E',
    name: 'purple car',
    color: 'rebeccapurple',
    large: false,
}, {
    id: 9,
    code: 'X',
    name: 'mcqueen',
    color: 'red',
    large: false,
}, {
    id: 10,
    code: 'H',
    name: 'beige car',
    color: 'wheat',
    large: false,
}, {
    id: 11,
    code: 'C',
    name: 'cyan car',
    color: 'turquoise',
    large: false,
}, {
    id: 12,
    code: 'I',
    name: 'yellow car',
    color: 'palegoldenrod',
    large: false,
}, {
    id: 13,
    code: 'A',
    name: 'lemon car',
    color: 'lightgreen',
    large: false,
}, {
    id: 14,
    code: 'J',
    name: 'brown car',
    color: 'brown',
    large: false,
}, {
    id: 15,
    code: 'B',
    name: 'orange car',
    color: 'orange',
    large: false,
}];
