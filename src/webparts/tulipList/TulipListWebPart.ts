import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TulipListWebPartStrings';
import { ITulipListProps } from './components/ITulipListProps';
import { ITulipsListItem } from '../../models/ITulipsListItem';
import TulipList from './components/TulipList';
import { sp } from '@pnp/pnpjs';

export interface ITulipListWebPartProps {
  description: string;
  listName: string;
}

export default class TulipListWebPart extends BaseClientSideWebPart<ITulipListWebPartProps> {
  private _tulips: ITulipsListItem[] = [];
  public onInit(): Promise<void> {
    return super.onInit().then(_=>{
      sp.setup({
        spfxContext:this.context
      });
    });

  }


        public render(): void {
          const element: React.ReactElement<ITulipListProps> = React.createElement(
            TulipList,
            {
              title: this.properties.description,
              listItems: this._tulips,
              listName: this.properties.listName,
              websiteURL:this.context.pageContext.web.absoluteUrl,
              context:this.context,
            }
            );

            ReactDom.render(element, this.domElement);
          }

    protected onDispose(): void {
      ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
      return Version.parse('1.0');
    }

    protected get disableReactivePropertyChanges(): boolean {
      return true;
    }

    protected onAfterPropertyPaneChangesApplied(): void {
      ReactDom.unmountComponentAtNode(this.domElement);
      this.render();
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
      return {
        pages: [
          {
            groups: [
              {
                groupFields: [
                  PropertyPaneTextField('description', {
                    label: strings.TitleFieldLabel
                  }),
                  PropertyPaneTextField('listName', {
                    label: strings.ListNameFieldLabel
                  })
                ]
              }
            ]
          }
        ]
      };
    }
  }
