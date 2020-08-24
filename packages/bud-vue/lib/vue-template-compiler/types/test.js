"use strict";
exports.__esModule = true;
var _1 = require(".");
// check compile options
var compiled = _1.compile('<div>hi</div>', {
    outputSourceRange: true,
    preserveWhitespace: false,
    whitespace: 'condense',
    modules: [
        {
            preTransformNode: function (el) { return el; },
            transformNode: function (el) { return el; },
            postTransformNode: function (el) {
                el.tag = 'p';
            },
            genData: function (el) { return el.tag; },
            transformCode: function (el, code) { return code; },
            staticKeys: ['test']
        },
    ],
    directives: {
        test: function (node, directiveMeta) {
            node.tag;
            directiveMeta.value;
        }
    }
});
// can be passed to function constructor
new Function(compiled.render);
compiled.staticRenderFns.map(function (fn) { return new Function(fn); });
// with outputSourceRange: true
// errors should be objects with range
compiled.errors.forEach(function (e) {
    console.log(e.msg);
});
// without option or without outputSourceRange: true, should be strings
var errors = _1.compile("foo").errors;
errors.forEach(function (e) {
    console.log(e.length);
});
var errors2 = _1.compile("foo", {}).errors;
errors2.forEach(function (e) {
    console.log(e.length);
});
var errors3 = _1.compile("foo", {
    outputSourceRange: false
}).errors;
errors3.forEach(function (e) {
    console.log(e.length);
});
//# sourceMappingURL=test.js.map