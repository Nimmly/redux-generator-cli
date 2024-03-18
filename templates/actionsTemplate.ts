import {toCamelCase, toPascalCase} from "../utils/helpers";

export const actionsTemplate = (name:string) => `
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ${toPascalCase(name)}RequestType, ${toPascalCase(name)}ResponseType } from './${toCamelCase(name)}.types.ts';

const get${toPascalCase(name)} = createAsyncThunk<${toPascalCase(name)}ResponseType, ${toPascalCase(name)}RequestType>(
  '${toCamelCase(name)}/get',
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

export { get${toPascalCase(name)} };
`;