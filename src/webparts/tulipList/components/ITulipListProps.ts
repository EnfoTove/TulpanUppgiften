import { ButtonClickedCallback, ButtonClickedCallbackIndex } from "../../../models";
import { ITulipsListItem } from "../../../models/ITulipsListItem";

export interface ITulipListProps {
  title: string;
  listItems: ITulipsListItem[];
  onGetListItems: ButtonClickedCallback;
  onDeleteListItem: ButtonClickedCallbackIndex;
}
