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
var TulipList = /** @class */ (function (_super) {
    __extends(TulipList, _super);
    function TulipList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onGetListItemsClicked = function (event) {
            event.preventDefault();
            _this.props.onGetListItems();
        };
        return _this;
    }
    TulipList.prototype.render = function () {
        var _this = this;
        var _a = this.props, title = _a.title, listItems = _a.listItems;
        //   useEffect(() => {
        //     try{
        //         {this.props.onGetListItems()}
        //       }
        //       catch(error){
        //         return alert("API call failed." + error);
        //       }
        // }, [])
        return (React.createElement("div", { className: styles.tulipList },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.titleContainer },
                    React.createElement("span", { className: styles.title }, this.props.title)),
                React.createElement("div", { className: styles.button, id: styles.getTulipList },
                    React.createElement("button", { type: "button", onClick: this._onGetListItemsClicked }, "Get tulip list")),
                React.createElement("div", { className: styles.listItemContainer },
                    React.createElement("ul", { className: styles.listItems }, listItems && listItems.map(function (list) {
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
                                    list.Author.Id)),
                            React.createElement("div", { className: styles.button },
                                React.createElement("button", { name: list.ID.toString(), type: "button", onClick: function () { return _this._clickHandler(list); } }, "Delete Item")));
                    }))))));
    };
    TulipList.prototype._clickHandler = function (item) {
        this.props.onDeleteListItem(item);
    };
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map