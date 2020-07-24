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

const {
  Watching
} = require('./Watching');
/**
 * Build Info
 */


const BuildInfo = ({
  build,
  config,
  width
}) => {
  var _config$features;

  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    paddingTop: 1
  }, (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && /*#__PURE__*/React.createElement(Text, {
    color: "#6C758F",
    marginTop: 1
  }, "Build ", build === null || build === void 0 ? void 0 : build.hash, ". Finished in", ' ', (build === null || build === void 0 ? void 0 : build.time) / 1000, "s."), /*#__PURE__*/React.createElement(Loading, {
    build: build,
    width: width
  }), (config === null || config === void 0 ? void 0 : (_config$features = config.features) === null || _config$features === void 0 ? void 0 : _config$features.watching) && /*#__PURE__*/React.createElement(Watching, {
    config: config,
    build: build
  }));
};

BuildInfo.propTypes = {
  build: PropTypes.object,
  config: PropTypes.object,
  width: PropTypes.number
};
module.exports = {
  BuildInfo
};