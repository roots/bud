"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.usedExt = void 0;
var entryIncludesExt = function (entry) {
    var matches = [
        {
            ext: '.scss',
            contains: entry.match(/\.scss$/)
        },
        {
            ext: '.jsx',
            contains: entry.match(/\.jsx$/)
        },
        {
            ext: '.ts',
            contains: entry.match(/\.(ts|tsx)$/)
        },
        {
            ext: '.vue',
            contains: entry.match(/\.(vue)$/)
        },
    ];
    return matches.filter(function (_a) {
        var contains = _a.contains;
        return contains;
    }).map(function (_a) {
        var ext = _a.ext;
        return ext;
    });
};
var usedExt = function (entries, bud) {
    var matches = [];
    entries.forEach(function (entry) {
        var exts = entryIncludesExt(entry);
        exts.forEach(function (ext) {
            if (!matches[ext]) {
                matches = __spreadArrays(matches, [ext]);
            }
        });
    });
    /**
     * Enable features based on usage
     */
    if (matches.includes('.vue')) {
        bud.features.enable('vue');
        !bud.options.get('extensions')['.vue'] &&
            bud.options.set('extensions', __spreadArrays(bud.options.get('extensions'), [
                '.vue',
            ]));
    }
    if (matches.includes('.jsx')) {
        bud.features.enable('react');
        !bud.options.get('extensions')['.jsx'] &&
            bud.options.set('extensions', __spreadArrays(bud.options.get('extensions'), [
                '.jsx',
            ]));
    }
    if (matches.includes('.ts') || matches.includes('.tsx')) {
        bud.features.enable('typescript');
        !bud.options.get('extensions')['.ts'] &&
            bud.options.set('extensions', __spreadArrays(bud.options.get('extensions'), [
                '.ts',
            ]));
        !bud.options.get('extensions')['.tsx'] &&
            bud.options.set('extensions', __spreadArrays(bud.options.get('extensions'), [
                '.tsx',
            ]));
    }
    if (matches.includes('.scss')) {
        bud.features.enable('scss');
    }
    return matches;
};
exports.usedExt = usedExt;
//# sourceMappingURL=usedExt.js.map