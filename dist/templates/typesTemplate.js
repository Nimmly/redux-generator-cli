"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesTemplate = void 0;
const helpers_1 = require("../utils/helpers");
const typesTemplate = (name) => `
export type ${(0, helpers_1.toPascalCase)(name)}Type = {};
export type ${(0, helpers_1.toPascalCase)(name)}RequestType = {};
export type ${(0, helpers_1.toPascalCase)(name)}ResponseType = {};
`;
exports.typesTemplate = typesTemplate;
