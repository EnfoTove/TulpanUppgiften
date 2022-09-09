import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import * as $ from 'jquery';
import { DefaultButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import { sp } from '@pnp/pnpjs';
import { IAuthorItem } from '../../../models/IAuthorItem';
import { ITulipResponsibleItem } from '../../../models/ITulipResponsibleItem';

export interface ITulipListPropsState{
  listItem: ITulipsListItem,
  listItems: ITulipsListItem[],
  title:string,
  listName: string
  authorItem: IAuthorItem,
  authorItems: IAuthorItem[],
  tulipResponsibleItem: ITulipResponsibleItem,
  tulipResponsibleItems: ITulipResponsibleItem[],
  loading: boolean,
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
      authorItem: {
      },
      authorItems: [],
      loading: false,
      tulipResponsibleItem: {},
      tulipResponsibleItems: [],
    };
    TulipList.siteURL=this.props.websiteURL;
  }
  public render(): React.ReactElement<ITulipListProps> {
    if(this.state.loading){
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
                { this.state.listItems &&  this.state.listItems.map((item, index) =>
                  <tbody>
                      <tr key={item.ID}>
                        <td>{item.ID}</td>
                        <td>{item.Title}</td>
                        <td>{item.ManufacturingPrice}</td>
                        <td>{item.RetailPrice * 1}</td>
                        <td>{this.state.authorItems[index].Author.Title}</td>
                        <td>{this.state.tulipResponsibleItems[index].TulipResponsible.Title}</td>
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
    return (<Spinner size={SpinnerSize.large}/>)
  }
// public async
  componentDidMount() {
    sp.setup({
      spfxContext:this.props.context
    });
    console.log("component did mount")
    this.bindDetailsList();
    this._getUserInfo();
    this._getTulipResponsibleInfo();
  }

  private async _getCurrentListItemsPnp(): Promise<ITulipsListItem[]>{
    var listItems = await sp.web.lists.getByTitle(this.props.listName).items.get();
    console.log(listItems);
    return listItems as unknown as Promise<ITulipsListItem[]>;
  }

  private async _getUserInfo(){
    const userInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll();
    console.log(userInfo);
    this.setState({
      authorItems: userInfo,
      loading:true
    })
    console.log(this.state.authorItems[0])
  }

  private async _getTulipResponsibleInfo(){
    const tulipResponsibleInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("TulipResponsible/Title").expand("TulipResponsible").getAll();
    console.log(tulipResponsibleInfo);
    this.setState({
      tulipResponsibleItems: tulipResponsibleInfo,
      loading:true
    })
    console.log(this.state.tulipResponsibleItems[0])
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

    this._getCurrentListItemsPnp().then(listItems=>{
      this.setState({
        listItems:listItems,
      });
    });
  }

  // public async _getUserByRandomId(){
  //       const user = await sp.web.getUserById(11)();
  // }

  public async _getUserNamePnp(id: number){
    // var user = {};
    // const userInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").getAll();
    // console.log({userInfo}, {user});
    // this.setState({
    //   userAuthor: userInfo[0]
    // });

    console.log("ID sent in: " + id)
        const user = await sp.web.getUserById(id)();
        console.log("user title: " + user.Title)
        return user.Title;
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

    private _clickHandler(item: ITulipsListItem){
      let deletionConfirmed = confirm("Do you really want to delete this item?");
      console.log(deletionConfirmed);

      if(deletionConfirmed){
        this._deleteListItem(item);
      }
    }

  private _deleteListItem(item: ITulipsListItem):void {
    const endpoint: string = this.props.context.pageContext.web.absoluteUrl
    + `/_api/web/lists/getbytitle('${this.props.listName}')/items(${item.ID})`

    const headers: any = { 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*'}

    const spHttpClientOptions: ISPHttpClientOptions = {
      "headers": headers
    }

     this.props.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, spHttpClientOptions)
     .then((response: SPHttpClientResponse)=>{
      if (response.status=== 204){
        console.log("deletion done");
        //this._triggerEmail(item)
        this.bindDetailsList();
      }
      else{
        let errormsg: string = "An error has occured: " + response.status + response.statusText
        console.log(errormsg)
      }
     })
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

private _getCurrentLoggedInUser():string{
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
//  private _triggerEmail(item:ITulipsListItem):any{
//   let MailBody = '', MailSubject = 'Tulip removal'
//   const tulipResponsible = this._getUserEmail(item.TulipResponsible.Id);
//   const tulipCreator = this._getUserEmail(item.Author.Id);
//   MailBody    =  `'<p>Hi,<p> <p>${item.Title} (ID: ${item.ID}) has been removed by ${this._getCurrentLoggedInUser()} from Enfokam Tulips'`;
//   var taMailBody = {
//     properties: {
//       __metadata: { 'type': 'SP.Utilities.EmailProperties' },
//       From: "From: no-reply@sharepointonline.com",
//       To: { 'results': [tulipResponsible, tulipCreator] },
//       Body: MailBody,
//       Subject: MailSubject,
//     }
//   };

//   const digestCache: IDigestCache = this.props.context.serviceScope.consume(DigestCache.serviceKey);
//         digestCache.fetchDigest(this.props.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {

//           $.ajax({
//             contentType: 'application/json',
//             url: this.props.context.pageContext.web.absoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
//             type: "POST",
//             data: JSON.stringify(taMailBody),
//             headers: {
//               "Accept": "application/json;odata=verbose",
//               "content-type": "application/json;odata=verbose",
//               "X-RequestDigest": digest
//             },
//             success: function (data) {
//               console.log("Success");
//             },
//             error: function (data) {

//               console.log("Error: " + JSON.stringify(data));
//             }
//           });
//         });
// }

}


