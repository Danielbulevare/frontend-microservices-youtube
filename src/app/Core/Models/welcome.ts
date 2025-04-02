import { Item } from "./item";
import { PageInfo } from "./page-info";

export interface Welcome {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}
