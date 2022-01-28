import {Car, isCarCode} from './cars';

/** valid moves to solve a puzzle, e.g. FU3, QD1, XR5 */
type Move = `${Car['code']}${'U'|'D'|'R'|'L'}${1|2|3|4|5}`;

export interface RawLevel {
    /** unique for programatic purposes */
    id: number,
    /** name, can be used to display as the title of the game */
    name: string,
    /** name of the person/entity who created this leve. */
    creator: string,
    /** in the iso format 2021-01-27 (yaml might add more information), but still can do `new Date(date)` */
    date: string,
    /** info about this level */
    description: string,
    /** this map was copied from rushhour */
    difficulty?: 'beginner'|'intermediate'|'advanced'|'expert',
    /**
     * this is the content of the level, should be parsed to extract cars initial positions and orientations
     * white spaces are all ignored, except linebreaks.
     * capital letters should be the code of a car.
     * the special token '>' is for determining where the exit is and which car should exit
     * the standard is >X
     * the hyphen symbol '-' is just an indication of empty grid cell.
     */
    body: string,
    /** I am thinking of scanning the level cards, not yet done. */
    picture?: string,
    /** if provided, contains notation for moving cars inside the grid */
    solution?: Move[],
}

interface CarPosition {
    /** which car was detected */
    car: Car['code'],
    /** true when horizontal, false when vertical */
    horizontal: boolean,
    /** position where this car't top-left corner should be placed. */
    origin: [number, number],
}

export interface ParsedLevel {
    /** the detected size of the grid (x, y) */
    size: [number, number],
    /** result from parseRawLevelBody */
    carsPositions: CarPosition[],
    /** row number in which the exit is located and the code of the car that must exit. */
    exit: [number, Car['code']],
}

export function parseRawLevelBody(body: string): ParsedLevel {
    // easier to work with a clean string, no spaces and empty lines.
    const cleanBody = body.replaceAll(' ', '').replaceAll('\r', '').trim();
    // should have only the level lines, no padding, no gutters.
    const lines = cleanBody.split('\n');

    // get the exit line first. this default value is the standard one.
    let exit: ParsedLevel['exit'] = [2, 'X'];
    const exitLine = lines.findIndex(l => l.indexOf('>') > 0);
    if (exitLine >= 0) {
        const match = lines[exitLine].match(/>(\w)/);
        const exitCar = match?.[1] ?? 'X';
        if (isCarCode(exitCar)) {
            exit = [exitLine, exitCar];
        }
        // now the grid is pure, it has no exit line info.
        lines[exitLine] = lines[exitLine].replace(/>.*$/, '').trim();
    }

    //const carsMap: {[code in Car['code']]: CarPosition} = {};
    const carsMap = new Map<Car['code'], CarPosition>();

    // now the grid only contains useful information for finding the size.
    for (let l = 0; l < lines.length; l++) {
        for (let i = 0; i < lines[l].length; i++) {
            const c = lines[l][i];
            if (isCarCode(c)) {
                const car = carsMap.get(c);
                if (car) {
                    if (car.origin[0] === i - 1) {
                        // means necessarily that car is horizontal
                        car.horizontal = true;
                    }
                } else {
                    carsMap.set(c, {
                        car: c,
                        horizontal: false, // default false, easier this way.
                        origin: [i, l],
                    });
                }
            }
        }
    }

    return {
        size: [lines.reduce((max, l) => Math.max(max, l.length), 0), lines.length],
        carsPositions: [...carsMap.values()],
        exit,
    };
}
