import React, { useEffect } from 'react';
import { Box, Spacer, Text, useFocus } from 'ink';
import PropTypes from 'prop-types';
/**
 * Indicator
 *
 * @prop {boolean} emitted
 * @return {PropTypes.ReactComponentLike}
 */
var Indicator = function (_a) {
    var emitted = _a.emitted;
    return (<Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </Text>);
};
Indicator.propTypes = {
    emitted: PropTypes.bool
};
/**
 * Asset
 *
 * @prop {object} asset
 * @return {PropTypes.ReactComponentLike}
 */
var Asset = function (_a) {
    var asset = _a.asset;
    var display = asset.name.split('.').pop() == 'css' || asset.name.split('.').pop() == 'js';
    return !display ? ([]) : (<Box flexDirection="row" justifyContent="space-between">
      <Box>
        <Indicator emitted={asset.emitted}/>
        <Text color={asset.emitted ? 'white' : 'gray'}>{asset.name}</Text>
      </Box>
      <Spacer />
      <Box>
        <Text dimColor="white">{asset.size / 1000}kb</Text>
      </Box>
    </Box>);
};
Asset.propTypes = {
    asset: PropTypes.object
};
/**
 * Assets
 *
 * @prop {object} build
 * @prop {object} actions
 * @prop {number} width
 * @return {PropTypes.ReactComponentLike}
 */
var Assets = function (_a) {
    var _b, _c;
    var build = _a.build, actions = _a.actions;
    var isFocused = useFocus({ autoFocus: true }).isFocused;
    useEffect(function () {
        actions.setFocus({ assets: isFocused });
    }, [isFocused]);
    return (<Box display={isFocused ? 'flex' : 'none'} flexDirection="column">
      {(_b = build === null || build === void 0 ? void 0 : build.assets) === null || _b === void 0 ? void 0 : _b.map(function (asset, id) { return (<Asset key={id} asset={asset}/>); })}
      {((_c = build === null || build === void 0 ? void 0 : build.assets) === null || _c === void 0 ? void 0 : _c.length) == 0 && <Text>Loading</Text>}
    </Box>);
};
Assets.propTypes = {
    build: PropTypes.object,
    actions: PropTypes.object,
    width: PropTypes.number
};
export { Assets };
//# sourceMappingURL=Assets.js.map