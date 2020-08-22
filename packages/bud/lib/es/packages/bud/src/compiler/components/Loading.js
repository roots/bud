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
import { Box, Text } from 'ink';
import PropTypes from 'prop-types';
import { Bar } from './LoadingBar.js';

/**
 * Loading (Progress Plugin)
 */

const Loading = ({
  build,
  width
}) => {
  var _build$percentage;

  return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? /*#__PURE__*/React.createElement(Box, {
    maxWidth: width,
    textWrap: "truncate",
    flexDirection: "row"
  }, /*#__PURE__*/React.createElement(Text, {
    bgcolor: '#171c56'
  }, /*#__PURE__*/React.createElement(Text, {
    width: 6
  }, Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100), "%", (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' ')), /*#__PURE__*/React.createElement(Text, {
    color: '#545DD7'
  }, /*#__PURE__*/React.createElement(Bar, {
    character: "\u2588",
    percent: (_build$percentage = build === null || build === void 0 ? void 0 : build.percentage) !== null && _build$percentage !== void 0 ? _build$percentage : 0.01
  }))) : [];
};

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number
};

export { Loading };
