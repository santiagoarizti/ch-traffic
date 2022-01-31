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
import level18 from '@/assets/levels/level18';
import level19 from '@/assets/levels/level19';
import level20 from '@/assets/levels/level20';
import level21 from '@/assets/levels/level21';
import level22 from '@/assets/levels/level22';
import level23 from '@/assets/levels/level23';
import level24 from '@/assets/levels/level24';
import level25 from '@/assets/levels/level25';
import level26 from '@/assets/levels/level26';
import level27 from '@/assets/levels/level27';
import level28 from '@/assets/levels/level28';
import level29 from '@/assets/levels/level29';
import level30 from '@/assets/levels/level30';
import level31 from '@/assets/levels/level31';
import level32 from '@/assets/levels/level32';
import level33 from '@/assets/levels/level33';
import level34 from '@/assets/levels/level34';
import level35 from '@/assets/levels/level35';

import level36 from '@/assets/levels/level36';
import level37 from '@/assets/levels/level37';
import level38 from '@/assets/levels/level38';
import level39 from '@/assets/levels/level39';
import level40 from '@/assets/levels/level40';


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
        level18,
        level19,
        level20,
        level21,
        level22,
        level23,
        level24,
        level25,
        level26,
        level27,
        level28,
        level29,
        level30,
        level31,
        level32,
        level33,
        level34,
        level35,
        level36,
        level37,
        level38,
        level39,
        level40,
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
