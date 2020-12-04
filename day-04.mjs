import getInput from "./getInput.mjs";

let input = await getInput("day-04-input.txt", line => {
    if (!line) {
        return null;
    }

    const result = { };

    for (const keyValueUnparsed of line.split(" ")) {
        const keyValue = keyValueUnparsed.split(":");

        result[keyValue[0]] = keyValue[1];
    }

    return result;
});

input = input.reduce((result, current) => {
    if (!current) {
        result.push({ });
        return result;
    }

    if (!result.length) {
        result.push(current);
    }
    else {
        Object.assign(result[result.length - 1], current);
    }

    return result;
}, [ ]);

const validateRange = (value, from, to) => value >= from && value <= to;
const validateHeight = (v) => {
    const match = v.match(/^(\d+)(cm|in)$/);

    if (!match) {
        return false;
    }

    if (match[2] === "cm") {
        return validateRange(match[1], 150, 193);
    }
    else {
        return validateRange(match[1], 59, 76);
    }
}

const validations = {
    byr: v => !!v && validateRange(v, 1920, 2002),
    iyr: v => !!v && validateRange(v, 2010, 2020),
    eyr: v => !!v && validateRange(v, 2020, 2030),
    hgt: v => !!v && validateHeight(v),
    hcl: v => !!v && v.match(/^#[0-9a-f]{6}$/),
    ecl: v => !!v && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
    pid: v => !!v && v.match(/^\d{9}$/),
    cid: v => true
};

for (const id of input) {
    id.valid = true;

    for (const validationKey in validations) {
        const validation = validations[validationKey];
        const valid = validation(id[validationKey]);

        if (!valid) {
            id.valid = false;
            break;
        }
    }
}

console.log(input.filter(i => i.valid).length);
