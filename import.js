const fs = require('fs');

const levelTemplate = `
import {RawLevel} from "@/lib/levels";

const level: RawLevel = {
    id: {LEVEL},
    name: 'Standard {LEVEL}',
    creator: 'RUSHHOUR',
    date: '1996-01-01',
    description: \`
        level {LEVEL} of the built-in leve sin the rush hour game,
        translated by santi.\`,
    difficulty: '{DIFFICULTY}',
    body: \`
{CARS}\`,
    picture: undefined,
    solution: [{SOLUTION}],
};
export default level;
`;

const contents = fs.readFileSync('CARS.TXT').toString().replaceAll('\r', '');

let levels = contents.split('LVL');
levels.shift(); // first is useless

for (const level of levels) {
    const levelLines = level.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let [nr, diff] = levelLines.shift().trim().split(' ');
    nr = parseInt(nr);
    diff = {B: 'beginner', I: 'intermediate', A: 'advanced', E: 'expert'}[diff];
    
    let positions = levelLines.splice(0, 6).map(p => '        ' + p).join('\n');

    let solution = levelLines.shift().split(' ').map(s => `'${s}'`).join(', ');
    
    const myLevel = levelTemplate
        .replaceAll('{LEVEL}', nr)
        .replace('{CARS}', positions)
        .replace('{DIFFICULTY}', diff)
        .replace('{SOLUTION}', solution);

    fs.writeFileSync(`src/assets/levels/level${nr}.ts`, myLevel);
}

