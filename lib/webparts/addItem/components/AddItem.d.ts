import * as React from 'react';
import { IAddItemProps } from './IAddItemProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
export default class AddItem extends React.Component<IAddItemProps, {
    Title: string;
    ManufacturingPrice: number;
    RetailPrice: number;
    TulipResponsible: {
        Id: number;
    };
    TulipObject: ITulipsListItem;
}> {
    constructor(props: any);
    render(): React.ReactElement<IAddItemProps>;
    private _onAddListItemClicked;
    private handleChange;
    private handleSubmit;
}
//# sourceMappingURL=AddItem.d.ts.map