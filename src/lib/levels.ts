import type {Car} from './cars';

/** valid moves to solve a puzzle, e.g. FU3, QD1, XR5 */
type Move = `${Car["code"]}${'U'|'D'|'R'|'L'}${1|2|3|4|5}`;

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
    /** this is the content of the level, should be parsed to extract cars initial positions and orientations */
    body: string,
    /** I am thinking of scanning the level cards, not yet done. */
    picture?: string,
    /** if provided, contains notation for moving cars inside the grid */
    solution?: Move[],
}
