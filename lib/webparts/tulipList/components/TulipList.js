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
import { DefaultButton, Spinner, SpinnerSize, PrimaryButton, DialogContent, DialogFooter, Label, Icon } from 'office-ui-fabric-react';
import { sp } from '@pnp/pnpjs';
import "@pnp/sp/sputilities";
import { PeoplePicker, } from '@pnp/spfx-controls-react/lib/PeoplePicker';
var TulipList = /** @class */ (function (_super) {
    __extends(TulipList, _super);
    function TulipList(props, state) {
        var _this = _super.call(this, props) || this;
        //Closes delete dialog after dismiss by setting showDeleteBox to false
        _this._closeDialog = function () {
            _this.setState({
                showDeleteBox: false
            });
        };
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
            authorItems: [{}],
            tulipResponsibleItem: {},
            tulipResponsibleItems: [{}],
            finishLoading: false,
            showDeleteBox: false,
            showAddItemForm: false,
            focusItem: {
                ID: null,
                Title: "",
                ManufacturingPrice: null,
                RetailPrice: null,
                TulipResponsibleId: null,
                AuthorId: null
            },
            newTulipName: null,
            newTulipManufacturingPrice: null,
            newTulipResponsible: null,
        };
        _this._handleChange = _this._handleChange.bind(_this);
        // this._handleSubmit = this._handleSubmit.bind(this);
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
                    React.createElement(PrimaryButton, { className: styles.newItemButton, onClick: function () { return _this.setState({ showAddItemForm: true }); } }, " + New "),
                    this.state.showAddItemForm ?
                        this._getAddItemForm()
                        : null,
                    this.state.listItems.length > 0
                        ? React.createElement("table", null,
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
                                        _this.state.tulipResponsibleItems[index].TulipResponsible != undefined
                                            ? React.createElement("td", null, _this.state.tulipResponsibleItems[index].TulipResponsible.Title)
                                            : React.createElement("td", null, "No responsible"),
                                        React.createElement("td", null, _this.state.authorItems[index].Author.Title),
                                        React.createElement(DefaultButton, { className: styles.defaultButton, onClick: function () { return _this._clickHandler(item); } }, "Delete Item")));
                            }))
                        : React.createElement("p", { className: styles.noItems }, "This list has no items"),
                    this.state.showDeleteBox ?
                        this._getDialog()
                        : null)));
        }
        return (React.createElement(Spinner, { size: SpinnerSize.large }));
    };
    TulipList.prototype.componentDidMount = function () {
        sp.setup({
            spfxContext: this.props.context
        });
        this._setListStates();
    };
    //Gets all items in requested list (list is set by props)
    TulipList.prototype._getCurrentListItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allItems, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.get()];
                    case 1:
                        allItems = _a.sent();
                        return [2 /*return*/, allItems];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Gets title of all of the list item responsible in the current list items
    TulipList.prototype._getTulipResponsibleTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tulipResponsibleInfo, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.select("TulipResponsible/Title").expand("TulipResponsible").getAll()];
                    case 1:
                        tulipResponsibleInfo = _a.sent();
                        return [2 /*return*/, tulipResponsibleInfo];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Gets title of all of the list creators in the current list items
    TulipList.prototype._getAuthorTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authorInfo, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.select("Author/Title").expand("Author").getAll()];
                    case 1:
                        authorInfo = _a.sent();
                        return [2 /*return*/, authorInfo];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Sets states to provide render() with necessary information
    TulipList.prototype._setListStates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IN SET LIST STATES");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._getCurrentListItems().then(function (listItems) {
                                _this.setState({
                                    listItems: listItems,
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._getTulipResponsibleTitle().then(function (listItems) {
                                _this.setState({
                                    tulipResponsibleItems: listItems,
                                });
                            })];
                    case 3:
                        _a.sent();
                        console.log(this.state.tulipResponsibleItems);
                        return [4 /*yield*/, this._getAuthorTitle().then(function (listItems) {
                                _this.setState({
                                    authorItems: listItems,
                                    finishLoading: true
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.error(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //Gets user by id
    // public async _getUserName(id: number){
    //       const user = await sp.web.getUserById(id)();
    //       return user.Title;
    // }
    //Handles deletion click and triggers _deleteListItem if deletion is confirmed
    TulipList.prototype._clickHandler = function (item) {
        // let deletionConfirmed = confirm("Do you really want to delete this item?");
        // console.log(deletionConfirmed);
        // if(deletionConfirmed){
        //   this._deleteListItem(item);
        // }
        console.log("ITEM TITLE IS: " + item.Title);
        this.setState({
            showDeleteBox: true,
            focusItem: item
        });
    };
    //Deletes an item
    TulipList.prototype._deleteListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = sp.web.lists.getByTitle(this.state.listName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, list.items.getById(this.state.focusItem.ID).delete().then()];
                    case 2:
                        _a.sent();
                        this._sendEmail(this.state.focusItem);
                        this._setListStates();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        return [3 /*break*/, 4];
                    case 4:
                        this._closeDialog();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Gets & returns the email of the requested person (by id) in string format
    TulipList.prototype._getUserEmailPnp = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, email, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.getUserById(id)()];
                    case 1:
                        user = _a.sent();
                        email = user.Email.toString();
                        console.log("User email fetched is: " + email);
                        return [2 /*return*/, email];
                    case 2:
                        error_6 = _a.sent();
                        console.error(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Gets & returns current user in string format
    TulipList.prototype._getCurrentLoggedInUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loggedInUser, loggedInUserName, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.currentUser()];
                    case 1:
                        loggedInUser = _a.sent();
                        loggedInUserName = loggedInUser.Title.toString();
                        return [2 /*return*/, loggedInUserName];
                    case 2:
                        error_7 = _a.sent();
                        console.error(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Sends email to the tulip creator and tulip responsible
    TulipList.prototype._sendEmail = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var tulipResponsible, tulipCreator, deletionName, receiverList, filteredReceiversList, emailProps, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getUserEmailPnp(item.TulipResponsibleId)];
                    case 1:
                        tulipResponsible = _a.sent();
                        return [4 /*yield*/, this._getUserEmailPnp(item.AuthorId)];
                    case 2:
                        tulipCreator = _a.sent();
                        return [4 /*yield*/, this._getCurrentLoggedInUser()];
                    case 3:
                        deletionName = _a.sent();
                        receiverList = [tulipResponsible, tulipCreator];
                        filteredReceiversList = [];
                        receiverList.forEach(function (element) {
                            if (element === null || element === undefined) {
                                console.log("Element not added in new receivers list");
                            }
                            else {
                                filteredReceiversList.push(element);
                            }
                        });
                        emailProps = {
                            To: filteredReceiversList,
                            Subject: "Tulip Removal",
                            Body: "'<p>Hi,<p> <p>" + item.Title + " (ID: " + item.ID + ") has been removed by " + deletionName + " from Enfokam Tulips.'",
                            AdditionalHeaders: {
                                "content-type": "text/html"
                            }
                        };
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, sp.utility.sendEmail(emailProps)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_8 = _a.sent();
                        console.error(error_8);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //
    TulipList.prototype._addNewItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(this.props.listName).items.add({
                            Title: this.state.newTulipName,
                            ManufacturingPrice: this.state.newTulipManufacturingPrice,
                            TulipResponsibleId: this.state.newTulipResponsible.id
                        }).then(this.setState({
                            newTulipName: "",
                            newTulipManufacturingPrice: "",
                            newTulipResponsible: ""
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Returns dialog asking for comfirmation about deletion
    TulipList.prototype._getDialog = function () {
        var _this = this;
        return (React.createElement(DialogContent, { className: styles.dialog, title: 'Delete?', subText: "Do you really want to delete this item?", onDismiss: function () { return _this._closeDialog(); }, showCloseButton: true },
            React.createElement(DialogFooter, { className: styles.dialogFooter },
                React.createElement(DefaultButton, { className: styles.cancelButton, text: 'Cancel', title: 'Cancel', onClick: function () { return _this._closeDialog(); } }),
                React.createElement(PrimaryButton, { text: 'OK', title: 'OK', onClick: function () { _this._deleteListItem(); } }))));
    };
    TulipList.prototype._getPeoplePickerItems = function (event) {
        // console.log("IN GET PEOPLE PICKER ITEMS")
        // console.log('Items:', items);
        console.log({ event: event });
        this.setState({
            newTulipResponsible: event[0]
        });
        console.log("USER: " + this.state.newTulipResponsible);
    };
    TulipList.prototype._getAddItemForm = function () {
        var _this = this;
        var CancelIcon = function () { return React.createElement(Icon, { iconName: "Cancel" }); };
        return (React.createElement("div", { className: styles.addItemForm },
            React.createElement("p", { className: styles.formHeader }, "New item"),
            React.createElement("div", { className: styles.cancelIcon, onClick: function () { return _this.setState({ showAddItemForm: false }); } },
                React.createElement(CancelIcon, null)),
            React.createElement("form", null,
                React.createElement(Label, { required: true }, " Title:"),
                React.createElement("input", { name: "newTulipName", value: this.state.newTulipName, onChange: this._handleChange }),
                React.createElement(Label, null, " Manufacturing price:"),
                React.createElement("input", { name: "newTulipManufacturingPrice", value: this.state.newTulipManufacturingPrice, onChange: this._handleChange }),
                React.createElement(PeoplePicker, { context: this.props.context, titleText: 'Tulip responsible:', ensureUser: true, groupName: 'EnfokamTulipsTove', webAbsoluteUrl: TulipList.siteURL, onChange: this._getPeoplePickerItems.bind(this) }),
                React.createElement(PrimaryButton, { text: 'Save', className: 'button', onClick: this._addNewItem.bind(this) }),
                React.createElement(DefaultButton, { text: 'Cancel', onClick: function () { return _this.setState({ showAddItemForm: false }); } }))));
    };
    TulipList.prototype._handleChange = function (e) {
        var _this = this;
        var _a;
        e.preventDefault();
        this.setState((_a = {}, _a[e.target.name] = e.target.value, _a), function () {
            console.log("new tulip resp: " + _this.state.newTulipResponsible);
        });
    };
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map