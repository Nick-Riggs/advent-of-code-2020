import getInput from "./getInput.mjs";

const operations = {
    acc: (context, value) => {
        context.accumulator += value;
        context.line++;
    },
    jmp: (context, value) => {
        context.line += value;
    },
    nop: (context, value) => {
        context.line++;
    }
}

const input = await getInput("day-08-input.txt", line => {
    const parts = line.split(" ");
    const operation = operations[parts[0]];
    const value = parseInt(parts[1]);

    return {
        executions: 0,
        operation,
        call: function(context) {
            this.executions++;
            this.operation(context, value)
        }
    }
});

function runProgram(program, exitOnLoop = false) {
    for (const instruction of program) {
        instruction.executions = 0;
    }

    const context = {
        accumulator: 0,
        line: 0,
        exit: false,
        exitedOnLoop: false,
        cleanExit: false
    }

    while (!context.exit) {
        const instruction = program[context.line];

        if (!instruction) {
            context.exit = true;
            context.cleanExit = context.line === program.length;
            continue;
        }

        if (instruction.executions >= 1 && exitOnLoop) {
            context.exit = true;
            context.exitedOnLoop = true;
            continue;
        }

        instruction.call(context);
    }

    return context;
}

const operationSwap = (instruction) => {
    if (instruction.operation === operations.jmp) {
        instruction.operation = operations.nop;
        return true;
    }

    if (instruction.operation === operations.nop) {
        instruction.operation = operations.jmp;
        return true;
    }

    return false;
}

for (const instruction of input) {
    const changedProgram = operationSwap(instruction);

    if (!changedProgram) {
        continue;
    }

    const result = runProgram(input, true);

    operationSwap(instruction);

    if (!result.exitedOnLoop) {
        console.dir(result)
        break;
    }
}
