import {cars} from './cars';
import {GameLevel, parseRawLevelBody} from './levels';
import level0 from '@/assets/levels/level0';
import level1 from '@/assets/levels/level1';
import level2 from '@/assets/levels/level2';
import level3 from '@/assets/levels/level3';
import level4 from '@/assets/levels/level4';
import level5 from '@/assets/levels/level5';
import level6 from '@/assets/levels/level6';
import level7 from '@/assets/levels/level7';
import level8 from '@/assets/levels/level8';
import level9 from '@/assets/levels/level9';
import level10 from '@/assets/levels/level10';
import level11 from '@/assets/levels/level11';
import level12 from '@/assets/levels/level12';
import level13 from '@/assets/levels/level13';
import level14 from '@/assets/levels/level14';
import level15 from '@/assets/levels/level15';
import level16 from '@/assets/levels/level16';
import level17 from '@/assets/levels/level17';


export function getStandardLevels(): GameLevel[] {
    const rawLevels = [
        level0,
        level1,
        level2,
        level3,
        level4,
        level5,
        level6,
        level7,
        level8,
        level9,
        level10,
        level11,
        level12,
        level13,
        level14,
        level15,
        level16,
        level17,
    ];

    const gameLevels: GameLevel[] = [];
    for (const level of rawLevels) {
        try {
            const parsed = parseRawLevelBody(level.body, cars);
            gameLevels.push({
                ...level,
                ...parsed,
            });
        } catch (err) {
            console.log(`Error loading level '${level.id}'`, err);
        }
    }

    return gameLevels;
}