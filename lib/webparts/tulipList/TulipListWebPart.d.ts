import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ITulipListWebPartProps {
    description: string;
    listName: string;
}
export default class TulipListWebPart extends BaseClientSideWebPart<ITulipListWebPartProps> {
    private _tulips;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TulipListWebPart.d.ts.map