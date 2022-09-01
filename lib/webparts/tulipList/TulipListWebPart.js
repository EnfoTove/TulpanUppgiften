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
import { SPHttpClient, DigestCache } from '@microsoft/sp-http';
import * as $ from 'jquery';
import TulipList from './components/TulipList';
var listName = "EnfokamTulipsTove";
var TulipListWebPart = /** @class */ (function (_super) {
    __extends(TulipListWebPart, _super);
    function TulipListWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tulips = [];
        //Triggers api-call to get list items as well as re-renders the page
        _this._onGetListItems = function () {
            _this._getListItems()
                .then(function (response) {
                _this._tulips = response;
            });
            _this.render();
        };
        //Triggers api-call to delete desired list item as well as re-renders the page with updated list items
        _this._onDeleteListItem = function (item) {
            _this._deleteListItem(item)
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
    TulipListWebPart.prototype.render = function () {
        var element = React.createElement(TulipList, {
            title: this.properties.description,
            listItems: this._tulips,
            onGetListItems: this._onGetListItems,
            onDeleteListItem: this._onDeleteListItem,
        });
        ReactDom.render(element, this.domElement);
    };
    //Sends api-call to get all items in the list and returns response as ITulpListItem
    TulipListWebPart.prototype._getListItems = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId"), SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (jsonResponse) {
            return jsonResponse.value;
        });
    };
    //Sends api-call to delete desired list item as well as triggering _triggerEmail()
    TulipListWebPart.prototype._deleteListItem = function (item) {
        var _this = this;
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + ("/_api/web/lists/getbytitle('" + listName + "')/items(" + item.ID + ")?$select=Id"), SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (jsonResponse) {
            return jsonResponse.value;
        })
            .then(function (listItem) {
            var request = {};
            request.headers = {
                'X-HTTP-Method': 'DELETE',
                'IF-MATCH': '*'
            };
            var endpoint = _this.context.pageContext.web.absoluteUrl
                + ("/_api/web/lists/getbytitle('" + listName + "')/items(" + item.ID + ")");
            return _this.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, request);
        }).then(this._triggerEmail(item));
    };
    //Gets and returns the email address of the user by the id that's passed in.
    TulipListWebPart.prototype._getUserEmail = function (Id) {
        var tulipResponsibleEmail = null;
        $.ajax({
            url: this.context.pageContext.web.absoluteUrl + ("/_api/web/getuserbyid(" + Id + ")"),
            type: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            async: false,
            success: function (data) {
                tulipResponsibleEmail = data.d.Email;
            },
            error: function (error) {
                console.log("fnGetUserProps:: " + error);
            }
        });
        return tulipResponsibleEmail;
    };
    //Sends email to the tulip creator and tulip responsible
    TulipListWebPart.prototype._triggerEmail = function (item) {
        var _this = this;
        var MailBody = '', MailSubject = 'Tulip removal';
        var tulipResponsible = this._getUserEmail(item.TulipResponsible.Id);
        var tulipCreator = this._getUserEmail(item.Author.Id);
        MailBody = "'<p>Hi,<p> <p>" + item.Title + " (ID: " + item.ID + ") has been removed from Enfokam Tulips'";
        var taMailBody = {
            properties: {
                __metadata: { 'type': 'SP.Utilities.EmailProperties' },
                From: "From: no-reply@sharepointonline.com",
                To: { 'results': [tulipResponsible, tulipCreator] },
                Body: MailBody,
                Subject: MailSubject,
            }
        };
        var digestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
        digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then(function (digest) {
            $.ajax({
                contentType: 'application/json',
                url: _this.context.pageContext.web.absoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
                type: "POST",
                data: JSON.stringify(taMailBody),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": digest
                },
                success: function (data) {
                    console.log("Success");
                },
                error: function (data) {
                    console.log("Error: " + JSON.stringify(data));
                }
            });
        });
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
    TulipListWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                PropertyPaneTextField('description', {
                                    label: strings.TitleFieldLabel
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