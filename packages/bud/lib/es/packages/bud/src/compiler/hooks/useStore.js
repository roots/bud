/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { objectSpread2 as _objectSpread2 } from '../../../../../_virtual/_rollupPluginBabelHelpers.js';

/**
 * Forked from {@link https://github.com/andregardi/use-global-hook}
 */
function setState(store, newState, afterUpdateCallback) {
  store.state = _objectSpread2(_objectSpread2({}, store.state), newState);
  store.listeners.forEach(listener => {
    listener.run(store.state);
  });
  afterUpdateCallback && afterUpdateCallback();
}

function useCustom(store, React, mapState, mapActions) {
  const [, originalHook] = React.useState(Object.create(null));
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(() => mapActions ? mapActions(store.actions) : store.actions, [mapActions, store.actions]);
  React.useEffect(() => {
    const newListener = {
      oldState: {}
    };
    newListener.run = mapState ? newState => {
      const mappedState = mapState(newState);

      if (mappedState !== newListener.oldState) {
        newListener.oldState = mappedState;
        originalHook(mappedState);
      }
    } : originalHook;
    store.listeners.push(newListener);
    newListener.run(store.state);
    return () => {
      store.listeners = store.listeners.filter(listener => listener !== newListener);
    };
  }, []); // eslint-disable-line

  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }

    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = {
    state: initialState,
    listeners: []
  };
  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(null, store, React);
};

export default useStore;
