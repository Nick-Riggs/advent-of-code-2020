import getInput from "./getInput.mjs";

const input = await getInput("day-05-input.txt", line => ({
    rowId: line.substr(0, 7),
    columnId: line.substr(7),
    seatId: null
}));

function parsePartitioning(code, zoneSize, upperIndicator) {
    let position = 0;

    for (const char of code) {
        zoneSize /= 2;

        if (char === upperIndicator) {
            position += zoneSize;
        }
    }

    return position;
}

for (const pass of input) {
    pass.row = parsePartitioning(pass.rowId, 128, "B");
    pass.column = parsePartitioning(pass.columnId, 8, "R");
    pass.id = (pass.row * 8) + pass.column;
}

const ids = input.map(i => i.id).sort((a, b) => a > b ? 1 : -1);
const maximumId = ids[ids.length - 1];

console.log(maximumId);

let lastId = null;

for (const id of ids) {
    if (lastId !== null) {
        const expectedId = lastId + 1;

        if (id !== expectedId) {
            console.log(expectedId);
        }
    }

    lastId = id;
}
