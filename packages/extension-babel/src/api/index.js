"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = void 0;
const mergePlugins_1 = require("./mergePlugins");
const setPlugins_1 = require("./setPlugins");
const addPlugin_1 = require("./addPlugin");
const mergeConfig_1 = require("./mergeConfig");
const setConfig_1 = require("./setConfig");
const setPresets_1 = require("./setPresets");
const mergePresets_1 = require("./mergePresets");
const addPreset_1 = require("./addPreset");
const make = app => {
    app['babel'] = {
        mergeConfig: mergeConfig_1.mergeConfig,
        setConfig: setConfig_1.setConfig,
        mergePlugins: mergePlugins_1.mergePlugins,
        setPlugins: setPlugins_1.setPlugins,
        addPlugin: addPlugin_1.addPlugin,
        mergePresets: mergePresets_1.mergePresets,
        setPresets: setPresets_1.setPresets,
        addPreset: addPreset_1.addPreset,
    };
};
exports.make = make;
//# sourceMappingURL=index.js.map