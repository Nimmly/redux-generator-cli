"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookTemplate = void 0;
exports.hookTemplate = `
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
`;
