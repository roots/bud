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
import React, { useState, useEffect } from 'react';
import { Box, Spacer } from 'ink';
import PropTypes from 'prop-types';
import { Nav } from './Nav.js';
import { BuildInfo } from './BuildInfo.js';

/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */

const App = ({
  children,
  state,
  build,
  bud,
  width,
  height
}) => {
  const [focused, setFocused] = useState({});
  useEffect(() => {
    setFocused(state);
  }, [state]);
  return /*#__PURE__*/React.createElement(Box, {
    width: width,
    maxWidth: width,
    minHeight: height,
    textWrap: "truncate",
    paddingRight: 1,
    paddingBottom: 1,
    paddingTop: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Nav, {
    build: build,
    focused: focused || {},
    bud: bud
  }), children, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(BuildInfo, {
    build: build,
    width: width
  }));
};

App.propTypes = {
  children: PropTypes.array,
  state: PropTypes.object,
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

export { App };
