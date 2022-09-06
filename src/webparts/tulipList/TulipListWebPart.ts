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
import { SPHttpClient, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import * as $ from 'jquery';
import TulipList from './components/TulipList';
import { BaseDialog, Dialog } from '@microsoft/sp-dialog';

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
              onGetListItems: this._onGetListItems,
              onDeleteListItem: this._onDeleteListItem,
            }
            );

            ReactDom.render(element, this.domElement);
          }

          //Triggers api-call to get list items as well as re-renders the page
          private _onGetListItems = (): void =>{
            this._getListItems()
            .then(response=>{
              this._tulips= response;
            });
            this.render();
          }

        //Sends api-call to get all items in the list and returns response as ITulpListItem
        private _getListItems():Promise<ITulipsListItem[]>{
            return this.context.spHttpClient.get(
        this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.properties.listName}')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId`,
        SPHttpClient.configurations.v1)
        .then(response=>{
          return response.json();
        })
        .then(jsonResponse =>{
          return jsonResponse.value;
        }) as Promise<ITulipsListItem[]>
      }

        //Triggers api-call to delete desired list item as well as re-renders the page with updated list items
      private _onDeleteListItem = (item: ITulipsListItem): void=>{
        this._deleteListItem(item)
        .then(()=>{
          this._getListItems()
          .then(response=>{
            this._tulips=response;
            this.render();
          });
        })
      }

        //Sends api-call to delete desired list item as well as triggering _triggerEmail()
      private _deleteListItem(item: ITulipsListItem):Promise<SPHttpClientResponse> {
        console.log("ITEM TO DELETE:" + item.ID)
        console.log("LIST NAME:" + this.properties.listName)
        return this.context.spHttpClient.get(
          this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.properties.listName}')/items(${item.ID})?$select=Id`,
          SPHttpClient.configurations.v1)
          .then(response=>{
            return response.json();
          })
          .then(jsonResponse=>{
            return jsonResponse.value
          })
          .then((listItem: ITulipsListItem) => {
            const request: any = {};
            request.headers = {
              'X-HTTP-Method': 'DELETE',
              'IF-MATCH': '*'
            };

        const endpoint: string = this.context.pageContext.web.absoluteUrl
        + `/_api/web/lists/getbytitle('${this.properties.listName}')/items(${item.ID})`

        return this.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, request);
      }).then( this._triggerEmail(item))
    }

    //Gets and returns the email address of the user by the id that's passed in.
    private _getUserEmail(Id:number):number{
      let tulipResponsibleEmail = null;
        $.ajax({
          url: this.context.pageContext.web.absoluteUrl + `/_api/web/getuserbyid(${Id})`,
          type: "GET",
          headers: {
              "Accept": "application/json; odata=verbose"
          },
          async: false,
          success: function(data) {
            tulipResponsibleEmail = data.d.Email;
            },
            error: function(error) {
              console.log("fnGetUserProps:: " + error);
            }
          });
          return tulipResponsibleEmail;
  }

    //Sends email to the tulip creator and tulip responsible
    private _triggerEmail(item:ITulipsListItem):any{
      let MailBody = '', MailSubject = 'Tulip removal'
      const tulipResponsible = this._getUserEmail(item.TulipResponsible.Id);
      const tulipCreator = this._getUserEmail(item.Author.Id);
      MailBody    =  `'<p>Hi,<p> <p>${item.Title} (ID: ${item.ID}) has been removed from Enfokam Tulips'`;
      var taMailBody = {
        properties: {
          __metadata: { 'type': 'SP.Utilities.EmailProperties' },
          From: "From: no-reply@sharepointonline.com",
          To: { 'results': [tulipResponsible, tulipCreator] },
          Body: MailBody,
          Subject: MailSubject,
        }
      };

      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
            digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {

              $.ajax({
                contentType: 'application/json',
                url: this.context.pageContext.web.absoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
                type: "POST",
                data: JSON.stringify(taMailBody),
                headers: {
                  "Accept": "application/json;odata=verbose",
                  "content-type": "application/json;odata=verbose",
                  "X-RequestDigest": digest
                },
                success: function (data) {
                  console.log("Success");
                },
                error: function (data) {

                  console.log("Error: " + JSON.stringify(data));
                }
              });
            });

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
            // header: {
            //   description: strings.PropertyPaneDescription
            // },
            groups: [
              {
                //groupName: strings.BasicGroupName,
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
