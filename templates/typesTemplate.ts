import {toPascalCase} from "../utils/helpers";

export const typesTemplate = (name: string) => `
export type ${toPascalCase(name)}Type = {};
export type ${toPascalCase(name)}RequestType = {};
export type ${toPascalCase(name)}ResponseType = {};
`;