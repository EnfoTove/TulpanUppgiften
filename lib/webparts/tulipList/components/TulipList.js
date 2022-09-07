var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './TulipList.module.scss';
import * as $ from 'jquery';
import { DefaultButton } from 'office-ui-fabric-react';
var TulipList = /** @class */ (function (_super) {
    __extends(TulipList, _super);
    function TulipList(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            listItems: [
                {
                    ID: null,
                    Title: " ",
                    ManufacturingPrice: null,
                    RetailPrice: null,
                    TulipResponsible: { Id: null },
                    Author: { Id: null }
                }
            ],
            title: " ",
            listName: _this.props.listName
        };
        TulipList.siteURL = _this.props.websiteURL;
        return _this;
    }
    TulipList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.tulipList },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.title }, this.props.title),
                React.createElement("div", { className: styles.subTitle },
                    "List: ",
                    this.props.listName),
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "ID"),
                            React.createElement("th", null, "Title"),
                            React.createElement("th", null, "Manufacturing Price"),
                            React.createElement("th", null, "Retail Price"),
                            React.createElement("th", null, "Tulip Responsible"),
                            React.createElement("th", null, "Tulip creator"))),
                    this.state.listItems && this.state.listItems.map(function (item) {
                        return React.createElement("tbody", null,
                            React.createElement("tr", { key: item.ID },
                                React.createElement("td", null, item.ID),
                                React.createElement("td", null, item.Title),
                                React.createElement("td", null, item.ManufacturingPrice),
                                React.createElement("td", null, item.RetailPrice * 1),
                                React.createElement("td", null, _this._getUserName(item.TulipResponsible.Id)),
                                React.createElement("td", null, _this._getUserName(item.Author.Id)),
                                React.createElement(DefaultButton, { className: styles.defaultButton, onClick: function () { return _this._clickHandler(item); } }, "Delete Item")));
                    })))));
    };
    TulipList.prototype.componentDidMount = function () {
        var context = this;
        $.ajax({
            url: TulipList.siteURL + "/_api/web/lists/getbytitle('" + this.props.listName + "')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId",
            type: "GET",
            headers: { 'Accept': 'application/json; odata=verbose;' },
            success: function (resultData) {
                context.setState({
                    listItems: resultData.d.results
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("jqXHR: " + jqXHR, "textStatus: " + textStatus, "errorThrown: " + errorThrown);
            }
        });
    };
    TulipList.prototype._clickHandler = function (item) {
        var deletionConfirmed = confirm("Do you really want to delete this item?");
        console.log(deletionConfirmed);
        if (deletionConfirmed) {
            this.props.onDeleteListItem(item);
        }
    };
    TulipList.prototype._getUserName = function (Id) {
        var tulipResponsibleEmail = null;
        $.ajax({
            url: TulipList.siteURL + "/_api/web/getuserbyid(" + Id + ")",
            type: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            async: false,
            success: function (data) {
                tulipResponsibleEmail = data.d.Title;
            },
            error: function (error) {
                console.log("fnGetUserProps:: " + error);
            }
        });
        return tulipResponsibleEmail;
    };
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map