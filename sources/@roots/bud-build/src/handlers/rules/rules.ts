import type {Bud} from '@roots/bud-framework'
import * as json5Parser from 'json5'
import {join} from 'path'

import type * as Rule from '../../rule/index.js'

/**
 * Returns {@link Rule} for js
 *
 * @public
 */
export const js = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.js`))
    .setInclude([app => app.path(`@src`)])
    .setUse(() => [])

/**
 * Returns {@link Rule} for css
 *
 * @public
 */
export const css = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.css`))
    .setInclude([app => app.path(`@src`)])
    .setUse([`precss`, `css`])

/**
 * Returns {@link Rule} for module.css
 *
 * @public
 */
export const cssModule = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.cssModule`))
    .setInclude([app => app.path(`@src`)])
    .setUse([`precss`, `cssModule`])

/**
 * Returns {@link Rule} for svg
 *
 * @public
 */
export const svg = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.svg`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: join(
        `svg`,
        (app.hooks.filter(`feature.hash`)
          ? app.hooks.filter(`value.hashFormat`)
          : app.hooks.filter(`value.fileFormat`)
        ).concat(`[ext]`),
      ),
    }))

/**
 * Returns {@link Rule} for webp
 *
 * @public
 */
export const webp = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.webp`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: join(
        `images`,
        (app.hooks.filter(`feature.hash`)
          ? app.hooks.filter(`value.hashFormat`)
          : app.hooks.filter(`value.fileFormat`)
        ).concat(`[ext]`),
      ),
    }))

/**
 * Returns {@link Rule} for images
 *
 * @public
 */
export const image = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setTest(({hooks}) => hooks.filter(`pattern.image`))
    .setInclude([app => app.path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator(app => ({
      filename: join(
        `images`,
        (app.hooks.filter(`feature.hash`)
          ? app.hooks.filter(`value.hashFormat`)
          : app.hooks.filter(`value.fileFormat`)
        ).concat(`[ext]`),
      ),
    }))

/**
 * Returns {@link Rule} for fonts
 *
 * @public
 */
export const font = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setType(`asset`)
    .setTest(({hooks}) => hooks.filter(`pattern.font`))
    .setInclude([app => app.path(`@src`)])
    .setGenerator(app => ({
      filename: join(
        `fonts`,
        (app.hooks.filter(`feature.hash`)
          ? app.hooks.filter(`value.hashFormat`)
          : app.hooks.filter(`value.fileFormat`)
        ).concat(`[ext]`),
      ),
    }))

/**
 * Returns {@link Rule} for json
 *
 * @public
 */
export const json = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setType(`json`)
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.json`))
    .setParser({parse: json5Parser.parse})

/**
 * Returns {@link Rule} for yml
 *
 * @public
 */
export const yml = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.yml`))
    .setUse([`yml`])

/**
 * Returns {@link Rule} for html
 *
 * @public
 */
export const html = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.html`))
    .setUse([`html`])
