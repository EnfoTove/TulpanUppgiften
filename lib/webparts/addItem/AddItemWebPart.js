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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AddItemWebPartStrings';
import AddItem from './components/AddItem';
import { SPHttpClient } from '@microsoft/sp-http';
var listName = "TulipsToTestWith";
var AddItemWebPart = /** @class */ (function (_super) {
    __extends(AddItemWebPart, _super);
    function AddItemWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tulips = [];
        _this._onAddListItem = function (object) {
            _this._addListItem(object)
                .then(function () {
                _this._getListItems()
                    .then(function (response) {
                    _this._tulips = response;
                    _this.render();
                });
            });
        };
        return _this;
    }
    AddItemWebPart.prototype.render = function () {
        var element = React.createElement(AddItem, {
            Title: this.properties.title,
            ManufacturingPrice: this.properties.manufacturingPrice,
            RetailPrice: this.properties.retailPrice,
            TulipResponsible: this.properties.tulipResponsible,
            onAddListItem: this._onAddListItem,
            TitleFieldLabel: this.properties.titleFieldLabel,
            ManufacturingPriceFieldLabel: this.properties.manufacturingPriceFieldLabel,
            RetailPriceFieldLabel: this.properties.retailPriceFieldLabel,
            TulipResponsibleFieldLabel: this.properties.tulipResponsibleFieldLabel
        });
        ReactDom.render(element, this.domElement);
    };
    AddItemWebPart.prototype._addListItem = function (object) {
        var _this = this;
        console.log("object title: " + object.Title, "object man. price: " + object.ManufacturingPrice);
        return this._getItemEntityType()
            .then(function (spEntityType) {
            var request = {};
            request.body = JSON.stringify({
                Title: object.Title,
                '@odata.type': spEntityType,
                ManufacturingPrice: object.ManufacturingPrice,
                RetailPrice: object.RetailPrice,
                TulipResponsible: object.TulipResponsible
            });
            var endpoint = _this.context.pageContext.web.absoluteUrl
                + ("/_api/web/lists/getbytitle('" + listName + "')/items");
            return _this.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, request);
        });
    };
    AddItemWebPart.prototype._getListItems = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id,Title"), SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (jsonResponse) {
            return jsonResponse.value;
        });
    };
    AddItemWebPart.prototype._getItemEntityType = function () {
        var endpoint = this.context.pageContext.web.absoluteUrl
            + ("/_api/web/lists/getbytitle('" + listName + "')")
            + "?$select=ListItemEntityTypeFullName";
        return this.context.spHttpClient
            .get(endpoint, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (jsonResponse) {
            return jsonResponse.ListItemEntityTypeFullName;
        });
    };
    AddItemWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(AddItemWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AddItemWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('titleFieldLabel', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('manufacturingPriceFieldLabel', {
                                    label: "Manufacturing Price"
                                }),
                                PropertyPaneTextField('retailPriceFieldLabel', {
                                    label: "Retail Price"
                                }),
                                PropertyPaneTextField('tulipResponsibleFieldLabel', {
                                    label: "Tulip Responsible"
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return AddItemWebPart;
}(BaseClientSideWebPart));
export default AddItemWebPart;
//# sourceMappingURL=AddItemWebPart.js.map