import type { SchemaTypeDefinition } from "sanity";
import { noticiaType } from "./noticia";
import { eventoType } from "./evento";

export const schemaTypes: SchemaTypeDefinition[] = [noticiaType, eventoType];
