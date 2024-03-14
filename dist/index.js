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
const installDeps = runCommand(`npm i axios react-redux @reduxjs/toolkit`);
if (!installDeps) {
    process.exit(-1);
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
fs_1.default.mkdirSync(basePath, { recursive: true });
fs_1.default.writeFileSync(path.join(basePath, `hooks.ts`), hookTemplate);
fs_1.default.writeFileSync(path.join(basePath, `reducer.ts`), reducerTemplate);
fs_1.default.writeFileSync(path.join(basePath, `store.ts`), storeTemplate);
console.log(`Files created in ${basePath}`);
