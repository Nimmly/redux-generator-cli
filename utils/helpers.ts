const toCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+|-/g, '');
}
const toPascalCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word:string, index:number) => {
        return index === 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+|-/g, '');
}

// TODO: future stuff
// const checkForReduxFolder = () => {
//     const files = fs.readdirSync(process.cwd());
//     if(files.includes('redux')){
//         return true
//     }
//     for(const file of files){
//         const filePath = path.join(process.cwd(), file);
//         const stats = fs.statSync(filePath)
//
//         if(stats.isDirectory() && checkForReduxFolder()){
//             return true
//         }
//     }
//     return false;
// };

export {toCamelCase,toPascalCase}