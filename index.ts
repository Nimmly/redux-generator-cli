#!/usr/bin/env node

import fs from 'fs';
import * as path from "path";
import {execSync} from 'child_process'

const runCommand = (command:string) => {
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch(error) {
        console.error(`Failed to execute ${error}`,error)
        return false
    }
    return true
}

const installDeps = runCommand(`npm i axios react-redux @reduxjs/toolkit`);
if(!installDeps){
    process.exit(-1)
}

const hookTemplate = `
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
`;

const storeTemplate = `
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

export const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
`;

const reducerTemplate = `
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
});

export { reducer };
`;


const basePath = path.join(process.cwd(), 'redux');
fs.mkdirSync(basePath, { recursive: true });

fs.writeFileSync(path.join(basePath, `hooks.ts`), hookTemplate);
fs.writeFileSync(path.join(basePath, `reducer.ts`), reducerTemplate);
fs.writeFileSync(path.join(basePath, `store.ts`), storeTemplate);


console.log(`Files created in ${basePath}`);
