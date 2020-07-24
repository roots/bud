const React = require('react');

const {
  useEffect,
  useState
} = React;

const {
  Box,
  Text,
  useFocus
} = require('ink');

const PropTypes = require('prop-types');

const {
  Error
} = require('./Error');
/**
 * Error
 */


const Errors = ({
  build,
  actions
}) => {
  var _build$errors, _build$errors2, _build$warnings;

  const {
    isFocused
  } = useFocus({
    autoFocus: true
  });
  useEffect(() => {
    actions === null || actions === void 0 ? void 0 : actions.setFocus({
      errors: isFocused
    });
  }, [isFocused]);
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    setDisplay(isFocused);
  }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
  return /*#__PURE__*/React.createElement(Box, {
    display: display ? 'flex' : 'none',
    flexDirection: "column"
  }, (build === null || build === void 0 ? void 0 : (_build$errors = build.errors) === null || _build$errors === void 0 ? void 0 : _build$errors.length) > 0 && (build === null || build === void 0 ? void 0 : (_build$errors2 = build.errors) === null || _build$errors2 === void 0 ? void 0 : _build$errors2.map((err, i) => /*#__PURE__*/React.createElement(Error, {
    message: err,
    key: i
  }))), (build === null || build === void 0 ? void 0 : (_build$warnings = build.warnings) === null || _build$warnings === void 0 ? void 0 : _build$warnings.length) == 0 && /*#__PURE__*/React.createElement(Text, null, "Nothing to see here."));
};

Errors.propTypes = {
  build: PropTypes.object,
  actions: PropTypes.object
};
module.exports = {
  Errors
};