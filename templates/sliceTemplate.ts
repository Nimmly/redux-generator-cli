import {toCamelCase, toPascalCase} from "../utils/helpers";

export const sliceTemplate = (name:string) => `
import { createSlice } from '@reduxjs/toolkit';
import {
  fulfilledState,
  initialRequestState,
  pendingState,
  rejectedState,
  RequestState,
} from "../defaultStates/defaultStates.ts";
import { get${toPascalCase(name)} } from "./${toCamelCase(name)}.actions.ts";

const initial${toPascalCase(name)}State: {
  defaultState: RequestState;
} = {
  defaultState: initialRequestState,
};

const ${toCamelCase(name)}Slice = createSlice({
  name: '${toCamelCase(name)}',
  initialState: initial${toPascalCase(name)}State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get${toPascalCase(name)}.pending, (state) => {
        state.defaultState = pendingState;
      })
      .addCase(get${toPascalCase(name)}.fulfilled, (state, action) => {
        state.defaultState = fulfilledState;
      })
      .addCase(get${toPascalCase(name)}.rejected, (state, action) => {
        state.defaultState = rejectedState(action.payload);
      });
  },
});

export const {} = ${toCamelCase(name)}Slice.actions;
export default ${toCamelCase(name)}Slice.reducer;
`;