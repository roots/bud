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
import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import PropTypes from 'prop-types';
import notifier from 'node-notifier';

/**
 * Error
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */

const Error = ({
  message
}) => {
  useEffect(() => {
    message && notifier.notify({
      title: 'Build error',
      message
    });
  }, [message]);
  return /*#__PURE__*/React.createElement(Box, {
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Text, {
    wrap: "wrap"
  }, message || ''));
};

Error.propTypes = {
  message: PropTypes.string
};

export { Error };
