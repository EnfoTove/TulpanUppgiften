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
import * as strings from 'TulipListWebPartStrings';
import TulipList from './components/TulipList';
var TulipListWebPart = /** @class */ (function (_super) {
    __extends(TulipListWebPart, _super);
    function TulipListWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tulips = [];
        return _this;
    }
    TulipListWebPart.prototype.render = function () {
        var element = React.createElement(TulipList, {
            title: this.properties.description,
            listItems: this._tulips,
            listName: this.properties.listName,
            websiteURL: this.context.pageContext.web.absoluteUrl,
            context: this.context,
        });
        ReactDom.render(element, this.domElement);
    };
    TulipListWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(TulipListWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TulipListWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TulipListWebPart.prototype.onAfterPropertyPaneChangesApplied = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
        this.render();
    };
    TulipListWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.TitleFieldLabel
                                }),
                                PropertyPaneTextField('listName', {
                                    label: strings.ListNameFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TulipListWebPart;
}(BaseClientSideWebPart));
export default TulipListWebPart;
//# sourceMappingURL=TulipListWebPart.js.map