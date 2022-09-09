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
import { SPHttpClient, DigestCache } from '@microsoft/sp-http';
var TulipList = /** @class */ (function (_super) {
    __extends(TulipList, _super);
    function TulipList(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            listItems: [],
            listItem: {
                ID: null,
                Title: " ",
                ManufacturingPrice: null,
                RetailPrice: null,
                TulipResponsible: { Id: null },
                Author: { Id: null }
            },
            title: " ",
            listName: _this.props.listName,
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
    TulipList.prototype._getListItems = function () {
        console.log("get list items");
        var url = TulipList.siteURL + ("/_api/web/lists/getbytitle('" + this.props.listName + "')/items?$select= ID, Title, ManufacturingPrice, RetailPrice, TulipResponsible/Id, Author/Id&$expand=TulipResponsible/Id, Author/AuthorId");
        return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            return json.value;
        });
    };
    TulipList.prototype.bindDetailsList = function () {
        var _this = this;
        console.log("bind details list");
        this._getListItems().then(function (listItems) {
            _this.setState({
                listItems: listItems,
            });
        });
    };
    TulipList.prototype.componentDidMount = function () {
        console.log("component did mount");
        this.bindDetailsList();
    };
    TulipList.prototype._clickHandler = function (item) {
        var deletionConfirmed = confirm("Do you really want to delete this item?");
        console.log(deletionConfirmed);
        if (deletionConfirmed) {
            this._deleteListItem(item);
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
                console.log("Error with fetching user name: " + error);
            }
        });
        return tulipResponsibleEmail;
    };
    TulipList.prototype._deleteListItem = function (item) {
        var _this = this;
        var endpoint = this.props.context.pageContext.web.absoluteUrl
            + ("/_api/web/lists/getbytitle('" + this.props.listName + "')/items(" + item.ID + ")");
        var headers = { 'X-HTTP-Method': 'DELETE', 'IF-MATCH': '*' };
        var spHttpClientOptions = {
            "headers": headers
        };
        this.props.context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 204) {
                console.log("deletion done");
                _this._triggerEmail(item);
                _this.bindDetailsList();
            }
            else {
                var errormsg = "An error has occured: " + response.status + response.statusText;
                console.log(errormsg);
            }
        });
    };
    //Gets and returns the email address of the user by the id that's passed in.
    TulipList.prototype._getUserEmail = function (Id) {
        var tulipResponsibleEmail = null;
        $.ajax({
            url: this.props.context.pageContext.web.absoluteUrl + ("/_api/web/getuserbyid(" + Id + ")"),
            type: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            async: false,
            success: function (data) {
                tulipResponsibleEmail = data.d.Email;
            },
            error: function (error) {
                console.log("Error with fetching user email" + error);
            }
        });
        return tulipResponsibleEmail;
    };
    TulipList.prototype._getCurrentLoggedInUser = function () {
        var loggedInUserTitle = null;
        $.ajax({
            url: this.props.context.pageContext.web.absoluteUrl + "/_api/Web/currentUser",
            type: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            async: false,
            success: function (data) {
                loggedInUserTitle = data.d.Title;
            },
            error: function (error) {
                console.log("Error with fecthing current logged in user: " + error);
            }
        });
        console.log("INLOGGAD ANVÄNDARE:" + loggedInUserTitle);
        return loggedInUserTitle;
    };
    //Sends email to the tulip creator and tulip responsible
    TulipList.prototype._triggerEmail = function (item) {
        var _this = this;
        var MailBody = '', MailSubject = 'Tulip removal';
        var tulipResponsible = this._getUserEmail(item.TulipResponsible.Id);
        var tulipCreator = this._getUserEmail(item.Author.Id);
        MailBody = "'<p>Hi,<p> <p>" + item.Title + " (ID: " + item.ID + ") has been removed by " + this._getCurrentLoggedInUser() + " from Enfokam Tulips'";
        var taMailBody = {
            properties: {
                __metadata: { 'type': 'SP.Utilities.EmailProperties' },
                From: "From: no-reply@sharepointonline.com",
                To: { 'results': [tulipResponsible, tulipCreator] },
                Body: MailBody,
                Subject: MailSubject,
            }
        };
        var digestCache = this.props.context.serviceScope.consume(DigestCache.serviceKey);
        digestCache.fetchDigest(this.props.context.pageContext.web.serverRelativeUrl).then(function (digest) {
            $.ajax({
                contentType: 'application/json',
                url: _this.props.context.pageContext.web.absoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
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
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map