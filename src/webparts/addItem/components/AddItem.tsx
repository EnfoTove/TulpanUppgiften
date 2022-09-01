import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import strings from 'TulipListWebPartStrings';
import { ComponentState } from 'react';
import { ITulipsListItem } from '../../../models/ITulipsListItem';
import { themeRulesStandardCreator } from 'office-ui-fabric-react';

export default class AddItem extends React.Component<IAddItemProps, {Title:string, ManufacturingPrice:number, RetailPrice:number, TulipResponsible:{Id:number}, TulipObject:ITulipsListItem}> {
  constructor(props) {
    super(props);
    this.state = {
      Title : "Tulip name",
      ManufacturingPrice: null,
      RetailPrice: null,
      TulipResponsible: {Id: null},
      TulipObject: {Title: " ", ManufacturingPrice: null, RetailPrice: null, TulipResponsible: {Id: null}}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): React.ReactElement<IAddItemProps> {
    return (
      <div className={ styles.addItem }>
        <div className={ styles.container }>
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input name="Title" value={this.state.Title} onChange={this.handleChange} />
        </label>
        <label>
          Manufacturing Price:
          <input name="ManufacturingPrice" value={this.state.ManufacturingPrice} onChange={this.handleChange} />
        </label>
        <label>
          Tulip Responsible Id:
          <input name="TulipResponsible" value={this.state.TulipResponsible.Id} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
      </div>
    );
  }

  private _onAddListItemClicked = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.onAddListItem(this.state.TulipObject);
  }

  private handleChange(e: any) {
    e.preventDefault();
     this.setState({ [e.target.name]: e.target.value } as ComponentState, ()=>{
      console.log(this.state.ManufacturingPrice)
     });

      let tulip = {Title: this.state.Title, ManufacturingPrice: this.state.ManufacturingPrice, RetailPrice: this.state.RetailPrice, TulipResponsible: {Id: this.state.TulipResponsible.Id}}
      this.setState({TulipObject:tulip})
      this.setState({RetailPrice:this.state.ManufacturingPrice * 1.1})
    }

  private handleSubmit(e:any) {
    alert("Title" + this.state.Title  + this.state.ManufacturingPrice );
    e.preventDefault();
    this._onAddListItemClicked(e);
  }



}
