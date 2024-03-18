#!/usr/bin/env node

import fs from 'fs';
import * as path from "path";
import {execSync} from 'child_process'
import * as readline from "readline";
import {reducerTemplate} from "./templates/reducerTemplate";
import {storeTemplate} from "./templates/storeTemplate";
import {hookTemplate} from "./templates/hookTemplate";

const runCommand = (command:string) => {
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch(error) {
        console.error(`Failed to execute ${error}`,error)
        return false
    }
    return true
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const managerChoice = (choices: string[]) => {
    return new Promise((resolve, reject) => {
        const validChoices = choices.map(choice => choice.toLowerCase());
        rl.question("Which manager are you using? Yarn/Npm ", (answer) => {
            const formattedAnswer = answer.toLowerCase().trim();
            if(validChoices.includes(formattedAnswer)) {
                resolve(formattedAnswer.trim())
            } else {
                console.log('\x1b[31m%s\x1b[0m','Invalid choice. Please select one of the given options.');
                managerChoice(choices).then(resolve);
            }
        })
    })
}
(async () => {
    const choices = ["npm", "yarn"]
    const manager = await managerChoice(choices)
    rl.close();

    const npmCommands = "npm i axios react-redux @reduxjs/toolkit"
    const yarnCommands = "yarn add axios react-redux @reduxjs/toolkit"

    const installDeps = runCommand(manager === 'npm' ? npmCommands : yarnCommands);
    if(!installDeps){
        process.exit(-1)
    }
    const basePath = path.join(process.cwd(), 'redux');
    fs.mkdirSync(basePath, { recursive: true });

    fs.writeFileSync(path.join(basePath, `hooks.ts`), hookTemplate);
    fs.writeFileSync(path.join(basePath, `reducer.ts`), reducerTemplate);
    fs.writeFileSync(path.join(basePath, `store.ts`), storeTemplate);

    console.log(`Files created in ${basePath}`);
})()


