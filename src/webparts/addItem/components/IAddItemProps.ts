import { ButtonClickedCallback, ButtonClickedCallbackTulip } from "../../../models";

export interface IAddItemProps {
  Title: string;
  ManufacturingPrice?: number;
  RetailPrice?: number;
  TulipResponsible?: {Id:number};
  onAddListItem: ButtonClickedCallbackTulip;
  TitleFieldLabel:string;
  ManufacturingPriceFieldLabel: number;
  RetailPriceFieldLabel: number;
  TulipResponsibleFieldLabel: String;
}
