var notifier = require('node-notifier');
var React = require('react');
var useEffect = React.useEffect;
var _a = require('ink'), Box = _a.Box, Text = _a.Text;
var PropTypes = require('prop-types');
/**
 * Error
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */
var Error = function (_a) {
    var message = _a.message;
    useEffect(function () {
        message &&
            notifier.notify({
                title: 'Build error',
                message: message
            });
    }, [message]);
    return (<Box paddingLeft={1} paddingRight={1} flexDirection="column">
      <Text wrap="wrap">{message || ''}</Text>
    </Box>);
};
Error.propTypes = {
    message: PropTypes.string
};
export { Error };
//# sourceMappingURL=Error.js.map