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
import React, { useEffect, useState } from 'react';
import { useFocus, Box, Text } from 'ink';
import PropTypes from 'prop-types';
import patchConsole from 'patch-console';

/**
 * DevServer info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */

const DevServer = ({
  build,
  actions
}) => {
  const {
    isFocused
  } = useFocus({
    autoFocus: false
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      devServer: isFocused
    });
  }, [isFocused]);
  /**
   * Capture DevServer console out using `patch-console`. This
   * pkg allows for inserting the console.out into a specific place
   * in the component. Left alone the stdout/stderr and the React CLI
   * will conflict.
   *
   * Additionally, compare the last rendered text with the new render.
   * If they are identical it's likely the DevServer watching message.
   * Discard it if they are a match so we don't just repeat that message
   * ad nauseum.
   */

  const [lastConsole, setLastConsole] = useState(null);
  const [consoleOut, setConsoleOut] = useState('');
  patchConsole((stream, data) => {
    setLastConsole(data);
    const frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
    setConsoleOut(frameOut);
  });
  return /*#__PURE__*/React.createElement(Box, {
    display: isFocused ? 'flex' : 'none',
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Text, null, build === null || build === void 0 ? void 0 : build.devServer));
};

DevServer.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};

export { DevServer };
