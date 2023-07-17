import setup, {type Project} from '@repo/test-kit/setup'
import {
  testIsCompiledCss,
  testIsCompiledJs,
  testIsMinimized,
  testThemeJson,
} from '@repo/test-kit/tests'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/sage`, () => {
  let sage: Project

  beforeAll(async () => {
    sage = setup({dist: `public`, label: `@examples/sage`})
    await sage.install()
    await sage.build()
  })

  it(`should index 'app' entrypoint as expected`, () => {
    expect(sage.hasEntrypoint(`app`)).toBe(true)

    const {css, dependencies, js} = sage.getEntrypoint(`app`)

    expect(css).toBeInstanceOf(Array)
    expect(css).toHaveLength(1)
    expect(js).toBeInstanceOf(Array)
    expect(js).toHaveLength(2)
    expect(dependencies).toEqual([])
  })

  it(`should index 'editor' entrypoint as expected`, () => {
    expect(sage.hasEntrypoint(`editor`)).toBe(true)

    const {css, dependencies, js} = sage.getEntrypoint(`editor`)

    expect(css).toBeInstanceOf(Array)
    expect(css).toHaveLength(1)
    expect(js).toBeInstanceOf(Array)
    expect(js).toHaveLength(2)
    expect(dependencies).toStrictEqual(
      expect.arrayContaining([
        `wp-edit-post`,
        `wp-blocks`,
        `wp-dom-ready`,
      ]),
    )
  })

  it(`should build 'runtime.js' asset as expected`, () => {
    expect(sage.hasAsset(`runtime.js`)).toBe(true)

    const js = sage.getAsset(`runtime.js`)
    testIsCompiledJs(js)
    testIsMinimized(js)
  })

  it(`should build 'app.js' asset as expected`, () => {
    expect(sage.hasAsset(`app.js`)).toBe(true)

    const js = sage.getAsset(`app.js`)
    testIsCompiledJs(js)
    testIsMinimized(js)
  })

  it(`should build 'editor.js' asset as expected`, () => {
    expect(sage.hasAsset(`editor.js`)).toBe(true)

    const js = sage.getAsset(`editor.js`)
    testIsCompiledJs(js)
    testIsMinimized(js)
  })

  it(`should have expected app.css asset`, () => {
    expect(sage.hasAsset(`app.css`)).toBe(true)

    const css = sage.getAsset(`app.css`)
    testIsCompiledCss(css)
    testIsMinimized(css)
    expect(css.includes(`.text-xl{font-size:1.25rem`)).toBeTruthy()
    expect(css.includes(`.text-custom{font-size:.625rem`)).toBeTruthy()
  })

  it(`should have expected editor.css asset`, () => {
    expect(sage.hasAsset(`editor.css`)).toBe(true)

    const css = sage.getAsset(`editor.css`)
    testIsCompiledCss(css)
    testIsMinimized(css)
  })

  it(`should have expected theme.json asset`, async () => {
    expect(sage.hasAsset(`../theme.json`)).toBe(true)

    const json = sage.getAsset(`../theme.json`)
    testThemeJson(JSON.parse(json))

    expect(json).toMatchInlineSnapshot(`
      "{
        \\"__generated__\\": \\"⚠️ This file is generated. Do not edit.\\",
        \\"$schema\\": \\"https://schemas.wp.org/trunk/theme.json\\",
        \\"version\\": 2,
        \\"settings\\": {
          \\"color\\": {
            \\"custom\\": false,
            \\"customGradient\\": false,
            \\"palette\\": [
              {
                \\"color\\": \\"#f7fafc\\",
                \\"name\\": \\"Brand Gray\\",
                \\"slug\\": \\"brand-gray\\"
              }
            ]
          },
          \\"custom\\": {
            \\"spacing\\": {},
            \\"typography\\": {
              \\"font-size\\": {},
              \\"line-height\\": {}
            }
          },
          \\"spacing\\": {
            \\"padding\\": true,
            \\"units\\": [
              \\"px\\",
              \\"%\\",
              \\"em\\",
              \\"rem\\",
              \\"vw\\",
              \\"vh\\"
            ]
          },
          \\"typography\\": {
            \\"customFontSize\\": false,
            \\"dropCap\\": false,
            \\"fontFamilies\\": [
              {
                \\"fontFamily\\": \\"Inter,sans-serif\\",
                \\"name\\": \\"Inter\\",
                \\"slug\\": \\"sans\\"
              },
              {
                \\"fontFamily\\": \\"ui-serif,Georgia,Cambria,\\\\\\"Times New Roman\\\\\\",Times,serif\\",
                \\"name\\": \\"Ui-serif\\",
                \\"slug\\": \\"serif\\"
              },
              {
                \\"fontFamily\\": \\"ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\\\\\"Liberation Mono\\\\\\",\\\\\\"Courier New\\\\\\",monospace\\",
                \\"name\\": \\"Ui-monospace\\",
                \\"slug\\": \\"mono\\"
              }
            ],
            \\"fontSizes\\": [
              {
                \\"name\\": \\"xs\\",
                \\"size\\": \\"0.75rem\\",
                \\"slug\\": \\"xs\\"
              },
              {
                \\"name\\": \\"sm\\",
                \\"size\\": \\"0.875rem\\",
                \\"slug\\": \\"sm\\"
              },
              {
                \\"name\\": \\"base\\",
                \\"size\\": \\"1rem\\",
                \\"slug\\": \\"base\\"
              },
              {
                \\"name\\": \\"lg\\",
                \\"size\\": \\"1.125rem\\",
                \\"slug\\": \\"lg\\"
              },
              {
                \\"name\\": \\"xl\\",
                \\"size\\": \\"1.25rem\\",
                \\"slug\\": \\"xl\\"
              },
              {
                \\"name\\": \\"2xl\\",
                \\"size\\": \\"1.5rem\\",
                \\"slug\\": \\"2xl\\"
              },
              {
                \\"name\\": \\"3xl\\",
                \\"size\\": \\"1.875rem\\",
                \\"slug\\": \\"3xl\\"
              },
              {
                \\"name\\": \\"4xl\\",
                \\"size\\": \\"2.25rem\\",
                \\"slug\\": \\"4xl\\"
              },
              {
                \\"name\\": \\"5xl\\",
                \\"size\\": \\"3rem\\",
                \\"slug\\": \\"5xl\\"
              },
              {
                \\"name\\": \\"6xl\\",
                \\"size\\": \\"3.75rem\\",
                \\"slug\\": \\"6xl\\"
              },
              {
                \\"name\\": \\"7xl\\",
                \\"size\\": \\"4.5rem\\",
                \\"slug\\": \\"7xl\\"
              },
              {
                \\"name\\": \\"8xl\\",
                \\"size\\": \\"6rem\\",
                \\"slug\\": \\"8xl\\"
              },
              {
                \\"name\\": \\"9xl\\",
                \\"size\\": \\"8rem\\",
                \\"slug\\": \\"9xl\\"
              },
              {
                \\"name\\": \\"custom\\",
                \\"size\\": \\".625rem\\",
                \\"slug\\": \\"custom\\"
              }
            ]
          }
        }
      }"
    `)
  })

  it(`should have expected manifest entries`, () => {
    expect(sage.manifest[`app.js`]).toMatch(/js\/app\.[\d|\w]*\.js/)
    expect(sage.manifest[`app.css`]).toMatch(/css\/app\.[\d|\w]*\.css/)
    expect(sage.manifest[`editor.css`]).toMatch(
      /css\/editor\.[\d|\w]*\.css/,
    )
    expect(sage.manifest[`runtime.js`]).toMatch(
      /js\/runtime\.[\d|\w]*\.js/,
    )
    expect(sage.manifest[`../theme.json`]).toMatch(`../theme.json`)
  })
})
