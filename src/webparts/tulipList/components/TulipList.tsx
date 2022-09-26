import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { DefaultButton, Spinner, SpinnerSize, IIconProps} from 'office-ui-fabric-react';
import { sp } from '@pnp/pnpjs';
import "@pnp/sp/sputilities";
import { ITulipListPropsState } from '../../../models/interfaces/ITulipListPropsState';
import { ITulipsListItem } from '../../../models/interfaces/ITulipsListItem';
import { ITulipResponsibleItem } from '../../../models/interfaces/ITulipResponsibleItem';
import { IAuthorItem } from '../../../models/interfaces/IAuthorItem';
import { ITulipImage } from '../../../models/interfaces/ITulipImage';
import AddItemForm from '../../../reusableComponents/AddItemForm';
import DeleteItem from '../../../reusableComponents/DeleteItem';


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
          Image:null,
          TulipResponsibleId: null,
          AuthorId:null
        },
      title: " ",
      listName: this.props.listName,
      context:this.props.context,
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
        Image:null,
        TulipResponsibleId: null,
        AuthorId:null
      }
    };

    TulipList.siteURL=this.props.websiteURL;
  }

  public render(): React.ReactElement<ITulipListProps> {
    const addIcon: IIconProps = { iconName: 'Add' };
    if(this.state.finishLoading){
      return (
        <div className={ styles.tulipList }>
          <div className={ styles.container }>
              <div className={ styles.title }>{this.props.title}</div>
                <div className={ styles.subTitle }>List: {this.props.listName}</div>
                <DefaultButton
                text="New item"
                iconProps={addIcon}
                className={styles.newItemButton}
                onClick={()=>this.setState({showAddItemForm:true})}
                />
                {this.state.showAddItemForm?
                  <AddItemForm context={this.props.context} listName={this.props.listName} hideComponent={this._closeAddItemForm} setListStates={()=>this.setListStates()}/>
                  :null
                }
                {this.state.listItems.length > 0
                   ? <table>
                        <thead>
                          <tr>
                            <th>Tulip Image</th>
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
                              {console.log(item)}
                              {item.Image!="null" || item.Image!==null
                               ?<td><img src={this._getImgUrl(item)}/></td>
                                :<td>No img</td>
                              }
                              <td>{item.Title}</td>
                              <td>{item.ManufacturingPrice}</td>
                              <td>{item.RetailPrice * 1}</td>
                              {this.state.tulipResponsibleItems[index].TulipResponsible != undefined
                              ?<td>{this.state.tulipResponsibleItems[index].TulipResponsible.Title}</td>
                              : <td>No responsible</td> }
                              <td>{this.state.authorItems[index].Author.Title}</td>
                              <DefaultButton className={styles.defaultButton} onClick={() => this._clickHandler(item)}>Delete</DefaultButton>
                            </tr>
                        </tbody>
                      )
                    }
                    </table>
                :<p className={styles.noItems}>This list has no items</p>
              }
              {this.state.showDeleteBox?
              <DeleteItem listName={this.props.listName} focusItem={this.state.focusItem} setListStates={()=>this.setListStates()} closeDialog={this._closeDialog}/>
                : null
              }
            </div>
          </div>
      );
    }
    return (<Spinner size={SpinnerSize.large}/>)
  }


  private _getImgUrl(item:ITulipsListItem){

    try{
      let imageObj = JSON.parse(JSON.stringify(item.Image));

      const key1 = imageObj.replace("'fileName'",'"fileName"')
      const key2 = key1.replace("'serverRelativeUrl'",'"serverRelativeUrl"')
      const key3 = key2.replace("'serverUrl'",'"serverUrl"')
      const key4 = key3.replace("'/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/bluetulip.jfif'", '"/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/bluetulip.jfif"')
      const key5 = key4.replace("'/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/yellowtulip.jfif'", '"/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/yellowtulip.jfif"')
      const key6 = key5.replace("'/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/redtulip.jfif'", '"/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/redtulip.jfif"')
      const key7 = key6.replace("'/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/blacktulip.jfif'", '"/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/blacktulip.jfif"')
      const key8 = key7.replace("'/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/whitetulip.jfif'", '"/sites/EnfokamTulipsTove/SiteAssets/Lists/8740d2c9-ba96-4ade-ab01-cbe3a336cfbd/whitetulip.jfif"')
      const key9 = key8.replace("'https://wcqvp.sharepoint.com'", '"https://wcqvp.sharepoint.com"')
      const key10 = key9.replace("'redtulip.jfif'",'"redtulip.jfif"')
      const key11= key10.replace("'bluetulip.jfif'",'"bluetulip.jfif"')
      const key12 = key11.replace("'yellowtulip.jfif'",'"yellowtulip.jfif"')
      const key13 = key12.replace("'whitetulip.jfif'",'"whitetulip.jfif"')
      const key14 = key13.replace("'blacktulip.jfif'",'"blacktulip.jfif"')

      console.log("IMG OBJ BF PARSE" + key14)
      let jsonObject: ITulipImage = JSON.parse(key14);
      console.log("IMG OBJ AFTER PARSE" + jsonObject)

      const serverUrl=jsonObject.serverUrl;
      console.log("Server url: " + serverUrl)
      const serverRelativeUrl=jsonObject.serverRelativeUrl;
      console.log("Server rel url: " +  serverRelativeUrl)

      const fullUrl= serverUrl+serverRelativeUrl;
      console.log("full url " + fullUrl)
    return fullUrl;
    }
    catch(e){
      console.error(e);
    }
    return "imageNotFound"

  }

    componentDidMount() {
    sp.setup({
      spfxContext:this.props.context
    });
     this.setListStates();
  }

  //Closes delete dialog after dismiss by setting showDeleteBox to false
  private _closeDialog=()=>{
    this.setState({
      showDeleteBox:false
    })
  }

  private _closeAddItemForm=()=>{
    this.setState({
      showAddItemForm:false
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
  public async setListStates(){
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


  //Handles deletion click and triggers _deleteListItem if deletion is confirmed
  private _clickHandler(item: ITulipsListItem){
    this.setState({
      showDeleteBox:true,
      focusItem:item
    })
  }

}
