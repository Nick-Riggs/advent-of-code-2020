import getInput from "./getInput.mjs";

const input = await getInput("day-03-input.txt");
const maxX = input[0].length;
const maxY = input.length;

function traverse(slopeX, slopeY) {
    let x = 0;
    let y = 0;
    let count = 0;

    while (y < maxY) {
        const line = input[y]

        if (line.charAt(x) === "#") {
            count++;
        }

        x = (x + slopeX) % maxX;
        y += slopeY
    }

    return count;
}

const slopes = [ { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }];

const result = slopes.reduce((result, slope) => {
    return result * traverse(slope.x, slope.y);
}, 1);

console.log(result);

