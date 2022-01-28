import { CarCode } from "./cars";
import { CarPosition, Move, ParsedLevel } from "./levels";

export interface LevelSnapshot {
    /** result from parseRawLevelBody */
    carsPositions: CarPosition[],
    /** all moves that have been made so far */
    history: Move[],
}

// translate moves such as U1 (up one) or R3 (right 3) to vector.
const dirMap: {[dir: string]: [x: -1|0|1, y: -1|0|1]} = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
};

export function applyMove(state: LevelSnapshot, move: Move): LevelSnapshot {
    // extract parts of move (car, directio, amount)
    const car = move[0] as CarCode;
    const dir = dirMap[move[1]];
    const d: number = parseInt(move[2]); // delta

    // find car to move in current state
    const index = state.carsPositions.findIndex(pos => pos.car === car);
    if (index < 0) {
        throw new Error(`car '${car}' not found in state provided`);
    }

    // copy the state to avoid mutating it
    const newPositions = [...state.carsPositions];
    const newPos = {...newPositions[index]};

    // first check that the car is allowed to move in that direction intrincecally
    const checkDir = newPos.horizontal ? 1 : 0;
    if (dir[checkDir] !== 0) {
        throw new Error(`car '${car}' is not oriented to allow moving in this direction`);
    }

    // make updates to origin and update the new positions
    newPositions[index] = {
        ...newPositions[index],
        origin: [
            newPos.origin[0] + d * dir[0],
            newPos.origin[1] + d * dir[1],
        ]
    };

    return {
        carsPositions: newPositions,
        history: [...state.history, move],
    };
}

/**
 * return true when the current board is in a valid state
 * this means that the cars are not colliding with other cars or with the
 * bounds of the level
 */
export function isStateValid(level: ParsedLevel, state: LevelSnapshot): boolean {
    return true; // todo:
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
