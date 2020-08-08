import React, { useEffect, useState } from 'react';
import { Box, Text, useFocus } from 'ink';
import PropTypes from 'prop-types';
import { Error } from './Error';
/**
 * Error
 */
var Errors = function (_a) {
    var _b;
    var build = _a.build, actions = _a.actions;
    var isFocused = useFocus({ autoFocus: true }).isFocused;
    useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ errors: isFocused });
    }, [isFocused]);
    var _c = useState(null), display = _c[0], setDisplay = _c[1];
    useEffect(function () {
        setDisplay(isFocused);
    }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
    return (<Box display={display ? 'flex' : 'none'} flexDirection="column">
      {(build === null || build === void 0 ? void 0 : build.errors) &&
        build.errors.length > 0 &&
        build.errors.map(function (err, i) { return <Error message={err} key={i}/>; })}

      {((_b = build === null || build === void 0 ? void 0 : build.warnings) === null || _b === void 0 ? void 0 : _b.length) == 0 && <Text>Nothing to see here.</Text>}
    </Box>);
};
Errors.propTypes = {
    build: PropTypes.object,
    actions: PropTypes.object
};
export { Errors };
//# sourceMappingURL=index.js.map