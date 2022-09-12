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
import { DigestCache } from '@microsoft/sp-http';
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
                TulipResponsibleId: null,
                AuthorId: null
            },
            title: " ",
            listName: _this.props.listName,
            authorItem: {},
            authorItems: [],
            tulipResponsibleItem: {},
            tulipResponsibleItems: [],
            finishLoading: false,
        };
        TulipList.siteURL = _this.props.websiteURL;
        return _this;
    }
    TulipList.prototype.render = function () {
        var _this = this;
        if (this.state.finishLoading) {
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
                                    React.createElement("td", null, _this.state.tulipResponsibleItems[index].TulipResponsible.Title),
                                    React.createElement("td", null, _this.state.authorItems[index].Author.Title),
                                    React.createElement(DefaultButton, { className: styles.defaultButton, onClick: function () { return _this._clickHandler(item); } }, "Delete Item")));
                        })))));
        }
        return (React.createElement(Spinner, { size: SpinnerSize.large }));
    };
    TulipList.prototype.componentDidMount = function () {
        sp.setup({
            spfxContext: this.props.context
        });
        console.log("component did mount");
        this._setListStates();
    };
    TulipList.prototype._getCurrentListItemsPnp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.get()];
                    case 1:
                        allItems = _a.sent();
                        return [2 /*return*/, allItems];
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
                        return [2 /*return*/, tulipResponsibleInfo];
                }
            });
        });
    };
    TulipList.prototype._getAuthorInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authorInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll()];
                    case 1:
                        authorInfo = _a.sent();
                        return [2 /*return*/, authorInfo];
                }
            });
        });
    };
    TulipList.prototype._setListStates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("bind details list");
                        return [4 /*yield*/, this._getCurrentListItemsPnp().then(function (listItems) {
                                _this.setState({
                                    listItems: listItems,
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._getTulipResponsibleInfo().then(function (listItems) {
                                _this.setState({
                                    tulipResponsibleItems: listItems,
                                });
                            })];
                    case 2:
                        _a.sent();
                        console.log(this.state.tulipResponsibleItems);
                        return [4 /*yield*/, this._getAuthorInfo().then(function (listItems) {
                                _this.setState({
                                    authorItems: listItems,
                                    finishLoading: true
                                });
                            })];
                    case 3:
                        _a.sent();
                        console.log(this.state.authorItems);
                        return [2 /*return*/];
                }
            });
        });
    };
    TulipList.prototype._getUserNamePnp = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.getUserById(id)()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user.Title];
                }
            });
        });
    };
    TulipList.prototype._clickHandler = function (item) {
        var deletionConfirmed = confirm("Do you really want to delete this item?");
        console.log(deletionConfirmed);
        if (deletionConfirmed) {
            this._deleteListItem(item);
        }
    };
    TulipList.prototype._deleteListItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var list, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = sp.web.lists.getByTitle(this.props.listName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, list.items.getById(item.ID).delete().then()];
                    case 2:
                        _a.sent();
                        this._triggerEmail(item);
                        this._setListStates();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TulipList.prototype._getUserEmailPnp = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.getUserById(id)()];
                    case 1:
                        user = _a.sent();
                        email = user.Email.toString();
                        console.log("User email fetched is: " + email);
                        return [2 /*return*/, email];
                }
            });
        });
    };
    TulipList.prototype._getCurrentLoggedInUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loggedInUser, loggedInUserName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.currentUser()];
                    case 1:
                        loggedInUser = _a.sent();
                        loggedInUserName = loggedInUser.Title.toString();
                        return [2 /*return*/, loggedInUserName];
                }
            });
        });
    };
    //Sends email to the tulip creator and tulip responsible
    TulipList.prototype._triggerEmail = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var MailBody, MailSubject, tulipResponsible, tulipCreator, deletionName, taMailBody, digestCache;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MailBody = '', MailSubject = 'Tulip removal';
                        return [4 /*yield*/, this._getUserEmailPnp(item.TulipResponsibleId)];
                    case 1:
                        tulipResponsible = _a.sent();
                        return [4 /*yield*/, this._getUserEmailPnp(item.AuthorId)];
                    case 2:
                        tulipCreator = _a.sent();
                        return [4 /*yield*/, this._getCurrentLoggedInUser()];
                    case 3:
                        deletionName = _a.sent();
                        MailBody = "'<p>Hi,<p> <p>" + item.Title + " (ID: " + item.ID + ") has been removed by " + deletionName + " from Enfokam Tulips'";
                        taMailBody = {
                            properties: {
                                __metadata: { 'type': 'SP.Utilities.EmailProperties' },
                                From: "From: no-reply@sharepointonline.com",
                                To: { 'results': [tulipResponsible, tulipCreator] },
                                Body: MailBody,
                                Subject: MailSubject,
                            }
                        };
                        digestCache = this.props.context.serviceScope.consume(DigestCache.serviceKey);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map