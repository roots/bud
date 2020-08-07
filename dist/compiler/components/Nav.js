import React from 'react';
import { Box, Spacer, Text } from 'ink';
import PropTypes from 'prop-types';
/**
 * List item indicator
 * @prop {boolean} active
 */
var Bullet = function (_a) {
    var active = _a.active;
    return <Text>{active ? '◉' : ' '}</Text>;
};
Bullet.propTypes = {
    active: PropTypes.bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} bud
 */
var Nav = function (_a) {
    var _b, _c, _d, _e;
    var build = _a.build, focused = _a.focused, bud = _a.bud;
    return (<Box flexDirection="row" justifyContent="space-between" marginBottom={1}>
    <Box>
      <Text color={'#545DD7'}>@roots/bud</Text>
    </Box>
    <Spacer />
    <Spacer />
    <Spacer />
    <Box>
      <Text color={(focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F'}>
        <Bullet active={focused === null || focused === void 0 ? void 0 : focused.assets}/> Assets
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text color={((_b = build === null || build === void 0 ? void 0 : build.errors) === null || _b === void 0 ? void 0 : _b.length) > 0
        ? '#dc3545'
        : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white'
            : '#6C758F'}>
        <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.errors) || false}/> Errors
        {((_c = build === null || build === void 0 ? void 0 : build.errors) === null || _c === void 0 ? void 0 : _c.length) > 0 && build.errors[0]
        ? " [" + build.errors.length + "]"
        : "  "}
      </Text>
    </Box>
    <Spacer />
    <Box>
      <Text color={((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) > 0
        ? '#fd7e14'
        : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white'
            : '#6C758F'}>
        <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.warnings) || false}/> Warnings
        {((_e = build === null || build === void 0 ? void 0 : build.warnings) === null || _e === void 0 ? void 0 : _e.length) > 0 ? " [" + (build === null || build === void 0 ? void 0 : build.warnings.length) + "]" : "  "}
      </Text>
    </Box>

    {bud.features.enabled('hot') && (<>
        <Spacer />
        <Box>
          <Text color={(focused === null || focused === void 0 ? void 0 : focused.devServer) ? 'white' : '#6C758F'}>
            <Bullet active={focused === null || focused === void 0 ? void 0 : focused.devServer}/> Dev server
          </Text>
        </Box>
      </>)}

    {bud.features.enabled('browserSync') && (<>
        <Spacer />
        <Box>
          <Text color={(focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F'}>
            <Bullet active={focused === null || focused === void 0 ? void 0 : focused.browserSync}/> BrowserSync
          </Text>
        </Box>
      </>)}

    {bud.features.enabled('debug') && (<>
        <Spacer />
        <Box>
          <Text color={(focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598'}>
            <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.debug) || false}/> Debug
          </Text>
        </Box>
      </>)}
  </Box>);
};
Nav.propTypes = {
    build: PropTypes.object,
    focused: PropTypes.object,
    bud: PropTypes.object
};
export { Nav };
//# sourceMappingURL=Nav.js.map