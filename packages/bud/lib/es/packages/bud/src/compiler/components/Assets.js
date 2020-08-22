/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import React, { useEffect } from 'react';
import { Text, Box, Spacer, useFocus } from 'ink';
import PropTypes from 'prop-types';

/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */

const Indicator = ({
  emitted
}) => /*#__PURE__*/React.createElement(Text, {
  color: emitted ? '#545DD7' : '#6C758F'
}, "\u29BF ");

Indicator.propTypes = {
  emitted: PropTypes.bool
};
/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */

const Asset = ({
  asset
}) => {
  const display = asset.name.split('.').pop() == 'css' || asset.name.split('.').pop() == 'js';
  return !display ? [] : /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Indicator, {
    emitted: asset.emitted
  }), /*#__PURE__*/React.createElement(Text, {
    color: asset.emitted ? 'white' : 'gray'
  }, asset.name)), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    dimColor: "white"
  }, asset.size / 1000, "kb")));
};

Asset.propTypes = {
  asset: PropTypes.object
};
/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */

const Assets = ({
  build,
  actions
}) => {
  var _build$assets, _build$assets2;

  const {
    isFocused
  } = useFocus({
    autoFocus: true
  });
  useEffect(() => {
    actions.setFocus({
      assets: isFocused
    });
  }, [isFocused]);
  return /*#__PURE__*/React.createElement(Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, build === null || build === void 0 ? void 0 : (_build$assets = build.assets) === null || _build$assets === void 0 ? void 0 : _build$assets.map((asset, id) => /*#__PURE__*/React.createElement(Asset, {
    key: id,
    asset: asset
  })), (build === null || build === void 0 ? void 0 : (_build$assets2 = build.assets) === null || _build$assets2 === void 0 ? void 0 : _build$assets2.length) == 0 && /*#__PURE__*/React.createElement(Text, null, "Loading"));
};

Assets.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object,
  width: PropTypes.number
};

export { Assets };
