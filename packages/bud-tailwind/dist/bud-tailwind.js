/**
 * @roots/bud-tailwind v1.0.0
 * Adds tailwindcss support to Bud
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var s,t=(s=require("tailwindcss"))&&"object"==typeof s&&"default"in s?s.default:s;const i=function(s){return this.options.set("postCss",{...this.options.postCss,plugins:[...this.options.get("postCss").plugins,t(s)]}),this},o=s=>({bud:s,make:function(){this.bud.tailwind=i,this.twConfig&&this.addTailwind({config:s.file.from("project").get("tailwind.config.js").path()}),this.configureSass()},addTailwind:function(s){this.bud.options.set("postcss.plugins",[...this.bud.options.postcssPlugins,o(s)])},configureSass:function(){const s=this.bud.options.get("scss");return s.sassOptions={processCssUrls:!1,...s.sassOptions},s}});exports.tailwind=o;
