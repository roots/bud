const React = require('react');

const {
  useEffect,
  useState
} = React;

const {
  Box,
  Spacer
} = require('ink');

const PropTypes = require('prop-types');

const {
  Nav
} = require('./Nav');

const {
  BuildInfo
} = require('./BuildInfo');
/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */


const App = ({
  children,
  state,
  build,
  bud,
  width,
  height
}) => {
  const [focused, setFocused] = useState({});
  useEffect(() => {
    setFocused(state);
  }, [state]);
  return /*#__PURE__*/React.createElement(Box, {
    width: width,
    maxWidth: width,
    minHeight: height,
    textWrap: "truncate",
    paddingRight: 1,
    paddingBottom: 1,
    paddingTop: 1,
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Nav, {
    build: build,
    focused: focused || {},
    bud: bud
  }), children, /*#__PURE__*/React.createElement(Spacer, null), /*#__PURE__*/React.createElement(BuildInfo, {
    build: build,
    width: width
  }));
};

App.propTypes = {
  children: PropTypes.array,
  state: PropTypes.object,
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
module.exports = {
  App
};