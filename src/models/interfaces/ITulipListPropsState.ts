import { ITulipsListItem } from "./ITulipsListItem";
import { IAuthorItem } from "./IAuthorItem";
import { ITulipResponsibleItem } from "./ITulipResponsibleItem";
import { IUserItem } from "./IUserItem";

export interface ITulipListPropsState{
  listItem: ITulipsListItem,
  listItems: ITulipsListItem[],
  title:string,
  listName: string
  authorItem?: IAuthorItem,
  authorItems?: IAuthorItem[],
  tulipResponsibleItem?: ITulipResponsibleItem,
  tulipResponsibleItems?: ITulipResponsibleItem[],
  finishLoading: boolean,
  showDeleteBox: boolean;
  showAddItemForm:boolean;
  focusItem: ITulipsListItem;
  newTulipName: string;
  newTulipManufacturingPrice?: number;
  newTulipResponsible?: IUserItem;
}
