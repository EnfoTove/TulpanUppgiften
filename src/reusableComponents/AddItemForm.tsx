import * as React from 'react';
import { DefaultButton, Icon, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import TulipList from '../webparts/tulipList/components/TulipList';
import styles from '../webparts/tulipList/components/TulipList.module.scss';
import Fileuploader from './FileUploader';
import { ConsoleListener, sp } from '@pnp/pnpjs';
import { IUserItem } from '../models/interfaces/IUserItem';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ComponentState } from 'react';
import "@pnp/sp/webs";

export interface IAddItemForm1Props{
  listName:string,
  context:WebPartContext,
  hideComponent: ()=>void
}

export interface IAddItemForm1PropsState{
  newTulipName:string,
  newTulipManufacturingPrice?:string,
  newTulipResponsible?:IUserItem,
  nullTitlePost:boolean,
  nonNumericPost: boolean,
  selectedFile:any
  img: any
}

export default class  AddItemForm1 extends React.Component<IAddItemForm1Props, IAddItemForm1PropsState> {
  public constructor(props:IAddItemForm1Props, state: IAddItemForm1PropsState){
    super(props);
    this.state={
      newTulipName:null,
      newTulipManufacturingPrice:null,
      newTulipResponsible:null,
      nullTitlePost:false,
      nonNumericPost: false,
      selectedFile:{name:null},
      img:null
    };
    this._handleChange = this._handleChange.bind(this);
  }

  public render(): React.ReactElement<IAddItemForm1Props> {
    const CancelIcon = () => <Icon iconName="Cancel" />

  return(
        <div className={styles.addItemForm}>
        <p className={styles.formHeader}>New item </p>
        <div className={styles.cancelIcon} onClick={this.props.hideComponent}>
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
                onChange={this._getPeoplePickerItems.bind(this)}/>
              {/* <Fileuploader/> */}
              <div>
                  <input type="file" onChange={this._onFileChange} />
                  <PrimaryButton onClick={this._onFileUpload}>
                  Upload
                  </PrimaryButton>
              </div>
                  <PrimaryButton
                    text='Save'
                    className='button'
                    onClick={this._addNewItem.bind(this)}
                  />
                <DefaultButton
                text='Cancel'
                onClick={this.props.hideComponent}

                />
        </form>
    </div>
  )

}

// componentDidMount() {
//   sp.setup({
//     spfxContext:this.props.context
//   });
// }

  private _getPeoplePickerItems(event) {
    console.log({event})
    this.setState({
       newTulipResponsible: event[0]
      });
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

  private async _addNewItem(this){
    console.log("MAN PRICE: " + this.state.newTulipManufacturingPrice)
    let noTitle = this._checkIfNullOrEmpty(this.state.newTulipName)
    noTitle?this.state.nullTitlePost = true : this.state.nullTitlePost= false
    let nonNumericMP = !this._checkIfNumber(this.state.newTulipManufacturingPrice) && this.state.newTulipManufacturingPrice!=null
    nonNumericMP?this.state.nonNumericPost=true:this.state.nonNumericPost=false

    console.log("mp: " + this.state.newTulipManufacturingPrice + "error should show: " + this.state.nonNumericPost)

      if (!noTitle && !nonNumericMP){
        console.log(this.state.nullTitlePost)
        console.log("Posting this: " + this.state.newTulipName)
        if(this.state.newTulipResponsible != null){
        await sp.web.lists.getByTitle(this.props.listName).items.add({
          Title: this.state.newTulipName,
          ManufacturingPrice: this.state.newTulipManufacturingPrice,
          TulipResponsibleId: this.state.newTulipResponsible.id,
          Image:JSON.stringify(this.state.img)
        }).then(
          this.setState({
            newTulipName: "",
            newTulipManufacturingPrice:"",
            newTulipResponsible:"",
            selectedFile:null
          })
        )
    }
    else{
      await sp.web.lists.getByTitle(this.state.listName).items.add({
        Title: this.state.newTulipName,
        ManufacturingPrice: this.state.newTulipManufacturingPrice,
        });
        this.state.newTulipName= "";
        this.state.newTulipManufacturingPrice="";
    }

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


private _onFileChange = event => {

	// Update the state
	this.setState({ selectedFile: event.target.files[0] });

	};

	// On file upload (click the upload button)
	private _onFileUpload = async () => {

     // upload to the root folder of site assets
     const assets = await sp.web.lists.ensureSiteAssetsLibrary();
     const fileItem = await assets.rootFolder.files.add(this.state.selectedFile.name, this.state.selectedFile, true);

    //  const rootweb = await sp.site.getRootWeb()
    //  const rootwebUrl = rootweb.data.parentUrl
    // console.log("IMG SERVER URL " + img.serverUrl)

     const img = {
      "fileName":this.state.selectedFile.name,
      "type":"thumbnail",
      "serverUrl": "https://wcqvp.sharepoint.com",
      "serverRelativeUrl": fileItem.data.ServerRelativeUrl,
     };

     console.log("IMG SERVER RELATIVE URL " + img.serverRelativeUrl)
     this.setState({
      img:img
     })
  }
}
