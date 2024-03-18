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
const defaultStates_1 = require("./templates/defaultStates");
const helpers_1 = require("./utils/helpers");
const actionsTemplate_1 = require("./templates/actionsTemplate");
const sliceTemplate_1 = require("./templates/sliceTemplate");
const typesTemplate_1 = require("./templates/typesTemplate");
const customHookTemplate_1 = require("./templates/customHookTemplate");
const argvList = process.argv;
const cleanArgList = argvList.slice(2).map(arg => {
    if (arg.includes("--")) {
        return arg.replace("--", '').slice(0, arg.indexOf("=") - 2);
    }
});
if (!cleanArgList.includes('name')) {
    console.error('\x1b[31m%s\x1b[0m', 'Please provide a name for the files.');
    process.exit(1); // Exit with a non-zero code to indicate an error
}
const argMap = argvList.slice(2).map(arg => {
    if (arg.includes("--")) {
        const key = arg.replace("--", '').slice(0, arg.indexOf("=") - 2);
        const value = arg.slice(arg.indexOf("=") + 1);
        if (key === 'name' && value !== '') {
            return { [key]: value };
        }
    }
    process.exit(-1);
});
(async () => {
    try {
        await fs_1.default.promises.access("redux/defaultStates/defaultStates.ts", fs_1.default.constants.F_OK);
        return;
    }
    catch (err) {
        const defaultStatesPath = path.join(process.cwd(), 'redux/defaultStates');
        fs_1.default.mkdirSync(defaultStatesPath, { recursive: true });
        fs_1.default.writeFileSync(path.join(defaultStatesPath, `defaultStates.ts`), defaultStates_1.defaultStates);
    }
})();
const entityName = argMap[0].name;
const basePath = path.join(process.cwd(), `redux/${(0, helpers_1.toCamelCase)(entityName)}`);
const hooksPath = path.join(process.cwd(), 'hooks');
fs_1.default.mkdirSync(basePath, { recursive: true });
fs_1.default.writeFileSync(path.join(basePath, `${(0, helpers_1.toCamelCase)(entityName)}.actions.ts`), (0, actionsTemplate_1.actionsTemplate)(entityName));
fs_1.default.writeFileSync(path.join(basePath, `${(0, helpers_1.toCamelCase)(entityName)}.slice.ts`), (0, sliceTemplate_1.sliceTemplate)(entityName));
fs_1.default.writeFileSync(path.join(basePath, `${(0, helpers_1.toCamelCase)(entityName)}.types.ts`), (0, typesTemplate_1.typesTemplate)(entityName));
fs_1.default.mkdirSync(hooksPath, { recursive: true });
fs_1.default.writeFileSync(path.join(hooksPath, `use${entityName}Hook.ts`), (0, customHookTemplate_1.customHookTemplate)(entityName));
console.log('\x1b[34m%s\x1b[0m', `Redux entity and custom hook created`);
