var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import { Text } from 'ink';
import PropTypes from 'prop-types';
import blacklist from 'blacklist';
var BLACKLIST_PROPS = [
    'percent',
    'left',
    'right',
    'columns',
    'character',
    'rightPad',
];
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar.prototype.getString = function () {
        var _a = this.props, percent = _a.percent, columns = _a.columns, left = _a.left, right = _a.right, character = _a.character, rightPad = _a.rightPad;
        var screen = columns || process.stdout.columns || 80;
        var space = screen - right - left;
        var max = Math.min(Math.floor(space * percent), space);
        var chars = character.repeat(max);
        if (!rightPad) {
            return chars;
        }
        return chars + ' '.repeat(space - max);
    };
    Bar.prototype.render = function () {
        var props = blacklist(this.props, BLACKLIST_PROPS);
        return <Text {...props}>{this.getString()}</Text>;
    };
    return Bar;
}(React.Component));
Bar.defaultProps = {
    columns: 0,
    percent: 1,
    left: 0,
    right: 0,
    character: '█',
    rightPad: false
};
Bar.propTypes = {
    columns: PropTypes.number,
    percent: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    character: PropTypes.string,
    rightPad: PropTypes.bool
};
export { Bar };
//# sourceMappingURL=LoadingBar.js.map