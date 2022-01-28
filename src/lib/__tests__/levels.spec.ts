import { describe, expect, it } from "vitest";
import { parseRawLevelBody } from "../levels";

describe('function parseRawLevelBody', () => {
    it('parses a simple level size 1', () => {
        const body = `
          - -
          - -`;
        const parsed = parseRawLevelBody(body);
        expect(parsed.size).toEqual([2, 2]);
    });
    it('parses a simple level size 2', () => {
        const body = '- - -\n- - -';
        const parsed = parseRawLevelBody(body);
        expect(parsed.size).toEqual([3, 2]);
    });

    it('finds the exit 1', () => {
        const body = '-->F';
        const parsed = parseRawLevelBody(body);
        expect(parsed.exit).toEqual([0, 'F']);
    });

    it('finds the exit 2', () => {
        const body = '--\n--\n--';
        const parsed = parseRawLevelBody(body);
        expect(parsed.exit).toEqual([2, 'X']);
    });

    it('finds car X', () => {
        const body = `
          X X
          - -`;
        const parsed = parseRawLevelBody(body);
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [0, 0]});
    });

    it('finds car X and F', () => {
        const body = `
          - - F
          X X F`;
        const parsed = parseRawLevelBody(body);
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [0, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'F', horizontal: false, origin: [2, 0]});
    });

    it('finds all cars and exit in complex level', () => {
        const body = `
          A A - - - O
          P - - Q - O
          P X X Q - O
          P - - Q - - >Q
          B - - - C C
          B - R R R -`;
        const parsed = parseRawLevelBody(body);
        expect(parsed.carsPositions).toContainEqual({car: 'A', horizontal: true, origin: [0, 0]});
        expect(parsed.carsPositions).toContainEqual({car: 'P', horizontal: false, origin: [0, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'B', horizontal: false, origin: [0, 4]});
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [1, 2]});
        expect(parsed.carsPositions).toContainEqual({car: 'Q', horizontal: false, origin: [3, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'R', horizontal: true, origin: [2, 5]});
        expect(parsed.carsPositions).toContainEqual({car: 'O', horizontal: false, origin: [5, 0]});
        expect(parsed.carsPositions).toContainEqual({car: 'C', horizontal: true, origin: [4, 4]});
        expect(parsed.exit).toEqual([3, 'Q']);
        expect(parsed.size).toEqual([6, 6]);
    });
});
