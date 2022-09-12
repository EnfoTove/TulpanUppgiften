export interface ITulipsListItem{
  ID?: number;
  Title: string;
  ManufacturingPrice?: number;
  RetailPrice?: number;
  //TulipResponsible?:{Id:number};
  TulipResponsibleId?: number;
  //Author?: {Id:number}¨
  AuthorId: number;
}
