### Boilerplate type safe generator for redux using redux-toolkit and axios

## Features

- Initialize redux and redux/toolkit inside your project
- Generate Actions, Slice, Types files for the given name

## Installing
> npm i -g redux-generator-cli


## Usage
Go to your root folder of a project and run

>redux-init

It will install [axios](https://www.npmjs.com/package/axios), [react-redux](https://www.npmjs.com/package/react-redux)
and [redux-toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) inside your project.
Also, it will generate folder redux with basic TypeScript implementation of redux (store,hooks,reducer) and default 
state types/values (loading,status,error).

>redux-generate --name=<NAME_OF_YOUR_CHOICE>

It will generate folders, "NAME_OF_YOUR_CHOICE" and hooks

- NAME_OF_YOUR_CHOICE.actions.ts
- NAME_OF_YOUR_CHOICE.slice.ts
- NAME_OF_YOUR_CHOICE.types.ts
- hooks/use<NAME_OF_YOUR_CHOICE>Hook.ts

All the files will have to be updated based on your specifications and requirements, starting with
NAME_OF_YOUR_CHOICE.types.ts

## Folder structure example

![folder-structure](https://github.com/Nimmly/redux-generator-cli/blob/main/assets/folder-structure.png)