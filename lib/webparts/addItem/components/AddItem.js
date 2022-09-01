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
import styles from './AddItem.module.scss';
var AddItem = /** @class */ (function (_super) {
    __extends(AddItem, _super);
    function AddItem(props) {
        var _this = _super.call(this, props) || this;
        _this._onAddListItemClicked = function (e) {
            e.preventDefault();
            _this.props.onAddListItem(_this.state.TulipObject);
        };
        _this.state = {
            Title: "Tulip name",
            ManufacturingPrice: null,
            RetailPrice: null,
            TulipResponsible: { Id: null },
            TulipObject: { Title: " ", ManufacturingPrice: null, RetailPrice: null, TulipResponsible: { Id: null } }
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    AddItem.prototype.render = function () {
        return (React.createElement("div", { className: styles.addItem },
            React.createElement("div", { className: styles.container },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("label", null,
                        "Title:",
                        React.createElement("input", { name: "Title", value: this.state.Title, onChange: this.handleChange })),
                    React.createElement("label", null,
                        "Manufacturing Price:",
                        React.createElement("input", { name: "ManufacturingPrice", value: this.state.ManufacturingPrice, onChange: this.handleChange })),
                    React.createElement("label", null,
                        "Tulip Responsible Id:",
                        React.createElement("input", { name: "TulipResponsible", value: this.state.TulipResponsible.Id, onChange: this.handleChange })),
                    React.createElement("input", { type: "submit", value: "Submit" })))));
    };
    AddItem.prototype.handleChange = function (e) {
        var _this = this;
        var _a;
        e.preventDefault();
        this.setState((_a = {}, _a[e.target.name] = e.target.value, _a), function () {
            console.log(_this.state.ManufacturingPrice);
        });
        var tulip = { Title: this.state.Title, ManufacturingPrice: this.state.ManufacturingPrice, RetailPrice: this.state.RetailPrice, TulipResponsible: { Id: this.state.TulipResponsible.Id } };
        this.setState({ TulipObject: tulip });
        this.setState({ RetailPrice: this.state.ManufacturingPrice * 1.1 });
    };
    AddItem.prototype.handleSubmit = function (e) {
        alert("Title" + this.state.Title + this.state.ManufacturingPrice);
        e.preventDefault();
        this._onAddListItemClicked(e);
    };
    return AddItem;
}(React.Component));
export default AddItem;
//# sourceMappingURL=AddItem.js.map