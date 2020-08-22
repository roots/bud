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
import React, { useEffect, useState } from 'react';
import { useFocus, Box, Text } from 'ink';
import PropTypes from 'prop-types';
import { Error } from './Error.js';

/**
 * Error
 */

const Errors = ({
  build,
  actions
}) => {
  var _build$warnings;

  const {
    isFocused
  } = useFocus({
    autoFocus: true
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      errors: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
  return /*#__PURE__*/React.createElement(Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : build.errors) && build.errors.length > 0 && build.errors.map((err, i) => /*#__PURE__*/React.createElement(Error, {
    message: err,
    key: i
  })), (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) == 0 && /*#__PURE__*/React.createElement(Text, null, "Nothing to see here."));
};

Errors.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};

export { Errors };
