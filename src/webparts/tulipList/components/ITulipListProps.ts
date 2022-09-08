import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ButtonClickedCallback, ButtonClickedCallbackIndex } from "../../../models";
import { ITulipsListItem } from "../../../models/ITulipsListItem";

export interface ITulipListProps {
  title: string;
  listItems: ITulipsListItem[];
  listName:string;
  websiteURL: string;
  // onGetListItems: any;//ButtonClickedCallback;
  // onDeleteListItem: ButtonClickedCallbackIndex;
  context:WebPartContext;
}
