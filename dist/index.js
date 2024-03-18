#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const readline = __importStar(require("readline"));
const reducerTemplate_1 = require("./templates/reducerTemplate");
const storeTemplate_1 = require("./templates/storeTemplate");
const hookTemplate_1 = require("./templates/hookTemplate");
const runCommand = (command) => {
    try {
        (0, child_process_1.execSync)(`${command}`, { stdio: 'inherit' });
    }
    catch (error) {
        console.error(`Failed to execute ${error}`, error);
        return false;
    }
    return true;
};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const managerChoice = (choices) => {
    return new Promise((resolve, reject) => {
        const validChoices = choices.map(choice => choice.toLowerCase());
        rl.question("Which manager are you using? Yarn/Npm ", (answer) => {
            const formattedAnswer = answer.toLowerCase().trim();
            if (validChoices.includes(formattedAnswer)) {
                resolve(formattedAnswer.trim());
            }
            else {
                console.log('\x1b[31m%s\x1b[0m', 'Invalid choice. Please select one of the given options.');
                managerChoice(choices).then(resolve);
            }
        });
    });
};
(async () => {
    const choices = ["npm", "yarn"];
    const manager = await managerChoice(choices);
    rl.close();
    const npmCommands = "npm i axios react-redux @reduxjs/toolkit";
    const yarnCommands = "yarn add axios react-redux @reduxjs/toolkit";
    const installDeps = runCommand(manager === 'npm' ? npmCommands : yarnCommands);
    if (!installDeps) {
        process.exit(-1);
    }
    const basePath = path.join(process.cwd(), 'redux');
    fs_1.default.mkdirSync(basePath, { recursive: true });
    fs_1.default.writeFileSync(path.join(basePath, `hooks.ts`), hookTemplate_1.hookTemplate);
    fs_1.default.writeFileSync(path.join(basePath, `reducer.ts`), reducerTemplate_1.reducerTemplate);
    fs_1.default.writeFileSync(path.join(basePath, `store.ts`), storeTemplate_1.storeTemplate);
    console.log(`Files created in ${basePath}`);
})();
