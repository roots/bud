import setup from '@repo/test-kit/setup'
import { testIsCompiledCss, testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/preset-recommend`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/preset-recommend`})

    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`runtime.js`))
    expect(test.getAsset(`runtime.js`)).toMatchInlineSnapshot(`"(()=>{"use strict";var r,e={},o={};function t(r){var n=o[r];if(void 0!==n)return n.exports;var s=o[r]={exports:{}};return e[r](s,s.exports,t),s.exports}t.m=e,r=[],t.O=(e,o,n,s)=>{if(!o){var a=1/0;for(u=0;u<r.length;u++){for(var[o,n,s]=r[u],i=!0,f=0;f<o.length;f++)(!1&s||a>=s)&&Object.keys(t.O).every((r=>t.O[r](o[f])))?o.splice(f--,1):(i=!1,s<a&&(a=s));if(i){r.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}s=s||0;for(var u=r.length;u>0&&r[u-1][2]>s;u--)r[u]=r[u-1];r[u]=[o,n,s]},t.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r={121:0};t.O.j=e=>0===r[e];var e=(e,o)=>{var n,s,[a,i,f]=o,l=0;if(a.some((e=>0!==r[e]))){for(n in i)t.o(i,n)&&(t.m[n]=i[n]);if(f)var u=f(t)}for(e&&e(o);l<a.length;l++)s=a[l],t.o(r,s)&&r[s]&&r[s][0](),r[s]=0;return t.O(u)},o=self.webpackChunk_roots_bud=self.webpackChunk_roots_bud||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})()})();"`)

    testIsCompiledJs(test.getAsset(`main.js`))
    expect(test.getAsset(`main.js`)).toMatchInlineSnapshot(`""use strict";(self.webpackChunk_roots_bud=self.webpackChunk_roots_bud||[]).push([[792],{"./index.js":()=>{document.body.innerText=(new class{hello(){return"world"}}).hello()}},e=>{var s;s="./index.js",e(e.s=s)}]);"`)

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
