/** Modules */
const React = require('react');

const {
  Box,
  Text
} = require('ink');

const PropTypes = require('prop-types');
/** Application components */


const {
  Loading
} = require('./Loading');
/**
 * Build Info
 */


const BuildInfo = ({
  build,
  width
}) => /*#__PURE__*/React.createElement(Box, {
  flexDirection: "column",
  paddingTop: 1
}, (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && /*#__PURE__*/React.createElement(Text, {
  color: "#6C758F",
  marginTop: 1
}, "Build ", build === null || build === void 0 ? void 0 : build.hash, ". Finished in ", (build === null || build === void 0 ? void 0 : build.time) / 1000, "s."), /*#__PURE__*/React.createElement(Loading, {
  build: build,
  width: width
}));

BuildInfo.propTypes = {
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number
};
module.exports = {
  BuildInfo
};