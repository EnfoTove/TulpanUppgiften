var _this = this;
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
confirmAlert({
    customUI: function (_a) {
        var onClose = _a.onClose;
        return (React.createElement("div", { className: 'custom-ui' },
            React.createElement("h1", null, "Are you sure?"),
            React.createElement("p", null, "You want to delete this file?"),
            React.createElement("button", { onClick: onClose }, "No"),
            React.createElement("button", { onClick: function () {
                    _this.handleClickDelete();
                    onClose();
                } }, "Yes, Delete it!")));
    }
});
//# sourceMappingURL=CustomDialog.js.map