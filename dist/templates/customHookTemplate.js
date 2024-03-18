"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customHookTemplate = void 0;
const helpers_1 = require("../utils/helpers");
const customHookTemplate = (name) => `
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks.ts";
import { get${(0, helpers_1.toPascalCase)(name)} } from "../redux/${(0, helpers_1.toCamelCase)(name)}/${(0, helpers_1.toCamelCase)(name)}.actions.ts";
import { ${(0, helpers_1.toPascalCase)(name)}RequestType } from "../redux/${(0, helpers_1.toCamelCase)(name)}/${(0, helpers_1.toCamelCase)(name)}.types.ts";

const use${(0, helpers_1.toPascalCase)(name)}Hook = ({}: ${(0, helpers_1.toPascalCase)(name)}RequestType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get${(0, helpers_1.toPascalCase)(name)}({}));
  }, [dispatch]);
};
export { use${(0, helpers_1.toPascalCase)(name)}Hook };
`;
exports.customHookTemplate = customHookTemplate;
