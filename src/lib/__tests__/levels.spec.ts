import {describe, expect, it} from "vitest";
import {Car} from "../cars";
import {parseRawLevelBody, isValidMove} from "../levels";

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

const truck: Car = {
    id: 1,
    code: 'Q',
    name: 'blue truck',
    color: 'blue',
    size: 3,
};

const cars: Car[] = [
    carA,
    mq,
    truck,
    {
        id: 0,
        code: 'O',
        name: 'yellow truck',
        color: 'gold',
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
        id: 11,
        code: 'C',
        name: 'cyan car',
        color: 'turquoise',
        size: 2,
    }, {
        id: 15,
        code: 'B',
        name: 'orange car',
        color: 'orange',
        size: 2,
    },
];

describe('function parseRawLevelBody', () => {
    it('parses a simple level size 1', () => {
        const body = `
          - -
          - -`;
        const parsed = parseRawLevelBody(body, []);
        expect(parsed.size).toEqual([2, 2]);
    });
    it('parses a simple level size 2', () => {
        const body = '- - -\n- - -';
        const parsed = parseRawLevelBody(body, []);
        expect(parsed.size).toEqual([3, 2]);
    });

    it('finds the exit 1', () => {
        const body = 'A A >A';
        const parsed = parseRawLevelBody(body, [carA]);
        expect(parsed.exit).toEqual([0, 'A']);
    });

    it('finds the exit 2', () => {
        const body = '--\n--\nXX';
        const parsed = parseRawLevelBody(body, [mq]);
        expect(parsed.exit).toEqual([2, 'X']);
    });

    it('finds car X', () => {
        const body = `
          X X
          - -`;
        const parsed = parseRawLevelBody(body, [mq]);
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [0, 0]});
    });

    it('finds car X and F', () => {
        const body = `
          - - A
          X X A`;
        const parsed = parseRawLevelBody(body, [mq, carA]);
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [0, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'A', horizontal: false, origin: [2, 0]});
    });

    it('finds all cars and exit in complex level', () => {
        const body = `
          A A - - - O >A
          P - - Q - O
          P X X Q - O
          P - - Q - -
          B - - - C C
          B - R R R -`;
        const parsed = parseRawLevelBody(body, cars);
        expect(parsed.carsPositions).toContainEqual({car: 'A', horizontal: true, origin: [0, 0]});
        expect(parsed.carsPositions).toContainEqual({car: 'P', horizontal: false, origin: [0, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'B', horizontal: false, origin: [0, 4]});
        expect(parsed.carsPositions).toContainEqual({car: 'X', horizontal: true, origin: [1, 2]});
        expect(parsed.carsPositions).toContainEqual({car: 'Q', horizontal: false, origin: [3, 1]});
        expect(parsed.carsPositions).toContainEqual({car: 'R', horizontal: true, origin: [2, 5]});
        expect(parsed.carsPositions).toContainEqual({car: 'O', horizontal: false, origin: [5, 0]});
        expect(parsed.carsPositions).toContainEqual({car: 'C', horizontal: true, origin: [4, 4]});
        expect(parsed.exit).toEqual([0, 'A']);
        expect(parsed.size).toEqual([6, 6]);
    });

    // fail expectations:

    it('detects a corrupt file, incomplete car', () => {
        const body = 'A -\n- -';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`car 'A' is incomplete`);
    });
    it('detects a corrupt file, unexpected characters in body', () => {
        const body = '- .\n- -';
        expect(() => parseRawLevelBody(body, [])).toThrowError(`unexpected char '.' found in body`);
    });
    it('detects a corrupt file, duplicated car', () => {
        const body = 'A A -\n- - A\n- - A';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`car 'A' is duplicated`);
    });
    it('detects a corrupt file, duplicated car 2', () => {
        const body = 'A A\nA A';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`car 'A' is duplicated`);
    });
    it('detects a corrupt file, exit car not found in cars', () => {
        const body = '- - >A';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`car 'A' expected as exit, but not found in cars`);
    });
    it('detects a corrupt file, exit car not in correct line', () => {
        const body = 'A A\n- - >A';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`exit car 'A' is not in the correct line`);
    });
    it('detects a corrupt file, exit car not horizontal', () => {
        const body = 'A -\nA - >A';
        expect(() => parseRawLevelBody(body, [carA])).toThrowError(`exit car 'A' is not horizontal`);
    });
});

describe('isValidMove function', () => {
    it('finds a valid move', () => {
        const move = 'AU1';
        const valid = isValidMove(move);
        expect(valid).toBeTruthy();
    });
    it('finds a valid move 2', () => {
        const move = 'FD6';
        const valid = isValidMove(move);
        expect(valid).toBeTruthy();
    });
    it('finds an invalid move', () => {
        const move = 'XXX';
        const valid = isValidMove(move);
        expect(valid).toBeFalsy();
    });
    it('finds an invalid move', () => {
        const move = 'XU7';
        const valid = isValidMove(move);
        expect(valid).toBeFalsy();
    });
    it('finds an invalid move', () => {
        const move = '.U1';
        const valid = isValidMove(move);
        expect(valid).toBeFalsy();
    });
});
