/**
 * The bud asset management framework.
 *
 * @author Kelly Mears <kelly@roots.io>
 */

import {existsSync} from 'fs-extra'
import {join, resolve} from 'path'
import {initialProps} from './initialProps'
import generators from './api'

/**
 * Bind a builder yield to an object property
 *
 * @param  {string} object  - to bind on
 * @param  {func}   generator - yields a function to be bound
 * @return {object.<bud>}
 */
const bind = (object, fn) => {
  const call = fn(object)

  return object[`${call.name}`] = call
}

/**
 * The bud asset management framework.
 *
 * @property {object.<configs>}
 * @property {object.<features>}
 * @property {boolean} inProduction
 * @property {string} mode
 * @property {object.<options>}
 * @property {object.<paths>}
 * @property {func.<alias>}
 * @property {func.<auto>}
 * @property {func.<babel>}
 * @property {func.<bundle>}
 * @property {func.<copy>}
 * @property {func.<copyAll>}
 * @property {func.<dependencyManifest>}
 * @property {func.<dist>}
 * @property {func.<distPath>}
 * @property {func.<hash>}
 * @property {func.<hot>}
 * @property {func.<postCss>}
 * @property {func.<preset>}
 * @property {func.<project>}
 * @property {func.<projectPath>}
 * @property {func.<publicPath>}
 * @property {func.<purge>}
 * @property {func.<src>}
 * @property {func.<srcPath>}
 * @property {func.<sync>}
 * @property {func.<translate>}
 */
const bud = {...initialProps}
generators.forEach(fn => bind(bud, fn))

/**
 * Bud asset manager.
 *
 * @exports  {object.<bud>}
 */
module.exports = {bud}
