import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { useEffect } from 'react';
import { SPHttpClient, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import { isTypedArray } from 'lodash';
import * as $ from 'jquery';
import { DefaultButton, DialogContent, DialogFooter, PrimaryButton } from 'office-ui-fabric-react';
import { BaseDialog, Dialog, IDialogConfiguration } from '@microsoft/sp-dialog';


export interface ITulipListPropsState{
  listItems: ITulipsListItem[],
  title:string,
  listName: string
}
export default class TulipList extends React.Component<ITulipListProps, ITulipListPropsState> {

  static siteURL:string="";
  public constructor(props:ITulipListProps, state: ITulipListPropsState){
    super(props);
    this.state={
      listItems: [
        {
          ID: null,
          Title: " ",
          ManufacturingPrice: null,
          RetailPrice: null,
          TulipResponsible: {Id: null},
          Author:{Id: null}
        }
      ],
      title: " ",
      listName: this.props.listName
    };
    TulipList.siteURL=this.props.websiteURL;
  }
  public render(): React.ReactElement<ITulipListProps> {
    return (
      <div className={ styles.tulipList }>
        <div className={ styles.container }>
          <div className={styles.titleContainer}>
              <span className={ styles.title }>{this.props.title}</span>
          </div>
          <div className={styles.subTitleContainer}>
              <span className={ styles.subTitle }>List: </span>
              <span className={ styles.listName }>{this.props.listName}</span>
          </div>
          <div className={styles.listItemContainer}>
            <ul className={styles.listItems}>
              {this.state.listItems && this.state.listItems.map((item) =>
                <li key={item.Title}>
                 <div className={styles.listItem}><p><span className={styles.label}>ID:</span>{item.ID}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Title:</span> {item.Title}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Manufacturing Price:</span>{item.ManufacturingPrice}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Retail Price:</span>{item.RetailPrice*1}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip Responsible:</span>{this._getUserName(item.TulipResponsible.Id)}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip creator ID:</span>{this._getUserName(item.Author.Id)}</p></div>
                     <div className={styles.button}>
                   <button type="button" onClick={()=> this._clickHandler(item)}>Delete Item</button>
                  </div>
                </li>
              )
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
   let context= this;
   $.ajax({
    url:`${TulipList.siteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId`,
    type:"GET",
    headers:{'Accept': 'application/json; odata=verbose;'},
    success:function(resultData){
      context.setState({
        listItems:resultData.d.results
      });
    },
    error:function(jqXHR, textStatus, errorThrown){
      console.log("jqXHR: "+ jqXHR, "textStatus: " + textStatus, "errorThrown: " + errorThrown )
    }

   });
  }

  private _clickHandler(item: ITulipsListItem){
    let deletionConfirmed = confirm("Do you really want to delete this item?");
    console.log(deletionConfirmed);

    if(deletionConfirmed){
      this.props.onDeleteListItem(item);
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
              console.log("fnGetUserProps:: " + error);
            }
          });
          return tulipResponsibleEmail;
  }

}


