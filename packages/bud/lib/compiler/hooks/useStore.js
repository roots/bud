"use strict";
/**
 * Forked from {@link https://github.com/andregardi/use-global-hook}
 */
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
exports.__esModule = true;
var makeStore = function (store, actions) { return (__assign(__assign({}, store), { setState: setState.bind(null, store), actions: associateActions(store, actions) })); };
var setState = function (store, newState, afterUpdateCallback) {
    store.state = __assign(__assign({}, store.state), newState);
    store.listeners.forEach(function (listener) {
        listener.run(store.state);
    });
    afterUpdateCallback && afterUpdateCallback();
};
var storage = function (store, React, mapState, mapActions) {
    var _a = React.useState(Object.create(null)), originalHook = _a[1];
    var state = mapState ? mapState(store.state) : store.state;
    var actions = React.useMemo(function () { return (mapActions ? mapActions(store.actions) : store.actions); }, [mapActions, store.actions]);
    React.useEffect(function () {
        var newListener = { oldState: {} };
        newListener.run = mapState
            ? function (newState) {
                var mappedState = mapState(newState);
                if (mappedState !== newListener.oldState) {
                    newListener.oldState = mappedState;
                    originalHook(mappedState);
                }
            }
            : originalHook;
        store.listeners.push(newListener);
        newListener.run(store.state);
        return function () {
            store.listeners = store.listeners.filter(function (listener) { return listener !== newListener; });
        };
    }, []); // eslint-disable-line
    return [state, actions];
};
var associateActions = function (store, actions) {
    var associatedActions = {};
    Object.keys(actions).forEach(function (key) {
        if (typeof actions[key] === 'function') {
            associatedActions[key] = actions[key].bind(null, store);
        }
        if (typeof actions[key] === 'object') {
            associatedActions[key] = associateActions(store, actions[key]);
        }
    });
    return associatedActions;
};
var useStore = function (React, initialState, actions, initializer, listeners) {
    if (initializer === void 0) { initializer = null; }
    var store = makeStore({ state: initialState, listeners: listeners }, actions);
    if (initializer)
        initializer(store);
    return storage.bind(null, store, React);
};
exports["default"] = useStore;
//# sourceMappingURL=useStore.js.map