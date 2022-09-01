import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ITulipListWebPartProps {
    description: string;
}
export default class TulipListWebPart extends BaseClientSideWebPart<ITulipListWebPartProps> {
    private _tulips;
    render(): void;
    private _onGetListItems;
    private _getListItems;
    private _onDeleteListItem;
    private _deleteListItem;
    private _getUserEmail;
    private _triggerEmail;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TulipListWebPart.d.ts.map