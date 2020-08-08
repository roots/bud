import React from 'react';
import { Box, Text } from 'ink';
import { Bar } from './LoadingBar';
import PropTypes from 'prop-types';
/**
 * Loading (Progress Plugin)
 */
var Loading = function (_a) {
    var _b;
    var build = _a.build, width = _a.width;
    return (build === null || build === void 0 ? void 0 : build.percentage) > 0 && (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? (<Box maxWidth={width} textWrap="truncate" flexDirection="row">
      <Text bgcolor={'#171c56'}>
        <Text width={6}>
          {Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100)}%{(build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' '}
        </Text>
      </Text>

      <Text color={'#545DD7'}>
        <Bar character="█" percent={(_b = build === null || build === void 0 ? void 0 : build.percentage) !== null && _b !== void 0 ? _b : 0.01}/>
      </Text>
    </Box>) : ([]);
};
Loading.propTypes = {
    build: PropTypes.object,
    width: PropTypes.number
};
export { Loading };
//# sourceMappingURL=Loading.js.map