import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ButtonClickedCallbackTulip } from '../../models';
export interface IAddItemWebPartProps {
    title: string;
    manufacturingPrice: number;
    retailPrice: number;
    tulipResponsible: {
        Id: number;
    };
    onAddListItem: ButtonClickedCallbackTulip;
    titleFieldLabel: string;
    manufacturingPriceFieldLabel: number;
    retailPriceFieldLabel: number;
    tulipResponsibleFieldLabel: String;
}
export default class AddItemWebPart extends BaseClientSideWebPart<IAddItemWebPartProps> {
    private _tulips;
    render(): void;
    private _onAddListItem;
    private _addListItem;
    private _getListItems;
    private _getItemEntityType;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=AddItemWebPart.d.ts.map