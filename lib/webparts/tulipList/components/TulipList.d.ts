import * as React from 'react';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
export interface ITulipListPropsState {
    listItem: ITulipsListItem;
    listItems: ITulipsListItem[];
    title: string;
    listName: string;
}
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    componentDidMount(): void;
    private _getListItems;
    bindDetailsList(): any;
    private _getUserName;
    private _clickHandler;
    private _deleteListItem;
    private _getUserEmail;
    private _getCurrentLoggedInUser;
    private _triggerEmail;
}
//# sourceMappingURL=TulipList.d.ts.map