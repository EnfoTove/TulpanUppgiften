import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { useEffect } from 'react';
import { SPHttpClient, SPHttpClientResponse, IDigestCache, DigestCache } from '@microsoft/sp-http';
import { isTypedArray } from 'lodash';


export default class TulipList extends React.Component<ITulipListProps, {}> {

  public render(): React.ReactElement<ITulipListProps> {
    const {
      title,
      listItems,
    } = this.props;

  //   useEffect(() => {
  //     try{
  //         {this.props.onGetListItems()}
  //       }
  //       catch(error){
  //         return alert("API call failed." + error);
  //       }
  // }, [])

    return (
      <div className={ styles.tulipList }>
        <div className={ styles.container }>
          <div className={styles.titleContainer}>
              <span className={ styles.title }>{this.props.title}</span>
          </div>
            <div className={styles.button} id={styles.getTulipList}>
              <button type="button" onClick={this._onGetListItemsClicked}>Get tulip list</button>
            </div>
          <div className={styles.listItemContainer}>
            <ul className={styles.listItems}>
              {listItems && listItems.map((list) =>
                <li key={list.Title}>
                 <div className={styles.listItem}><p><span className={styles.label}>ID:</span>{list.ID}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Title:</span> {list.Title}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Manufacturing Price:</span>{list.ManufacturingPrice}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Retail Price:</span>{list.RetailPrice}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip Responsible ID:</span>{list.TulipResponsible.Id}</p></div>
                 <div className={styles.listItem}><p><span className={styles.label}>Tulip creator ID:</span>{list.Author.Id}</p></div>
                   <div className={styles.button}>
                   <button name={list.ID.toString()} type="button" onClick={()=> this._clickHandler(list)}>Delete Item</button>
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

  private _clickHandler(item: ITulipsListItem){
    this.props.onDeleteListItem(item);
  }

  private _onGetListItemsClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      this.props.onGetListItems();
    }

}


