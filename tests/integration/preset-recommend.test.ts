import setup from '@repo/test-kit/setup'
import { testIsCompiledCss, testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/preset-recommend`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/preset-recommend`})

    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`runtime.js`))
    expect(test.getAsset(`runtime.js`)).toMatchInlineSnapshot(`"!function(){"use strict";var r,n={},t={};function o(r){var e=t[r];if(void 0!==e)return e.exports;var u=t[r]={exports:{}};return n[r](u,u.exports,o),u.exports}o.m=n,r=[],o.O=function(n,t,e,u){if(!t){var i=1/0;for(a=0;a<r.length;a++){t=r[a][0],e=r[a][1],u=r[a][2];for(var f=!0,c=0;c<t.length;c++)(!1&u||i>=u)&&Object.keys(o.O).every((function(r){return o.O[r](t[c])}))?t.splice(c--,1):(f=!1,u<i&&(i=u));if(f){r.splice(a--,1);var s=e();void 0!==s&&(n=s)}}return n}u=u||0;for(var a=r.length;a>0&&r[a-1][2]>u;a--)r[a]=r[a-1];r[a]=[t,e,u]},o.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},function(){var r={121:0};o.O.j=function(n){return 0===r[n]};var n=function(n,t){var e,u,i=t[0],f=t[1],c=t[2],s=0;if(i.some((function(n){return 0!==r[n]}))){for(e in f)o.o(f,e)&&(o.m[e]=f[e]);if(c)var a=c(o)}for(n&&n(t);s<i.length;s++)u=i[s],o.o(r,u)&&r[u]&&r[u][0](),r[u]=0;return o.O(a)},t=self.webpackChunk_roots_bud=self.webpackChunk_roots_bud||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}()}();"`)

    testIsCompiledJs(test.getAsset(`main.js`))
    expect(test.getAsset(`main.js`)).toMatchInlineSnapshot(`""use strict";(self.webpackChunk_roots_bud=self.webpackChunk_roots_bud||[]).push([[792],{"./index.js":function(){document.body.innerText=(new class{hello(){return"world"}}).hello()}},function(e){var n;n="./index.js",e(e.s=n)}]);"`)

    testIsCompiledCss(test.getAsset(`main.css`))
    expect(test.getAsset(`main.css`)).toMatchInlineSnapshot(`"h2 .class{margin-top:5rem}"`)

    expect(test.manifest).toMatchInlineSnapshot(`
      {
        "entrypoints.json": "entrypoints.json",
        "main.css": "css/main.css",
        "main.js": "js/main.js",
        "runtime.js": "js/runtime.js",
      }
    `)
  })
})
