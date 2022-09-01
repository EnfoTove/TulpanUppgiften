import * as React from 'react';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
export interface ITulipListPropsState {
    listItems: ITulipsListItem[];
    title: string;
    listName: string;
}
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {
    static siteURL: string;
    constructor(props: ITulipListProps, state: ITulipListPropsState);
    render(): React.ReactElement<ITulipListProps>;
    componentDidMount(): void;
    private _clickHandler;
}
//# sourceMappingURL=TulipList.d.ts.map