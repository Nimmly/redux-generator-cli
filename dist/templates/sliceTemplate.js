"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceTemplate = void 0;
const helpers_1 = require("../utils/helpers");
const sliceTemplate = (name) => `
import { createSlice } from '@reduxjs/toolkit';
import {
  fulfilledState,
  initialRequestState,
  pendingState,
  rejectedState,
  RequestState,
} from "../defaultStates/defaultStates.ts";
import { get${(0, helpers_1.toPascalCase)(name)} } from "./${(0, helpers_1.toCamelCase)(name)}.actions.ts";

const initial${(0, helpers_1.toPascalCase)(name)}State: {
  defaultState: RequestState;
} = {
  defaultState: initialRequestState,
};

const ${(0, helpers_1.toCamelCase)(name)}Slice = createSlice({
  name: '${(0, helpers_1.toCamelCase)(name)}',
  initialState: initial${(0, helpers_1.toPascalCase)(name)}State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get${(0, helpers_1.toPascalCase)(name)}.pending, (state) => {
        state.defaultState = pendingState;
      })
      .addCase(get${(0, helpers_1.toPascalCase)(name)}.fulfilled, (state, action) => {
        state.defaultState = fulfilledState;
      })
      .addCase(get${(0, helpers_1.toPascalCase)(name)}.rejected, (state, action) => {
        state.defaultState = rejectedState(action.payload);
      });
  },
});

export const {} = ${(0, helpers_1.toCamelCase)(name)}Slice.actions;
export default ${(0, helpers_1.toCamelCase)(name)}Slice.reducer;
`;
exports.sliceTemplate = sliceTemplate;
