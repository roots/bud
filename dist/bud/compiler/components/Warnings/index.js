const React = require('React');

const {
  useEffect,
  useState
} = require('react');

const {
  Box,
  Text,
  useFocus
} = require('ink');

const PropTypes = require('prop-types');

const {
  Warning
} = require('./Warning');
/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */


const Warnings = ({
  build,
  actions
}) => {
  var _build$warnings, _build$warnings2, _build$warnings3;

  const {
    isFocused
  } = useFocus({
    autoFocus: false
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      warnings: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.warnings]);
  return /*#__PURE__*/React.createElement(Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) > 0 && (build === null || build === void 0 ? void 0 : (_build$warnings2 = build.warnings) === null || _build$warnings2 === void 0 ? void 0 : _build$warnings2.map((warning, i) => /*#__PURE__*/React.createElement(Warning, {
    message: warning,
    key: i
  }))), (build === null || build === void 0 ? void 0 : (_build$warnings3 = build.warnings) === null || _build$warnings3 === void 0 ? void 0 : _build$warnings3.length) == 0 && /*#__PURE__*/React.createElement(Text, null, "Nothing to see here."));
};

Warnings.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};
module.exports = {
  Warnings
};