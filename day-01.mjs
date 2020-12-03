import getInput from "./getInput.mjs";

const input = await getInput("day-01-input.txt", input => parseInt(input));

while (input.length) {
    const first = input.shift();
    const inputCopy = input.slice();

    while (inputCopy.length) {
        const second = inputCopy.shift();

        if (first + second >= 2020) {
            continue;
        }

        for (const third of inputCopy) {
            if (first + second + third === 2020) {
                const answer = first * second * third;

                console.log(answer);
                process.exit();
            }
        }
    }
}
