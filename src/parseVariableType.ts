import { AspSymbol } from "./types";

export function parseType(variableSetter: string | undefined): string {
  if (!variableSetter) return undefined;
  
  // Cleanup white space, new and =
  variableSetter = variableSetter.replace(/[\t =\(\)]*([\t ]*new[\t ])*/g, "");

  return getTypeByValue(variableSetter);
}

function getTypeByValue(value: string): string {
  if (value.startsWith("'") || value.startsWith("\"")) return Types.String;
  if (value.indexOf(".") < 0 && !isNaN(parseInt(value)) && +value % 1 === 0) return Types.Integer;
  if (value.indexOf(".") > -1 && !isNaN(parseFloat(value))) return Types.Double;
  if (value.toLowerCase() === "nothing") return Types.Object;

  return Types.Object;
}

function findSymbolByType(type: string, collection: Set<AspSymbol>) {
  for(const aspSymbol of collection.values()) {
		if (aspSymbol.symbol?.name === type) {
      console.log(`found type for ${type}:`, aspSymbol);
      return;
		}
	}
}

enum Types {
  String = "String",
  Integer = "Integer",
  Double = "Double",
  Object = "Object",
  Dictionary = "Dictionary"
}