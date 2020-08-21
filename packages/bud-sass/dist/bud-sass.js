/**
 * @roots/bud-sass v1.0.0
 * Adds sass support to the @roots/bud framework.
 *
 * Consider funding <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const s=function(s,e){return e&&this.options.merge("sass",e),this},e=s=>({loader:require.resolve("sass-loader"),options:{...s.options.get("sass"),sourceMap:!0,implementation:(()=>{try{if(require.resolve("sass"))return require("sass")}catch(s){return require("node-sass")}})()}}),t=s=>({test:/\.s(c|a)ss$/,exclude:s.patterns.get("vendor"),use:[s.uses.get("miniCss")(s),s.uses.get("css")(s),s.uses.get("resolveUrl")(s),s.uses.get("postCss")(s),e(s)]});exports.sass=e=>({bud:e,make:function(){!this.bud.options.get("resolve.extensions").includes(".sass")&&this.bud.options.set("resolve.extensions",[...this.bud.options.get("resolve.extensions"),".sass"]),!this.bud.options.get("resolve.extensions").includes(".scss")&&this.bud.options.set("resolve.extensions",[...this.bud.options.get("resolve.extensions"),".scss"]),this.bud.sass=s,this.bud.rules.repository=[...this.bud.rules.repository,t]}});
