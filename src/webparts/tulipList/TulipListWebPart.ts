import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TulipListWebPartStrings';
import { ITulipListProps } from './components/ITulipListProps';
import { ITulipsListItem } from '../../models/ITulipsListItem';
import TulipList from './components/TulipList';

export interface ITulipListWebPartProps {
  description: string;
  listName: string;
}

export default class TulipListWebPart extends BaseClientSideWebPart<ITulipListWebPartProps> {
  private _tulips: ITulipsListItem[] = [];

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
