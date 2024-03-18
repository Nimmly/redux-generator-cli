"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = exports.toCamelCase = void 0;
const toCamelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+|-/g, '');
};
exports.toCamelCase = toCamelCase;
const toPascalCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+|-/g, '');
};
exports.toPascalCase = toPascalCase;
