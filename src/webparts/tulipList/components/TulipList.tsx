import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { DefaultButton, Spinner, SpinnerSize, tdProperties, TooltipHost, PrimaryButton } from 'office-ui-fabric-react';
import { ConsoleListener, sp } from '@pnp/pnpjs';
import { IAuthorItem } from '../../../models/IAuthorItem';
import { ITulipResponsibleItem } from '../../../models/ITulipResponsibleItem';
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { DialogFooter, DialogContent } from 'office-ui-fabric-react/lib/Dialog';

export interface ITulipListPropsState{
  listItem: ITulipsListItem,
  listItems: ITulipsListItem[],
  title:string,
  listName: string
  authorItem?: IAuthorItem,
  authorItems?: IAuthorItem[],
  tulipResponsibleItem?: ITulipResponsibleItem,
  tulipResponsibleItems?: ITulipResponsibleItem[],
  finishLoading: boolean,
  showDeleteBox: boolean;
  focusItem: ITulipsListItem;
}

export interface TypedHash<T> {
  [key: string]: T;
}

export interface EmailProperties {
  To: string[];
  CC?: string[];
  BCC?: string[];
  Subject: string;
  Body: string;
  AdditionalHeaders?: TypedHash<string>;
  From?: string;
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
      authorItems: [{}],
      tulipResponsibleItem: {},
      tulipResponsibleItems: [{}],
      finishLoading: false,
      showDeleteBox:false,
      focusItem: {
        ID: null,
        Title: " ",
        ManufacturingPrice: null,
        RetailPrice: null,
        TulipResponsibleId: null,
        AuthorId:null
      }
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
                {this.state.listItems.length > 0
                   ? <table>
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
                              {this.state.tulipResponsibleItems[index].TulipResponsible != undefined
                              ?<td>{this.state.tulipResponsibleItems[index].TulipResponsible.Title}</td>
                              : <td>No responsible</td> }
                              <td>{this.state.authorItems[index].Author.Title}</td>
                              <DefaultButton className={styles.defaultButton} onClick={() => this._clickHandler(item)}>Delete Item</DefaultButton>
                            </tr>

                        </tbody>
                      )
                    }
                    </table>
                :<p className={styles.noItems}>This list has no items</p>
              }
                      {this.state.showDeleteBox?
                      <DialogContent
                      className={styles.deleteBox}
                      title='Delete?'
                      subText="Do you really want to delete this item?"
                      onDismiss={()=>this._closeDialog()}
                      showCloseButton={true}
                      >
                      <DialogFooter>
                          <DefaultButton text='Cancel' title='Cancel' onClick={() => this._closeDialog()} />
                          <PrimaryButton text='OK' title='OK' onClick={() => { this._deleteListItem();}} />
                      </DialogFooter>
                      </DialogContent>
                       : null
                      }
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
     this._setListStates();
  }

  //Closes delete dialog after dismiss by setting showDeleteBox to false
  private _closeDialog(){
    this.setState({
      showDeleteBox:false
    })
  }



  //Gets all items in requested list (list is set by props)
  private async _getCurrentListItems():Promise<ITulipsListItem[]>{
    try {
      const allItems = await sp.web.lists.getByTitle(this.props.listName).items.get();
      return allItems as unknown as Promise<ITulipsListItem[]>;
    } catch (error) {
      console.error(error);
    }
  }

  //Gets title of all of the list item responsible in the current list items
  private async _getTulipResponsibleTitle():Promise<ITulipResponsibleItem[]>{
    try {
       const tulipResponsibleInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("TulipResponsible/Title").expand("TulipResponsible").getAll();
        return tulipResponsibleInfo as unknown as Promise<ITulipResponsibleItem[]>;
    } catch (error) {
      console.error(error);
    }
  }

   //Gets title of all of the list creators in the current list items
  private async _getAuthorTitle():Promise<IAuthorItem[]>{
    try {
      const authorInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll();
      return authorInfo as unknown as Promise<IAuthorItem[]>;
    } catch (error) {
      console.error(error);
    }
  }


  //Sets states to provide render() with necessary information
  private async _setListStates(){

    try {
      await this._getCurrentListItems().then(listItems=>{
        this.setState({
          listItems:listItems,
        });
      });

        await this._getTulipResponsibleTitle().then(listItems=>{
        this.setState({
          tulipResponsibleItems:listItems,
        });
      });

      console.log(this.state.tulipResponsibleItems)

      await this._getAuthorTitle().then(listItems=>{
        this.setState({
          authorItems:listItems,
          finishLoading:true
        });
      });
    } catch (error) {
      console.error(error);
    }

  }

  //Gets user by id
  // public async _getUserName(id: number){
  //       const user = await sp.web.getUserById(id)();
  //       return user.Title;
  // }

  //Handles deletion click and triggers _deleteListItem if deletion is confirmed
  private _clickHandler(item: ITulipsListItem){
    // let deletionConfirmed = confirm("Do you really want to delete this item?");
    // console.log(deletionConfirmed);

    // if(deletionConfirmed){
    //   this._deleteListItem(item);
    // }

    this.setState({
      showDeleteBox:true,
      focusItem:item
    })
  }

//Deletes an item
 public async _deleteListItem() {
  const list = sp.web.lists.getByTitle(this.props.listName);
  try {
    await list.items.getById(this.state.focusItem.ID).delete().then();
    this._sendEmail(this.state.focusItem);
    this._setListStates();
  } catch (error) {
    console.error(error);
  }
  this.setState({
    showDeleteBox:false
  })
}


//Gets & returns the email of the requested person (by id) in string format
public async _getUserEmailPnp(id: number){
  try {
    const user = await sp.web.getUserById(id)();
    const email = user.Email.toString();
    console.log("User email fetched is: " + email)
    return email;
  } catch (error) {
    console.error(error);
  }
}

//Gets & returns current user in string format
private async _getCurrentLoggedInUser(){
  try {
    const loggedInUser = await sp.web.currentUser();
    const loggedInUserName = loggedInUser.Title.toString();
    return loggedInUserName;
  } catch (error) {
    console.error(error);
  }
}

 //Sends email to the tulip creator and tulip responsible
  private async _sendEmail(item:ITulipsListItem){
  const tulipResponsible = await this._getUserEmailPnp(item.TulipResponsibleId);
  const tulipCreator = await this._getUserEmailPnp(item.AuthorId);
  const deletionName = await this._getCurrentLoggedInUser();

  const receiverList = [tulipResponsible, tulipCreator]
  const filteredReceiversList = []
  receiverList.forEach(element => {
    if (element === null || element === undefined){
      console.log("Element not added in new receivers list")
    }else{
      filteredReceiversList.push(element);
    }
  });

  const emailProps: IEmailProperties = {
    To: filteredReceiversList,//[tulipResponsible, tulipCreator],
    Subject: "Tulip Removal",
    Body: `'<p>Hi,<p> <p>${item.Title} (ID: ${item.ID}) has been removed by ${deletionName} from Enfokam Tulips.'`,
    AdditionalHeaders: {
        "content-type": "text/html"
    }
  };
    try {
      await sp.utility.sendEmail(emailProps);
    } catch (error) {
      console.error(error)
    }
  }

}


