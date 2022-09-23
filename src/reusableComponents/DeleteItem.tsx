import * as React from 'react';
import { DefaultButton, DialogContent, DialogFooter, PrimaryButton } from 'office-ui-fabric-react';
import styles from './DeleteItem.module.scss'
import {sp } from '@pnp/pnpjs';
import "@pnp/sp/webs";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { ITulipsListItem } from '../models/interfaces/ITulipsListItem';


export interface IDeleteItemProps{
  listName:string,
  focusItem:ITulipsListItem,
  setListStates: ()=>void,
  closeDialog: ()=>void
}

export interface IDeleteItemPropsState{

}

export default class  DeleteItem extends React.Component<IDeleteItemProps, IDeleteItemPropsState> {
  public constructor(props:IDeleteItemProps, state: IDeleteItemPropsState){
    super(props);
    this.state={

    };
  }

  public render(): React.ReactElement<IDeleteItemProps> {
  return(
    <DialogContent
    className={styles.dialog}
    title='Delete?'
    subText="Do you really want to delete this item?"
    onDismiss={()=>this.props.closeDialog()}
    showCloseButton={true}
    >
    <DialogFooter className={styles.dialogFooter}>
        <DefaultButton className={styles.cancelButton} text='Cancel' title='Cancel' onClick={() => this.props.closeDialog()} />
        <PrimaryButton text='OK' title='OK' onClick={() => {this._deleteListItem()}} />
    </DialogFooter>
  </DialogContent>
  )



}

//Deletes an item
public async _deleteListItem (){
const list = sp.web.lists.getByTitle(this.props.listName);
try {
  await list.items.getById(this.props.focusItem.ID).delete().then();
  this._sendEmail(this.props.focusItem);
  this.props.setListStates();
} catch (error) {
  console.error(error);
}
this.props.closeDialog()
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
