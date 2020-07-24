const notifier = require('node-notifier');

const React = require('react');

const {
  useEffect
} = React;

const {
  Box,
  Text
} = require('ink');

const PropTypes = require('prop-types');
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
module.exports = {
  Error
};