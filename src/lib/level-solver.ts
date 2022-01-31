import {Car, CarCode} from "./cars";
import {CarPosition, isValidMoveSyntax, Move, ParsedLevel} from "./levels";


/** when a state is invalid, you can find out why by peeking here. */
interface StateError {
    car: CarCode,
    errors: string[],
}

export interface LevelSnapshot {
    /** result from parseRawLevelBody */
    carsPositions: CarPosition[],
    /** all moves that have been made so far */
    history: Move[],
    /** if cars are in invalid positions the errors would appear here */
    errors?: StateError[],
}

// translate moves such as U1 (up one) or R3 (right 3) to vector.
const dirMap: {[dir: string]: [x: -1|0|1, y: -1|0|1]} = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
};

export function applyMove(state: LevelSnapshot, move: Move): LevelSnapshot {
    if (!isValidMoveSyntax(move)) {
        // this can happen in a typo during importing levels from physical cards.
        throw new Error(`invalid move syntax on move '${move}'`);
    }

    // extract parts of move (car, directio, amount)
    const car = move[0] as CarCode;
    const dir = dirMap[move[1]!]!;
    const d: number = parseInt(move[2]!); // delta

    // find car to move in current state
    const index = state.carsPositions.findIndex(pos => pos.car === car);
    if (index < 0) {
        throw new Error(`car '${car}' not found in state provided`);
    }

    // copy the state to avoid mutating it
    const newPositions = [...state.carsPositions];
    const newPos = {...newPositions[index]!};

    // first check that the car is allowed to move in that direction intrincecally
    const checkDir = newPos.horizontal ? 1 : 0;
    if (dir[checkDir] !== 0) {
        throw new Error(`car '${car}' is not oriented to allow moving in this direction '${move}'`);
    }

    // make updates to origin and update the new positions
    newPositions[index] = {
        ...newPositions[index]!,
        origin: [
            newPos.origin[0] + d * dir[0],
            newPos.origin[1] + d * dir[1],
        ],
    };

    return {
        carsPositions: newPositions,
        history: [...state.history, move],
    };
}

/**
 * based on a car size and a car position, get top left corner and bottom right
 */
export function getBoundingBox(
    car: Car,
    pos: CarPosition,
): [
    tlx: number,
    tly: number,
    brx: number,
    bry: number
] {
    return [
        pos.origin[0],
        pos.origin[1],
        pos.origin[0] + (pos.horizontal ? car.size - 1 : 0),
        pos.origin[1] + (pos.horizontal ? 0 : car.size - 1),
    ];
}

/**
 * return true when the current board is in a valid state
 * this means that the cars are not colliding with other cars or with the
 * bounds of the level
 */
export function findStateErrors(
    level: ParsedLevel,
    state: LevelSnapshot,
    cars: Car[],
): StateError[] {
    // perhaps we could explain what went wrong.
    const errors: StateError[] = [];

    // check cars 1:1 and add them to the "safe" box until one collides.
    for (let i = 0; i < state.carsPositions.length; i++) {
        const pos = state.carsPositions[i]!;

        // lets separate errors by car now
        const carErrors: string[] = [];

        // first get this car from the catalog so we can know its info
        const car = cars.find(car => car.code === pos.car);
        if (!car) {
            // this is not a car position issue, but a configuration error
            throw new Error(`car '${pos.car}'s info not provided`);
        }

        // we will be using this a lot, make a short alias
        const [x1, y1, x2, y2] = getBoundingBox(car, pos);

        // first see if it collides with the level itself.
        if (x1 < 0 || x2 >= level.size[0] || y1 < 0 || y2 >= level.size[1]) {
            if ( // out of bounds, check if he is not about to win
                !level.exit || // if level has no exit...
                level.exit[1] !== pos.car || // if exit car is not this
                level.exit[0] !== y1 || // if exit car is in wrog line
                x1 < 0 // if exit car exited from wrong side
            ) { // ...not winning
                carErrors.push(`car '${pos.car}' is out of bounds`);
            }
        }

        // now lets compare against all other cars.
        for (let j = 0; j < i; j++) {
            const prev = state.carsPositions[j]!;
            // we will be using this a lot, make a short alias
            const pcar = cars.find(car => car.code === prev.car);
            if (!pcar) throw new Error(`car '${prev.car}'s info not provided`);

            const [px1, py1, px2, py2] = getBoundingBox(pcar, prev);

            if ( // see how I compare 1 vs 2 and 2 vs 1, that is how to collide.
                x1 <= px2 && x2 >= px1 && // overlapping x coordenates
                y1 <= py2 && y2 >= py1 // overlapping y coordenates
            ) {
                carErrors.push(`car '${pos.car}' would collide with car '${prev.car}'`);
            }
        }

        if (carErrors.length > 0) {
            errors.push({car: pos.car, errors: carErrors});
        }
    }

    return errors;
}

/** return true when level is in a win condition */
export function isLevelBeat(level: ParsedLevel, state: LevelSnapshot) {
    if (level.exit) {
        const [line, car] = level.exit;
        const pos = state.carsPositions.find(p => p.car === car);
        if (pos?.origin[1] === line && pos?.origin[0] >= level.size[0]) {
            return true;
        }
    }

    return false;
}

export function testLevelSolution(level: ParsedLevel, solution: Move[], cars: Car[]) {
    const state: LevelSnapshot[] = [{
        carsPositions: level.carsPositions,
        history: [],
    }];

    if (!level.exit) {
        throw new Error('this level cannot be solved');
    }

    for (let i = 0; i < solution.length; i++) {
        const step = solution[i]!;

        const newState = applyMove(state.at(-1)!, step);

        const errors = findStateErrors(level, newState, cars);

        if (errors.length > 0) {
            for (const e of errors) {
                throw new Error(`invalid solution (${i}: ${step}): ${e.errors[0]}`);
            }
        }

        state.push(newState);
    }

    if (!isLevelBeat(level, state.at(-1)!)) {
        throw new Error('solution provided cannot solve the puzzle');
    }
}
