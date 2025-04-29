import { ID } from "./id";
import { Snippet } from "./snippet";

export interface Item {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
}
