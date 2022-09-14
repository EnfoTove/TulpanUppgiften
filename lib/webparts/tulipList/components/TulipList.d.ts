import * as React from 'react';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { IAuthorItem } from '../../../models/IAuthorItem';
import { ITulipResponsibleItem } from '../../../models/ITulipResponsibleItem';
import "@pnp/sp/sputilities";
export interface ITulipListPropsState {
    listItem: ITulipsListItem;
    listItems: ITulipsListItem[];
    title: string;
    listName: string;
    authorItem?: IAuthorItem;
    authorItems?: IAuthorItem[];
    tulipResponsibleItem?: ITulipResponsibleItem;
    tulipResponsibleItems?: ITulipResponsibleItem[];
    finishLoading: boolean;
    showDeleteBox: boolean;
    focusItem: ITulipsListItem;
}
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
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    componentDidMount(): void;
    private _closeDialog;
    private _getCurrentListItems;
    private _getTulipResponsibleTitle;
    private _getAuthorTitle;
    private _setListStates;
    private _clickHandler;
    _deleteListItem(): Promise<void>;
    _getUserEmailPnp(id: number): Promise<string>;
    private _getCurrentLoggedInUser;
    private _sendEmail;
}
//# sourceMappingURL=TulipList.d.ts.map