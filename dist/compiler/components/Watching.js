const {
  Box,
  Text
} = require('ink');

const Spinner = require('ink-spinner');

const PropTypes = require('prop-types');
/**
 * Watch mode indicator
 * @prop {object} options
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */


const Watching = ({
  options,
  build
}) => {
  var _build$errors;

  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row"
  }, (options === null || options === void 0 ? void 0 : options.mode) == 'development' && (build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 ? /*#__PURE__*/React.createElement(Text, {
    color: "#dc3545"
  }, /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement(Spinner, {
    type: "dots"
  })), ' Watching for fixes') : (build === null || build === void 0 ? void 0 : build.percentage) == 1 ? /*#__PURE__*/React.createElement(Text, {
    color: "#28a745"
  }, /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement(Spinner, {
    type: "dots"
  })), ' Watching for changes') : []);
};

Watching.propTypes = {
  options: PropTypes.object,
  build: PropTypes.object
};
module.exports = {
  Watching
};