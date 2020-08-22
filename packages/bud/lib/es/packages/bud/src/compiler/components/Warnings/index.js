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
import { useEffect, useState } from 'react';
import { useFocus, Box, Text } from 'ink';
import PropTypes from 'prop-types';
import react from '../../../../../../node_modules/react/index.js';
import { Warning } from './Warning.js';

/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */

const Warnings = ({
  build,
  actions
}) => {
  var _build$warnings, _build$warnings2, _build$warnings3;

  const {
    isFocused
  } = useFocus({
    autoFocus: false
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      warnings: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.warnings]);
  return /*#__PURE__*/react.createElement(Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 && (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.map((warning, i) => /*#__PURE__*/react.createElement(Warning, {
    message: warning,
    key: i
  }))), (build === null || build === void 0 ? void 0 : (_build$warnings3 = build.warnings) === null || _build$warnings3 === void 0 ? void 0 : _build$warnings3.length) == 0 && /*#__PURE__*/react.createElement(Text, null, "Nothing to see here."));
};

Warnings.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};

export { Warnings };
