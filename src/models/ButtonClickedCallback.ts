import { ITulipsListItem } from "./ITulipsListItem";

export type ButtonClickedCallback = () => void;


export type ButtonClickedCallbackTulip = ({}:ITulipsListItem) => void;

export type ButtonClickedCallbackIndex = (item:ITulipsListItem)=> void
