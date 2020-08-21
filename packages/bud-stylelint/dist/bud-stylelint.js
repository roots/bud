/**
 * @roots/bud-stylelint v1.0.0
 * Adds stylelint support to Bud
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t,e=require("path"),s=(t=require("stylelint-webpack-plugin"))&&"object"==typeof t&&"default"in t?t.default:t;const i=()=>({setOptions:function(){return{configFile:this.bud.configs.get("stylelint")}},make:function(){return new s(this.options)},when:function(){return this.bud.features.enabled("stylelint")}}),n=function(t){var e;return this.features.set("stylelint",null===(e=null==t?void 0:t.enabled)||void 0===e||e),this.features.enabled("stylelint")&&this.options.set("stylelint",{configFile:this.configs.get("stylelint"),...t}),this},l={roots:e.resolve(__dirname,"./preset/index.js")};exports.preset=l,exports.stylelint=t=>({bud:t,make:function(){const t=e.join(this.bud.project("stylelint.config.js"));this.bud.fs.existsSync(t)&&(this.bud.stylelint=n,this.bud.configs.set("stylelint",t),this.bud.features.set("stylelint",!0),this.bud.adapters.add(i))}});
