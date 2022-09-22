import { ITulipsListItem } from "./ITulipsListItem";
import { IAuthorItem } from "./IAuthorItem";
import { ITulipResponsibleItem } from "./ITulipResponsibleItem";
import { IUserItem } from "./IUserItem";
import { ITulipImage } from "./ITulipImage";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITulipListPropsState{
  listItem: ITulipsListItem,
  listItems: ITulipsListItem[],
  title:string,
  listName: string,
  context:WebPartContext,
  authorItem?: IAuthorItem,
  authorItems?: IAuthorItem[],
  tulipResponsibleItem?: ITulipResponsibleItem,
  tulipResponsibleItems?: ITulipResponsibleItem[],
  tulipImage?: ITulipImage,
  tulipImages?: ITulipImage[],
  finishLoading: boolean,
  showDeleteBox: boolean;
  showAddItemForm:boolean;
  focusItem: ITulipsListItem;
  newTulipName: string;
  newTulipManufacturingPrice?: string;
  newTulipResponsible?: IUserItem;
  nullTitlePost: boolean;
  nonNumericPost:boolean;
}
