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
  finishLoading: boolean,
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
          TulipResponsibleId: null,
          AuthorId:null
        },
      title: " ",
      listName: this.props.listName,
      authorItem: {},
      authorItems: [],
      tulipResponsibleItem: {},
      tulipResponsibleItems: [],
      finishLoading: false,
    };
    TulipList.siteURL=this.props.websiteURL;
  }
  public render(): React.ReactElement<ITulipListProps> {
    if(this.state.finishLoading){
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
                        <td>{this.state.tulipResponsibleItems[index].TulipResponsible.Title}</td>
                        <td>{this.state.authorItems[index].Author.Title}</td>
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

    componentDidMount() {
    sp.setup({
      spfxContext:this.props.context
    });
    console.log("component did mount")
     this._setListStates();
  }

  private async _getCurrentListItemsPnp():Promise<ITulipsListItem[]>{
    var allItems = await sp.web.lists.getByTitle(this.props.listName).items.get();
    return allItems as unknown as Promise<ITulipsListItem[]>;
  }

  private async _getTulipResponsibleInfo():Promise<ITulipResponsibleItem[]>{
    const tulipResponsibleInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("TulipResponsible/Title").expand("TulipResponsible").getAll();
    return tulipResponsibleInfo as unknown as Promise<ITulipResponsibleItem[]>;
  }

  private async _getAuthorInfo():Promise<IAuthorItem[]>{
    const authorInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll();
    return authorInfo as unknown as Promise<IAuthorItem[]>;

  }


  private async _setListStates(){
    console.log("bind details list")

   await this._getCurrentListItemsPnp().then(listItems=>{
      this.setState({
        listItems:listItems,
      });
    });

     await this._getTulipResponsibleInfo().then(listItems=>{
      this.setState({
        tulipResponsibleItems:listItems,
      });
    });

    console.log(this.state.tulipResponsibleItems)

    await this._getAuthorInfo().then(listItems=>{
      this.setState({
        authorItems:listItems,
        finishLoading:true
      });
    });

    console.log(this.state.authorItems)
  }


  public async _getUserNamePnp(id: number){
        const user = await sp.web.getUserById(id)();
        return user.Title;
  }

  private _clickHandler(item: ITulipsListItem){
    let deletionConfirmed = confirm("Do you really want to delete this item?");
    console.log(deletionConfirmed);

    if(deletionConfirmed){
      this._deleteListItem(item);
    }
  }

 public async _deleteListItem(item: ITulipsListItem) {
  const list = sp.web.lists.getByTitle(this.props.listName);
  try {
    await list.items.getById(item.ID).delete().then();
    this._triggerEmail(item);
    this._setListStates();
  } catch (error) {
    console.error(error);
  }
}



public async _getUserEmailPnp(id: number){
  const user = await sp.web.getUserById(id)();
  const email = user.Email.toString();
  console.log("User email fetched is: " + email)
  return email;
}

private async _getCurrentLoggedInUser(){
  const loggedInUser = await sp.web.currentUser();
  const loggedInUserName = loggedInUser.Title.toString();
  return loggedInUserName;
}

 //Sends email to the tulip creator and tulip responsible
 private async _triggerEmail(item:ITulipsListItem){
  let MailBody = '', MailSubject = 'Tulip removal'
  const tulipResponsible = await this._getUserEmailPnp(item.TulipResponsibleId);
  const tulipCreator = await this._getUserEmailPnp(item.AuthorId);
  const deletionName = await this._getCurrentLoggedInUser();

  MailBody    =  `'<p>Hi,<p> <p>${item.Title} (ID: ${item.ID}) has been removed by ${deletionName} from Enfokam Tulips'`;
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


