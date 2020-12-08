import getInput from "./getInput.mjs";

const input = await getInput("day-07-input.txt", line => {
    const parts = line.split(" contain ");

    const a = parts[0].match(/([a-z ]+)bags/);
    const key = a[1].trim();

    const regex = /(\d+) ([a-z ]+)bags?/g;
    const subRules = [ ];
    let match = null;

    while (match = regex.exec(parts[1])) {
        const subKey = match[2].trim();
        const count = parseInt(match[1]);

        for (let index = 0; index != count; index++) {
            subRules.push(subKey);
        }
    }

    return {
        key,
        subRules
    }
});

let resultHash = {

};

function countRuleAndSubRulesThatMatch(targetRules, canContainRuleName, allRules) {
    let count = 0;

    for (const rule of targetRules) {
        for (const subRule of rule.subRules || [ ]) {
            if (resultHash[subRule] !== undefined) {
                count += resultHash[subRule];
                continue;
            }

            let innerCount = 0;

            if (subRule === canContainRuleName || subRule && !canContainRuleName) {
                innerCount++;
            }

            const subTargetRules = allRules.filter(r => r.key === subRule);

            innerCount += countRuleAndSubRulesThatMatch(subTargetRules, canContainRuleName, allRules);
            count += innerCount;

            resultHash[subRule] = innerCount;
        }
    }

    return count;
}

let countCanContain = 0;

for (const rule of input) {
    const canContain = !!countRuleAndSubRulesThatMatch([rule], "shiny gold", input);

    if (canContain) {
        countCanContain++;
    }
}

resultHash = { };
console.log("part 1:");
console.log(countCanContain);

const rule = input.find(i => i.key === "shiny gold");

resultHash = { };
console.log("part 2:");
console.log(countRuleAndSubRulesThatMatch([rule], null, input));
