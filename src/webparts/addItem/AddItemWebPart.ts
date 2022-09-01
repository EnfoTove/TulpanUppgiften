import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AddItemWebPartStrings';
import AddItem from './components/AddItem';
import { IAddItemProps } from './components/IAddItemProps';
import { ButtonClickedCallback, ButtonClickedCallbackTulip } from '../../models';
import { ITulipsListItem } from '../../models/ITulipsListItem';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export interface IAddItemWebPartProps {
  title:string;
  manufacturingPrice: number;
  retailPrice: number;
  tulipResponsible: {Id:number};
  onAddListItem: ButtonClickedCallbackTulip;
  titleFieldLabel:string;
  manufacturingPriceFieldLabel: number;
  retailPriceFieldLabel: number;
  tulipResponsibleFieldLabel: String;
}
const listName = "TulipsToTestWith";

export default class AddItemWebPart extends BaseClientSideWebPart<IAddItemWebPartProps> {
  private _tulips: ITulipsListItem[] = [];

  public render(): void {
    const element: React.ReactElement<IAddItemProps> = React.createElement(
      AddItem,
      {
        Title:this.properties.title,
        ManufacturingPrice: this.properties.manufacturingPrice,
        RetailPrice: this.properties.retailPrice,
        TulipResponsible: this.properties.tulipResponsible,
        onAddListItem: this._onAddListItem,
        TitleFieldLabel:this.properties.titleFieldLabel,
        ManufacturingPriceFieldLabel: this.properties.manufacturingPriceFieldLabel,
        RetailPriceFieldLabel: this.properties.retailPriceFieldLabel,
        TulipResponsibleFieldLabel: this.properties.tulipResponsibleFieldLabel
      }
    );

    ReactDom.render(element, this.domElement);
  }


  private _onAddListItem= (object:ITulipsListItem): void=> {
    this._addListItem(object)
    .then(()=>{
      this._getListItems()
      .then(response=>{
        this._tulips=response;
        this.render();
      });
    });
  }

  private _addListItem(object:ITulipsListItem) : Promise<SPHttpClientResponse>{
    console.log("object title: "+  object.Title,"object man. price: "  + object.ManufacturingPrice);
    return this._getItemEntityType()
      .then(spEntityType => {
        const request: any = {};
        request.body = JSON.stringify({
          Title: object.Title,
          '@odata.type': spEntityType,
          ManufacturingPrice: object.ManufacturingPrice,
          RetailPrice: object.RetailPrice,
          TulipResponsible: object.TulipResponsible
        });

        const endpoint: string = this.context.pageContext.web.absoluteUrl
        + `/_api/web/lists/getbytitle('${listName}')/items`;
        return this.context.spHttpClient.post(
          endpoint, SPHttpClient.configurations.v1, request);
      });
  }

  private _getListItems():Promise<ITulipsListItem[]>{
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$select=Id,Title`,
      SPHttpClient.configurations.v1)
      .then(response=>{
        return response.json();
      })
      .then(jsonResponse=>{
        return jsonResponse.value;
      })as Promise<ITulipsListItem[]>;
  }

  private _getItemEntityType(): Promise<string>{
    const endpoint: string = this.context.pageContext.web.absoluteUrl
      + `/_api/web/lists/getbytitle('${listName}')`
      + `?$select=ListItemEntityTypeFullName`;

    return this.context.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          return jsonResponse.ListItemEntityTypeFullName;
        }) as Promise<string>;
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('titleFieldLabel', {
                  label: "Title"
                }),
                PropertyPaneTextField('manufacturingPriceFieldLabel', {
                  label: "Manufacturing Price"
                }),
                PropertyPaneTextField('retailPriceFieldLabel', {
                  label: "Retail Price"
                }),
                PropertyPaneTextField('tulipResponsibleFieldLabel', {
                  label: "Tulip Responsible"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

