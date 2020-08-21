/**
 * @roots/bud-typescript v1.0.0
 * Adds Typescript support to Bud.
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var s=require("path");const e=require.resolve("ts-loader"),t=s=>({test:/\.(ts|tsx)$/,exclude:s.patterns.get("vendor"),use:[{loader:e,options:{configFile:s.configs.get("typescript")}}]});exports.typescript=e=>({bud:e,make:function(){const e=s.join(this.bud.project("tsconfig.json"));this.bud.fs.existsSync(e)&&(!this.bud.options.get("resolve.extensions").includes(".ts")&&this.bud.options.set("resolve.extensions",[...this.bud.options.get("resolve.extensions"),".ts"]),!this.bud.options.get("resolve.extensions").includes(".tsx")&&this.bud.options.set("resolve.extensions",[...this.bud.options.get("resolve.extensions"),".tsx"]),this.bud.rules.repository=[...this.bud.rules.repository,t])}});
