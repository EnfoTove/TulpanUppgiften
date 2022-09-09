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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './TulipList.module.scss';
import * as $ from 'jquery';
import { DefaultButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { SPHttpClient } from '@microsoft/sp-http';
import { sp } from '@pnp/pnpjs';
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
            authorItem: {},
            authorItems: [],
            loading: false,
            tulipResponsibleItem: {},
            tulipResponsibleItems: [],
        };
        TulipList.siteURL = _this.props.websiteURL;
        return _this;
    }
    TulipList.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
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
                        this.state.listItems && this.state.listItems.map(function (item, index) {
                            return React.createElement("tbody", null,
                                React.createElement("tr", { key: item.ID },
                                    React.createElement("td", null, item.ID),
                                    React.createElement("td", null, item.Title),
                                    React.createElement("td", null, item.ManufacturingPrice),
                                    React.createElement("td", null, item.RetailPrice * 1),
                                    React.createElement("td", null, _this.state.authorItems[index].Author.Title),
                                    React.createElement("td", null, _this.state.tulipResponsibleItems[index].TulipResponsible.Title),
                                    React.createElement(DefaultButton, { className: styles.defaultButton, onClick: function () { return _this._clickHandler(item); } }, "Delete Item")));
                        })))));
        }
        return (React.createElement(Spinner, { size: SpinnerSize.large }));
    };
    // public async
    TulipList.prototype.componentDidMount = function () {
        sp.setup({
            spfxContext: this.props.context
        });
        console.log("component did mount");
        this.bindDetailsList();
        this._getUserInfo();
        this._getTulipResponsibleInfo();
    };
    TulipList.prototype._getCurrentListItemsPnp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.get()];
                    case 1:
                        listItems = _a.sent();
                        console.log(listItems);
                        return [2 /*return*/, listItems];
                }
            });
        });
    };
    TulipList.prototype._getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll()];
                    case 1:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        this.setState({
                            authorItems: userInfo,
                            loading: true
                        });
                        console.log(this.state.authorItems[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    TulipList.prototype._getTulipResponsibleInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tulipResponsibleInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.select("TulipResponsible/Title").expand("TulipResponsible").getAll()];
                    case 1:
                        tulipResponsibleInfo = _a.sent();
                        console.log(tulipResponsibleInfo);
                        this.setState({
                            tulipResponsibleItems: tulipResponsibleInfo,
                            loading: true
                        });
                        console.log(this.state.tulipResponsibleItems[0]);
                        return [2 /*return*/];
                }
            });
        });
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
        this._getCurrentListItemsPnp().then(function (listItems) {
            _this.setState({
                listItems: listItems,
            });
        });
    };
    // public async _getUserByRandomId(){
    //       const user = await sp.web.getUserById(11)();
    // }
    TulipList.prototype._getUserNamePnp = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // var user = {};
                        // const userInfo = await sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").getAll();
                        // console.log({userInfo}, {user});
                        // this.setState({
                        //   userAuthor: userInfo[0]
                        // });
                        console.log("ID sent in: " + id);
                        return [4 /*yield*/, sp.web.getUserById(id)()];
                    case 1:
                        user = _a.sent();
                        console.log("user title: " + user.Title);
                        return [2 /*return*/, user.Title];
                }
            });
        });
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
    TulipList.prototype._clickHandler = function (item) {
        var deletionConfirmed = confirm("Do you really want to delete this item?");
        console.log(deletionConfirmed);
        if (deletionConfirmed) {
            this._deleteListItem(item);
        }
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
                //this._triggerEmail(item)
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
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map