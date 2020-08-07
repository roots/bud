import notifier from 'node-notifier';
import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import PropTypes from 'prop-types';
/**
 * Warning (single)
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */
var Warning = function (_a) {
    var message = _a.message;
    useEffect(function () {
        message &&
            notifier.notify({
                title: 'Warning',
                message: message
            });
    }, [message]);
    return !message ? ([]) : (<Box paddingLeft={1} paddingRight={1} flexDirection="column">
      <Text wrap="wrap">{message}</Text>
    </Box>);
};
Warning.propTypes = {
    message: PropTypes.string
};
export { Warning };
//# sourceMappingURL=Warning.js.map