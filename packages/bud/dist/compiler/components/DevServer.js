import React, { useEffect, useState } from 'react';
import { Box, Text, useFocus } from 'ink';
import PropTypes from 'prop-types';
import patchConsole from 'patch-console';
/**
 * DevServer info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
var DevServer = function (_a) {
    var build = _a.build, actions = _a.actions;
    var isFocused = useFocus({ autoFocus: false }).isFocused;
    useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ devServer: isFocused });
    }, [isFocused]);
    /**
     * Capture DevServer console out using `patch-console`. This
     * pkg allows for inserting the console.out into a specific place
     * in the component. Left alone the stdout/stderr and the React CLI
     * will conflict.
     *
     * Additionally, compare the last rendered text with the new render.
     * If they are identical it's likely the DevServer watching message.
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
      <Text>{build === null || build === void 0 ? void 0 : build.devServer}</Text>
    </Box>);
};
DevServer.propTypes = {
    build: PropTypes.object,
    actions: PropTypes.object
};
export { DevServer };
//# sourceMappingURL=DevServer.js.map