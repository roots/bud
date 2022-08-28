import * as json5Parser from 'json5'
import * as tomlParser from 'toml'

import type * as Rule from '../rule/rule.js'
import type Build from '../service.js'

/**
 * .js rule
 *
 * @public
 */
export const js = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.js`))
    .setInclude([app => app.path(`@src`)])
    .setUse(() => [])

/**
 * .css rule
 *
 * @public
 */
export const css = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.css`))
    .setInclude([app => app.path(`@src`)])
    .setUse([`precss`, `css`])

/**
 * .module.css rule
 *
 * @public
 */
export const cssModule = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.cssModule`))
    .setInclude([app => app.path(`@src`)])
    .setUse([`precss`, `cssModule`])

/**
 * .jpg, .jpeg, .png, .gif rule
 *
 * @public
 */
export const image = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.image`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: app.hooks.filter(`feature.hash`)
        ? `images/`
            .concat(app.hooks.filter(`value.hashFormat`))
            .concat(`[ext]`)
        : `images/`
            .concat(app.hooks.filter(`value.fileFormat`))
            .concat(`[ext]`),
    }))

/**
 * .webp assets factorry
 *
 * @remarks
 * Returns {@link Rule} for `asset/resource`
 *
 * @public
 */
export const webp = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.webp`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: app.hooks.filter(`feature.hash`)
        ? `images/`
            .concat(app.hooks.filter(`value.hashFormat`))
            .concat(`[ext]`)
        : `images/`
            .concat(app.hooks.filter(`value.fileFormat`))
            .concat(`[ext]`),
    }))

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 * .svg rule
 *
 * @public
 */
export const svg = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.svg`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: app.hooks.filter(`feature.hash`)
        ? `svg/`
            .concat(app.hooks.filter(`value.hashFormat`))
            .concat(`[ext]`)
        : `svg/`
            .concat(app.hooks.filter(`value.fileFormat`))
            .concat(`[ext]`),
    }))

/**
 * .woff, .woff2, .otf rule
 *
 * @public
 */
export const font = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setType(`asset`)
    .setTest(({hooks}) => hooks.filter(`pattern.font`))
    .setInclude([app => app.path(`@src`)])
    .setGenerator(app => ({
      filename: app.hooks.filter(`feature.hash`)
        ? `fonts/`
            .concat(app.hooks.filter(`value.hashFormat`))
            .concat(`[ext]`)
        : `fonts/`
            .concat(app.hooks.filter(`value.fileFormat`))
            .concat(`[ext]`),
    }))

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
export const json = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setType(`json`)
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.json`))
    .setParser({parse: json5Parser.parse})

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 *
 * @public
 */
export const yml = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.yml`))
    .setUse([`yml`])

/**
 * Returns {@link Rule} for `.html` handling
 *
 * @public
 */
export const html = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.html`))
    .setUse([`html`])

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.csv`))
    .setUse([`csv`])

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.xml`))
    .setUse([`xml`])

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = async (build: Build): Promise<Rule.Instance> =>
  build
    .makeRule()
    .setType(`json`)
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.html`))
    .setParser({parse: tomlParser.parse})
