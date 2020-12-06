import getInput from "./getInput.mjs";

let input = await getInput("day-06-input.txt", line => {
    if (!line) {
        return null;
    }

    const result = { };

    for (const char of line) {
        result[char] = true;
    }

    return result;
});

input = input.reduce((result, current) => {
    if (!current) {
        result.push(undefined);
        return result;
    }

    if (!result.length) {
        result.push(current);
    }
    else {
        const other = result[result.length - 1];

        if (!other) {
            result[result.length - 1] = current;
        }
        else {
            for (const key in current) {
                if (!other[key]) {
                    delete other[key];
                }
            }

            for (const key in other) {
                if (!current[key]) {
                    delete other[key];
                }
            }
        }
    }

    return result;
}, [ ]);

const count = input.reduce((result, current) => result + Object.keys(current).length, 0);

console.log(count);
