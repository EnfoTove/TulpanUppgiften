import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { useEffect } from 'react';
import { SPHttpClient, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import { isTypedArray } from 'lodash';
import * as $ from 'jquery';


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
      listName: "EnfokamTulipsTove6"
    };
    TulipList.siteURL=this.props.websiteURL;
  }
  public render(): React.ReactElement<ITulipListProps> {
    // const {
    //   title,
    //   listItems,
    //   listName
    // } = this.props;

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
            {/* <div className={styles.button} id={styles.getTulipList}>
              <button type="button" onClick={this._onGetListItemsClicked}>Get tulip list</button>
            </div> */}
          <div className={styles.listItemContainer}>
            <ul className={styles.listItems}>
              {this.state.listItems && this.state.listItems.map((list) =>
                <li key={list.Title}>
                 <div className={styles.listItem}><p><span className={styles.label}>ID:</span>{list.ID}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Title:</span> {list.Title}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Manufacturing Price:</span>{list.ManufacturingPrice}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Retail Price:</span>{list.RetailPrice}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip Responsible ID:</span>{list.TulipResponsible.Id}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip creator ID:</span>{list.Author.Id}</p></div>
                 {/* { <div className={styles.button}>
                   <button name={list.ID.toString()} type="button" onClick={()=> this._clickHandler(list)}>Delete Item</button>
                  </div> } */}
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
    this.props.onDeleteListItem(item);
  }

  private _onGetListItemsClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      this.props.onGetListItems();
    }

}


