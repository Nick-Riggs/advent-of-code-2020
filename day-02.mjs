import getInput from "./getInput.mjs";

const input = await getInput("day-02-input.txt", input => {
    const matches = input.match(/(\d+)-(\d+) (.): (.+)/);

    return {
        pos1: matches[1],
        pos2: matches[2],
        letter: matches[3],
        password: matches[4]
    }
});

const validPasswords = input.filter(input => {
    const letter1 = input.password.charAt(input.pos1 - 1);
    const letter2 = input.password.charAt(input.pos2 - 1);

    if (letter1 === letter2) {
        return false;
    }

    return letter1 === input.letter || letter2 === input.letter
});

console.log(validPasswords.length);
