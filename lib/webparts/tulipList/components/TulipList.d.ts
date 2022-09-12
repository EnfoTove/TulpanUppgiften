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
    finishLoading: boolean;
}
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    componentDidMount(): void;
    private _getCurrentListItemsPnp;
    private _getTulipResponsibleInfo;
    private _getAuthorInfo;
    private _setListStates;
    _getUserNamePnp(id: number): Promise<string>;
    private _clickHandler;
    _deleteListItem(item: ITulipsListItem): Promise<void>;
    _getUserEmailPnp(id: number): Promise<string>;
    private _getCurrentLoggedInUser;
    private _triggerEmail;
}
//# sourceMappingURL=TulipList.d.ts.map