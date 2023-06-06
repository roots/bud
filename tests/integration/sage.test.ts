import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'
import fs from 'fs-jetpack'

describe(`examples/sage`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/sage`,
      dist: `public`,
    }).setup()

    expect(project.entrypoints.app.css).toBeInstanceOf(Array)
    expect(project.entrypoints.app.css).toHaveLength(1)
    expect(project.entrypoints.app.dependencies).toEqual([])

    expect(project.entrypoints.editor.css).toBeInstanceOf(Array)
    expect(project.entrypoints.editor.css).toHaveLength(1)

    expect(project.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(project.assets[`runtime.js`].includes(`import `)).toBeFalsy()

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()

    expect(project.assets[`app.css`].length).toBeGreaterThan(10)
    expect(project.assets[`app.css`].includes(`@import`)).toBe(false)

    expect(project.assets[`app.css`].includes(`@apply`)).toBe(false)
    expect(project.assets[`app.css`].match(/    /)).toBeFalsy()
    expect(project.assets[`app.css`].match(/\\n/)).toBeFalsy()

    expect(
      project.assets[`app.css`].includes(`.text-xl{font-size:1.25rem`),
    ).toBeTruthy()
    expect(
      project.assets[`app.css`].includes(`.text-custom{font-size:.625rem`),
    ).toBeTruthy()

    const themeJson = await fs.readAsync(
      project.projectPath(`theme.json`),
      `json`,
    )
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

    expect(project.assets[`editor.js`].length).toBeGreaterThan(10)
    expect(project.assets[`editor.js`].includes(`import `)).toBeFalsy()

    expect(project.assets[`editor.css`].length).toBeGreaterThan(10)
    expect(project.assets[`editor.css`].includes(`@import`)).toBe(false)
    expect(project.assets[`editor.css`].includes(`@apply`)).toBe(false)
    expect(project.assets[`editor.css`].match(/    /)).toBeFalsy()
    expect(project.assets[`editor.css`].match(/\\n/)).toBeFalsy()

    expect(project.manifest[`app.js`]).toMatch(/js\/app\.[\d|\w]*\.js/)
    expect(project.manifest[`app.css`]).toMatch(/css\/app\.[\d|\w]*\.css/)
    expect(project.manifest[`editor.css`]).toMatch(
      /css\/editor\.[\d|\w]*\.css/,
    )
    expect(project.manifest[`runtime.js`]).toMatch(
      /js\/runtime\.[\d|\w]*\.js/,
    )
  })
})
