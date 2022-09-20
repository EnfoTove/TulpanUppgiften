import { ITulipImage } from "./ITulipImage";

export interface ITulipsListItem{
  ID?: number;
  Title: string;
  ManufacturingPrice?: number;
  RetailPrice?: number;
  Image?: ITulipImage;
  TulipResponsibleId?: number;
  AuthorId: number;
}
