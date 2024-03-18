import {toCamelCase, toPascalCase} from "../utils/helpers";

export const customHookTemplate = (name: string) =>  `
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks.ts";
import { get${toPascalCase(name)} } from "../redux/${toCamelCase(name)}/${toCamelCase(name)}.actions.ts";
import { ${toPascalCase(name)}RequestType } from "../redux/${toCamelCase(name)}/${toCamelCase(name)}.types.ts";

const use${toPascalCase(name)}Hook = ({}: ${toPascalCase(name)}RequestType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get${toPascalCase(name)}({}));
  }, [dispatch]);
};
export { use${toPascalCase(name)}Hook };
`;