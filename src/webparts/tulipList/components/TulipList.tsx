import * as React from 'react';
import styles from './TulipList.module.scss';
import { ITulipListProps } from './ITulipListProps';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import * as $ from 'jquery';
import { DefaultButton } from 'office-ui-fabric-react';

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
      // listItems: [
      //   {
      //     ID: null,
      //     Title: " ",
      //     ManufacturingPrice: null,
      //     RetailPrice: null,
      //     TulipResponsible: {Id: null},
      //     Author:{Id: null}
      //   }
      // ],
      listItems:this.props.listItems,
      title: " ",
      listName: this.props.listName
    };
    TulipList.siteURL=this.props.websiteURL;

  }
  public render(): React.ReactElement<ITulipListProps> {
    return (
      <div className={ styles.tulipList }>
        <div className={ styles.container }>
            <div className={ styles.title }>{this.props.title}</div>
              <div className={ styles.subTitle }>List: {this.props.listName}</div>
        LISTITEMS
        {this.props.listItems}
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
              {this.state.listItems && this.state.listItems.map((item) =>
                <tbody>
                    <tr  key={item.ID}>
                      <td>{item.ID}</td>
                      <td>{item.Title}</td>
                      <td>{item.ManufacturingPrice}</td>
                      <td>{item.RetailPrice * 1}</td>
                      <td>{this._getUserName(item.TulipResponsible.Id)}</td>
                      <td>{this._getUserName(item.Author.Id)}</td>
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

  componentDidMount() {
  this.props.onGetListItems();


  let context= this;
  context.setState({
    listItems:this.props.listItems
  })



  //  let context= this;
  //  $.ajax({
  //   url:`${TulipList.siteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId`,
  //   type:"GET",
  //   headers:{'Accept': 'application/json; odata=verbose;'},
  //   success:function(resultData){
  //     context.setState({
  //       listItems:resultData.d.results
  //     });
  //   },
  //   error:function(jqXHR, textStatus, errorThrown){
  //     console.log("jqXHR: "+ jqXHR, "textStatus: " + textStatus, "errorThrown: " + errorThrown )
  //   }

  //  });
  }

  async getTulips(){
    await this.props.onGetListItems();


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


