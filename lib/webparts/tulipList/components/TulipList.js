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
var TulipList = /** @class */ (function (_super) {
    __extends(TulipList, _super);
    function TulipList(props, state) {
        var _this = _super.call(this, props) || this;
        _this._onGetListItemsClicked = function (event) {
            event.preventDefault();
            _this.props.onGetListItems();
        };
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
            listName: "EnfokamTulipsTove6"
        };
        TulipList.siteURL = _this.props.websiteURL;
        return _this;
    }
    TulipList.prototype.render = function () {
        // const {
        //   title,
        //   listItems,
        //   listName
        // } = this.props;
        return (React.createElement("div", { className: styles.tulipList },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.titleContainer },
                    React.createElement("span", { className: styles.title }, this.props.title)),
                React.createElement("div", { className: styles.subTitleContainer },
                    React.createElement("span", { className: styles.subTitle }, "List: "),
                    React.createElement("span", { className: styles.listName }, this.props.listName)),
                React.createElement("div", { className: styles.listItemContainer },
                    React.createElement("ul", { className: styles.listItems }, this.state.listItems && this.state.listItems.map(function (list) {
                        return React.createElement("li", { key: list.Title },
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "ID:"),
                                    list.ID)),
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "Title:"),
                                    " ",
                                    list.Title)),
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "Manufacturing Price:"),
                                    list.ManufacturingPrice)),
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "Retail Price:"),
                                    list.RetailPrice)),
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "Tulip Responsible ID:"),
                                    list.TulipResponsible.Id)),
                            React.createElement("div", { className: styles.listItem },
                                React.createElement("p", null,
                                    React.createElement("span", { className: styles.label }, "Tulip creator ID:"),
                                    list.Author.Id)));
                    }))))));
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
        this.props.onDeleteListItem(item);
    };
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map