import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { DefaultButton, Spinner, SpinnerSize, PrimaryButton, DialogContent, DialogFooter, Icon, TextField, HighContrastSelectorBlack } from 'office-ui-fabric-react';
import { sp } from '@pnp/pnpjs';
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { ITulipListPropsState } from '../../../models/interfaces/ITulipListPropsState';
import { ITulipsListItem } from '../../../models/interfaces/ITulipsListItem';
import { ITulipResponsibleItem } from '../../../models/interfaces/ITulipResponsibleItem';
import { IAuthorItem } from '../../../models/interfaces/IAuthorItem';
import {
  PeoplePicker,
  } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { ComponentState } from 'react';
import { Field } from 'react-final-form';


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
      showAddItemForm: false,
      focusItem: {
        ID: null,
        Title: "",
        ManufacturingPrice: null,
        RetailPrice: null,
        TulipResponsibleId: null,
        AuthorId:null
      },
      newTulipName:null,
      newTulipManufacturingPrice:null,
      newTulipResponsible:null,
      nullTitlePost:false,
      nonNumericPost: false
    };
    this._handleChange = this._handleChange.bind(this);
    // this._handleSubmit = this._handleSubmit.bind(this);

    TulipList.siteURL=this.props.websiteURL;
  }

  public render(): React.ReactElement<ITulipListProps> {
    if(this.state.finishLoading){
      return (
        <div className={ styles.tulipList }>
          <div className={ styles.container }>
              <div className={ styles.title }>{this.props.title}</div>
                <div className={ styles.subTitle }>List: {this.props.listName}</div>
                <PrimaryButton className={styles.newItemButton} onClick={()=>this.setState({showAddItemForm:true})}> + New </PrimaryButton>
                {this.state.showAddItemForm?
                  this._getAddItemForm()
                  :null
                }
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
              this._getDialog()
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
  private _closeDialog=()=>{
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
    console.log("IN SET LIST STATES")
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
    this.setState({
      showDeleteBox:true,
      focusItem:item
    })
  }

//Deletes an item
 public async _deleteListItem (){
  const list = sp.web.lists.getByTitle(this.state.listName);
  try {
    await list.items.getById(this.state.focusItem.ID).delete().then();
    this._sendEmail(this.state.focusItem);
    this._setListStates();
  } catch (error) {
    console.error(error);
  }
  this._closeDialog()
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

private _checkIfNumber(value:any):boolean{
  return /^\d*?\.?\d+$/.test(value)
}

private _checkIfNullOrEmpty(value:any):boolean{
  let isNullOrEmpty;
  value === null || value === ""  ?  isNullOrEmpty=true : isNullOrEmpty=false
  return isNullOrEmpty
}

private async  _addNewItem(this){
let noTitle = this._checkIfNullOrEmpty(this.state.newTulipName)
noTitle?this.setState({nullTitlePost:true}):this.setState({nullTitlePost:false})
let nonNumericMP = !this._checkIfNumber(this.state.newTulipManufacturingPrice) && this.state.newTulipManufacturingPrice!=null
nonNumericMP?this.setState({nonNumericPost:true}):this.setState({nonNumericPost:false})

console.log("mp: " + this.state.newTulipManufacturingPrice + "error should show: " + this.state.nonNumericPost)

  if (!noTitle && !nonNumericMP){
    console.log(this.state.nullTitlePost)
    console.log("Posting this: " + this.state.newTulipName)
    if(this.state.newTulipResponsible != null){
    await sp.web.lists.getByTitle(this.props.listName).items.add({
    Title: this.state.newTulipName,
    ManufacturingPrice: this.state.newTulipManufacturingPrice,
      TulipResponsibleId: this.state.newTulipResponsible.id
    }).then(
      this.setState({
        newTulipName: "",
        newTulipManufacturingPrice:"",
        newTulipResponsible:""
      })
    )
}
else{
  await sp.web.lists.getByTitle(this.props.listName).items.add({
    Title: this.state.newTulipName,
    ManufacturingPrice: this.state.newTulipManufacturingPrice,
    }).then(
      this.setState({
        newTulipName: "",
        newTulipManufacturingPrice:"",
      })
    )
}
  }
}

//Returns dialog asking for comfirmation about deletion
  private _getDialog(){
    return(
      <DialogContent
          className={styles.dialog}
          title='Delete?'
          subText="Do you really want to delete this item?"
          onDismiss={()=>this._closeDialog()}
          showCloseButton={true}
          >
          <DialogFooter className={styles.dialogFooter}>
              <DefaultButton className={styles.cancelButton} text='Cancel' title='Cancel' onClick={() => this._closeDialog()} />
              <PrimaryButton text='OK' title='OK' onClick={() => { this._deleteListItem()}} />
          </DialogFooter>
      </DialogContent>
    )
  }


  private _getPeoplePickerItems(event) {
    console.log({event})
    this.setState({
       newTulipResponsible: event[0]
      });
    console.log( "USER: " + this.state.newTulipResponsible)
  }
  private _getAddItemForm(){
    const CancelIcon = () => <Icon iconName="Cancel" />

  return(
    <div className={styles.addItemForm}>
      <p className={styles.formHeader}>New item</p>
      <div className={styles.cancelIcon} onClick={()=>this.setState({showAddItemForm:false})}>
      <CancelIcon></CancelIcon>
      </div>
      <form>
        {this.state.nullTitlePost ?
        <TextField label="Title" required name="newTulipName" value={this.state.newTulipName} onChange={this._handleChange}  errorMessage="Please enter a title"/>
        : <TextField label="Title" required name="newTulipName" value={this.state.newTulipName} onChange={this._handleChange}/>
        }
        {this.state.nonNumericPost?
          <TextField label="Manufacturing price" name="newTulipManufacturingPrice" value={this.state.newTulipManufacturingPrice} onChange={this._handleChange} errorMessage="Please enter a valid number"/>
         :<TextField label="Manufacturing price" name="newTulipManufacturingPrice" value={this.state.newTulipManufacturingPrice} onChange={this._handleChange} />
        }
      <PeoplePicker context={this.props.context as any}
              personSelectionLimit={1}
              titleText='Tulip responsible:'
              ensureUser
              groupName={'EnfokamTulipsTove'}
              webAbsoluteUrl= {TulipList.siteURL}
              onChange={this._getPeoplePickerItems.bind(this)}>
            </PeoplePicker>
                <PrimaryButton
                  text='Save'
                  className='button'
                  onClick={this._addNewItem.bind(this)}
                />
              <DefaultButton
              text='Cancel'
              onClick={()=>this.setState({showAddItemForm:false})}
              />
        </form>
    </div>
  )


  }

  private _handleChange(e:any){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as ComponentState, ()=>{
      console.log(e.target.value)
    });


    if (e.target.value!=null){
          if(this._checkIfNullOrEmpty(this.state.newTulipName)){
            console.log("no title")
            this.setState({
              nullTitlePost:true
            })
          }
          else{
            console.log(" title")
            this.setState({
              nullTitlePost:false
            })
          }

         if (this._checkIfNumber(this.state.newTulipManufacturingPrice)){
           console.log("Number")
           this.setState({
             nonNumericPost:false
            })
          }
        else if(!this._checkIfNumber(this.state.newTulipManufacturingPrice) && this.state.newTulipManufacturingPrice !== null){
            console.log("not a number " + this._checkIfNumber(this.state.newTulipManufacturingPrice))
            this.setState({
              nonNumericPost:true
             })
         }

    }

  }

  //Main part of code comes from: https://www.delftstack.com/howto/typescript/typescript-sleeping-a-thread/
  private _delayBlocking(milliseconds: number){
    const timeInitial : any = new Date();
    var timeNow : any = new Date();
    for ( ; timeNow - timeInitial < milliseconds; ){
        timeNow = new Date();
    }
    console.log('Sleep done!');
}

private _checkValues(){
  if(this._checkIfNullOrEmpty(this.state.newTulipName)){
    console.log("no title")
    this.setState({
      nullTitlePost:true
    })
  }
  else{
    console.log(" title")
    this.setState({
      nullTitlePost:false
    })
  }

 if (this._checkIfNumber(this.state.newTulipManufacturingPrice)){
   console.log("Number")
   this.setState({
     nonNumericPost:false
    })
  }
else if(!this._checkIfNumber(this.state.newTulipManufacturingPrice) && this.state.newTulipManufacturingPrice !== null){
    console.log("not a number " + this._checkIfNumber(this.state.newTulipManufacturingPrice))
    this.setState({
      nonNumericPost:true
     })
 }

}

}

