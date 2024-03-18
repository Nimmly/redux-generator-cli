#!/usr/bin/env node

import fs from 'fs';
import * as path from "path";
import {defaultStates} from "./templates/defaultStates";
import {toCamelCase} from "./utils/helpers";
import {actionsTemplate} from "./templates/actionsTemplate";
import {sliceTemplate} from "./templates/sliceTemplate";
import {typesTemplate} from "./templates/typesTemplate";
import {customHookTemplate} from "./templates/customHookTemplate";

const argvList = process.argv;

const cleanArgList = argvList.slice(2).map(arg => {
    if(arg.includes("--")){
        return  arg.replace("--",'').slice(0,arg.indexOf("=")-2)
    }
})

if(!cleanArgList.includes('name')){
    console.error('\x1b[31m%s\x1b[0m','Please provide a name for the files.');
    process.exit(1); // Exit with a non-zero code to indicate an error
}

const argMap = argvList.slice(2).map(arg => {
    if(arg.includes("--")){
        const key = arg.replace("--",'').slice(0,arg.indexOf("=")-2)
        const value = arg.slice(arg.indexOf("=")+1)
        if(key === 'name' && value !== ''){
            return {[key]:value}
        }
    }
    process.exit(-1)
});


(async () => {
    try {
        await fs.promises.access("redux/defaultStates/defaultStates.ts", fs.constants.F_OK);
        return
    } catch (err) {
        const defaultStatesPath = path.join(process.cwd(), 'redux/defaultStates');
        fs.mkdirSync(defaultStatesPath, { recursive: true });
        fs.writeFileSync(path.join(defaultStatesPath, `defaultStates.ts`), defaultStates);
    }
})();

const entityName = argMap[0].name

const basePath = path.join(process.cwd(), `redux/${toCamelCase(entityName)}`);
const hooksPath = path.join(process.cwd(), 'hooks')

fs.mkdirSync(basePath, { recursive: true });

fs.writeFileSync(path.join(basePath, `${toCamelCase(entityName)}.actions.ts`), actionsTemplate(entityName));
fs.writeFileSync(path.join(basePath, `${toCamelCase(entityName)}.slice.ts`), sliceTemplate(entityName));
fs.writeFileSync(path.join(basePath, `${toCamelCase(entityName)}.types.ts`), typesTemplate(entityName));

fs.mkdirSync(hooksPath, {recursive: true})
fs.writeFileSync(path.join(hooksPath, `use${entityName}Hook.ts`),customHookTemplate(entityName))

console.log('\x1b[34m%s\x1b[0m',`Redux entity and custom hook created`);