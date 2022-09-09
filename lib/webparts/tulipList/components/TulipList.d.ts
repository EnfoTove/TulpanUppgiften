import * as React from 'react';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { IAuthorItem } from '../../../models/IAuthorItem';
import { ITulipResponsibleItem } from '../../../models/ITulipResponsibleItem';
export interface ITulipListPropsState {
    listItem: ITulipsListItem;
    listItems: ITulipsListItem[];
    title: string;
    listName: string;
    authorItem: IAuthorItem;
    authorItems: IAuthorItem[];
    tulipResponsibleItem: ITulipResponsibleItem;
    tulipResponsibleItems: ITulipResponsibleItem[];
    loading: boolean;
}
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    componentDidMount(): void;
    private _getCurrentListItemsPnp;
    private _getUserInfo;
    private _getTulipResponsibleInfo;
    private _getListItems;
    bindDetailsList(): any;
    _getUserNamePnp(id: number): Promise<string>;
    private _getUserName;
    private _clickHandler;
    private _deleteListItem;
    private _getUserEmail;
    private _getCurrentLoggedInUser;
}
//# sourceMappingURL=TulipList.d.ts.map