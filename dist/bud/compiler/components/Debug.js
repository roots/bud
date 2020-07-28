const React = require('react');

const {
  useEffect
} = React;

const {
  Box,
  Text,
  useFocus
} = require('ink');

const PropTypes = require('prop-types');

const highlight = require('cli-highlight');
/**
 * Debug display
 */


const Debug = ({
  actions,
  config
}) => {
  var _config$features;

  const {
    isFocused
  } = useFocus({
    autoFocus: false
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      debug: isFocused
    });
  }, [isFocused]);
  return /*#__PURE__*/React.createElement(Box, {
    display: isFocused && (config === null || config === void 0 ? void 0 : (_config$features = config.features) === null || _config$features === void 0 ? void 0 : _config$features.debug) ? 'flex' : 'none',
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Text, null, highlight(JSON.stringify({
    config
  }, null, 4))));
};

Debug.propTypes = {
  actions: PropTypes.object,
  config: PropTypes.object
};
module.exports = {
  Debug
};