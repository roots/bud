import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'
import fs from 'fs-jetpack'

describe(`examples/sage`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sage`,
      dist: `public`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.entrypoints.app.css).toBeInstanceOf(Array)
    expect(test.entrypoints.app.css).toHaveLength(1)
    expect(test.entrypoints.app.dependencies).toEqual([])

    expect(test.entrypoints.editor.css).toBeInstanceOf(Array)
    expect(test.entrypoints.editor.css).toHaveLength(1)

    expect(test.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(test.assets[`runtime.js`].includes(`import `)).toBeFalsy()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`import `)).toBeFalsy()

    expect(test.assets[`app.css`].length).toBeGreaterThan(10)
    expect(test.assets[`app.css`].includes(`@import`)).toBe(false)

    expect(test.assets[`app.css`].includes(`@apply`)).toBe(false)
    expect(test.assets[`app.css`].match(/    /)).toBeFalsy()
    expect(test.assets[`app.css`].match(/\\n/)).toBeFalsy()

    expect(
      test.assets[`app.css`].includes(`.text-xl{font-size:1.25rem`),
    ).toBeTruthy()
    expect(
      test.assets[`app.css`].includes(`.text-custom{font-size:.625rem`),
    ).toBeTruthy()

    const themeJson = await fs.readAsync(test.path(`theme.json`), `json`)
    expect(themeJson).toMatchInlineSnapshot(`
          {
            "$schema": "https://schemas.wp.org/trunk/theme.json",
            "__generated__": "⚠️ This file is generated. Do not edit.",
            "settings": {
              "color": {
                "custom": false,
                "customGradient": false,
                "palette": [
                  {
                    "color": "#f7fafc",
                    "name": "Gray",
                    "slug": "gray",
                  },
                  {
                    "color": "#f7fafc",
                    "name": "Brand Gray",
                    "slug": "brand-gray",
                  },
                ],
              },
              "custom": {
                "spacing": {},
                "typography": {
                  "font-size": {},
                  "line-height": {},
                },
              },
              "spacing": {
                "padding": true,
                "units": [
                  "px",
                  "%",
                  "em",
                  "rem",
                  "vw",
                  "vh",
                ],
              },
              "typography": {
                "customFontSize": false,
                "dropCap": false,
                "fontFamilies": [
                  {
                    "fontFamily": "Inter,sans-serif",
                    "name": "Inter",
                    "slug": "sans",
                  },
                  {
                    "fontFamily": "ui-serif,Georgia,Cambria,\\"Times New Roman\\",Times,serif",
                    "name": "Ui-serif",
                    "slug": "serif",
                  },
                  {
                    "fontFamily": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace",
                    "name": "Ui-monospace",
                    "slug": "mono",
                  },
                ],
                "fontSizes": [
                  {
                    "name": "xs",
                    "size": "0.75rem",
                    "slug": "xs",
                  },
                  {
                    "name": "sm",
                    "size": "0.875rem",
                    "slug": "sm",
                  },
                  {
                    "name": "base",
                    "size": "1rem",
                    "slug": "base",
                  },
                  {
                    "name": "lg",
                    "size": "1.125rem",
                    "slug": "lg",
                  },
                  {
                    "name": "xl",
                    "size": "1.25rem",
                    "slug": "xl",
                  },
                  {
                    "name": "2xl",
                    "size": "1.5rem",
                    "slug": "2xl",
                  },
                  {
                    "name": "3xl",
                    "size": "1.875rem",
                    "slug": "3xl",
                  },
                  {
                    "name": "4xl",
                    "size": "2.25rem",
                    "slug": "4xl",
                  },
                  {
                    "name": "5xl",
                    "size": "3rem",
                    "slug": "5xl",
                  },
                  {
                    "name": "6xl",
                    "size": "3.75rem",
                    "slug": "6xl",
                  },
                  {
                    "name": "7xl",
                    "size": "4.5rem",
                    "slug": "7xl",
                  },
                  {
                    "name": "8xl",
                    "size": "6rem",
                    "slug": "8xl",
                  },
                  {
                    "name": "9xl",
                    "size": "8rem",
                    "slug": "9xl",
                  },
                  {
                    "name": "custom",
                    "size": ".625rem",
                    "slug": "custom",
                  },
                ],
              },
            },
            "version": 2,
          }
        `)

    expect(test.assets[`editor.js`].length).toBeGreaterThan(10)
    expect(test.assets[`editor.js`].includes(`import `)).toBeFalsy()

    expect(test.assets[`editor.css`].length).toBeGreaterThan(10)
    expect(test.assets[`editor.css`].includes(`@import`)).toBe(false)
    expect(test.assets[`editor.css`].includes(`@apply`)).toBe(false)
    expect(test.assets[`editor.css`].match(/    /)).toBeFalsy()
    expect(test.assets[`editor.css`].match(/\\n/)).toBeFalsy()

    expect(test.manifest[`app.js`]).toMatch(/js\/app\.[\d|\w]*\.js/)
    expect(test.manifest[`app.css`]).toMatch(/css\/app\.[\d|\w]*\.css/)
    expect(test.manifest[`editor.css`]).toMatch(
      /css\/editor\.[\d|\w]*\.css/,
    )
    expect(test.manifest[`runtime.js`]).toMatch(
      /js\/runtime\.[\d|\w]*\.js/,
    )
  })
})
