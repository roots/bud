/** Modules */
import React from 'react';
import { Box, Text } from 'ink';
import PropTypes from 'prop-types';
/** Application components */
import { Loading } from './Loading';
/**
 * Build Info
 */
var BuildInfo = function (_a) {
    var build = _a.build, width = _a.width;
    return (<Box flexDirection="column" paddingTop={1}>
    {(build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && (<Text color="#6C758F" marginTop={1}>
        Build {build === null || build === void 0 ? void 0 : build.hash}. Finished in {(build === null || build === void 0 ? void 0 : build.time) / 1000}s.
      </Text>)}

    <Loading build={build} width={width}/>
  </Box>);
};
BuildInfo.propTypes = {
    build: PropTypes.object,
    bud: PropTypes.object,
    width: PropTypes.number
};
export { BuildInfo };
//# sourceMappingURL=BuildInfo.js.map