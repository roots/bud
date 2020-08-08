import React from 'React';
import { useEffect, useState } from 'react';
import { Box, Text, useFocus } from 'ink';
import PropTypes from 'prop-types';
import { Warning } from './Warning';
/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
var Warnings = function (_a) {
    var _b, _c, _d;
    var build = _a.build, actions = _a.actions;
    var isFocused = useFocus({ autoFocus: false }).isFocused;
    useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ warnings: isFocused });
    }, [isFocused]);
    var _e = useState(null), display = _e[0], setDisplay = _e[1];
    useEffect(function () {
        setDisplay(isFocused);
    }, [isFocused, build === null || build === void 0 ? void 0 : build.warnings]);
    return (<Box display={display ? 'flex' : 'none'} flexDirection="column">
      {((_b = build === null || build === void 0 ? void 0 : build.warnings) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = build === null || build === void 0 ? void 0 : build.warnings) === null || _c === void 0 ? void 0 : _c.map(function (warning, i) { return <Warning message={warning} key={i}/>; }))}

      {((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) == 0 && <Text>Nothing to see here.</Text>}
    </Box>);
};
Warnings.propTypes = {
    build: PropTypes.object,
    actions: PropTypes.object
};
export { Warnings };
//# sourceMappingURL=index.js.map