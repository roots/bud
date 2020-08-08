var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import globalState from './useStore';
var useFocusState = globalState(React, {
    assets: true,
    debug: false,
    devServer: false,
    errors: false,
    warnings: false
}, {
    setFocus: function (store, value) {
        store.setState(__assign(__assign({}, store.state), value));
    }
});
export { useFocusState };
//# sourceMappingURL=useFocusState.js.map