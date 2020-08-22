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
import React from 'react';
import { objectSpread2 as _objectSpread2 } from '../../../../../_virtual/_rollupPluginBabelHelpers.js';
import useStore from './useStore.js';

const useFocusState = useStore(React, {
  assets: true,
  debug: false,
  devServer: false,
  errors: false,
  warnings: false
}, {
  setFocus: (store, value) => {
    store.setState(_objectSpread2(_objectSpread2({}, store.state), value));
  }
});

export { useFocusState };
