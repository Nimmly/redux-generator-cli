"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTemplate = void 0;
exports.storeTemplate = `
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
