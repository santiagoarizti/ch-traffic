import {Car, CarCode, isCarCode} from './cars';

/** valid moves to solve a puzzle, e.g. FU3, QD1, XR5 */
export type Move = string; // `${CarCode}${'U'|'D'|'R'|'L'}${1|2|3|4|5|6}`; (this was causing unreadable type declarations)

export function isValidMoveSyntax(move: string): move is Move {
    return /^.[UDRL][1-6]$/.test(move) && isCarCode(move[0]!);
}

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

export interface CarPosition {
    /** which car was detected */
    car: CarCode,
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
    exit?: [number, CarCode],
}

export interface GameLevel extends Omit<RawLevel, 'body'>, ParsedLevel {}

export function parseRawLevelBody(body: string, cars: Car[]): ParsedLevel {

    // easier to work with a clean string, no spaces and empty lines.
    const cleanBody = body.replaceAll(' ', '').replaceAll('\r', '').trim();
    // should have only the level lines, no padding, no gutters.
    const lines = cleanBody.split('\n');

    // get the exit line first. this default value is the standard one.
    let exit: ParsedLevel['exit'];
    const exitLine = lines.findIndex(l => l.indexOf('>') > 0);
    if (exitLine >= 0) {
        const match = lines[exitLine]!.match(/>(\w)/);
        const exitCar = match?.[1] ?? 'X';
        if (isCarCode(exitCar)) {
            exit = [exitLine, exitCar];
        }
        // now the grid is pure, it has no exit line info.
        lines[exitLine] = lines[exitLine]!.replace(/>.*$/, '').trim();
    }

    // detected size of level, simply count lines and max length of lines to find size.
    const levelSize: [number, number] = [lines.reduce((max, l) => Math.max(max, l.length), 0), lines.length];

    /** cars ready to be responded. */
    const posMap = new Map<CarCode, CarPosition>();

    // now the grid only contains useful information for finding the size.
    for (let l = 0; l < lines.length; l++) {
        for (let i = 0; i < lines[l]!.length; i++) {
            if (lines[l]![i] === '-') {
                continue; // separator character, ignore
            }

            const car = cars.find(car => car.code === lines[l]![i]);

            if (!car) {
                throw new Error(`unexpected char '${lines[l]![i]}' found in body`);
            }

            // helper array to find cars more easily
            const len = Array(car.size).fill(0).map((_, i) => i);

            const pos = posMap.get(car.code);
            if (pos) {
                // means we already had found this car, we could be simply in another part of the same car (likely),
                // or we could have a duplicated car (unlikely, but could happen in a broken file).
                // we only need to check if we are in the bounds of the originally found car
                // otherwise we have a duplicate.
                if (pos.horizontal) {
                    if (l !== pos.origin[1] || i < pos.origin[0] || i > pos.origin[0] + car.size) {
                        throw new Error(`car '${car.code}' is duplicated`);
                    }
                } else {
                    if (i !== pos.origin[0] || l < pos.origin[1] || l > pos.origin[1] + car.size) {
                        throw new Error(`car '${car.code}' is duplicated`);
                    }
                }
            } else {
                // first time seeing this car, lets just make sure it is complete and find if it is horizontal
                // or vertical.
                let horizontal: boolean;
                if (len.every(d => lines[l]![i + d] === car.code)) {
                    horizontal = true;
                } else if(len.every(d => lines[l + d]?.[i] === car.code)) {
                    horizontal = false;
                } else {
                    throw new Error(`car '${car.code}' is incomplete`);
                }

                posMap.set(car.code, {
                    car: car.code,
                    horizontal,
                    origin: [i, l], // our coordinates must be the origin, because we are at "else" block.
                });
            }
        }
    }

    // assign default exit car if found in the cars in the map
    if (!exit) {
        const dc = posMap.get('X'); // default car
        if (dc) {
            exit = [dc.origin[1], dc.car];
        }
    }

    // make sure exit is correctly configured (car found and car in correct line)
    if (exit) {
        const exitCar = posMap.get(exit[1]);
        if (exitCar) {
            if (!exitCar.horizontal) {
                throw new Error(`exit car '${exit[1]}' is not horizontal`);
            }
            if (exit[0] !== exitCar.origin[1]) {
                throw new Error(`exit car '${exit[1]}' is not in the correct line`);
            }
        } else {
            throw new Error(`car '${exit[1]}' expected as exit, but not found in cars`);
        }
    }

    return {
        size: levelSize,
        carsPositions: [...posMap.values()],
        exit,
    };
}
