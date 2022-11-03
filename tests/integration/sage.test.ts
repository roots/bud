import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, expect, it} from 'vitest'

const test = (pacman: 'yarn' | 'npm') => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/sage`,
      dist: `public`,
      with: pacman,
    }).setup()
  })

  describe(`entrypoints.json`, () => {
    it(`has expected app entries`, () => {
      expect(project.entrypoints.app.css).toBeInstanceOf(Array)
      expect(project.entrypoints.app.css).toHaveLength(1)
      expect(project.entrypoints.app.dependencies).toEqual([])
    })

    it(`has expected editor entries`, () => {
      expect(project.entrypoints.editor.css).toBeInstanceOf(Array)
      expect(project.entrypoints.editor.css).toHaveLength(1)
    })
  })

  describe(`runtime`, () => {
    it(`has contents`, () => {
      expect(project.assets[`runtime.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    })
  })

  describe(`app.js`, () => {
    it(`has contents`, () => {
      expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
    })
  })

  describe(`app.css`, () => {
    it(`has contents`, () => {
      expect(project.assets[`app.css`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`app.css`].includes(`@import`)).toBe(false)
    })

    it(`@tailwind directive is transpiled`, () => {
      expect(project.assets[`app.css`].includes(`@apply`)).toBe(false)
    })

    it(`has whitespace removed`, () => {
      expect(project.assets[`app.css`].match(/    /)).toBeFalsy()
    })

    it(`has breaks removed`, () => {
      expect(project.assets[`app.css`].match(/\\n/)).toBeFalsy()
    })

    it(`has xl font-size`, () => {
      expect(
        project.assets[`app.css`].includes(`.text-xl{font-size:1.25rem`),
      ).toBeTruthy()
    })

    it(`has custom font-size`, () => {
      expect(
        project.assets[`app.css`].includes(
          `.text-custom{font-size:.625rem`,
        ),
      ).toBeTruthy()
    })
  })

  if (pacman === `yarn`) {
    describe(`theme.json`, () => {
      it(`matches snapshot`, async () => {
        const themeJson = await project.readJson(
          project.projectPath(`theme.json`),
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
      })
    })
  }

  describe(`editor.js`, () => {
    it(`has contents`, () => {
      expect(project.assets[`editor.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`editor.js`].includes(`import `)).toBeFalsy()
    })
  })

  it(`[editor] css: has contents`, () => {
    expect(project.assets[`editor.css`].length).toBeGreaterThan(10)
  })

  it(`[editor] css: is transpiled`, () => {
    expect(project.assets[`editor.css`].includes(`@import`)).toBe(false)
  })

  it(`[editor] css: @tailwind directive is transpiled`, () => {
    expect(project.assets[`editor.css`].includes(`@apply`)).toBe(false)
  })

  it(`[editor] css: has whitespace removed`, () => {
    expect(project.assets[`editor.css`].match(/    /)).toBeFalsy()
  })

  it(`[editor] css: has breaks removed`, () => {
    expect(project.assets[`editor.css`].match(/\\n/)).toBeFalsy()
  })

  it(`[snapshots] package.json is unchanged`, async () => {
    expect(project.packageJson).toMatchSnapshot()
  })

  it(`[snapshots] public/manifest.json matches expectations`, async () => {
    expect(project.manifest[`app.js`]).toMatch(/js\/app\.[\d|\w]*\.js/)
    expect(project.manifest[`app.css`]).toMatch(/css\/app\.[\d|\w]*\.css/)
    expect(project.manifest[`editor.css`]).toMatch(
      /css\/editor\.[\d|\w]*\.css/,
    )
    expect(project.manifest[`runtime.js`]).toMatch(
      /js\/runtime\.[\d|\w]*\.js/,
    )
  })

  it(`[snapshots] module named chunks matches snapshot`, async () => {
    expect(project.modules.chunks.byName).toEqual(
      expect.objectContaining({
        app: expect.any(Number),
        editor: expect.any(Number),
        runtime: expect.any(Number),
      }),
    )
  })
}

describe(`sage`, () => {
  describe(`npm`, test(`npm`))
  describe(`yarn`, test(`yarn`))
}, 240000)
