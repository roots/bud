const React = require('react');

const {
  Box,
  Text
} = require('ink');

const Spinner = require('ink-spinner');
/**
 * Watch mode indicator
 * @prop {object} bud
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */


const Watching = () => /*#__PURE__*/React.createElement(Box, {
  flexDirection: "row"
}, /*#__PURE__*/React.createElement(Text, {
  color: "#28a745"
}, /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement(Spinner, {
  type: "dots"
})), ' Watching'));

module.exports = {
  Watching
};