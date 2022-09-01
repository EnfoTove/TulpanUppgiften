import { ButtonClickedCallback, ButtonClickedCallbackIndex } from "../../../models";
import { ITulipsListItem } from "../../../models/ITulipsListItem";

export interface ITulipListProps {
  title: string;
  listItems: ITulipsListItem[];
  listName:string;
  websiteURL: string;
  onGetListItems: ButtonClickedCallback;
  onDeleteListItem: ButtonClickedCallbackIndex;
}
