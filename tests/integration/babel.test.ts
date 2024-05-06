import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  it(`should compile js as expected`, async () => {
    const test = setup({label: `@examples/babel`})
    await test.install()
    await test.build()

    expect(test.getAsset(`main.js`)).toMatchInlineSnapshot(`""use strict";(self.webpackChunk_roots_bud=self.webpackChunk_roots_bud||[]).push([[792],{"./index.js":function(){document.querySelector("#root")?.classList.add("init")}},function(s){var e;e="./index.js",s(s.s=e)}]);"`)
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
