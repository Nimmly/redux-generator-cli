#!/usr/bin/env node

import fs from 'fs';
import * as path from "path";

const argvList = process.argv;

const cleanArgList = argvList.slice(2).map(arg => {
    if(arg.includes("--")){
        return  arg.replace("--",'').slice(0,arg.indexOf("=")-2)
    }
})

if(!cleanArgList.includes('name')){
    console.error('Please provide a name for the files.');
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
})

const defaultStates = `
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


const actionsTemplate = `
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ${argMap[0].name}RequestType, ${argMap[0].name}ResponseType } from './${argMap[0].name}.types.ts';

const get${argMap[0].name} = createAsyncThunk<${argMap[0].name}ResponseType, ${argMap[0].name}RequestType>(
  '${argMap[0].name}/get',
  async (
    {},
    { rejectWithValue },
  ) => {
    try {
      // Insert your api 
      const url = '';
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { get${argMap[0].name} };
`;

const sliceTemplate = `
import { createSlice } from '@reduxjs/toolkit';
import {
  fulfilledState,
  initialRequestState,
  pendingState,
  rejectedState,
  RequestState,
} from "../defaultStates/defaultStates.ts";
import { get${argMap[0].name} } from "./${argMap[0].name}.actions.ts";

const initial${argMap[0].name}State: {
  defaultState: RequestState;
} = {
  defaultState: initialRequestState,
};

const ${argMap[0].name}Slice = createSlice({
  name: '${argMap[0].name}',
  initialState: initial${argMap[0].name}State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get${argMap[0].name}.pending, (state) => {
        state.defaultState = pendingState;
      })
      .addCase(get${argMap[0].name}.fulfilled, (state, action) => {
        state.defaultState = fulfilledState;
      })
      .addCase(get${argMap[0].name}.rejected, (state, action) => {
        state.defaultState = rejectedState(action.payload);
      });
  },
});

export const {} = ${argMap[0].name}Slice.actions;
export default ${argMap[0].name}Slice.reducer;
`;

const typesTemplate = `
export type ${argMap[0].name}Type = {};
export type ${argMap[0].name}RequestType = {};
export type ${argMap[0].name}ResponseType = {};
`;

const customHookTemplate = `
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks.ts";
import { get${argMap[0].name} } from "../redux/${argMap[0].name}/${argMap[0].name}.actions.ts";
import { ${argMap[0].name}RequestType } from "../redux/${argMap[0].name}/${argMap[0].name}.types.ts";

const use${argMap[0].name}Hook = ({}: ${argMap[0].name}RequestType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get${argMap[0].name}({}));
  }, [dispatch]);
};
export { use${argMap[0].name}Hook };
`;
(async () => {
    try {
        await fs.promises.access("redux/defaultStates/defaultStates.ts", fs.constants.F_OK);
        return
    } catch (err) {
        const defaultStatesPath = path.join(process.cwd(), 'redux/defaultStates');
        fs.mkdirSync(defaultStatesPath, { recursive: true });
        fs.writeFileSync(path.join(defaultStatesPath, `defaultStates.ts`), defaultStates);
    }
})()

const basePath = path.join(process.cwd(), `redux/${argMap[0].name}`);
const hooksPath = path.join(process.cwd(), 'hooks')

fs.mkdirSync(basePath, { recursive: true });

fs.writeFileSync(path.join(basePath, `${argMap[0].name}.actions.ts`), actionsTemplate);
fs.writeFileSync(path.join(basePath, `${argMap[0].name}.slice.ts`), sliceTemplate);
fs.writeFileSync(path.join(basePath, `${argMap[0].name}.types.ts`), typesTemplate);

fs.mkdirSync(hooksPath, {recursive: true})
fs.writeFileSync(path.join(hooksPath, `use${argMap[0].name}Hook.ts`),customHookTemplate)

console.log(`Redux entity and custom hook created`);
