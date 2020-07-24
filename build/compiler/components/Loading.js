const React = require('react');

const {
  Box,
  Text
} = require('ink');

const {
  Bar
} = require('./LoadingBar');

const PropTypes = require('prop-types');
/**
 * Loading (Progress Plugin)
 */


const Loading = ({
  build,
  width
}) => {
  var _build$percentage;

  return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? /*#__PURE__*/React.createElement(Box, {
    maxWidth: width,
    textWrap: "truncate",
    flexDirection: "row"
  }, /*#__PURE__*/React.createElement(Text, {
    bgcolor: '#171c56'
  }, /*#__PURE__*/React.createElement(Text, {
    width: 6
  }, Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100), "%", (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' ')), /*#__PURE__*/React.createElement(Text, {
    color: '#545DD7'
  }, /*#__PURE__*/React.createElement(Bar, {
    character: "\u2588",
    percent: (_build$percentage = build === null || build === void 0 ? void 0 : build.percentage) !== null && _build$percentage !== void 0 ? _build$percentage : 0.01
  }))) : [];
};

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number
};
module.exports = {
  Loading
};