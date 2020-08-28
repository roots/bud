"use strict";
exports.__esModule = true;
exports.uses = exports.rules = exports.loaders = void 0;
var js_1 = require("./js");
var css_1 = require("./css");
var font_1 = require("./font");
var image_1 = require("./image");
var svg_1 = require("./svg");
var loaders_1 = require("./loaders");
exports.loaders = loaders_1.loaders;
var uses_1 = require("./uses");
exports.uses = uses_1.uses;
var rules = {
    name: 'rules',
    register: { js: js_1.js, css: css_1.css, font: font_1.font, image: image_1.image, svg: svg_1.svg }
};
exports.rules = rules;
//# sourceMappingURL=index.js.map