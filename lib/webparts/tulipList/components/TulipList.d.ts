import * as React from 'react';
import { ITulipListProps } from './ITulipListProps';
import "@pnp/sp/sputilities";
import { ITulipListPropsState } from '../../../models/interfaces/ITulipListPropsState';
export interface TypedHash<T> {
    [key: string]: T;
}
export interface EmailProperties {
    To: string[];
    CC?: string[];
    BCC?: string[];
    Subject: string;
    Body: string;
    AdditionalHeaders?: TypedHash<string>;
    From?: string;
}
export declare const PropertyContext: any;
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    private _getImgUrl;
    componentDidMount(): void;
    private _closeDialog;
    private _closeAddItemForm;
    private _getCurrentListItems;
    private _getTulipResponsibleTitle;
    private _getAuthorTitle;
    setListStates(): Promise<void>;
    private _clickHandler;
    _deleteListItem(): Promise<void>;
    _getUserEmailPnp(id: number): Promise<string>;
    private _getCurrentLoggedInUser;
    private _sendEmail;
    private _getDialog;
}
//# sourceMappingURL=TulipList.d.ts.map