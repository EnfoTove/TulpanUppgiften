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
    private _getListItems;
    bindDetailsList(): void;
    componentDidMount(): void;
    private _clickHandler;
    private _getUserName;
    private _deleteListItem;
    private _getUserEmail;
    private _getCurrentLoggedInUser;
}
//# sourceMappingURL=TulipList.d.ts.map