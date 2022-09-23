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
import { DefaultButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { sp } from '@pnp/pnpjs';
import "@pnp/sp/sputilities";
import AddItemForm from '../../../reusableComponents/AddItemForm';
import DeleteItem from '../../../reusableComponents/DeleteItem';
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
        _this._closeAddItemForm = function () {
            _this.setState({
                showAddItemForm: false
            });
        };
        _this.state = {
            listItems: [],
            listItem: {
                ID: null,
                Title: " ",
                ManufacturingPrice: null,
                RetailPrice: null,
                Image: null,
                TulipResponsibleId: null,
                AuthorId: null
            },
            title: " ",
            listName: _this.props.listName,
            context: _this.props.context,
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
                Image: null,
                TulipResponsibleId: null,
                AuthorId: null
            }
        };
        TulipList.siteURL = _this.props.websiteURL;
        return _this;
    }
    TulipList.prototype.render = function () {
        var _this = this;
        var addIcon = { iconName: 'Add' };
        if (this.state.finishLoading) {
            return (React.createElement("div", { className: styles.tulipList },
                React.createElement("div", { className: styles.container },
                    React.createElement("div", { className: styles.title }, this.props.title),
                    React.createElement("div", { className: styles.subTitle },
                        "List: ",
                        this.props.listName),
                    React.createElement(DefaultButton, { text: "New item", iconProps: addIcon, className: styles.newItemButton, onClick: function () { return _this.setState({ showAddItemForm: true }); } }),
                    this.state.showAddItemForm ?
                        React.createElement(AddItemForm, { context: this.props.context, listName: this.props.listName, hideComponent: this._closeAddItemForm, setListStates: function () { return _this.setListStates(); } })
                        : null,
                    this.state.listItems.length > 0
                        ? React.createElement("table", null,
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Tulip Image"),
                                    React.createElement("th", null, "Title"),
                                    React.createElement("th", null, "Manufacturing Price"),
                                    React.createElement("th", null, "Retail Price"),
                                    React.createElement("th", null, "Tulip Responsible"),
                                    React.createElement("th", null, "Tulip creator"))),
                            this.state.listItems && this.state.listItems.map(function (item, index) {
                                return React.createElement("tbody", null,
                                    React.createElement("tr", { key: item.ID },
                                        console.log(item),
                                        item.Image != "null" || item.Image !== null
                                            ? React.createElement("td", null,
                                                React.createElement("img", { src: _this._getImgUrl(item) }))
                                            : React.createElement("td", null, "No img"),
                                        React.createElement("td", null, item.Title),
                                        React.createElement("td", null, item.ManufacturingPrice),
                                        React.createElement("td", null, item.RetailPrice * 1),
                                        _this.state.tulipResponsibleItems[index].TulipResponsible != undefined
                                            ? React.createElement("td", null, _this.state.tulipResponsibleItems[index].TulipResponsible.Title)
                                            : React.createElement("td", null, "No responsible"),
                                        React.createElement("td", null, _this.state.authorItems[index].Author.Title),
                                        React.createElement(DefaultButton, { className: styles.defaultButton, onClick: function () { return _this._clickHandler(item); } }, "Delete")));
                            }))
                        : React.createElement("p", { className: styles.noItems }, "This list has no items"),
                    this.state.showDeleteBox ?
                        React.createElement(DeleteItem, { listName: this.props.listName, focusItem: this.state.focusItem, setListStates: function () { return _this.setListStates(); }, closeDialog: this._closeDialog })
                        : null)));
        }
        return (React.createElement(Spinner, { size: SpinnerSize.large }));
    };
    TulipList.prototype._getImgUrl = function (item) {
        // console.log("IMG OBJ FOR" + item.Title + " " + item.Image.serverRelativeUrl)
        try {
            var imageString = JSON.stringify(item.Image);
            var imageObj = JSON.parse(imageString);
            console.log("IMG OBJ AFTER PARSE" + imageObj);
            var jsonObject = JSON.parse(imageObj);
            var serverUrl = jsonObject.serverUrl;
            var serverRelativeUrl = jsonObject.serverRelativeUrl;
            var fullUrl = serverUrl + serverRelativeUrl;
            console.log("full url " + fullUrl);
            return fullUrl;
        }
        catch (e) {
            console.error(e);
        }
        return "imageNotFound";
    };
    TulipList.prototype.componentDidMount = function () {
        sp.setup({
            spfxContext: this.props.context
        });
        this.setListStates();
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
    TulipList.prototype.setListStates = function () {
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
    //Handles deletion click and triggers _deleteListItem if deletion is confirmed
    TulipList.prototype._clickHandler = function (item) {
        this.setState({
            showDeleteBox: true,
            focusItem: item
        });
    };
    TulipList.siteURL = "";
    return TulipList;
}(React.Component));
export default TulipList;
//# sourceMappingURL=TulipList.js.map