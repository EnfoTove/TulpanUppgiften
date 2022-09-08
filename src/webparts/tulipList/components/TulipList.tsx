import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import * as $ from 'jquery';
import { DefaultButton } from 'office-ui-fabric-react';
import { SPHttpClient, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import { data } from 'jquery';
import { IUserItem } from '../../../models/IUserItem';

export interface ITulipListPropsState{
  listItem: ITulipsListItem,
  listItems: ITulipsListItem[],
  title:string,
  listName: string
  tulipResponsible: string
}

export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {

  static siteURL:string="";
  public constructor(props:ITulipListProps, state: ITulipListPropsState){
    super(props);
    this.state={
      listItems:[],
      listItem:
        {
          ID: null,
          Title: " ",
          ManufacturingPrice: null,
          RetailPrice: null,
          TulipResponsible: {Id: null},
          Author:{Id: null}
        },
      title: " ",
      listName: this.props.listName,
      tulipResponsible: ""
    };
    TulipList.siteURL=this.props.websiteURL;
  }
  public render(): React.ReactElement<ITulipListProps> {
    return (
      <div className={ styles.tulipList }>
        <div className={ styles.container }>
            <div className={ styles.title }>{this.props.title}</div>
              <div className={ styles.subTitle }>List: {this.props.listName}</div>
            <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Manufacturing Price</th>
                    <th>Retail Price</th>
                    <th>Tulip Responsible</th>
                    <th>Tulip creator</th>
                  </tr>
                </thead>
              { this.state.listItems &&  this.state.listItems.map((item) =>
                <tbody>
                    <tr  key={item.ID}>
                      <td>{item.ID}</td>
                      <td>{item.Title}</td>
                      <td>{item.ManufacturingPrice}</td>
                      <td>{item.RetailPrice * 1}</td>
                      <td>{this._getUserName(item.TulipResponsible.Id)}</td>
                      <td>{this._getUserName(item.Author.Id)}</td>
                      <DefaultButton className={styles.defaultButton} onClick={() => this._clickHandler(item)}>Delete Item</DefaultButton>
                    </tr>
                </tbody>
              )
            }
            </table>
          </div>
        </div>
    );
  }

  private _getListItems(): Promise<ITulipsListItem[]>{
    console.log("get list items")
    const url = TulipList.siteURL + `/_api/web/lists/getbytitle('${this.props.listName}')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId`;
    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
    .then(response=>{
      return response.json();
    })
    .then(json=>{
      return json.value;
    })as Promise<ITulipsListItem[]>;
  }

  public bindDetailsList():any{
    console.log("bind details list")

    this._getListItems().then(listItems=>{
      this.setState({
        listItems:listItems,
      });
    });
  }


// componentDidUpdate(prevProps: Readonly<ITulipListProps>, prevState: Readonly<ITulipListPropsState>, snapshot?: any): void {
//   console.log("component did update")
//   this.bindDetailsList();

// }

  componentDidMount() {
    console.log("component did mount")
    this.bindDetailsList();
  }

  private _clickHandler(item: ITulipsListItem){
    let deletionConfirmed = confirm("Do you really want to delete this item?");
    console.log(deletionConfirmed);

    if(deletionConfirmed){
      this._deleteListItem(item);
    }
  }

private _getUserName(Id:number): string{
      let tulipResponsibleEmail = null;
        $.ajax({
          url:  `${TulipList.siteURL}/_api/web/getuserbyid(${Id})`,
          type: "GET",
          headers: {
              "Accept": "application/json; odata=verbose"
          },
          async: false,
          success: function(data) {
            tulipResponsibleEmail = data.d.Title;
            },
            error: function(error) {
              console.log("Error with fetching user name: " + error);
            }
          });
          return tulipResponsibleEmail;
  }


//   private _getUserName(Id:number): string{
//     let userName = ""
//      this.props.context.spHttpClient.get(
//       this.props.context.pageContext.web.absoluteUrl + `/_api/web/getuserbyid(${Id})`,
//       SPHttpClient.configurations.v1)
//       .then(response => {
//         return response.json();
//       })
//       .then(json => {
//         userName = json.Title;
//         console.log("INSIDE:" + userName)
//         //return json.value;
//       })
//       console.log("Outside: " + userName)
//       return userName
// }

  private _deleteListItem(item: ITulipsListItem):Promise<SPHttpClientResponse> {
    console.log("ITEM TO DELETE:" + item.ID)
    console.log("LIST NAME:" + this.props.listName)
    return this.props.context.spHttpClient.get(
      this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.props.listName}')/items(${item.ID})?$select=Id`,
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

    const endpoint: string = this.props.context.pageContext.web.absoluteUrl
    + `/_api/web/lists/getbytitle('${this.props.listName}')/items(${item.ID})`

    return this.props.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, request);
  }).then( this._triggerEmail(item))
}

//Gets and returns the email address of the user by the id that's passed in.
private _getUserEmail(Id:number):number{
  let tulipResponsibleEmail = null;
    $.ajax({
      url: this.props.context.pageContext.web.absoluteUrl + `/_api/web/getuserbyid(${Id})`,
      type: "GET",
      headers: {
          "Accept": "application/json; odata=verbose"
      },
      async: false,
      success: function(data) {
        tulipResponsibleEmail = data.d.Email;
        },
        error: function(error) {
          console.log("Error with fetching user email" + error);
        }
      });
      return tulipResponsibleEmail;
}

private _getCurrentLoggedInUser(){
let loggedInUserTitle = null;
$.ajax({
  url: this.props.context.pageContext.web.absoluteUrl + `/_api/Web/currentUser`,
  type: "GET",
  headers: {
      "Accept": "application/json; odata=verbose"
  },
  async: false,
  success: function(data) {
    loggedInUserTitle = data.d.Title;
    },
    error: function(error) {
      console.log("Error with fecthing current logged in user: " + error);
    }
  });
  console.log("INLOGGAD ANVÄNDARE:" + loggedInUserTitle)
  return loggedInUserTitle;
}

 //Sends email to the tulip creator and tulip responsible
 private _triggerEmail(item:ITulipsListItem):any{
  let MailBody = '', MailSubject = 'Tulip removal'
  const tulipResponsible = this._getUserEmail(item.TulipResponsible.Id);
  const tulipCreator = this._getUserEmail(item.Author.Id);
  MailBody    =  `'<p>Hi,<p> <p>${item.Title} (ID: ${item.ID}) has been removed by ${this._getCurrentLoggedInUser()} from Enfokam Tulips'`;
  var taMailBody = {
    properties: {
      __metadata: { 'type': 'SP.Utilities.EmailProperties' },
      From: "From: no-reply@sharepointonline.com",
      To: { 'results': [tulipResponsible, tulipCreator] },
      Body: MailBody,
      Subject: MailSubject,
    }
  };

  const digestCache: IDigestCache = this.props.context.serviceScope.consume(DigestCache.serviceKey);
        digestCache.fetchDigest(this.props.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {

          $.ajax({
            contentType: 'application/json',
            url: this.props.context.pageContext.web.absoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
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




}


