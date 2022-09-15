import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ITulipsListItem } from "../../../models/interfaces/ITulipsListItem";

export interface ITulipListProps {
  title: string;
  listItems: ITulipsListItem[];
  listName:string;
  websiteURL: string;
  context:WebPartContext;
}
