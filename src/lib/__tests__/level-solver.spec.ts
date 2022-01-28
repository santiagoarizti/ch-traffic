import { beforeEach, describe, expect, it } from "vitest";
import { applyMove, isLevelBeat, LevelSnapshot } from "../level-solver";
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
        const myPos = newState.carsPositions.find(p => p.car === 'X')!;
        expect(myPos.origin).toEqual([3, 2]);
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
