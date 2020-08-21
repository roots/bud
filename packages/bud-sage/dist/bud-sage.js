/**
 * @roots/bud-sage v1.0.0
 * Preset configuration for @roots/sage v10 <https://github.com/root/sage>
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var s=require("@roots/bud-dependency-extraction"),e=require("@roots/bud-sass"),t=require("@roots/bud-eslint"),r=require("@roots/bud-stylelint"),i=require("@roots/bud-purgecss");const u={purge:i.purgecss,eslint:t.eslint,stylelint:r.stylelint,extraction:s.extraction,sass:e.sass},o=function(s){const e=[];return s?Object.entries(u).forEach(([t,r])=>{(!s||!s.hasOwnProperty(t)||!1!==s[t])&&e.push(r)}):Object.values(u).forEach(s=>{e.push(s)}),this.use(e),e.includes(i.purgecss)&&this.purgecss({enabled:this.inProduction,options:{...i.presets.wordpress}}),this};exports.sage=s=>({bud:s,make:function(){this.bud.withFeatures=o,this.bud.srcPath("resources/assets").distPath("dist").alias({"@fonts":this.bud.src("fonts"),"@images":this.bud.src("images"),"@scripts":this.bud.src("scripts"),"@styles":this.bud.src("styles")}).auto({jquery:["$","window.jQuery"]}).runtimeManifest().mini(this.bud.inProduction).map(this.bud.inDevelopment).hash(this.bud.inProduction).vendor()}});
