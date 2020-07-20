"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Nav = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
/**
 * List item indicator
 * @prop {boolean} active
 */
var Bullet = function (_a) {
    var active = _a.active;
    return (<ink_1.Text>{active ? '◉' : ' '}</ink_1.Text>);
};
Bullet.propTypes = {
    active: prop_types_1["default"].bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} config
 */
var Nav = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var build = _a.build, focused = _a.focused, config = _a.config;
    return (<ink_1.Box flexDirection="row" justifyContent="space-between" marginBottom={1}>
    <ink_1.Box>
      <ink_1.Text color={'#545DD7'}>@roots/bud</ink_1.Text>
    </ink_1.Box>
    <ink_1.Spacer />
    <ink_1.Spacer />
    <ink_1.Spacer />
    <ink_1.Box>
      <ink_1.Text color={(focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F'}>
        <Bullet active={focused === null || focused === void 0 ? void 0 : focused.assets}/> Assets
      </ink_1.Text>
    </ink_1.Box>
    <ink_1.Spacer />
    <ink_1.Box>
      <ink_1.Text color={((_b = build === null || build === void 0 ? void 0 : build.errors) === null || _b === void 0 ? void 0 : _b.length) > 0
        ? '#dc3545'
        : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white'
            : '#6C758F'}>
        <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.errors) || false}/> Errors
        {((_c = build === null || build === void 0 ? void 0 : build.errors) === null || _c === void 0 ? void 0 : _c.length) > 0
        ? " [" + (build === null || build === void 0 ? void 0 : build.errors.length) + "]"
        : "  "}
      </ink_1.Text>
    </ink_1.Box>
    <ink_1.Spacer />
    <ink_1.Box>
      <ink_1.Text color={((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) > 0
        ? '#fd7e14'
        : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white'
            : '#6C758F'}>
        <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.warnings) || false}/>{' '}
        Warnings
        {((_e = build === null || build === void 0 ? void 0 : build.warnings) === null || _e === void 0 ? void 0 : _e.length) > 0
        ? " [" + (build === null || build === void 0 ? void 0 : build.warnings.length) + "]"
        : "  "}
      </ink_1.Text>
    </ink_1.Box>

    {!((_f = config === null || config === void 0 ? void 0 : config.features) === null || _f === void 0 ? void 0 : _f.debug) && ((_g = config === null || config === void 0 ? void 0 : config.features) === null || _g === void 0 ? void 0 : _g.browserSync) && (<>
          <ink_1.Spacer />
          <ink_1.Box>
            <ink_1.Text color={(focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F'}>
              <Bullet active={focused === null || focused === void 0 ? void 0 : focused.browserSync}/>{' '}
              BrowserSync
            </ink_1.Text>
          </ink_1.Box>
        </>)}

    {((_h = config === null || config === void 0 ? void 0 : config.features) === null || _h === void 0 ? void 0 : _h.debug) && (<>
        <ink_1.Spacer />
        <ink_1.Box>
          <ink_1.Text color={(focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598'}>
            <Bullet active={(focused === null || focused === void 0 ? void 0 : focused.debug) || false}/>{' '}
            Debug
          </ink_1.Text>
        </ink_1.Box>
      </>)}
  </ink_1.Box>);
};
exports.Nav = Nav;
Nav.propTypes = {
    build: prop_types_1["default"].object,
    focused: prop_types_1["default"].object,
    config: prop_types_1["default"].object
};
