import { createReadStream } from "fs";
import { createInterface } from "readline";

export default function getInput(filename, parser = input => input) {
    return new Promise(resolve => {
        const stream = createReadStream(filename);
        const readline = createInterface(stream);
        const result = [ ];

        readline.on("line", line => { result.push(parser(line)) });
        readline.on("close", () => { resolve(result) })
    });
}
