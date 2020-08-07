import React, { useEffect, useState } from 'react';
import { Box, Text, useFocus } from 'ink';
import PropTypes from 'prop-types';
import patchConsole from 'patch-console';
/**
 * BrowserSync info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
var BrowserSync = function (_a) {
    var actions = _a.actions;
    var isFocused = useFocus({ autoFocus: false }).isFocused;
    useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ browserSync: isFocused });
    }, [isFocused]);
    /**
     * Capture BrowserSync console out using `patch-console`. This
     * pkg allows for inserting the console.out into a specific place
     * in the component. Left alone the stdout/stderr and the React CLI
     * will conflict.
     *
     * Additionally, compare the last rendered text with the new render.
     * If they are identical it's likely the BrowserSync watching message.
     * Discard it if they are a match so we don't just repeat that message
     * ad nauseum.
     */
    var _b = useState(null), lastConsole = _b[0], setLastConsole = _b[1];
    var _c = useState(''), consoleOut = _c[0], setConsoleOut = _c[1];
    patchConsole(function (stream, data) {
        setLastConsole(data);
        var frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
        setConsoleOut(frameOut);
    });
    return (<Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      <Text>{consoleOut}</Text>
    </Box>);
};
BrowserSync.propTypes = {
    actions: PropTypes.object
};
export { BrowserSync };
//# sourceMappingURL=BrowserSync.js.map