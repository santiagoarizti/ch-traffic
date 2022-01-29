import { beforeEach, describe, expect, it } from "vitest";
import { Car } from "../cars";
import { applyMove, isLevelBeat, findStateErrors, LevelSnapshot } from "../level-solver";
import { Move, ParsedLevel } from "../levels";

describe('function isLevelBeat', () => {
    let level: ParsedLevel;
    beforeEach(() => {
        level = {
            size: [6, 6],
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [0, 2],
            }],
            exit: [2, 'X'],
        };
    });

    it('knows when level is beat', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [6, 2],
            }],
            history: [],
        };
        const isBeat = isLevelBeat(level, state);
        expect(isBeat).toBeTruthy();
    });
    it('knows when level is not beat', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [3, 2],
            }],
            history: [],
        };
        const isBeat = isLevelBeat(level, state);
        expect(isBeat).toBeFalsy();
    });
});

describe('function applyMove', () => {
    let state: LevelSnapshot;
    beforeEach(() => {
        state = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }],
            history: [],
        };
    });

    it('applies move correctly', () => {
        const move: Move = 'XR1';
        const newState = applyMove(state, move);
        expect(newState.history.at(-1)).toEqual(move);
        const myPos = newState.carsPositions.find(p => p.car === 'X');
        expect(myPos?.origin).toEqual([3, 2]);
    });

    it('fails on invalid move, incorrect direction', () => {
        const move: Move = 'XD1';
        expect(() => applyMove(state, move)).toThrowError(`car 'X' is not oriented to allow moving in this direction`);
    });

    it('fails on invalid move, missing car', () => {
        const move: Move = 'AR1';
        expect(() => applyMove(state, move)).toThrowError(`car 'A' not found in state provided`);
    });
});

describe('findStateErrors function', () => {
    let level: ParsedLevel;
    const carA: Car = {
        id: 13,
        code: 'A',
        name: 'lemon car',
        color: 'lightgreen',
        size: 2,
    };
    const mq: Car = {
        id: 9,
        code: 'X',
        name: 'mcqueen',
        color: 'red',
        size: 2,
    };
    beforeEach(() => {
        level = {
            size: [6, 6],
            carsPositions: [],
            exit: [2, 'X'],
        };
    });

    // single car tests:

    it('finds a valid state, easy', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq]);
        expect(errors).toHaveLength(0);
    });
    it('fails because not enough data', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }],
            history: [],
        };
        expect(() => findStateErrors(level, state, [])).toThrowError();
    });
    it('finds a valid state, exit car is about to win', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [5, 2],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq]);
        expect(errors).toHaveLength(0);
    });
    it('finds an invalid state, car out of bounds on one end', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [5, 0],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq]).find(e => e.car === 'X')?.errors ?? [];
        expect(errors).toContain(`car 'X' is out of bounds`);
    });
    it('finds an invalid state, exit car exited on wrong side', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [-1, 0],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq]).find(e => e.car === 'X')?.errors ?? [];
        expect(errors).toContain(`car 'X' is out of bounds`);
    });

    // multi car tests:

    it('finds a valid state, multi car', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }, {
                car: 'A',
                horizontal: true,
                origin: [2, 3],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq, carA]);
        expect(errors).toHaveLength(0);
    });
    it('finds an ivalid state, multi car, head on collision', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }, {
                car: 'A',
                horizontal: true,
                origin: [3, 2],
            }],
            history: [],
        };

        const errors = findStateErrors(level, state, [mq, carA]).find(e => e.car === 'A')?.errors ?? [];
        expect(errors).toContain(`car 'A' would collide with car 'X'`);
    });
    it('finds an ivalid state, multi car, side collision', () => {
        const state: LevelSnapshot = {
            carsPositions: [{
                car: 'X',
                horizontal: true,
                origin: [2, 2],
            }, {
                car: 'A',
                horizontal: false,
                origin: [3, 1],
            }],
            history: [],
        };
        const errors = findStateErrors(level, state, [mq, carA]).find(e => e.car === 'A')?.errors ?? [];
        expect(errors).toContain(`car 'A' would collide with car 'X'`);
    });
});
