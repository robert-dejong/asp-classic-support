import { AspSymbol } from "./types";

export function parseType(variableSetter: string | undefined, collection: Set<AspSymbol>): VariableType | undefined {
  if (!variableSetter) return undefined;
  
  // Cleanup white space, new and =
  variableSetter = variableSetter.replace(/[\t =\(\)]*([\t ]*new[\t ])*/g, "");
  const type = getTypeByValue(variableSetter);
  return {
    type: type,
    sourceFile: "",
    sourceFilePath: ""
  } as VariableType;
}

function getTypeByValue(value: string) {
  if (value.startsWith("'") || value.startsWith("\"")) return "String";
  if (value.indexOf(".") < 0 && !isNaN(parseInt(value)) && +value % 1 === 0) return "Integer";
  if (value.indexOf(".") > -1 && !isNaN(parseFloat(value))) return "Double";
  if (value.toLowerCase() === "nothing") return "Object";

  return value;
}

function findSymbolByType(type: string, collection: Set<AspSymbol>) {
  for(const aspSymbol of collection.values()) {
		if (aspSymbol.symbol?.name === type) {
      console.log(`found type for ${type}:`, aspSymbol);
      return;
		}
	}
}

export class VariableType {
  type: string;
  symbol: AspSymbol;
  sourceFile: string;
	sourceFilePath: string;
}