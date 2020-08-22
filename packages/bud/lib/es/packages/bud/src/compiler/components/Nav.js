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
import React from 'react';
import { Text, Box, Spacer } from 'ink';
import PropTypes from 'prop-types';

/**
 * List item indicator
 * @prop {boolean} active
 */

const Bullet = ({
  active
}) => /*#__PURE__*/React.createElement(Text, null, active ? '◉' : ' ');

Bullet.propTypes = {
  active: PropTypes.bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} bud
 */

const Nav = ({
  build,
  focused,
  bud
}) => {
  var _build$errors, _build$errors2, _build$warnings, _build$warnings2;

  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: '#545DD7'
  }, "@roots/bud")), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.assets
  }), " Assets")), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 ? '#dc3545' : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.errors) || false
  }), " Errors", (build === null || build === void 0 ? void 0 : (_build$errors2 = build.errors) === null || _build$errors2 === void 0 ? void 0 : _build$errors2.length) > 0 && build.errors[0] ? ` [${build.errors.length}]` : `  `)), /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 ? '#fd7e14' : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.warnings) || false
  }), " Warnings", (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.length) > 0 ? ` [${build === null || build === void 0 ? void 0 : build.warnings.length}]` : `  `)), bud.features.enabled('hot') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.devServer) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.devServer
  }), " Dev server"))), bud.features.enabled('browserSync') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: focused === null || focused === void 0 ? void 0 : focused.browserSync
  }), " BrowserSync"))), bud.features.enabled('debug') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: (focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598'
  }, /*#__PURE__*/React.createElement(Bullet, {
    active: (focused === null || focused === void 0 ? void 0 : focused.debug) || false
  }), " Debug"))));
};

Nav.propTypes = {
  build: PropTypes.object,
  focused: PropTypes.object,
  bud: PropTypes.object
};

export { Nav };
