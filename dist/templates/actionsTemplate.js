"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionsTemplate = void 0;
const helpers_1 = require("../utils/helpers");
const actionsTemplate = (name) => `
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ${(0, helpers_1.toPascalCase)(name)}RequestType, ${(0, helpers_1.toPascalCase)(name)}ResponseType } from './${(0, helpers_1.toCamelCase)(name)}.types.ts';

const get${(0, helpers_1.toPascalCase)(name)} = createAsyncThunk<${(0, helpers_1.toPascalCase)(name)}ResponseType, ${(0, helpers_1.toPascalCase)(name)}RequestType>(
  '${(0, helpers_1.toCamelCase)(name)}/get',
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

export { get${(0, helpers_1.toPascalCase)(name)} };
`;
exports.actionsTemplate = actionsTemplate;
