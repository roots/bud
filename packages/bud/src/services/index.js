"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const bud_build_1 = require("@roots/bud-build");
const bud_cache_1 = require("@roots/bud-cache");
const bud_compiler_1 = require("@roots/bud-compiler");
const bud_framework_1 = require("@roots/bud-framework");
const bud_extensions_1 = require("@roots/bud-extensions");
const extensions_1 = require("./extensions");
const bud_hooks_1 = require("@roots/bud-hooks");
const bud_cli_1 = require("@roots/bud-cli");
const bud_server_1 = require("@roots/bud-server");
const loaders_1 = require("./loaders");
const items_1 = require("./items");
const rules = __importStar(require("./rules"));
const containers_1 = require("./containers");
/**
 * Services
 */
exports.services = [
    ['build', bud_build_1.Build, { containers: { loaders: loaders_1.loaders, items: items_1.items, rules } }],
    ['cache', bud_cache_1.Cache, {}],
    ['cli', bud_cli_1.CLI, {}],
    ['compiler', bud_compiler_1.Compiler, {}],
    ['disk', bud_framework_1.Disk, { containers: containers_1.containers }],
    ['env', bud_framework_1.Env, {}],
    ['extensions', bud_extensions_1.Extensions, { extensions: extensions_1.extensions }],
    ['hooks', bud_hooks_1.Hooks, bud_hooks_1.hooks],
    ['mode', bud_framework_1.Mode, {}],
    ['server', bud_server_1.Server, {}],
];
//# sourceMappingURL=index.js.map