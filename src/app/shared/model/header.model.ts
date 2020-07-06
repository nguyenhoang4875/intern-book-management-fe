import { SortByEnum } from "../enums/sort-type.enum";

export interface Header {
  name: string;
  sortedBy: SortByEnum;
  key: string;
  size: number;
}
