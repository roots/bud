/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
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
import { Loading } from './Loading.js';

/** Modules */
/**
 * Build Info
 */

const BuildInfo = ({
  build,
  width
}) => /*#__PURE__*/React.createElement(Box, {
  flexDirection: "column",
  paddingTop: 1
}, (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && /*#__PURE__*/React.createElement(Text, {
  color: "#6C758F",
  marginTop: 1
}, "Build ", build === null || build === void 0 ? void 0 : build.hash, ". Finished in ", (build === null || build === void 0 ? void 0 : build.time) / 1000, "s."), /*#__PURE__*/React.createElement(Loading, {
  build: build,
  width: width
}));

BuildInfo.propTypes = {
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number
};

export { BuildInfo };
