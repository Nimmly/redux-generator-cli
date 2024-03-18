"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStates = void 0;
exports.defaultStates = `
import { SerializedError } from "@reduxjs/toolkit";

export type RequestState = {
  loading: boolean;
  success: boolean;
  error?: SerializedError | unknown;
};

export const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

export const pendingState: RequestState = {
  loading: true,
  success: false,
  error: null,
};

export const fulfilledState: RequestState = {
  loading: false,
  success: true,
  error: null,
};

export const rejectedState = (error: unknown): RequestState => ({
  loading: false,
  success: false,
  error,
});
`;
