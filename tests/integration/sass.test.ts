import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/sass`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sass`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.css`].length).toBeGreaterThan(10)
    expect(test.assets[`main.css`].includes(`import`)).toBeFalsy()
    expect(test.assets[`main.css`]).toMatch(/body,html{margin:0;padding:0}body{background:blue;background-image:url\("data:image\/svg\+xml;charset=utf-8,\%3Csvg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='0 0 81 77'\%3E\%3Cg fill='none' stroke='\%23fff'\%3E\%3Cpath d='.*'\/%3E%3C\/g%3E%3C\/svg%3E"\)}body div{border:#fff}/)
    expect(test.manifest).toMatchInlineSnapshot(`
      {
        "entrypoints.json": "entrypoints.json",
        "main.css": "css/main.css",
        "runtime.js": "js/runtime.js",
      }
    `)
  })
}, 100000)
